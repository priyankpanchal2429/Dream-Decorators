import z from 'zod';
import dotenv from 'dotenv';
import path from 'path';

// Load .env from workspace or root if present
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

function sanitizeDbUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  let cleaned = url.trim();
  cleaned = cleaned.replace(/^(DATABASE_URL|DIRECT_URL)\s*=\s*/i, '');
  cleaned = cleaned.replace(/^["']|["']$/g, '').trim();
  return cleaned;
}

if (process.env.DATABASE_URL) {
  process.env.DATABASE_URL = sanitizeDbUrl(process.env.DATABASE_URL);
}
if (process.env.DIRECT_URL) {
  process.env.DIRECT_URL = sanitizeDbUrl(process.env.DIRECT_URL);
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.union([z.string(), z.number()]).transform((val) => Number(val)).default(5001),
  FRONTEND_URL: z.string().default('http://localhost:3000'),
  JWT_SECRET: z.string().min(6).default('dream_decorators_erp_jwt_secret_2026_supersecure'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  UPLOAD_DIR: z.string().default('uploads'),
  MAX_FILE_SIZE_MB: z.union([z.string(), z.number()]).transform((val) => Number(val)).default(10),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'http', 'debug']).default('info'),
  DATABASE_URL: z.string().optional(),
  DIRECT_URL: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.warn('⚠️ Warning: Some environment variables used defaults:', _env.error.format());
}

export const env = _env.success
  ? _env.data
  : {
      NODE_ENV: (process.env.NODE_ENV as any) || 'production',
      PORT: Number(process.env.PORT) || 5001,
      FRONTEND_URL: process.env.FRONTEND_URL || '*',
      JWT_SECRET: process.env.JWT_SECRET || 'dream_decorators_erp_jwt_secret_2026_supersecure',
      JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
      UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads',
      MAX_FILE_SIZE_MB: Number(process.env.MAX_FILE_SIZE_MB) || 10,
      LOG_LEVEL: (process.env.LOG_LEVEL as any) || 'info',
      DATABASE_URL: process.env.DATABASE_URL,
      DIRECT_URL: process.env.DIRECT_URL,
    };
