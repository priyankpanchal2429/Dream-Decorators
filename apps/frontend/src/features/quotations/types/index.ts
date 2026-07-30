export type QuotationStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export interface QuotationItem {
  id: string;
  description: string;
  hsnCode?: string;
  quantity: number;
  uom?: string;
  unitPrice: number;
  discount?: number;
  taxPercent: number;
  total: number;
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  issueDate: string;
  validUntil: string;
  status: QuotationStatus;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount?: number;
  totalAmount: number;
  notes?: string;
}

export interface QuotationStatsData {
  totalCount: number;
  totalValue: number;
  acceptedCount: number;
  acceptedValue: number;
  pendingCount: number;
  pendingValue: number;
  conversionRate: number;
}
