export type InvoiceStatus = 'PAID' | 'PARTIAL' | 'OVERDUE' | 'UNPAID';

export interface SalesInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerPhone?: string;
  issueDate: string;
  invoiceDate?: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: InvoiceStatus;
}
