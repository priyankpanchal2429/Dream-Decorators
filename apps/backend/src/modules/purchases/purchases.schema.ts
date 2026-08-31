import { z } from 'zod';

export const purchaseItemSchema = z.object({
  productId: z.string().uuid('Product ID is required'),
  quantity: z.number().positive('Quantity must be greater than zero'),
  unitRate: z.number().nonnegative('Unit rate must be positive'),
  taxPercent: z.number().nonnegative().default(18),
});

export const createPurchaseSchema = z.object({
  body: z.object({
    billNumber: z.string().min(1, 'Vendor bill number is required'),
    date: z.string().or(z.date()),
    dueDate: z.string().or(z.date()).optional(),
    partyId: z.string().uuid('Vendor ID is required'),
    warehouseId: z.string().uuid('Destination Warehouse ID is required'),
    financialYearId: z.string().uuid('Financial Year ID is required'),
    notes: z.string().optional(),
    items: z.array(purchaseItemSchema).min(1, 'At least 1 item is required'),
  }),
});
