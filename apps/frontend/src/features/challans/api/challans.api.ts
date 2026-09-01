import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface DeliveryChallanRecord {
  id: string;
  challanNumber: string;
  date: string;
  partyId: string;
  warehouseId: string;
  financialYearId: string;
  vehicleNumber?: string | null;
  transporterName?: string | null;
  eWayBillNumber?: string | null;
  status: 'DRAFT' | 'APPROVED' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
  party?: {
    name: string;
    phone: string;
  };
  warehouse?: {
    name: string;
    code: string;
  };
  items?: any[];
  createdAt: string;
}

export function useDeliveryChallans(params?: {
  status?: string;
  search?: string;
  financialYearId?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['challans', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.status && params.status !== 'ALL') queryParams.append('status', params.status);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.financialYearId) queryParams.append('financialYearId', params.financialYearId);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/challans?${queryParams.toString()}`);
      return {
        challans: (res.data || []) as DeliveryChallanRecord[],
        pagination: res.pagination,
      };
    },
  });
}
