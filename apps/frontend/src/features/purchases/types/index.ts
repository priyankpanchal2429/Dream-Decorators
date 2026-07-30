export interface PurchaseOrder {
  id: string;
  poNumber: string;
  vendorName: string;
  category: string;
  orderDate: string;
  amount: number;
  status: 'RECEIVED' | 'PENDING' | 'CANCELLED';
}
