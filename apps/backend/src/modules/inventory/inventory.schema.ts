import { z } from 'zod';
import { ProductCategory, StockMovementType } from '@dream-decorators/database';

export const createProductSchema = z.object({
  body: z.object({
    sku: z.string().min(1, 'SKU is required'),
    name: z.string().min(1, 'Product name is required'),
    category: z.nativeEnum(ProductCategory),
    description: z.string().optional(),
    hsnCode: z.string().optional(),
    unitOfMeasure: z.string().min(1, 'Unit of measure is required'),
    taxRatePercent: z.number().nonnegative().default(18),
    purchasePrice: z.number().nonnegative().default(0),
    sellingPrice: z.number().nonnegative().default(0),
    minStockLevel: z.number().int().nonnegative().default(5),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    category: z.nativeEnum(ProductCategory).optional(),
    description: z.string().optional(),
    hsnCode: z.string().optional(),
    unitOfMeasure: z.string().optional(),
    taxRatePercent: z.number().nonnegative().optional(),
    purchasePrice: z.number().nonnegative().optional(),
    sellingPrice: z.number().nonnegative().optional(),
    minStockLevel: z.number().int().nonnegative().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const stockAdjustmentSchema = z.object({
  body: z.object({
    productId: z.string().uuid('Invalid Product ID'),
    warehouseId: z.string().uuid('Invalid Warehouse ID'),
    movementType: z.nativeEnum(StockMovementType),
    quantity: z.number().positive('Quantity must be greater than zero'),
    referenceNo: z.string().optional(),
    remarks: z.string().optional(),
  }),
});
