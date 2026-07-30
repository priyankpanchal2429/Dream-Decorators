export interface Vendor {
  id: string;
  name: string;
  vendorName?: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  state?: string;
  gstin: string;
  totalPurchases: number;
  totalSpend?: number;
  payableBalance: number;
  payable?: number;
  status: 'ACTIVE' | 'INACTIVE';
}
