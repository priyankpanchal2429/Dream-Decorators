import { prisma, ProductCategory, StockMovementType, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class InventoryService {
  static async listProducts(filter: {
    category?: ProductCategory;
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = filter.page || 1;
    const limit = filter.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {};

    if (filter.category) {
      where.category = filter.category;
    }

    if (filter.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { sku: { contains: filter.search, mode: 'insensitive' } },
        { description: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const [total, products] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        include: {
          inventoryStocks: {
            include: { warehouse: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    // Compute total available stock across warehouses
    const productsWithCalculatedStock = products.map((p) => {
      const totalStock = p.inventoryStocks.reduce(
        (sum, s) => sum + Number(s.quantity),
        0
      );
      return {
        ...p,
        totalStock,
        isLowStock: totalStock <= p.minStockLevel,
      };
    });

    return {
      products: productsWithCalculatedStock,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getProductById(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        inventoryStocks: { include: { warehouse: true } },
        stockMovements: {
          include: { warehouse: true },
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!product) {
      throw ApiError.notFound('Product not found');
    }

    const totalStock = product.inventoryStocks.reduce(
      (sum, s) => sum + Number(s.quantity),
      0
    );

    return {
      ...product,
      totalStock,
      isLowStock: totalStock <= product.minStockLevel,
    };
  }

  static async createProduct(data: any) {
    const existingSku = await prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (existingSku) {
      throw ApiError.conflict(`Product SKU '${data.sku}' already exists`);
    }

    return await prisma.product.create({ data });
  }

  static async updateProduct(id: string, data: any) {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Product not found');
    }

    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  static async listWarehouses() {
    return await prisma.warehouse.findMany({
      where: { isActive: true },
      include: {
        inventoryStocks: {
          include: { product: true },
        },
      },
      orderBy: { code: 'asc' },
    });
  }

  static async adjustStock(data: {
    productId: string;
    warehouseId: string;
    movementType: StockMovementType;
    quantity: number;
    referenceNo?: string;
    remarks?: string;
  }) {
    const { productId, warehouseId, movementType, quantity, referenceNo, remarks } = data;

    return await prisma.$transaction(async (tx) => {
      // Check existing stock record
      const stock = await tx.inventoryStock.findUnique({
        where: {
          productId_warehouseId: { productId, warehouseId },
        },
      });

      const currentQty = stock ? Number(stock.quantity) : 0;
      let newQty = currentQty;

      const isInward =
        movementType === StockMovementType.INWARD_PURCHASE ||
        movementType === StockMovementType.TRANSFER_IN ||
        movementType === StockMovementType.ADJUSTMENT_ADD ||
        movementType === StockMovementType.RETURN_CUSTOMER;

      if (isInward) {
        newQty += quantity;
      } else {
        if (currentQty < quantity) {
          throw ApiError.badRequest(
            `Insufficient stock in warehouse. Current: ${currentQty}, Requested: ${quantity}`
          );
        }
        newQty -= quantity;
      }

      // Upsert stock record
      const updatedStock = await tx.inventoryStock.upsert({
        where: {
          productId_warehouseId: { productId, warehouseId },
        },
        create: {
          productId,
          warehouseId,
          quantity: newQty,
        },
        update: {
          quantity: newQty,
        },
      });

      // Log movement ledger
      const movement = await tx.stockMovement.create({
        data: {
          productId,
          warehouseId,
          movementType,
          quantity,
          referenceNo: referenceNo || 'MANUAL-ADJ',
          remarks,
        },
      });

      return { stock: updatedStock, movement };
    });
  }

  static async getLowStockAlerts() {
    const products = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        inventoryStocks: { include: { warehouse: true } },
      },
    });

    const lowStockItems = products
      .map((p) => {
        const totalStock = p.inventoryStocks.reduce(
          (sum, s) => sum + Number(s.quantity),
          0
        );
        return {
          id: p.id,
          sku: p.sku,
          name: p.name,
          category: p.category,
          unitOfMeasure: p.unitOfMeasure,
          minStockLevel: p.minStockLevel,
          totalStock,
          shortage: Math.max(0, p.minStockLevel - totalStock),
        };
      })
      .filter((p) => p.totalStock <= p.minStockLevel);

    return lowStockItems;
  }
}
