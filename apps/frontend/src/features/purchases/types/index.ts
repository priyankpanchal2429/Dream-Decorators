export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  category: string;
  orderDate: string;
  amount: number;
  totalAmount?: number;
  status: 'RECEIVED' | 'PENDING' | 'CANCELLED';
}

export type PurchaseInvoice = PurchaseOrder;
