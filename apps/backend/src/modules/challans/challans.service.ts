import { prisma, DocumentStatus, StockMovementType, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class ChallansService {
  static async listChallans(filter: {
    status?: DocumentStatus;
    partyId?: string;
    warehouseId?: string;
    financialYearId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filter.page || 1;
    const limit = filter.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.DeliveryChallanWhereInput = {};

    if (filter.status) where.status = filter.status;
    if (filter.partyId) where.partyId = filter.partyId;
    if (filter.warehouseId) where.warehouseId = filter.warehouseId;
    if (filter.financialYearId) where.financialYearId = filter.financialYearId;

    if (filter.search) {
      where.OR = [
        { challanNumber: { contains: filter.search, mode: 'insensitive' } },
        { party: { name: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    const [total, challans] = await Promise.all([
      prisma.deliveryChallan.count({ where }),
      prisma.deliveryChallan.findMany({
        where,
        include: {
          party: true,
          warehouse: true,
          financialYear: true,
          salesInvoice: true,
          createdBy: { select: { id: true, firstName: true, lastName: true } },
          items: { include: { product: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      challans,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getChallanById(id: string) {
    const challan = await prisma.deliveryChallan.findUnique({
      where: { id },
      include: {
        party: { include: { addresses: true } },
        warehouse: true,
        financialYear: true,
        salesInvoice: true,
        createdBy: { select: { id: true, firstName: true, lastName: true } },
        items: { include: { product: true } },
      },
    });

    if (!challan) {
      throw ApiError.notFound('Delivery Challan not found');
    }

    return challan;
  }

  static async createChallan(data: any, createdById: string) {
    const existing = await prisma.deliveryChallan.findUnique({
      where: { challanNumber: data.challanNumber },
    });

    if (existing) {
      throw ApiError.conflict(`Challan number '${data.challanNumber}' already exists`);
    }

    return await prisma.$transaction(async (tx) => {
      // 1. Create delivery challan record
      const challan = await tx.deliveryChallan.create({
        data: {
          challanNumber: data.challanNumber,
          dispatchDate: new Date(data.date || data.dispatchDate || Date.now()),
          partyId: data.partyId,
          warehouseId: data.warehouseId,
          financialYearId: data.financialYearId,
          salesInvoiceId: data.salesInvoiceId,
          createdById,
          status: DocumentStatus.FULFILLED,
          remarks: data.dispatchDetails || data.remarks || data.notes,
          items: {
            create: data.items.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: { items: true, party: true, warehouse: true },
      });

      // 2. Automatically deduct inventory stocks and log stock movements
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
        const updatedQty = Math.max(0, currentQty - Number(item.quantity));

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
            quantity: 0,
          },
          update: {
            quantity: updatedQty,
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            warehouseId: data.warehouseId,
            movementType: StockMovementType.OUTWARD_SALES,
            quantity: item.quantity,
            referenceNo: data.challanNumber,
            remarks: `Dispatched on Delivery Challan ${data.challanNumber}`,
          },
        });
      }

      return challan;
    });
  }
}
