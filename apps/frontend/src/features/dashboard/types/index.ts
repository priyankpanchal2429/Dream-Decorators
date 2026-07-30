/** Summary metric for KPI cards (Sales, Purchase, Expense) */
export interface MetricSummary {
  /** Today's amount */
  todayAmount: number;
  /** Monthly cumulative amount */
  monthlyAmount: number;
  /** Month-over-month trend percentage */
  trendPercent: number;
  /** Whether the trend direction is positive */
  isPositive: boolean;
  /** Sparkline data points (last 7 days) */
  sparkline: number[];
  /** Human-readable last updated timestamp */
  lastUpdated: string;
}

/** Outstanding summary for Receivables / Payables */
export interface OutstandingSummary {
  /** Total outstanding amount */
  totalOutstanding: number;
  /** Amount due today */
  dueToday: number;
  /** Overdue amount (past due date) */
  overdue: number;
  /** Collection % (receivable) or Payment % (payable) */
  recoveryPercent: number;
  /** Number of pending invoices */
  pendingCount: number;
}

/** Product summary item for inventory widgets */
export interface ProductSummaryItem {
  id: string;
  name: string;
  category: string;
  /** Quantity sold (relevant for Best/Least Selling) */
  quantitySold: number;
  /** Revenue generated (relevant for Best Selling) */
  revenue: number;
  /** Current stock level */
  currentStock: number;
  /** Reorder level threshold (relevant for Low Stock) */
  reorderLevel: number;
  status: 'ACTIVE' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}

/** Invoice due item for Sales/Purchase Due tables */
export interface InvoiceDueItem {
  id: string;
  invoiceNumber: string;
  partyName: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  status: 'PAID' | 'PENDING' | 'OVERDUE' | 'DRAFT';
}

/** Activity feed item (kept for future use) */
export interface ActivityItem {
  id: string;
  type: 'SALES_CREATED' | 'QUOTATION_CREATED' | 'PAYMENT_RECEIVED' | 'PURCHASE_ADDED' | 'INVENTORY_UPDATED';
  title: string;
  timestamp: string;
}
