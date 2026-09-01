'use client';

import React, { useState } from 'react';
import { X, Printer, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import { formatINR } from '../../dashboard/constants';
import { QuotationPreviewModal } from './QuotationPreviewModal';
import { BankDetailsCard } from './BankDetailsCard';

interface QuotationDetailModalProps {
  quotation: any | null;
  onClose: () => void;
  onConvertToInvoice?: (id: string) => void;
}

export const QuotationDetailModal: React.FC<QuotationDetailModalProps> = ({
  quotation,
  onClose,
  onConvertToInvoice,
}) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  if (!quotation) return null;

  const isConverted = quotation.status === 'APPROVED' && quotation.rawRecord?.salesInvoices?.length > 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 relative overflow-hidden flex flex-col max-h-[90vh] shadow-2xl border border-white/10 bg-cardBg">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-borderClr/30">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-txtPrimary">{quotation.quotationNumber}</h2>
                <p className="text-[10px] text-txtSecondary mt-0.5">Created on {quotation.issueDate} • Valid until {quotation.validUntil}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Content Body */}
          <div className="overflow-y-auto py-5 space-y-6 flex-1 pr-1">
            {/* Customer Details */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-hoverBg/30 border border-borderClr/20">
              <div>
                <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Client Name</span>
                <p className="text-xs font-bold text-txtPrimary mt-0.5">{quotation.customerName}</p>
                {quotation.customerEmail && (
                  <p className="text-[10px] text-txtSecondary mt-0.5">{quotation.customerEmail}</p>
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Status</span>
                <p className="text-xs font-bold text-primary mt-0.5 uppercase tracking-wider">{quotation.status}</p>
                {quotation.customerPhone && (
                  <p className="text-[10px] text-txtSecondary mt-0.5">{quotation.customerPhone}</p>
                )}
                {quotation.customerAddress && (
                  <p className="text-[10px] text-txtSecondary mt-0.5 font-medium">{quotation.customerAddress}</p>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div>
              <h4 className="text-xs font-bold text-txtPrimary mb-3 uppercase tracking-wider">Itemized Breakdown</h4>
              <div className="rounded-2xl border border-borderClr/30 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-hoverBg/60 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase">
                      <th className="px-4 py-2.5">Item Description</th>
                      <th className="px-4 py-2.5 text-center">Qty</th>
                      <th className="px-4 py-2.5 text-right">Unit Price</th>
                      <th className="px-4 py-2.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderClr/20 text-xs">
                    {(quotation.items || []).map((item: any) => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 font-semibold text-txtPrimary">{item.description}</td>
                        <td className="px-4 py-3 text-center text-txtSecondary font-medium font-mono">{item.quantity} {item.uom || 'NOS'}</td>
                        <td className="px-4 py-3 text-right text-txtPrimary font-medium">{formatINR(item.unitPrice)}</td>
                        <td className="px-4 py-3 text-right text-txtPrimary font-bold">{formatINR(item.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Summary */}
            <div className="flex flex-col items-end space-y-1.5 pt-2">
              <div className="flex justify-between w-48 text-xs text-txtSecondary">
                <span>Subtotal:</span>
                <span className="font-semibold text-txtPrimary">{formatINR(quotation.subtotal)}</span>
              </div>
              <div className="flex justify-between w-48 text-xs text-txtSecondary">
                <span>Tax Amount:</span>
                <span className="font-semibold text-txtPrimary">{formatINR(quotation.taxAmount)}</span>
              </div>
              {quotation.discountAmount > 0 && (
                <div className="flex justify-between w-48 text-xs text-danger">
                  <span>Discount:</span>
                  <span className="font-semibold">-{formatINR(quotation.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between w-56 text-sm font-black text-txtPrimary pt-2 border-t border-borderClr/40 mt-1">
                <span>Total Amount:</span>
                <span className="text-primary">{formatINR(quotation.totalAmount)}</span>
              </div>
            </div>

            {/* Notes */}
            {quotation.notes && (
              <div className="p-3.5 rounded-xl bg-hoverBg/20 border border-borderClr/20">
                <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Notes / Terms</span>
                <p className="text-xs text-txtPrimary mt-1">{quotation.notes}</p>
              </div>
            )}

            {/* Bank Details & UPI QR Code */}
            <BankDetailsCard />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-borderClr/30">
            <div className="text-xs text-txtSecondary">
              {isConverted && (
                <span className="inline-flex items-center gap-1.5 text-success font-semibold text-[11px]">
                  <CheckCircle className="w-3.5 h-3.5" /> Converted to Sales Invoice
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreviewOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtPrimary text-xs font-bold transition-colors border border-borderClr/40"
              >
                <Printer className="h-3.5 w-3.5" />
                Preview PDF & Print
              </button>

              {!isConverted && onConvertToInvoice && (
                <button
                  onClick={() => onConvertToInvoice(quotation.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-primary/20"
                >
                  <CheckCircle className="h-3.5 w-3.5" />
                  Convert to Tax Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* A4 PDF Preview Modal */}
      <QuotationPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        quotationNumber={quotation.quotationNumber}
        issueDate={quotation.issueDate}
        validUntil={quotation.validUntil}
        customerName={quotation.customerName}
        customerEmail={quotation.customerEmail}
        customerPhone={quotation.customerPhone}
        items={quotation.items}
        subtotal={quotation.subtotal}
        taxAmount={quotation.taxAmount}
        discountAmount={quotation.discountAmount || 0}
        grandTotal={quotation.totalAmount}
        notes={quotation.notes}
      />
    </>
  );
};
