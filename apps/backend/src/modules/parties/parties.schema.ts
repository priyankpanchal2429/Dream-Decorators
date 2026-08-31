import { z } from 'zod';
import { PartyType } from '@dream-decorators/database';

export const addressSchema = z.object({
  addressType: z.enum(['BILLING', 'SHIPPING']).default('BILLING'),
  addressLine1: z.string().min(1, 'Address line 1 is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  pincode: z.string().min(4, 'Pincode is required'),
  country: z.string().default('India'),
  isDefault: z.boolean().default(true),
});

export const createPartySchema = z.object({
  body: z.object({
    code: z.string().min(1, 'Party code is required'),
    name: z.string().min(1, 'Party name is required'),
    companyName: z.string().optional(),
    type: z.nativeEnum(PartyType),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().min(6, 'Valid phone number is required'),
    gstin: z.string().optional().or(z.literal('')),
    pan: z.string().optional().or(z.literal('')),
    creditLimit: z.number().nonnegative().default(0),
    openingBalance: z.number().default(0),
    addresses: z.array(addressSchema).optional(),
  }),
});

export const updatePartySchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    companyName: z.string().optional(),
    type: z.nativeEnum(PartyType).optional(),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().min(6).optional(),
    gstin: z.string().optional().or(z.literal('')),
    pan: z.string().optional().or(z.literal('')),
    creditLimit: z.number().nonnegative().optional(),
    isActive: z.boolean().optional(),
  }),
});
