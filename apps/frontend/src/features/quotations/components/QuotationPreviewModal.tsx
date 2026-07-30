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
  const [copyType, setCopyType] = useState<CopyType>('Original');
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

  const copyOptions: CopyType[] = ['Original', 'Duplicate', 'Transport', 'Office'];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in print:hidden"
      />

      {/* Right Side Slide-Over Drawer - Reference UI Style */}
      <div className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-4xl glass-panel bg-cardBg border-l border-borderClr shadow-2xl flex flex-col animate-slide-in-right overflow-hidden print:w-full print:max-w-none print:static print:bg-white print:border-none print:shadow-none">
        
        {/* TOP HEADER CONTROL BAR (Reference UI) */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-borderClr/40 bg-cardBg/90 backdrop-blur-md shrink-0 print:hidden">
          <h3 className="text-base font-extrabold text-txtPrimary tracking-tight">
            Print / View Document
          </h3>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenNewTab}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-400/90 hover:bg-cyan-500 text-white font-bold text-xs shadow-xs transition-all"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              New Tab
            </button>

            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-400/90 hover:bg-sky-500 text-white font-bold text-xs shadow-xs transition-all"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied!' : 'Copy Link'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-hoverBg text-txtSecondary hover:text-txtPrimary transition-colors ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CENTER DOCUMENT CANVAS FRAME */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-900/60 flex justify-center print:p-0 print:bg-white">
          <div className="w-full max-w-[210mm] shadow-2xl transition-transform rounded-sm overflow-hidden print:shadow-none print:w-full">
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
              copyType={copyType}
            />
          </div>
        </div>

        {/* BOTTOM ACTION & COPY TYPE FOOTER BAR (Reference UI) */}
        <div className="border-t border-borderClr/40 bg-cardBg/95 backdrop-blur-md p-4 space-y-3 shrink-0 print:hidden">
          {/* Copy Type Selector Pills */}
          <div className="flex items-center justify-end gap-6 text-xs font-semibold text-txtPrimary px-2">
            {copyOptions.map((opt) => (
              <label key={opt} className="flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="radio"
                  name="copyType"
                  value={opt}
                  checked={copyType === opt}
                  onChange={() => setCopyType(opt)}
                  className="h-4 w-4 text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
                />
                <span className={copyType === opt ? 'font-black text-txtPrimary' : 'text-txtSecondary'}>
                  {opt}
                </span>
              </label>
            ))}
          </div>

          {/* Action Buttons Row (No Email as requested) */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-hoverBg border border-borderClr/50 text-txtPrimary text-xs font-bold transition-colors hover:bg-hoverBg/80"
            >
              <X className="h-4 w-4" />
              Close
            </button>

            <div className="flex items-center gap-2.5">
              {/* WhatsApp */}
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageSquare className="h-4 w-4" />
                Whatsapp
              </button>

              {/* Download */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-zinc-900 font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="h-4 w-4" />
                Download
              </button>

              {/* Print */}
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
