import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface PaymentRecord {
  id: string;
  paymentNumber: string;
  paymentDate: string;
  paymentMode: string;
  amount: number | string;
  referenceNo?: string | null;
  remarks?: string | null;
  partyId: string;
  financialYearId: string;
  party?: {
    name: string;
    type: 'CUSTOMER' | 'VENDOR' | 'BOTH';
    phone: string;
  };
  financialYear?: {
    code: string;
  };
  allocations?: any[];
  createdAt: string;
}

export function usePayments(params?: {
  search?: string;
  financialYearId?: string;
  partyId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['payments', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.financialYearId) queryParams.append('financialYearId', params.financialYearId);
      if (params?.partyId) queryParams.append('partyId', params.partyId);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/payments?${queryParams.toString()}`);
      return {
        payments: (res.data || []) as PaymentRecord[],
        pagination: res.pagination,
      };
    },
  });
}

export function useCreatePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/payments', data);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['purchases'] });
    },
  });
}
