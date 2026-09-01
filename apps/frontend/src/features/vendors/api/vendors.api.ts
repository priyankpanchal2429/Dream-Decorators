import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface VendorParty {
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
    city: string;
    state: string;
    pincode: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export function useVendors(params?: { search?: string; page?: number; limit?: number }) {
  return useQuery({
    queryKey: ['vendors', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      queryParams.append('type', 'VENDOR');
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/parties?${queryParams.toString()}`);
      return {
        parties: (res.data || []) as VendorParty[],
        pagination: res.pagination,
      };
    },
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/parties', { ...data, type: 'VENDOR' });
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
