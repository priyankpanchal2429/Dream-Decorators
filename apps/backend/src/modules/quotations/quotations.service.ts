import { prisma, DocumentStatus, PaymentStatus, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class QuotationsService {
  static async listQuotations(filter: {
    status?: DocumentStatus;
    partyId?: string;
    financialYearId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filter.page || 1;
    const limit = filter.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.QuotationWhereInput = {};

    if (filter.status) where.status = filter.status;
    if (filter.partyId) where.partyId = filter.partyId;
    if (filter.financialYearId) where.financialYearId = filter.financialYearId;

    if (filter.search) {
      where.OR = [
        { quotationNumber: { contains: filter.search, mode: 'insensitive' } },
        { party: { name: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    const [total, quotations] = await Promise.all([
      prisma.quotation.count({ where }),
      prisma.quotation.findMany({
        where,
        include: {
          party: true,
          financialYear: true,
          createdBy: {
            select: { id: true, firstName: true, lastName: true, email: true },
          },
          items: {
            include: { product: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      quotations,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getQuotationById(id: string) {
    const quotation = await prisma.quotation.findUnique({
      where: { id },
      include: {
        party: { include: { addresses: true } },
        financialYear: true,
        createdBy: { select: { id: true, firstName: true, lastName: true, email: true } },
        items: { include: { product: true } },
        salesInvoices: true,
      },
    });

    if (!quotation) {
      throw ApiError.notFound('Quotation not found');
    }

    return quotation;
  }

  static async createQuotation(data: any, createdById: string) {
    const existing = await prisma.quotation.findUnique({
      where: { quotationNumber: data.quotationNumber },
    });

    if (existing) {
      throw ApiError.conflict(`Quotation number '${data.quotationNumber}' already exists`);
    }

    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    const calculatedItems = data.items.map((item: any) => {
      const lineSubtotal = item.quantity * item.unitRate;
      const discountAmount = (lineSubtotal * (item.discountPercent || 0)) / 100;
      const taxable = lineSubtotal - discountAmount;
      const taxAmount = (taxable * (item.taxPercent || 0)) / 100;
      const lineTotal = taxable + taxAmount;

      subTotal += lineSubtotal;
      totalTax += taxAmount;
      totalDiscount += discountAmount;

      return {
        productId: item.productId,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitRate,
        taxRate: item.taxPercent || 0,
        taxAmount,
        totalPrice: lineTotal,
      };
    });

    const grandTotal = subTotal - totalDiscount + totalTax;

    const quotation = await prisma.quotation.create({
      data: {
        quotationNumber: data.quotationNumber,
        date: new Date(data.date),
        validUntil: data.validUntil ? new Date(data.validUntil) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        partyId: data.partyId,
        financialYearId: data.financialYearId,
        createdById,
        status: DocumentStatus.DRAFT,
        subTotal,
        taxAmount: totalTax,
        discountAmount: totalDiscount,
        grandTotal,
        notes: data.notes,
        items: {
          create: calculatedItems,
        },
      },
      include: {
        party: true,
        items: { include: { product: true } },
      },
    });

    return quotation;
  }

  static async updateStatus(id: string, status: DocumentStatus) {
    const existing = await prisma.quotation.findUnique({ where: { id } });
    if (!existing) {
      throw ApiError.notFound('Quotation not found');
    }

    return await prisma.quotation.update({
      where: { id },
      data: { status },
      include: { party: true, items: true },
    });
  }

  static async convertToInvoice(quotationId: string, invoiceNumber: string, createdById: string) {
    const quotation = await prisma.quotation.findUnique({
      where: { id: quotationId },
      include: { items: true },
    });

    if (!quotation) {
      throw ApiError.notFound('Quotation not found');
    }

    const existingInv = await prisma.salesInvoice.findUnique({
      where: { invoiceNumber },
    });

    if (existingInv) {
      throw ApiError.conflict(`Invoice number '${invoiceNumber}' already exists`);
    }

    return await prisma.$transaction(async (tx) => {
      // Create Sales Invoice
      const invoice = await tx.salesInvoice.create({
        data: {
          invoiceNumber,
          date: new Date(),
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          partyId: quotation.partyId,
          financialYearId: quotation.financialYearId,
          createdById,
          quotationId: quotation.id,
          status: DocumentStatus.APPROVED,
          paymentStatus: PaymentStatus.UNPAID,
          subTotal: quotation.subTotal,
          taxAmount: quotation.taxAmount,
          discountAmount: quotation.discountAmount,
          grandTotal: quotation.grandTotal,
          paidAmount: 0,
          items: {
            create: quotation.items.map((item) => ({
              productId: item.productId,
              description: item.description,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              taxRate: item.taxRate,
              taxAmount: item.taxAmount,
              totalPrice: item.totalPrice,
            })),
          },
        },
        include: { items: true, party: true },
      });

      // Update Quotation Status to APPROVED
      await tx.quotation.update({
        where: { id: quotation.id },
        data: { status: DocumentStatus.APPROVED },
      });

      return invoice;
    });
  }
}
