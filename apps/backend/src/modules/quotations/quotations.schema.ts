import { z } from 'zod';
import { DocumentStatus } from '@dream-decorators/database';

export const quotationItemSchema = z.object({
  productId: z.string().optional(),
  description: z.string().optional(),
  quantity: z.number().positive('Quantity must be greater than zero'),
  unitRate: z.number().nonnegative().optional(),
  unitPrice: z.number().nonnegative().optional(),
  taxPercent: z.number().nonnegative().optional().default(0),
  taxRate: z.number().nonnegative().optional().default(0),
  discountPercent: z.number().min(0).max(100).optional().default(0),
  discount: z.number().nonnegative().optional().default(0),
  total: z.number().optional(),
  uom: z.string().optional(),
  hsnCode: z.string().optional(),
  itemNotes: z.string().optional(),
});

export const createQuotationSchema = z.object({
  body: z.object({
    quotationNumber: z.string().min(1, 'Quotation number is required'),
    date: z.string().or(z.date()).optional(),
    issueDate: z.string().or(z.date()).optional(),
    validUntil: z.string().or(z.date()).optional(),
    partyId: z.string().optional(),
    financialYearId: z.string().optional(),
    customerName: z.string().optional(),
    customerEmail: z.string().optional(),
    customerPhone: z.string().optional(),
    customerAddress: z.string().optional(),
    customerGstin: z.string().optional(),
    companyName: z.string().optional(),
    contactPerson: z.string().optional(),
    placeOfSupply: z.string().optional(),
    discountAmount: z.number().nonnegative().optional().default(0),
    notes: z.string().optional(),
    terms: z.string().optional(),
    status: z.nativeEnum(DocumentStatus).optional().default(DocumentStatus.DRAFT),
    items: z.array(quotationItemSchema).min(1, 'At least 1 line item is required'),
  }),
});

export const updateQuotationStatusSchema = z.object({
  body: z.object({
    status: z.nativeEnum(DocumentStatus),
  }),
});
