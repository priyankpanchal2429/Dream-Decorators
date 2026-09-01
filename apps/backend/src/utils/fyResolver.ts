import { prisma } from '@dream-decorators/database';

/**
 * Resolves a financial year by ID, Code (e.g. 'FY2026-27'), or defaults to the current active FY.
 */
export async function resolveFinancialYear(fyIdOrCode?: string) {
  if (fyIdOrCode && fyIdOrCode.trim() !== '' && fyIdOrCode !== 'ALL') {
    const cleaned = fyIdOrCode.trim();
    // Try finding by ID or by Code
    const match = await prisma.financialYear.findFirst({
      where: {
        OR: [
          { id: cleaned },
          { code: cleaned },
          { code: { equals: cleaned, mode: 'insensitive' } },
        ],
      },
    });

    if (match) {
      return match;
    }

    // If it's a standard format like FY2025-26 or FY2024-25 not yet seeded, dynamically ensure it
    if (cleaned.startsWith('FY20')) {
      const parts = cleaned.replace('FY', '').split('-');
      const startYear = parseInt(parts[0], 10);
      if (!isNaN(startYear)) {
        try {
          const created = await prisma.financialYear.create({
            data: {
              code: cleaned,
              startDate: new Date(`${startYear}-04-01`),
              endDate: new Date(`${startYear + 1}-03-31`),
              isClosed: startYear < 2026,
              isCurrent: startYear === 2026,
            },
          });
          return created;
        } catch {
          // If concurrent create happens, fetch it
          return await prisma.financialYear.findUnique({ where: { code: cleaned } });
        }
      }
    }
  }

  // Fallback to active current FY or latest
  let current = await prisma.financialYear.findFirst({ where: { isCurrent: true } });
  if (!current) {
    current = await prisma.financialYear.findFirst({ orderBy: { startDate: 'desc' } });
  }

  return current;
}
