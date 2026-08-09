export type DiscountType = 'PERCENTAGE' | 'FIXED';

export interface CurtainDimension {
  feet: number;
  inches: number;
}

export interface CurtainItem {
  id: string;
  itemName: string;
  width: CurtainDimension;
  height: CurtainDimension;
  // Computed Dimension & Fabric
  totalWidthInches: number;
  totalHeightInches: number;
  fabricWidthsRequired: number; // CEILING(Width / 20)
  calculatedMtr: number; // (Widths * Height) * 0.0254
  totalMtr: number; // CEILING(CalculatedMTR)
  // Pricing
  perMtrPrice: number;
  subtotal: number; // TotalMTR * PerMTRPrice
  discountType: DiscountType;
  discountValue: number;
  discountAmount: number;
  totalPrice: number; // Subtotal - DiscountAmount
  // Validation Error Message (if any)
  validationError?: string;
}

export interface CurtainQuotationSummary {
  totalItems: number;
  totalMtrSum: number;
  subtotalSum: number;
  discountSum: number;
  grandTotal: number;
}
