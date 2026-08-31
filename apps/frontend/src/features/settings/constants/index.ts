import { CompanyProfile, BankAccountDetails, TermsAndConditions, TabItem } from '../types';

export const initialCompanyProfile: CompanyProfile = {
  companyName: 'Dream Decorators',
  tagline: 'Luxury Interior & Architectural Decor',
  gstin: '24AAACD1234E1Z5',
  phone: '+91 98765 43210',
  email: 'support@dreamdecorators.in',
  address: 'Opp. Business Hub, Satellite, Ahmedabad, Gujarat - 380015',
};

export const initialBankAccountDetails: BankAccountDetails = {
  bankName: 'Bank of Baroda',
  branch: 'Satellite Ahmedabad',
  accName: 'Dream Decorators',
  accNo: '39590200000512',
  ifsc: 'BARB0SATELL',
  upiId: 'dreamdecorators@barodampay',
  upiQrImage:
    'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=dreamdecorators@barodampay&pn=Dream%20Decorators',
};

export const initialTerms: TermsAndConditions = {
  terms: `1. Jurisdiction: Ahmedabad, Gujarat.\n2. Delivery: 3-4 weeks from advance receipt.\n3. Payment: 50% advance, 50% prior to dispatch.\n4. Cancellation: 20% of advance is non-refundable.`,
};

export const settingsTabs: TabItem[] = [
  {
    id: 'profile',
    label: 'Company Profile',
    description: 'Identity, GST & Contacts',
    iconName: 'Building2',
  },
  {
    id: 'bank',
    label: 'Bank & UPI Details',
    description: 'Accounts & Payment QR',
    iconName: 'CreditCard',
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    description: 'Default Invoice Policies',
    iconName: 'FileText',
  },
];
