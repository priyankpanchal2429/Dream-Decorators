'use client';

import React from 'react';
import { X, Printer, FileCheck } from 'lucide-react';
import { QuotationPrintDocument } from './QuotationPrintDocument';
import { QuotationItem } from '../types';

interface QuotationPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotationNumber: string;
  issueDate: string;
  validUntil: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  notes?: string;
}

export const QuotationPreviewModal: React.FC<QuotationPreviewModalProps> = ({
  isOpen,
  onClose,
  quotationNumber,
  issueDate,
  validUntil,
  customerName,
  customerEmail,
  customerPhone,
  items,
  subtotal,
  taxAmount,
  discountAmount,
  grandTotal,
  notes,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      {/* Right Side Slide-Over Drawer - Theme Aware */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-3xl glass-panel bg-cardBg border-l border-borderClr shadow-2xl flex flex-col animate-slide-in-right overflow-hidden">
        {/* Drawer Header Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-borderClr/40 bg-cardBg/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <FileCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-txtPrimary">A4 Quotation Document Preview</h3>
              <p className="text-[10px] text-txtSecondary mt-0.5">
                Exact print & PDF sheet format for {quotationNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Printer className="h-4 w-4" />
              Save PDF / Print
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-hoverBg text-txtSecondary hover:text-txtPrimary transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Fit-to-screen A4 Canvas (Theme-Aware Neutral Background) */}
        <div className="flex-1 overflow-hidden p-3 sm:p-5 bg-hoverBg/40 flex items-center justify-center relative">
          {/* A4 Paper Sheet Wrapper */}
          <div className="transform scale-[0.62] sm:scale-[0.7] md:scale-[0.76] xl:scale-[0.8] origin-center shadow-2xl transition-transform rounded-md overflow-hidden ring-1 ring-black/10">
            <QuotationPrintDocument
              quotationNumber={quotationNumber}
              issueDate={issueDate}
              validUntil={validUntil}
              customerName={customerName}
              customerEmail={customerEmail}
              customerPhone={customerPhone}
              items={items}
              subtotal={subtotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
              grandTotal={grandTotal}
              notes={notes}
            />
          </div>
        </div>
      </div>
    </>
  );
};
