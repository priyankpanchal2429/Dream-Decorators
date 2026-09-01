import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface CustomerParty {
  id: string;
  code: string;
  name: string;
  companyName?: string | null;
  email?: string | null;
  phone: string;
  gstin?: string | null;
  pan?: string | null;
  creditLimit: number | string;
  openingBalance: number | string;
  isActive: boolean;
  addresses?: Array<{
    id: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

export function useCustomers(params?: { search?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['customers', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.append('type', 'CUSTOMER');
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/parties?${queryParams.toString()}`);
      return {
        parties: (res.data || []) as CustomerParty[],
        pagination: res.pagination,
      };
    },
  });
}

export function useCreateCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/parties', { ...data, type: 'CUSTOMER' });
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res: any = await apiClient.delete(`/parties/${id}`);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
