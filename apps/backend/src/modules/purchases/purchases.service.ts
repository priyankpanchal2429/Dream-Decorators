import { prisma, DocumentStatus, PaymentStatus, StockMovementType, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class PurchasesService {
  static async listPurchases(filter: {
    paymentStatus?: PaymentStatus;
    partyId?: string;
    financialYearId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filter.page || 1;
    const limit = filter.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.PurchaseInvoiceWhereInput = {};

    if (filter.paymentStatus) where.paymentStatus = filter.paymentStatus;
    if (filter.partyId) where.partyId = filter.partyId;
    if (filter.financialYearId) where.financialYearId = filter.financialYearId;

    if (filter.search) {
      where.OR = [
        { invoiceNumber: { contains: filter.search, mode: 'insensitive' } },
        { vendorBillNo: { contains: filter.search, mode: 'insensitive' } },
        { party: { name: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    const [total, purchases] = await Promise.all([
      prisma.purchaseInvoice.count({ where }),
      prisma.purchaseInvoice.findMany({
        where,
        include: {
          party: true,
          financialYear: true,
          createdBy: { select: { id: true, firstName: true, lastName: true } },
          items: { include: { product: true } },
          paymentItems: { include: { payment: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const formattedPurchases = purchases.map((p) => ({
      ...p,
      balanceAmount: Math.max(0, Number(p.grandTotal) - Number(p.paidAmount)),
    }));

    return {
      purchases: formattedPurchases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getPurchaseById(id: string) {
    const purchase = await prisma.purchaseInvoice.findUnique({
      where: { id },
      include: {
        party: { include: { addresses: true } },
        financialYear: true,
        createdBy: { select: { id: true, firstName: true, lastName: true } },
        items: { include: { product: true } },
        paymentItems: { include: { payment: true } },
      },
    });

    if (!purchase) {
      throw ApiError.notFound('Purchase invoice not found');
    }

    return {
      ...purchase,
      balanceAmount: Math.max(0, Number(purchase.grandTotal) - Number(purchase.paidAmount)),
    };
  }

  static async createPurchase(data: any, createdById: string) {
    const existing = await prisma.purchaseInvoice.findUnique({
      where: { invoiceNumber: data.billNumber },
    });

    if (existing) {
      throw ApiError.conflict(`Invoice/Bill number '${data.billNumber}' already exists`);
    }

    return await prisma.$transaction(async (tx) => {
      let subTotal = 0;
      let totalTax = 0;

      const calculatedItems = data.items.map((item: any) => {
        const taxable = item.quantity * item.unitRate;
        const taxAmount = (taxable * (item.taxPercent || 0)) / 100;
        const lineTotal = taxable + taxAmount;

        subTotal += taxable;
        totalTax += taxAmount;

        return {
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: item.unitRate,
          taxRate: item.taxPercent || 0,
          taxAmount,
          totalPrice: lineTotal,
        };
      });

      const grandTotal = subTotal + totalTax;

      // 1. Create Purchase invoice
      const purchase = await tx.purchaseInvoice.create({
        data: {
          invoiceNumber: data.billNumber,
          vendorBillNo: data.vendorBillNo || data.billNumber,
          date: new Date(data.date),
          dueDate: data.dueDate ? new Date(data.dueDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          partyId: data.partyId,
          financialYearId: data.financialYearId,
          createdById,
          status: DocumentStatus.APPROVED,
          paymentStatus: PaymentStatus.UNPAID,
          subTotal,
          taxAmount: totalTax,
          grandTotal,
          paidAmount: 0,
          items: {
            create: calculatedItems,
          },
        },
        include: { items: true, party: true },
      });

      // 2. Inward stock addition to warehouse
      for (const item of data.items) {
        const stock = await tx.inventoryStock.findUnique({
          where: {
            productId_warehouseId: {
              productId: item.productId,
              warehouseId: data.warehouseId,
            },
          },
        });

        const currentQty = stock ? Number(stock.quantity) : 0;
        const updatedQty = currentQty + Number(item.quantity);

        await tx.inventoryStock.upsert({
          where: {
            productId_warehouseId: {
              productId: item.productId,
              warehouseId: data.warehouseId,
            },
          },
          create: {
            productId: item.productId,
            warehouseId: data.warehouseId,
            quantity: updatedQty,
          },
          update: {
            quantity: updatedQty,
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            warehouseId: data.warehouseId,
            movementType: StockMovementType.INWARD_PURCHASE,
            quantity: item.quantity,
            referenceNo: data.billNumber,
            remarks: `Inward Purchase Bill ${data.billNumber}`,
          },
        });
      }

      return {
        ...purchase,
        balanceAmount: Number(purchase.grandTotal),
      };
    });
  }
}
