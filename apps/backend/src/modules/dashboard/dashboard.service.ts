import { prisma, DocumentStatus, PartyType } from '@dream-decorators/database';

export class DashboardService {
  static async getSummaryStats(financialYearId?: string) {
    const whereFY = financialYearId ? { financialYearId } : {};

    const [
      salesAgg,
      purchasesAgg,
      customerCount,
      vendorCount,
      quotationCount,
      recentInvoices,
      recentPayments,
      products,
    ] = await Promise.all([
      // Sales Totals
      prisma.salesInvoice.aggregate({
        where: { ...whereFY, status: DocumentStatus.APPROVED },
        _sum: {
          grandTotal: true,
          paidAmount: true,
        },
        _count: { _all: true },
      }),
      // Purchases Totals
      prisma.purchaseInvoice.aggregate({
        where: { ...whereFY, status: DocumentStatus.APPROVED },
        _sum: {
          grandTotal: true,
          paidAmount: true,
        },
        _count: { _all: true },
      }),
      // Parties Counts
      prisma.party.count({
        where: { type: { in: [PartyType.CUSTOMER, PartyType.BOTH] }, isActive: true },
      }),
      prisma.party.count({
        where: { type: { in: [PartyType.VENDOR, PartyType.BOTH] }, isActive: true },
      }),
      // Quotations Count
      prisma.quotation.count({ where: whereFY }),
      // Recent Invoices
      prisma.salesInvoice.findMany({
        where: whereFY,
        include: { party: { select: { name: true, code: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      // Recent Payments
      prisma.payment.findMany({
        where: whereFY,
        include: { party: { select: { name: true, code: true } } },
        orderBy: { createdAt: 'desc' },
        take: 5,
      }),
      // Inventory Items for Low Stock
      prisma.product.findMany({
        where: { isActive: true },
        include: { inventoryStocks: true },
      }),
    ]);

    // Calculate low stock items count
    let lowStockCount = 0;
    products.forEach((p) => {
      const totalStock = p.inventoryStocks.reduce(
        (sum, s) => sum + Number(s.quantity),
        0
      );
      if (totalStock <= p.minStockLevel) {
        lowStockCount++;
      }
    });

    const totalRevenue = Number(salesAgg._sum?.grandTotal || 0);
    const totalCollected = Number(salesAgg._sum?.paidAmount || 0);
    const totalReceivables = Math.max(0, totalRevenue - totalCollected);

    const totalPurchases = Number(purchasesAgg._sum?.grandTotal || 0);
    const totalPaidToVendors = Number(purchasesAgg._sum?.paidAmount || 0);
    const totalPayables = Math.max(0, totalPurchases - totalPaidToVendors);

    return {
      kpis: {
        totalRevenue,
        totalCollected,
        totalReceivables,
        totalPayables,
        totalInvoices: salesAgg._count?._all || 0,
        totalQuotations: quotationCount,
        activeCustomers: customerCount,
        activeVendors: vendorCount,
        lowStockCount,
      },
      recentInvoices,
      recentPayments,
    };
  }

  static async getMonthlyRevenueTrend(financialYearId?: string) {
    const whereFY = financialYearId ? { financialYearId } : {};
    const invoices = await prisma.salesInvoice.findMany({
      where: { ...whereFY, status: DocumentStatus.APPROVED },
      select: { date: true, grandTotal: true, paidAmount: true },
      orderBy: { date: 'asc' },
    });

    const monthMap: Record<string, { month: string; sales: number; collected: number }> = {};
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    months.forEach((m) => {
      monthMap[m] = { month: m, sales: 0, collected: 0 };
    });

    invoices.forEach((inv) => {
      const d = new Date(inv.date);
      const monthShort = d.toLocaleString('en-US', { month: 'short' });
      if (monthMap[monthShort]) {
        monthMap[monthShort].sales += Number(inv.grandTotal);
        monthMap[monthShort].collected += Number(inv.paidAmount);
      }
    });

    return Object.values(monthMap);
  }
}
