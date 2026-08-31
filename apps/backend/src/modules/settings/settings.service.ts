import { prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class SettingsService {
  static async listFinancialYears() {
    return await prisma.financialYear.findMany({
      orderBy: { startDate: 'desc' },
    });
  }

  static async getCurrentFinancialYear() {
    const fy = await prisma.financialYear.findFirst({
      where: { isCurrent: true },
    });

    if (!fy) {
      return await prisma.financialYear.findFirst({
        orderBy: { startDate: 'desc' },
      });
    }

    return fy;
  }

  static async createFinancialYear(data: {
    code: string;
    startDate: string | Date;
    endDate: string | Date;
  }) {
    const existing = await prisma.financialYear.findUnique({
      where: { code: data.code },
    });

    if (existing) {
      throw ApiError.conflict(`Financial year '${data.code}' already exists`);
    }

    return await prisma.financialYear.create({
      data: {
        code: data.code,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        isCurrent: false,
        isClosed: false,
      },
    });
  }

  static async setCurrentFinancialYear(id: string) {
    return await prisma.$transaction(async (tx) => {
      await tx.financialYear.updateMany({
        data: { isCurrent: false },
      });

      return await tx.financialYear.update({
        where: { id },
        data: { isCurrent: true },
      });
    });
  }
}
