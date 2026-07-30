export interface FeatureEntity {
  id: string;
  name: string;
  category: 'WINDOW_CURTAINS' | 'WINDOW_BLINDS' | 'WALLPAPERS' | 'MATTRESSES' | 'CARPETS' | 'SOFAS';
  createdAt: string;
  updatedAt: string;
}
