export interface CompanyProfile {
  companyName: string;
  tagline: string;
  gstin: string;
  phone: string;
  email: string;
  address: string;
}

export interface BankAccountDetails {
  bankName: string;
  branch: string;
  accName: string;
  accNo: string;
  ifsc: string;
  upiId: string;
  upiQrImage: string | null;
}

export interface TermsAndConditions {
  terms: string;
}

export type SettingsTabType = 'profile' | 'bank' | 'terms';

export interface TabItem {
  id: SettingsTabType;
  label: string;
  description: string;
  iconName: 'Building2' | 'CreditCard' | 'FileText';
}
