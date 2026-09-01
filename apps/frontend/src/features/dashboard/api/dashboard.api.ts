import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface DashboardStatsResponse {
  financialYear?: {
    id: string;
    code: string;
    isCurrent: boolean;
  } | null;
  kpis: {
    totalRevenue: number;
    todayRevenue?: number;
    totalCollected: number;
    totalReceivables: number;
    salesDueToday?: number;
    totalPurchases?: number;
    todayPurchases?: number;
    totalPayables: number;
    purchasesDueToday?: number;
    totalInvoices: number;
    totalQuotations: number;
    activeCustomers: number;
    activeVendors: number;
    lowStockCount: number;
  };
  recentInvoices: any[];
  recentPayments: any[];
}

export interface RevenueTrendItem {
  month: string;
  sales: number;
  collected: number;
}

export function useDashboardStats(financialYearId?: string) {
  return useQuery({
    queryKey: ['dashboard-stats', financialYearId],
    queryFn: async () => {
      const url = financialYearId ? `/dashboard/stats?financialYearId=${financialYearId}` : '/dashboard/stats';
      const res: any = await apiClient.get(url);
      return (res.data || res) as DashboardStatsResponse;
    },
  });
}

export function useRevenueTrend(financialYearId?: string) {
  return useQuery({
    queryKey: ['dashboard-revenue-trend', financialYearId],
    queryFn: async () => {
      const url = financialYearId ? `/dashboard/revenue-trend?financialYearId=${financialYearId}` : '/dashboard/revenue-trend';
      const res: any = await apiClient.get(url);
      return (res.data || res) as RevenueTrendItem[];
    },
  });
}
