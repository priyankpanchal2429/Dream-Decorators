export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
export type CustomerType = 'RETAIL' | 'COMMERCIAL' | 'ARCHITECT' | 'INTERIOR_DESIGNER' | 'BUSINESS' | 'INDIVIDUAL' | 'DEALER' | string;

export interface Address {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface Customer {
  id: string;
  name?: string;
  customerCode?: string;
  customerName?: string;
  companyName?: string;
  contactPerson?: string;
  mobile?: string;
  email: string;
  phone?: string;
  city: string;
  state: string;
  pincode?: string;
  gstin?: string;
  gstNumber?: string;
  totalOrders?: number;
  totalSpent?: number;
  outstanding?: number;
  outstandingAmount?: number;
  openingBalance?: number;
  creditLimit?: number;
  status: CustomerStatus;
  customerType?: CustomerType;
  lastOrderDate?: string;
  createdAt?: string;
  updatedAt?: string;
  isDeleted?: boolean;
  billingAddress?: Address;
  shippingAddress?: Address;
}
