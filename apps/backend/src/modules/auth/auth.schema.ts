import { z } from 'zod';
import { UserRole } from '@dream-decorators/database';

export const loginSchema = z.object({
  body: z.object({
    loginId: z.string().min(1, 'User ID / Username is required'),
    password: z.string().min(1, 'Password is required'),
  }),
});

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    loginId: z.string().min(3, 'User ID must be at least 3 alphanumeric characters').regex(/^[a-zA-Z0-9._-]+$/, 'User ID can only contain letters, numbers, dots, and dashes'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.nativeEnum(UserRole).default(UserRole.SALES_EXECUTIVE),
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    loginId: z.string().min(1, 'User ID is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    recoveryCode: z.string().optional(),
  }),
});
