'use client';

import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, MessageSquare, Download, Printer } from 'lucide-react';
import { QuotationPrintDocument, CopyType } from './QuotationPrintDocument';
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
  const [selectedCopyTypes, setSelectedCopyTypes] = useState<CopyType[]>(['Original']);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenNewTab = () => {
    if (typeof window !== 'undefined') {
      window.open(window.location.href, '_blank');
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Hello ${customerName || 'Client'}, here is your Quotation estimate ${quotationNumber} from Dream Decorators for Total ${grandTotal.toLocaleString('en-IN')}.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const toggleCopyType = (type: CopyType) => {
    if (selectedCopyTypes.includes(type)) {
      // Don't allow unchecking if it's the last remaining selection
      if (selectedCopyTypes.length > 1) {
        setSelectedCopyTypes(selectedCopyTypes.filter((t) => t !== type));
      }
    } else {
      setSelectedCopyTypes([...selectedCopyTypes, type]);
    }
  };

  const copyOptions: CopyType[] = ['Original', 'Duplicate', 'Transport', 'Office'];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in print:hidden"
      />

      {/* Right Side Slide-Over Drawer */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-4xl glass-panel bg-cardBg border-l border-borderClr shadow-2xl flex flex-col animate-slide-in-right overflow-hidden print:w-full print:max-w-none print:static print:bg-white print:border-none print:shadow-none">
        
        {/* TOP HEADER CONTROL BAR */}
        <div className="flex items-center justify-between px-6 py-3.5 border-b border-borderClr/40 bg-cardBg/90 backdrop-blur-md shrink-0 print:hidden">
          <div className="flex items-center gap-3">
            <h3 className="text-base font-extrabold text-txtPrimary tracking-tight">
              Print / View Document
            </h3>
            <span className="text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
              {selectedCopyTypes.length} {selectedCopyTypes.length === 1 ? 'Page' : 'Pages'} Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 border border-borderClr/40 text-txtPrimary font-bold text-xs transition-all shadow-xs"
            >
              <ExternalLink className="h-3.5 w-3.5 text-primary" />
              New Tab
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 border border-borderClr/40 text-txtPrimary font-bold text-xs transition-all shadow-xs"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5 text-txtSecondary" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-hoverBg text-txtSecondary hover:text-txtPrimary transition-colors ml-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CENTER DOCUMENT CANVAS FRAME - MULTI-PAGE STACK WITH NATIVE VERTICAL SCROLLING */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-appBg/60 flex flex-col items-center gap-8 print:p-0 print:bg-white print:gap-0">
          {selectedCopyTypes.map((cType) => (
            <div key={cType} className="shadow-2xl rounded-sm transition-transform print:shadow-none shrink-0 print:w-full">
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
                copyType={cType}
              />
            </div>
          ))}
        </div>

        {/* BOTTOM ACTION & MULTI-SELECT COPY TYPE FOOTER BAR */}
        <div className="border-t border-borderClr/40 bg-cardBg/95 backdrop-blur-md p-4 space-y-3 shrink-0 print:hidden">
          {/* Multi-Select Copy Type Checkbox Options */}
          <div className="flex items-center justify-end gap-3 text-xs font-semibold text-txtPrimary">
            <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider mr-1">
              Select Copy Types to Print:
            </span>
            {copyOptions.map((opt) => {
              const isChecked = selectedCopyTypes.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleCopyType(opt)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isChecked
                      ? 'bg-primary/10 border-primary/40 text-primary shadow-xs'
                      : 'bg-hoverBg border-borderClr/40 text-txtSecondary hover:text-txtPrimary'
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[9px] font-black transition-colors ${
                      isChecked ? 'bg-primary text-white' : 'border border-borderClr/60 bg-cardBg'
                    }`}
                  >
                    {isChecked ? '✓' : ''}
                  </div>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-hoverBg border border-borderClr/50 text-txtPrimary text-xs font-bold transition-colors hover:bg-hoverBg/80"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            <div className="flex items-center gap-2.5">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </button>

              {/* Download */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white font-bold text-xs shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                Download
              </button>

              {/* Print */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-sm shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Printer className="h-4 w-4" />
                Print ({selectedCopyTypes.length} {selectedCopyTypes.length === 1 ? 'Page' : 'Pages'})
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
