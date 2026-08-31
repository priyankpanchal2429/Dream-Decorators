import { prisma, PaymentStatus, Prisma } from '@dream-decorators/database';
import { ApiError } from '../../utils/ApiError.js';

export class PaymentsService {
  static async listPayments(filter: {
    partyId?: string;
    financialYearId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const page = filter.page || 1;
    const limit = filter.limit || 50;
    const skip = (page - 1) * limit;

    const where: Prisma.PaymentWhereInput = {};

    if (filter.partyId) where.partyId = filter.partyId;
    if (filter.financialYearId) where.financialYearId = filter.financialYearId;

    if (filter.search) {
      where.OR = [
        { paymentNumber: { contains: filter.search, mode: 'insensitive' } },
        { referenceNo: { contains: filter.search, mode: 'insensitive' } },
        { party: { name: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    const [total, payments] = await Promise.all([
      prisma.payment.count({ where }),
      prisma.payment.findMany({
        where,
        include: {
          party: true,
          financialYear: true,
          createdBy: { select: { id: true, firstName: true, lastName: true } },
          allocations: {
            include: {
              salesInvoice: true,
              purchaseInvoice: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
    ]);

    return {
      payments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getPaymentById(id: string) {
    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        party: { include: { addresses: true } },
        financialYear: true,
        createdBy: { select: { id: true, firstName: true, lastName: true } },
        allocations: {
          include: {
            salesInvoice: true,
            purchaseInvoice: true,
          },
        },
      },
    });

    if (!payment) {
      throw ApiError.notFound('Payment voucher not found');
    }

    return payment;
  }

  static async createPayment(data: any, createdById: string) {
    const paymentNumber = data.voucherNumber || data.paymentNumber;
    const existing = await prisma.payment.findUnique({
      where: { paymentNumber },
    });

    if (existing) {
      throw ApiError.conflict(`Payment voucher number '${paymentNumber}' already exists`);
    }

    return await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          paymentNumber,
          paymentDate: new Date(data.date || data.paymentDate),
          partyId: data.partyId,
          financialYearId: data.financialYearId,
          createdById,
          amount: data.amount,
          paymentMode: data.paymentMode,
          referenceNo: data.referenceNo,
          remarks: data.notes || data.remarks,
        },
      });

      // Process allocations if provided
      if (data.allocations && data.allocations.length > 0) {
        for (const alloc of data.allocations) {
          await tx.paymentAllocation.create({
            data: {
              paymentId: payment.id,
              salesInvoiceId: alloc.salesInvoiceId,
              purchaseInvoiceId: alloc.purchaseInvoiceId,
              allocatedAmount: alloc.allocatedAmount,
            },
          });

          // If allocating to Sales Invoice, update invoice balance and payment status
          if (alloc.salesInvoiceId) {
            const invoice = await tx.salesInvoice.findUnique({
              where: { id: alloc.salesInvoiceId },
            });
            if (invoice) {
              const newPaid = Number(invoice.paidAmount) + Number(alloc.allocatedAmount);
              const newBalance = Math.max(0, Number(invoice.grandTotal) - newPaid);
              const status =
                newBalance === 0
                  ? PaymentStatus.PAID
                  : newPaid > 0
                  ? PaymentStatus.PARTIALLY_PAID
                  : PaymentStatus.UNPAID;

              await tx.salesInvoice.update({
                where: { id: invoice.id },
                data: {
                  paidAmount: newPaid,
                  paymentStatus: status,
                },
              });
            }
          }

          // If allocating to Purchase Invoice, update purchase balance
          if (alloc.purchaseInvoiceId) {
            const purchase = await tx.purchaseInvoice.findUnique({
              where: { id: alloc.purchaseInvoiceId },
            });
            if (purchase) {
              const newPaid = Number(purchase.paidAmount) + Number(alloc.allocatedAmount);
              const newBalance = Math.max(0, Number(purchase.grandTotal) - newPaid);
              const status =
                newBalance === 0
                  ? PaymentStatus.PAID
                  : newPaid > 0
                  ? PaymentStatus.PARTIALLY_PAID
                  : PaymentStatus.UNPAID;

              await tx.purchaseInvoice.update({
                where: { id: purchase.id },
                data: {
                  paidAmount: newPaid,
                  paymentStatus: status,
                },
              });
            }
          }
        }
      }

      return payment;
    });
  }
}
