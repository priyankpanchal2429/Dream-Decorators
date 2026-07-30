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
  todayAmount: 185000,
  monthlyAmount: 1245000,
  trendPercent: 14.2,
  isPositive: true,
  sparkline: [42, 55, 38, 62, 70, 58, 75],
  lastUpdated: '2 mins ago',
};

export const mockPurchaseSummary: MetricSummary = {
  todayAmount: 92000,
  monthlyAmount: 830000,
  trendPercent: 5.1,
  isPositive: false,
  sparkline: [30, 28, 35, 40, 32, 38, 34],
  lastUpdated: '5 mins ago',
};

export const mockExpenseSummary: MetricSummary = {
  todayAmount: 12500,
  monthlyAmount: 150000,
  trendPercent: 2.3,
  isPositive: false,
  sparkline: [10, 15, 8, 12, 14, 11, 13],
  lastUpdated: '10 mins ago',
};

// ─── ROW 2: Outstanding ──────────────────────────────────
export const mockSalesOutstanding: OutstandingSummary = {
  totalOutstanding: 345000,
  dueToday: 65000,
  overdue: 85000,
  recoveryPercent: 72,
  pendingCount: 14,
};

export const mockPurchaseOutstanding: OutstandingSummary = {
  totalOutstanding: 180000,
  dueToday: 31000,
  overdue: 40000,
  recoveryPercent: 81,
  pendingCount: 8,
};

// ─── ROW 3: Inventory Overview ───────────────────────────
export const mockBestSellingProducts: ProductSummaryItem[] = [
  { id: '1', name: 'Velvet Blackout Curtain (Royal Blue)', category: 'Window Curtains', quantitySold: 450, revenue: 675000, currentStock: 120, reorderLevel: 20, status: 'ACTIVE' },
  { id: '2', name: 'Wooden Venetian Blind (Teak)', category: 'Window Blinds', quantitySold: 320, revenue: 480000, currentStock: 85, reorderLevel: 15, status: 'ACTIVE' },
  { id: '3', name: 'Damask Gold Wallpaper', category: 'Wallpapers', quantitySold: 280, revenue: 336000, currentStock: 200, reorderLevel: 30, status: 'ACTIVE' },
  { id: '4', name: 'Orthopedic King Size Mattress', category: 'Mattresses', quantitySold: 190, revenue: 570000, currentStock: 45, reorderLevel: 10, status: 'ACTIVE' },
  { id: '5', name: 'Turkish Hand-Woven Carpet', category: 'Carpets', quantitySold: 150, revenue: 375000, currentStock: 30, reorderLevel: 5, status: 'ACTIVE' },
];

export const mockLeastSellingProducts: ProductSummaryItem[] = [
  { id: '1', name: 'Sheer Linen Curtain (Pale Pink)', category: 'Window Curtains', quantitySold: 12, revenue: 14400, currentStock: 95, reorderLevel: 20, status: 'ACTIVE' },
  { id: '2', name: 'Aluminum Mini Blind (Silver)', category: 'Window Blinds', quantitySold: 8, revenue: 8000, currentStock: 110, reorderLevel: 15, status: 'ACTIVE' },
  { id: '3', name: 'Geometric Abstract Wallpaper', category: 'Wallpapers', quantitySold: 15, revenue: 12000, currentStock: 140, reorderLevel: 30, status: 'ACTIVE' },
  { id: '4', name: 'Single Bed Foam Mattress', category: 'Mattresses', quantitySold: 5, revenue: 7500, currentStock: 60, reorderLevel: 10, status: 'ACTIVE' },
  { id: '5', name: 'Jute Floor Runner Carpet', category: 'Carpets', quantitySold: 9, revenue: 6300, currentStock: 75, reorderLevel: 5, status: 'ACTIVE' },
];

export const mockLowStockProducts: ProductSummaryItem[] = [
  { id: '1', name: 'Motorized Roller Blind Motor', category: 'Window Blinds', quantitySold: 140, revenue: 280000, currentStock: 3, reorderLevel: 10, status: 'LOW_STOCK' },
  { id: '2', name: 'Brass Curtain Rod Bracket Set', category: 'Window Curtains', quantitySold: 300, revenue: 90000, currentStock: 2, reorderLevel: 15, status: 'LOW_STOCK' },
  { id: '3', name: 'Sofa Fabric Velvet Roll (Navy)', category: 'Sofas', quantitySold: 210, revenue: 315000, currentStock: 4, reorderLevel: 12, status: 'LOW_STOCK' },
  { id: '4', name: 'Wallpaper Adhesive Glue 5kg', category: 'Wallpapers', quantitySold: 180, revenue: 36000, currentStock: 1, reorderLevel: 20, status: 'LOW_STOCK' },
  { id: '5', name: 'Memory Foam Pillow Pair', category: 'Mattresses', quantitySold: 95, revenue: 28500, currentStock: 0, reorderLevel: 10, status: 'OUT_OF_STOCK' },
];

// ─── ROW 4 & 5: Invoice Due Tables ──────────────────────
export const mockSalesInvoiceDue: InvoiceDueItem[] = [
  { id: '1', invoiceNumber: 'INV-2026-0101', partyName: 'Royal Orchid Hotel', invoiceDate: '15 Jul 2026', dueDate: '30 Jul 2026', amount: 45000, status: 'OVERDUE' },
  { id: '2', invoiceNumber: 'INV-2026-0102', partyName: 'Oberoi Heights Residency', invoiceDate: '18 Jul 2026', dueDate: '02 Aug 2026', amount: 82000, status: 'PENDING' },
  { id: '3', invoiceNumber: 'INV-2026-0103', partyName: 'Apex Corporate Office', invoiceDate: '20 Jul 2026', dueDate: '04 Aug 2026', amount: 34000, status: 'PENDING' },
  { id: '4', invoiceNumber: 'INV-2026-0104', partyName: 'Mehta Luxury Villa', invoiceDate: '22 Jul 2026', dueDate: '29 Jul 2026', amount: 65000, status: 'OVERDUE' },
  { id: '5', invoiceNumber: 'INV-2026-0105', partyName: 'Skylark Builders', invoiceDate: '25 Jul 2026', dueDate: '09 Aug 2026', amount: 118000, status: 'PENDING' },
];

export const mockPurchaseInvoiceDue: InvoiceDueItem[] = [
  { id: '1', invoiceNumber: 'PINV-2026-042', partyName: "D'Decor Fabrics Ltd", invoiceDate: '10 Jul 2026', dueDate: '28 Jul 2026', amount: 68000, status: 'OVERDUE' },
  { id: '2', invoiceNumber: 'PINV-2026-043', partyName: 'Sleepwell Foam Industries', invoiceDate: '14 Jul 2026', dueDate: '01 Aug 2026', amount: 42000, status: 'PENDING' },
  { id: '3', invoiceNumber: 'PINV-2026-044', partyName: 'Asian Wall Coverings', invoiceDate: '16 Jul 2026', dueDate: '03 Aug 2026', amount: 25000, status: 'PENDING' },
  { id: '4', invoiceNumber: 'PINV-2026-045', partyName: 'Somany Carpets Pvt Ltd', invoiceDate: '19 Jul 2026', dueDate: '29 Jul 2026', amount: 31000, status: 'OVERDUE' },
  { id: '5', invoiceNumber: 'PINV-2026-046', partyName: 'Hunter Douglas Blinds', invoiceDate: '24 Jul 2026', dueDate: '08 Aug 2026', amount: 54000, status: 'PENDING' },
];
