import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface InventoryProduct {
  id: string;
  sku: string;
  name: string;
  category: string;
  description?: string | null;
  hsnCode?: string | null;
  unitOfMeasure: string;
  purchasePrice: number | string;
  sellingPrice: number | string;
  taxRatePercent: number | string;
  minStockLevel: number;
  isActive: boolean;
  inventoryStocks?: Array<{
    id: string;
    quantity: number | string;
    warehouseId: string;
    warehouse?: {
      name: string;
      code: string;
    };
  }>;
  createdAt: string;
}

export function useInventory(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ['inventory', params],
    queryFn: async () => {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.category && params.category !== 'ALL') queryParams.append('category', params.category);
      if (params?.page) queryParams.append('page', String(params.page));
      if (params?.limit) queryParams.append('limit', String(params.limit));

      const res: any = await apiClient.get(`/inventory?${queryParams.toString()}`);
      return {
        products: (res.data || []) as InventoryProduct[],
        pagination: res.pagination,
      };
    },
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res: any = await apiClient.post('/inventory', data);
      return res.data || res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}
