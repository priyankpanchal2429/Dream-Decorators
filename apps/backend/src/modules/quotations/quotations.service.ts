import {
  prisma,
  DocumentStatus,
  PaymentStatus,
  Prisma,
  PartyType,
  ProductCategory,
} from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';
import { resolveFinancialYear } from '../../utils/fyResolver.js';

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
    if (filter.financialYearId) {
      const fy = await resolveFinancialYear(filter.financialYearId);
      if (fy) where.financialYearId = fy.id;
    }

    if (filter.search) {
      where.OR = [
        { quotationNumber: { contains: filter.search, mode: 'insensitive' } },
        { party: { name: { contains: filter.search, mode: 'insensitive' } } },
        { party: { companyName: { contains: filter.search, mode: 'insensitive' } } },
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
            select: { id: true, name: true, username: true, email: true },
          },
          items: {
            include: { product: true },
          },
          salesInvoices: {
            select: { id: true, invoiceNumber: true, status: true, grandTotal: true },
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
        createdBy: { select: { id: true, name: true, username: true, email: true } },
        items: { include: { product: true } },
        salesInvoices: true,
      },
    });

    if (!quotation) {
      throw ApiError.notFound('Quotation not found');
    }

    return quotation;
  }

  static async getQuotationStats(financialYearId?: string) {
    const fy = await resolveFinancialYear(financialYearId);
    const where: Prisma.QuotationWhereInput = fy ? { financialYearId: fy.id } : {};

    const [total, draft, approved, rejected] = await Promise.all([
      prisma.quotation.findMany({ where, select: { status: true, grandTotal: true } }),
      prisma.quotation.count({ where: { ...where, status: DocumentStatus.DRAFT } }),
      prisma.quotation.count({ where: { ...where, status: DocumentStatus.APPROVED } }),
      prisma.quotation.count({ where: { ...where, status: DocumentStatus.REJECTED } }),
    ]);

    let totalPipelineValue = 0;
    let approvedValue = 0;

    total.forEach((q) => {
      const val = Number(q.grandTotal) || 0;
      totalPipelineValue += val;
      if (q.status === DocumentStatus.APPROVED) {
        approvedValue += val;
      }
    });

    const totalCount = total.length;
    const conversionRate = totalCount > 0 ? ((approved / totalCount) * 100).toFixed(1) : '0.0';

    return {
      totalCount,
      draftCount: draft,
      approvedCount: approved,
      rejectedCount: rejected,
      totalPipelineValue,
      approvedValue,
      conversionRate: `${conversionRate}%`,
    };
  }

  static async getNextNumber(financialYearId?: string) {
    const fy = await resolveFinancialYear(financialYearId);

    const count = await prisma.quotation.count({
      where: fy ? { financialYearId: fy.id } : undefined,
    });

    const nextSeq = String(count + 1).padStart(4, '0');
    const shortCode = fy?.code ? fy.code.replace('FY20', '').replace('-20', '-') : '26-27';

    return {
      quotationNumber: `QT-${fy?.code ? fy.code.replace('FY', '') : '2026-27'}-${nextSeq}`,
      displayCode: `DD-${nextSeq}/${shortCode}`,
      sequence: count + 1,
    };
  }

  static async createQuotation(data: any, createdById: string) {
    // 1. Resolve Financial Year
    const fy = await resolveFinancialYear(data.financialYearId);
    if (!fy) {
      throw ApiError.badRequest('Could not resolve an active financial year');
    }
    const fyId = fy.id;

    // 2. Resolve or Create Party (Customer)
    let partyId = data.partyId;
    if (!partyId) {
      const customerName = (data.customerName || data.contactPerson || data.companyName || 'Walk-in Customer').trim();

      let party = await prisma.party.findFirst({
        where: {
          type: PartyType.CUSTOMER,
          name: { equals: customerName, mode: 'insensitive' },
        },
      });

      if (!party) {
        const custCount = await prisma.party.count({ where: { type: PartyType.CUSTOMER } });
        const custCode = `CUST-${String(custCount + 1).padStart(3, '0')}`;

        party = await prisma.party.create({
          data: {
            code: custCode,
            name: customerName,
            companyName: data.companyName || undefined,
            type: PartyType.CUSTOMER,
            email: data.customerEmail || undefined,
            phone: data.customerPhone || '0000000000',
            gstin: data.customerGstin || undefined,
            addresses: data.customerAddress
              ? {
                  create: [
                    {
                      addressType: 'BILLING',
                      addressLine1: data.customerAddress,
                      city: 'Ahmedabad',
                      state: data.placeOfSupply?.split('-')[1] || 'Gujarat',
                      pincode: '380054',
                      isDefault: true,
                    },
                  ],
                }
              : undefined,
          },
        });
      }
      partyId = party.id;
    }

    // 3. Fallback or generic product helper
    let defaultProduct = await prisma.product.findFirst();
    if (!defaultProduct) {
      defaultProduct = await prisma.product.create({
        data: {
          sku: 'PROD-GEN-001',
          name: 'Custom Decor & Curtain Services',
          category: ProductCategory.WINDOW_CURTAINS,
          hsnCode: '6303',
          unitOfMeasure: 'METERS',
          purchasePrice: 0,
          sellingPrice: 100,
          taxRatePercent: 12,
        },
      });
    }

    // 4. Calculate line totals and taxes
    let subTotal = 0;
    let totalTax = 0;
    let totalLineDiscount = 0;

    const calculatedItems = data.items.map((item: any) => {
      const qty = Number(item.quantity) || 1;
      const rate = Number(item.unitRate ?? item.unitPrice ?? 0);
      const lineSubtotal = qty * rate;
      const lineDisc = Number(item.discount ?? ((lineSubtotal * (item.discountPercent || 0)) / 100));
      const taxable = Math.max(0, lineSubtotal - lineDisc);
      const taxRate = Number(item.taxPercent ?? item.taxRate ?? 0);
      const taxAmt = (taxable * taxRate) / 100;
      const lineTotal = taxable + taxAmt;

      subTotal += lineSubtotal;
      totalTax += taxAmt;
      totalLineDiscount += lineDisc;

      return {
        productId: item.productId || defaultProduct!.id,
        description: item.description || 'Decor item',
        quantity: qty,
        unitPrice: rate,
        taxRate,
        taxAmount: taxAmt,
        totalPrice: lineTotal,
      };
    });

    const extraDiscount = Number(data.discountAmount || 0);
    const totalDiscount = totalLineDiscount + extraDiscount;
    const grandTotal = Math.max(0, subTotal - totalDiscount + totalTax);

    // 5. Generate or verify quotation number
    let qNum = data.quotationNumber;
    const existing = await prisma.quotation.findUnique({ where: { quotationNumber: qNum } });
    if (existing) {
      const nextNum = await this.getNextNumber(fyId);
      qNum = nextNum.quotationNumber;
    }

    const rawDate = data.issueDate || data.date || new Date();
    const issueDate = new Date(rawDate);
    const validUntilDate = data.validUntil
      ? new Date(data.validUntil)
      : new Date(issueDate.getTime() + 15 * 24 * 60 * 60 * 1000);

    const quotation = await prisma.quotation.create({
      data: {
        quotationNumber: qNum,
        date: issueDate,
        validUntil: validUntilDate,
        partyId,
        financialYearId: fyId,
        createdById,
        status: data.status || DocumentStatus.DRAFT,
        subTotal,
        taxAmount: totalTax,
        discountAmount: totalDiscount,
        grandTotal,
        notes: data.notes || data.terms,
        items: {
          create: calculatedItems,
        },
      },
      include: {
        party: true,
        financialYear: true,
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

  static async convertToInvoice(quotationId: string, customInvoiceNumber?: string, createdById?: string) {
    const quotation = await prisma.quotation.findUnique({
      where: { id: quotationId },
      include: { items: true, financialYear: true },
    });

    if (!quotation) {
      throw ApiError.notFound('Quotation not found');
    }

    // Auto-compute invoice number if not passed
    let invNumber = customInvoiceNumber;
    if (!invNumber) {
      const invCount = await prisma.salesInvoice.count({
        where: { financialYearId: quotation.financialYearId },
      });
      const seq = String(invCount + 1).padStart(4, '0');
      const fyCode = quotation.financialYear?.code ? quotation.financialYear.code.replace('FY', '') : '2026-27';
      invNumber = `INV-${fyCode}-${seq}`;
    }

    const existingInv = await prisma.salesInvoice.findUnique({
      where: { invoiceNumber: invNumber },
    });

    if (existingInv) {
      throw ApiError.conflict(`Invoice number '${invNumber}' already exists`);
    }

    const creator = createdById || quotation.createdById;

    return await prisma.$transaction(async (tx) => {
      // 1. Create Sales Invoice
      const invoice = await tx.salesInvoice.create({
        data: {
          invoiceNumber: invNumber!,
          date: new Date(),
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          partyId: quotation.partyId,
          financialYearId: quotation.financialYearId,
          createdById: creator,
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

      // 2. Update Quotation Status to APPROVED
      await tx.quotation.update({
        where: { id: quotation.id },
        data: { status: DocumentStatus.APPROVED },
      });

      return invoice;
    });
  }

  static async deleteQuotation(id: string) {
    const existing = await prisma.quotation.findUnique({
      where: { id },
      include: { salesInvoices: true },
    });

    if (!existing) {
      throw ApiError.notFound('Quotation not found');
    }

    if (existing.salesInvoices && existing.salesInvoices.length > 0) {
      throw ApiError.badRequest('Cannot delete a quotation that has already been converted to an invoice');
    }

    await prisma.quotation.delete({ where: { id } });

    return {
      success: true,
      message: `Quotation ${existing.quotationNumber} deleted successfully`,
    };
  }
}
