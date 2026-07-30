export interface Vendor {
  id: string;
  name: string;
  category: 'Timber & Teakwood' | 'Fabrics & Curtains' | 'Marble & Stone' | 'Hardware & Fitting';
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  gstin: string;
  totalPurchases: number;
  payableBalance: number;
  status: 'ACTIVE' | 'INACTIVE';
}
