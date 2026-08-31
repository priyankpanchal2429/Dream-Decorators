import { PrismaClient } from '@prisma/client';

declare const process: { env: Record<string, string | undefined> } | undefined;

declare global {
  var prismaGlobal: PrismaClient | undefined;
}

const isDev = typeof process !== 'undefined' && process?.env?.NODE_ENV === 'development';
const isNotProd = typeof process !== 'undefined' && process?.env?.NODE_ENV !== 'production';

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    log: isDev ? ['query', 'error', 'warn'] : ['error'],
  });

if (isNotProd) {
  globalThis.prismaGlobal = prisma;
}

export * from '@prisma/client';
