import {
  MetricSummary,
  OutstandingSummary,
  ProductSummaryItem,
  InvoiceDueItem,
} from '../types';

// ─── Utility ──────────────────────────────────────────────
/** Format a number as Indian Rupee currency string */
export function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
}

// ─── ROW 1: KPI Cards ────────────────────────────────────
export const mockSalesSummary: MetricSummary = {
  todayAmount: 0,
  monthlyAmount: 0,
  trendPercent: 0,
  isPositive: true,
  sparkline: [0, 0, 0, 0, 0, 0, 0],
  lastUpdated: 'Just now',
};

export const mockPurchaseSummary: MetricSummary = {
  todayAmount: 0,
  monthlyAmount: 0,
  trendPercent: 0,
  isPositive: true,
  sparkline: [0, 0, 0, 0, 0, 0, 0],
  lastUpdated: 'Just now',
};

export const mockExpenseSummary: MetricSummary = {
  todayAmount: 0,
  monthlyAmount: 0,
  trendPercent: 0,
  isPositive: true,
  sparkline: [0, 0, 0, 0, 0, 0, 0],
  lastUpdated: 'Just now',
};

// ─── ROW 2: Outstanding ──────────────────────────────────
export const mockSalesOutstanding: OutstandingSummary = {
  totalOutstanding: 0,
  dueToday: 0,
  overdue: 0,
  recoveryPercent: 0,
  pendingCount: 0,
};

export const mockPurchaseOutstanding: OutstandingSummary = {
  totalOutstanding: 0,
  dueToday: 0,
  overdue: 0,
  recoveryPercent: 0,
  pendingCount: 0,
};

// ─── ROW 3: Inventory Overview ───────────────────────────
export const mockBestSellingProducts: ProductSummaryItem[] = [];
export const mockLeastSellingProducts: ProductSummaryItem[] = [];
export const mockLowStockProducts: ProductSummaryItem[] = [];

// ─── ROW 4 & 5: Invoice Due Tables ──────────────────────
export const mockSalesInvoiceDue: InvoiceDueItem[] = [];
export const mockPurchaseInvoiceDue: InvoiceDueItem[] = [];
