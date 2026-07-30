import { apiClient } from '@/lib/api-client';
import { FeatureEntity } from './types';

export const featureApi = {
  getAll: async (): Promise<FeatureEntity[]> => {
    return apiClient.get('/template-feature');
  },
  getById: async (id: string): Promise<FeatureEntity> => {
    return apiClient.get(`/template-feature/${id}`);
  },
  create: async (payload: Partial<FeatureEntity>): Promise<FeatureEntity> => {
    return apiClient.post('/template-feature', payload);
  },
};
