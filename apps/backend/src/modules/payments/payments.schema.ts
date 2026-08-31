import { z } from 'zod';
import { PaymentMode } from '@dream-decorators/database';

export const paymentAllocationSchema = z.object({
  salesInvoiceId: z.string().uuid().optional(),
  purchaseInvoiceId: z.string().uuid().optional(),
  allocatedAmount: z.number().positive('Allocated amount must be positive'),
});

export const createPaymentSchema = z.object({
  body: z.object({
    voucherNumber: z.string().min(1, 'Voucher number is required'),
    date: z.string().or(z.date()),
    paymentType: z.enum(['RECEIPT', 'PAYMENT']),
    partyId: z.string().uuid('Party ID is required'),
    financialYearId: z.string().uuid('Financial Year ID is required'),
    amount: z.number().positive('Payment amount must be greater than zero'),
    paymentMode: z.nativeEnum(PaymentMode),
    referenceNo: z.string().optional(),
    notes: z.string().optional(),
    allocations: z.array(paymentAllocationSchema).optional(),
  }),
});
