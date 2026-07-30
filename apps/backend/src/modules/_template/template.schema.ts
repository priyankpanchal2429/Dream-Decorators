import z from 'zod';

export const createFeatureSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    category: z.enum(['WINDOW_CURTAINS', 'WINDOW_BLINDS', 'WALLPAPERS', 'MATTRESSES', 'CARPETS', 'SOFAS']),
  }),
});

export type CreateFeatureInput = z.infer<typeof createFeatureSchema>['body'];
