import { PrismaClient } from '@prisma/client';

declare const process: { env: Record<string, string | undefined> } | undefined;

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

if (typeof process !== 'undefined' && process?.env) {
  if (process.env.DATABASE_URL) {
    process.env.DATABASE_URL = process.env.DATABASE_URL.trim().replace(/^["']|["']$/g, '');
  }
  if (process.env.DIRECT_URL) {
    process.env.DIRECT_URL = process.env.DIRECT_URL.trim().replace(/^["']|["']$/g, '');
  }
}

const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development';
const isNotProd = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
const cleanDbUrl = typeof process !== 'undefined' ? process?.env?.DATABASE_URL?.trim().replace(/^["']|["']$/g, '') : undefined;

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
