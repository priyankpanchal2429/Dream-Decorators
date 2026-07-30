import z from 'zod';

const addressSchema = z.object({
  addressLine1: z.string().min(3, 'Address Line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  pincode: z.string().regex(/^\d{6}$/, 'PIN code must be 6 digits'),
  country: z.string().default('India'),
});

export const customerSchema = z.object({
  customerName: z.string().min(2, 'Customer Name must be at least 2 characters'),
  companyName: z.string().optional(),
  contactPerson: z.string().optional(),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  alternateMobile: z.string().optional(),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  website: z.string().optional(),
  gstNumber: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GSTIN format')
    .optional()
    .or(z.literal('')),
  panNumber: z.string().optional(),
  customerType: z.enum(['INDIVIDUAL', 'BUSINESS', 'DEALER', 'DISTRIBUTOR']),
  billingAddress: addressSchema,
  shippingAddress: addressSchema,
  paymentTerms: z.string().optional(),
  creditLimit: z.number().nonnegative('Credit limit must be positive').default(0),
  openingBalance: z.number().default(0),
  status: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']).default('ACTIVE'),
  remarks: z.string().optional(),
});

export type CustomerFormInput = z.infer<typeof customerSchema>;
