export type CustomerType = 'INDIVIDUAL' | 'BUSINESS' | 'DEALER' | 'DISTRIBUTOR';
export type CustomerStatus = 'ACTIVE' | 'INACTIVE' | 'BLOCKED';

export interface CustomerAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Customer {
  id: string;
  customerCode: string;
  customerName: string;
  companyName?: string;
  contactPerson?: string;
  mobile: string;
  alternateMobile?: string;
  email?: string;
  website?: string;
  gstNumber?: string;
  panNumber?: string;
  customerType: CustomerType;
  billingAddress: CustomerAddress;
  shippingAddress: CustomerAddress;
  city: string;
  state: string;
  pincode: string;
  paymentTerms?: string;
  creditLimit: number;
  openingBalance: number;
  outstandingAmount: number;
  status: CustomerStatus;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface CustomerFilterParams {
  search?: string;
  customerType?: CustomerType;
  status?: CustomerStatus;
  city?: string;
  state?: string;
  sortBy?: 'customerName' | 'companyName' | 'outstandingAmount' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}
