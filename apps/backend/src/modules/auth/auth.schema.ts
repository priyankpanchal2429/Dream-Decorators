import { z } from 'zod';
import { UserRole } from '@dream-decorators/database';

export const loginSchema = z.object({
  body: z.object({
    loginId: z.string().optional(),
    email: z.string().optional(),
    username: z.string().optional(),
    password: z.string().min(1, 'Password is required'),
  }).refine((data) => Boolean(data.loginId || data.email || data.username), {
    message: 'User ID or Email is required',
    path: ['loginId'],
  }),
});

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    loginId: z.string().min(3, 'User ID must be at least 3 alphanumeric characters').optional(),
    username: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.nativeEnum(UserRole).default(UserRole.SALES_EXECUTIVE),
  }).refine((data) => Boolean(data.loginId || data.username || data.email), {
    message: 'User ID is required',
    path: ['loginId'],
  }),
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    loginId: z.string().optional(),
    email: z.string().optional(),
    username: z.string().optional(),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
    recoveryCode: z.string().optional(),
  }).refine((data) => Boolean(data.loginId || data.email || data.username), {
    message: 'User ID or Email is required',
    path: ['loginId'],
  }),
});
