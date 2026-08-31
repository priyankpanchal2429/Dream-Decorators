import { z } from 'zod';
import { DocumentStatus } from '@dream-decorators/database';

export const quotationItemSchema = z.object({
  productId: z.string().uuid('Product ID is required'),
  description: z.string().optional(),
  quantity: z.number().positive('Quantity must be greater than zero'),
  unitRate: z.number().nonnegative('Unit rate must be positive'),
  taxPercent: z.number().nonnegative().default(18),
  discountPercent: z.number().min(0).max(100).default(0),
});

export const createQuotationSchema = z.object({
  body: z.object({
    quotationNumber: z.string().min(1, 'Quotation number is required'),
    date: z.string().or(z.date()),
    validUntil: z.string().or(z.date()).optional(),
    partyId: z.string().uuid('Customer/Party ID is required'),
    financialYearId: z.string().uuid('Financial Year ID is required'),
    notes: z.string().optional(),
    terms: z.string().optional(),
    items: z.array(quotationItemSchema).min(1, 'At least 1 item is required'),
  }),
});

export const updateQuotationStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(DocumentStatus),
  }),
});
