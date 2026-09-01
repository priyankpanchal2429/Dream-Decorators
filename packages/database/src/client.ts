import { PrismaClient } from '@prisma/client';

declare const process: { env: Record<string, string | undefined> } | undefined;

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const FALLBACK_DB_URL =
  'postgresql://neondb_owner:npg_ystu3hWg1qcw@ep-late-cake-azb3r3tg-pooler.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';
const FALLBACK_DIRECT_URL =
  'postgresql://neondb_owner:npg_ystu3hWg1qcw@ep-late-cake-azb3r3tg.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require';

function sanitizeDbUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  let cleaned = url.trim();
  cleaned = cleaned.replace(/^(DATABASE_URL|DIRECT_URL)\s*=\s*/i, '');
  cleaned = cleaned.replace(/^["']|["']$/g, '').trim();
  return cleaned.startsWith('postgres') ? cleaned : undefined;
}

if (typeof process !== 'undefined' && process?.env) {
  process.env.DATABASE_URL = sanitizeDbUrl(process.env.DATABASE_URL) || FALLBACK_DB_URL;
  process.env.DIRECT_URL = sanitizeDbUrl(process.env.DIRECT_URL) || FALLBACK_DIRECT_URL;
}

const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development';
const isNotProd = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';
const cleanDbUrl = typeof process !== 'undefined' && process?.env?.DATABASE_URL ? process.env.DATABASE_URL : FALLBACK_DB_URL;

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    datasources: { db: { url: cleanDbUrl } },
    log: isDev ? ['query', 'error', 'warn'] : ['error'],
  });

if (isNotProd) {
  globalThis.prismaGlobal = prisma;
}

export * from '@prisma/client';
