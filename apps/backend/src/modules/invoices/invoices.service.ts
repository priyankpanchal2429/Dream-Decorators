import { prisma, DocumentStatus, PaymentStatus, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class InvoicesService {
  static async listInvoices(filter: {
    status?: DocumentStatus;
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

    const where: Prisma.SalesInvoiceWhereInput = {};

    if (filter.status) where.status = filter.status;
    if (filter.paymentStatus) where.paymentStatus = filter.paymentStatus;
    if (filter.partyId) where.partyId = filter.partyId;
    if (filter.financialYearId) where.financialYearId = filter.financialYearId;

    if (filter.search) {
      where.OR = [
        { invoiceNumber: { contains: filter.search, mode: 'insensitive' } },
        { party: { name: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    const [total, invoices] = await Promise.all([
      prisma.salesInvoice.count({ where }),
      prisma.salesInvoice.findMany({
        where,
        include: {
          party: true,
          financialYear: true,
          createdBy: { select: { id: true, firstName: true, lastName: true } },
          items: { include: { product: true } },
          deliveryChallans: true,
          paymentItems: { include: { payment: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    const formattedInvoices = invoices.map((inv) => ({
      ...inv,
      balanceAmount: Math.max(0, Number(inv.grandTotal) - Number(inv.paidAmount)),
    }));

    return {
      invoices: formattedInvoices,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getInvoiceById(id: string) {
    const invoice = await prisma.salesInvoice.findUnique({
      where: { id },
      include: {
        party: { include: { addresses: true } },
        financialYear: true,
        createdBy: { select: { id: true, firstName: true, lastName: true, email: true } },
        items: { include: { product: true } },
        deliveryChallans: true,
        paymentItems: { include: { payment: true } },
        quotation: true,
      },
    });

    if (!invoice) {
      throw ApiError.notFound('Invoice not found');
    }

    return {
      ...invoice,
      balanceAmount: Math.max(0, Number(invoice.grandTotal) - Number(invoice.paidAmount)),
    };
  }

  static async createInvoice(data: any, createdById: string) {
    const existing = await prisma.salesInvoice.findUnique({
      where: { invoiceNumber: data.invoiceNumber },
    });

    if (existing) {
      throw ApiError.conflict(`Invoice number '${data.invoiceNumber}' already exists`);
    }

    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    const calculatedItems = data.items.map((item: any) => {
      const lineSubtotal = item.quantity * item.unitRate;
      const discountAmount = (lineSubtotal * (item.discountPercent || 0)) / 100;
      const taxable = lineSubtotal - discountAmount;
      const taxAmount = (taxable * (item.taxPercent || 0)) / 100;
      const lineTotal = taxable + taxAmount;

      subTotal += lineSubtotal;
      totalTax += taxAmount;
      totalDiscount += discountAmount;

      return {
        productId: item.productId,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitRate,
        taxRate: item.taxPercent || 0,
        taxAmount,
        totalPrice: lineTotal,
      };
    });

    const grandTotal = subTotal - totalDiscount + totalTax;

    const invoice = await prisma.salesInvoice.create({
      data: {
        invoiceNumber: data.invoiceNumber,
        date: new Date(data.date),
        dueDate: data.dueDate ? new Date(data.dueDate) : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        partyId: data.partyId,
        financialYearId: data.financialYearId,
        createdById,
        status: DocumentStatus.APPROVED,
        paymentStatus: PaymentStatus.UNPAID,
        subTotal,
        taxAmount: totalTax,
        discountAmount: totalDiscount,
        grandTotal,
        paidAmount: 0,
        items: {
          create: calculatedItems,
        },
      },
      include: {
        party: true,
        items: { include: { product: true } },
      },
    });

    return {
      ...invoice,
      balanceAmount: Number(invoice.grandTotal),
    };
  }
}
