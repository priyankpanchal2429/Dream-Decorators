import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
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
  balanceAmount?: number | string;
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

export function useInvoices(params?: {
  status?: string;
  paymentStatus?: string;
  search?: string;
  financialYearId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['invoices', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.status && params.status !== 'ALL') queryParams.append('status', params.status);
      if (params?.paymentStatus && params.paymentStatus !== 'ALL') queryParams.append('paymentStatus', params.paymentStatus);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.financialYearId) queryParams.append('financialYearId', params.financialYearId);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/invoices?${queryParams.toString()}`);
      return {
        invoices: (res.data || []) as InvoiceRecord[],
        pagination: res.pagination,
      };
    },
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/invoices', data);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
