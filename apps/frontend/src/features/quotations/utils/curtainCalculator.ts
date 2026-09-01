import { CurtainItem, DiscountType } from '../types/curtain';

/**
 * Converts Feet and Inches into Total Inches.
 */
export function feetInchesToInches(feet: number = 0, inches: number = 0): number {
  const safeFeet = Math.max(0, Number(feet) || 0);
  const safeInches = Math.max(0, Number(inches) || 0);
  return safeFeet * 12 + safeInches;
}

/**
 * Calculates required Curtain Fabric Meterage based on window dimensions.
 * Rule: Finished pleated width = 20 inches per fabric strip.
 * FabricWidths = CEILING(WindowWidthInches / 20)
 * CalculatedMTR = (FabricWidths * WindowHeightInches) * 0.0254
 * TotalMTR = CEILING(CalculatedMTR)
 */
export function calculateCurtainFabric(
  widthFeet: number,
  widthInches: number,
  heightFeet: number,
  heightInches: number
) {
  const totalWidthInches = feetInchesToInches(widthFeet, widthInches);
  const totalHeightInches = feetInchesToInches(heightFeet, heightInches);

  if (totalWidthInches <= 0 || totalHeightInches <= 0) {
    return {
      totalWidthInches,
      totalHeightInches,
      fabricWidthsRequired: 0,
      calculatedMtr: 0,
      totalMtr: 0,
    };
  }

  // Fabric Widths required = CEILING(WindowWidth / 20)
  const fabricWidthsRequired = Math.ceil(totalWidthInches / 20);

  // Exact calculated meters = (FabricWidths * WindowHeight) * 0.0254
  const calculatedMtr = (fabricWidthsRequired * totalHeightInches) * 0.0254;

  // Round up to next whole meter using CEILING
  const totalMtr = Math.ceil(calculatedMtr);

  return {
    totalWidthInches,
    totalHeightInches,
    fabricWidthsRequired,
    calculatedMtr,
    totalMtr,
  };
}

/**
 * Calculates Curtain Item Pricing and Discount.
 */
export function calculateCurtainPrice(
  totalMtr: number,
  perMtrPrice: number,
  discountValue: number,
  discountType: DiscountType
) {
  const safeMtr = Math.max(0, Number(totalMtr) || 0);
  const safePrice = Math.max(0, Number(perMtrPrice) || 0);
  const safeDiscVal = Math.max(0, Number(discountValue) || 0);

  const subtotal = safeMtr * safePrice;

  let discountAmount = 0;
  if (discountType === 'PERCENTAGE') {
    discountAmount = (subtotal * safeDiscVal) / 100;
  } else {
    discountAmount = safeDiscVal;
  }

  // Ensure discount doesn't exceed subtotal
  discountAmount = Math.min(subtotal, Math.max(0, discountAmount));
  const totalPrice = Math.max(0, subtotal - discountAmount);

  return {
    subtotal,
    discountAmount,
    totalPrice,
  };
}

/**
 * Validates a Curtain Item against input constraints.
 */
export function validateCurtainItem(
  widthFeet: number,
  widthInches: number,
  heightFeet: number,
  heightInches: number,
  perMtrPrice: number,
  discountValue: number,
  discountType: DiscountType
): string | undefined {
  const widthIn = feetInchesToInches(widthFeet, widthInches);
  const heightIn = feetInchesToInches(heightFeet, heightInches);

  if (widthIn === 0 && heightIn === 0 && perMtrPrice === 0) return undefined;
  if (widthIn <= 0) return 'Window Width must be greater than 0';
  if (heightIn <= 0) return 'Window Height must be greater than 0';
  if (perMtrPrice < 0) return 'Per MTR Price cannot be negative';

  const fabric = calculateCurtainFabric(widthFeet, widthInches, heightFeet, heightInches);
  const pricing = calculateCurtainPrice(fabric.totalMtr, perMtrPrice, discountValue, discountType);

  if (discountType === 'PERCENTAGE' && discountValue > 100) {
    return 'Discount percentage cannot exceed 100%';
  }
  if (discountType === 'FIXED' && discountValue > pricing.subtotal && pricing.subtotal > 0) {
    return 'Discount amount cannot exceed subtotal';
  }

  return undefined;
}
