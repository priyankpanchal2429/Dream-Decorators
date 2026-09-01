import { PrismaClient } from '@prisma/client';

declare const process: { env: Record<string, string | undefined> } | undefined;

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

function sanitizeDbUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  let cleaned = url.trim();
  // Strip accidental "DATABASE_URL=" or "DIRECT_URL=" prefix if pasted into value field
  cleaned = cleaned.replace(/^(DATABASE_URL|DIRECT_URL)\s*=\s*/i, '');
  // Strip surrounding quotes
  cleaned = cleaned.replace(/^["']|["']$/g, '').trim();
  return cleaned;
}

if (typeof process !== 'undefined' && process?.env) {
  if (process.env.DATABASE_URL) {
    process.env.DATABASE_URL = sanitizeDbUrl(process.env.DATABASE_URL);
  }
  if (process.env.DIRECT_URL) {
    process.env.DIRECT_URL = sanitizeDbUrl(process.env.DIRECT_URL);
  }
}

const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development';
const isNotProd = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
const cleanDbUrl = typeof process !== 'undefined' ? sanitizeDbUrl(process?.env?.DATABASE_URL) : undefined;

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    datasources: cleanDbUrl ? { db: { url: cleanDbUrl } } : undefined,
    log: isDev ? ['query', 'error', 'warn'] : ['error'],
  });

if (isNotProd) {
  globalThis.prismaGlobal = prisma;
}

export * from '@prisma/client';
