import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface PurchaseRecord {
  id: string;
  invoiceNumber: string;
  vendorBillNo?: string | null;
  date: string;
  dueDate: string;
  partyId: string;
  financialYearId: string;
  status: 'DRAFT' | 'APPROVED' | 'CANCELLED';
  paymentStatus: 'PAID' | 'PARTIAL' | 'UNPAID' | 'OVERDUE';
  subTotal: number | string;
  taxAmount: number | string;
  discountAmount: number | string;
  grandTotal: number | string;
  paidAmount: number | string;
  party?: {
    id: string;
    code: string;
    name: string;
    phone: string;
    email?: string;
  };
  financialYear?: {
    code: string;
  };
  items?: any[];
  createdAt: string;
}

export function usePurchases(params?: {
  status?: string;
  search?: string;
  financialYearId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['purchases', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.status && params.status !== 'ALL') queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.financialYearId) queryParams.append('financialYearId', params.financialYearId);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/purchases?${queryParams.toString()}`);
      return {
        purchases: (res.data || []) as PurchaseRecord[],
        pagination: res.pagination,
      };
    },
  });
}

export function useCreatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/purchases', data);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
