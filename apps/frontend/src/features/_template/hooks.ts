import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { featureApi } from './api';

export function useFeatureList() {
  return useQuery({
    queryKey: ['template-feature'],
    queryFn: featureApi.getAll,
  });
}

export function useCreateFeature() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: featureApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['template-feature'] });
    },
  });
}
