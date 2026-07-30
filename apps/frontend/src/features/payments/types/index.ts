export interface PaymentTransaction {
  id: string;
  txnRef: string;
  type: 'RECEIVED' | 'PAID';
  partyName: string;
  date: string;
  paymentMode: 'UPI' | 'NEFT/RTGS' | 'CHEQUE' | 'CASH';
  amount: number;
  status: 'SUCCESS' | 'PENDING';
}
