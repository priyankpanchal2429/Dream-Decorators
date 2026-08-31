import { z } from 'zod';
import { DocumentStatus } from '@dream-decorators/database';

export const challanItemSchema = z.object({
  productId: z.string().uuid('Product ID is required'),
  quantity: z.number().positive('Quantity must be greater than zero'),
  description: z.string().optional(),
});

export const createChallanSchema = z.object({
  body: z.object({
    challanNumber: z.string().min(1, 'Challan number is required'),
    date: z.string().or(z.date()),
    partyId: z.string().uuid('Party ID is required'),
    warehouseId: z.string().uuid('Warehouse ID is required'),
    financialYearId: z.string().uuid('Financial Year ID is required'),
    salesInvoiceId: z.string().uuid().optional(),
    dispatchDetails: z.string().optional(),
    notes: z.string().optional(),
    items: z.array(challanItemSchema).min(1, 'At least 1 item is required'),
  }),
});
