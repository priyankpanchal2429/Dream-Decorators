import { prisma, PartyType, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class PartiesService {
  static async listParties(filter: {
    type?: PartyType;
    search?: string;
    isActive?: boolean;
    page?: number;
    limit?: number;
  }) {
    const page = filter.page || 1;
    const limit = filter.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.PartyWhereInput = {};

    if (filter.type) {
      where.type = { in: [filter.type, PartyType.BOTH] };
    }

    if (filter.isActive !== undefined) {
      where.isActive = filter.isActive;
    }

    if (filter.search) {
      where.OR = [
        { name: { contains: filter.search, mode: 'insensitive' } },
        { companyName: { contains: filter.search, mode: 'insensitive' } },
        { code: { contains: filter.search, mode: 'insensitive' } },
        { phone: { contains: filter.search, mode: 'insensitive' } },
        { gstin: { contains: filter.search, mode: 'insensitive' } },
      ];
    }

    const [total, parties] = await Promise.all([
      prisma.party.count({ where }),
      prisma.party.findMany({
        where,
        include: {
          addresses: true,
          _count: {
            select: {
              salesInvoices: true,
              quotations: true,
              purchaseInvoices: true,
              payments: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      parties,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getPartyById(id: string) {
    const party = await prisma.party.findUnique({
      where: { id },
      include: {
        addresses: true,
        quotations: { take: 10, orderBy: { createdAt: 'desc' } },
        salesInvoices: { take: 10, orderBy: { createdAt: 'desc' } },
        purchaseInvoices: { take: 10, orderBy: { createdAt: 'desc' } },
        payments: { take: 10, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!party) {
      throw ApiError.notFound('Party not found');
    }

    return party;
  }

  static async createParty(data: any) {
    const existingCode = await prisma.party.findUnique({
      where: { code: data.code },
    });

    if (existingCode) {
      throw ApiError.conflict(`Party code '${data.code}' already exists`);
    }

    const { addresses, ...partyData } = data;

    const party = await prisma.party.create({
      data: {
        ...partyData,
        addresses: addresses && addresses.length > 0
          ? { create: addresses }
          : undefined,
      },
      include: {
        addresses: true,
      },
    });

    return party;
  }

  static async updateParty(id: string, data: any) {
    const existing = await prisma.party.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Party not found');
    }

    const updated = await prisma.party.update({
      where: { id },
      data,
      include: {
        addresses: true,
      },
    });

    return updated;
  }

  static async deleteParty(id: string) {
    const existing = await prisma.party.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            salesInvoices: true,
            purchaseInvoices: true,
          },
        },
      },
    });

    if (!existing) {
      throw ApiError.notFound('Party not found');
    }

    if (existing._count.salesInvoices > 0 || existing._count.purchaseInvoices > 0) {
      // Soft-delete if historical records exist
      return await prisma.party.update({
        where: { id },
        data: { isActive: false },
      });
    }

    return await prisma.party.delete({ where: { id } });
  }
}
