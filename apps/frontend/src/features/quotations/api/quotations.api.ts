import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface QuotationLineItem {
  id?: string;
  productId?: string;
  description?: string;
  quantity: number;
  unitPrice?: number;
  unitRate?: number;
  taxRate?: number;
  taxPercent?: number;
  discountPercent?: number;
  discount?: number;
  taxAmount?: number;
  totalPrice?: number;
  total?: number;
  uom?: string;
  hsnCode?: string;
  itemNotes?: string;
  product?: any;
}

export interface QuotationRecord {
  id: string;
  quotationNumber: string;
  date: string;
  validUntil: string;
  partyId: string;
  financialYearId: string;
  createdById: string;
  status: 'DRAFT' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  subTotal: number | string;
  taxAmount: number | string;
  discountAmount: number | string;
  grandTotal: number | string;
  notes?: string;
  party?: {
    id: string;
    code: string;
    name: string;
    companyName?: string | null;
    email?: string | null;
    phone: string;
    gstin?: string | null;
    addresses?: any[];
  };
  financialYear?: {
    id: string;
    name: string;
    code: string;
  };
  createdBy?: {
    id: string;
    name: string;
    username: string;
    email?: string;
  };
  items?: QuotationLineItem[];
  salesInvoices?: Array<{
    id: string;
    invoiceNumber: string;
    status: string;
    grandTotal: number | string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface QuotationStatsData {
  totalCount: number;
  draftCount: number;
  approvedCount: number;
  rejectedCount: number;
  totalPipelineValue: number;
  approvedValue: number;
  pendingValue?: number;
  todayValue?: number;
  todayApprovedValue?: number;
  todayPendingValue?: number;
  conversionRate: string;
}

// 1. Fetch List of Quotations
export function useQuotations(params?: {
  status?: string;
  search?: string;
  partyId?: string;
  financialYearId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['quotations', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.status && params.status !== 'ALL') queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.partyId) queryParams.append('partyId', params.partyId);
      if (params?.financialYearId) queryParams.append('financialYearId', params.financialYearId);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/quotations?${queryParams.toString()}`);
      return {
        quotations: (res.data || []) as QuotationRecord[],
        pagination: res.pagination,
      };
    },
  });
}

// 2. Fetch Single Quotation Detail
export function useQuotation(id: string | null) {
  return useQuery({
    queryKey: ['quotation', id],
    queryFn: async () => {
      if (!id) return null;
      const res: any = await apiClient.get(`/quotations/${id}`);
      return (res.data || res) as QuotationRecord;
    },
    enabled: Boolean(id),
  });
}

// 3. Fetch Quotation Statistics
export function useQuotationStats(financialYearId?: string) {
  return useQuery({
    queryKey: ['quotation-stats', financialYearId],
    queryFn: async () => {
      const url = financialYearId ? `/quotations/stats?financialYearId=${financialYearId}` : '/quotations/stats';
      const res: any = await apiClient.get(url);
      return (res.data || res) as QuotationStatsData;
    },
  });
}

// 4. Fetch Next Sequential Quotation Number
export function useNextQuotationNumber(financialYearId?: string) {
  return useQuery({
    queryKey: ['next-quotation-number', financialYearId],
    queryFn: async () => {
      const url = financialYearId ? `/quotations/next-number?financialYearId=${financialYearId}` : '/quotations/next-number';
      const res: any = await apiClient.get(url);
      return (res.data || res) as { quotationNumber: string; displayCode: string; sequence: number };
    },
  });
}

// 5. Create Quotation Mutation
export function useCreateQuotation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/quotations', data);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['quotation-stats'] });
      queryClient.invalidateQueries({ queryKey: ['next-quotation-number'] });
    },
  });
}

// 6. Update Quotation Status Mutation
export function useUpdateQuotationStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const res: any = await apiClient.patch(`/quotations/${id}/status`, { status });
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['quotation-stats'] });
    },
  });
}

// 7. Convert Quotation to Invoice Mutation
export function useConvertToInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, invoiceNumber }: { id: string; invoiceNumber?: string }) => {
      const res: any = await apiClient.post(`/quotations/${id}/convert-to-invoice`, { invoiceNumber });
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      queryClient.invalidateQueries({ queryKey: ['quotation-stats'] });
    },
  });
}

// 8. Delete Quotation Mutation
export function useDeleteQuotation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res: any = await apiClient.delete(`/quotations/${id}`);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotations'] });
      queryClient.invalidateQueries({ queryKey: ['quotation-stats'] });
    },
  });
}
