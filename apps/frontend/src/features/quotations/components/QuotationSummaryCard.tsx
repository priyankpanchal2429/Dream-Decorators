'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, Save, Eye, Send, ArrowLeft } from 'lucide-react';
import { formatINR } from '../../dashboard/constants';
import { numberToWordsINR } from '../utils/numberToWordsINR';

interface QuotationSummaryCardProps {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  setDiscountAmount: (val: number) => void;
  grandTotal: number;
  onSaveDraft: () => void;
  onIssueQuotation: () => void;
  onPreviewPDF: () => void;
}

export const QuotationSummaryCard: React.FC<QuotationSummaryCardProps> = ({
  subtotal,
  taxAmount,
  discountAmount,
  setDiscountAmount,
  grandTotal,
  onSaveDraft,
  onIssueQuotation,
  onPreviewPDF,
}) => {
  const router = useRouter();

  return (
    <div className="glass-panel p-6 rounded-3xl space-y-6 relative overflow-hidden group">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="flex items-center gap-3 pb-4 border-b border-borderClr/30 relative z-10">
        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-txtPrimary">Payment Summary</h3>
          <p className="text-[10px] text-txtSecondary mt-0.5">Live calculation of totals and taxes</p>
        </div>
      </div>

      {/* Breakdown List */}
      <div className="space-y-3 relative z-10 text-xs">
        <div className="flex justify-between items-center text-txtSecondary">
          <span className="font-semibold">Subtotal</span>
          <span className="font-bold text-txtPrimary">{formatINR(subtotal)}</span>
        </div>

        <div className="flex justify-between items-center text-txtSecondary">
          <span className="font-semibold">Estimated GST Tax</span>
          <span className="font-bold text-txtPrimary">{formatINR(taxAmount)}</span>
        </div>

        <div className="flex justify-between items-center gap-4 pt-1">
          <span className="font-semibold text-txtSecondary">Discount (₹)</span>
          <input
            type="number"
            min={0}
            value={discountAmount || ''}
            onChange={(e) => setDiscountAmount(Number(e.target.value))}
            placeholder="0"
            className="w-28 px-3 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/40 text-danger font-bold focus:outline-none focus:border-danger/50"
          />
        </div>

        {/* Grand Total */}
        <div className="pt-4 border-t border-borderClr/40">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Grand Total</span>
              <p className="text-2xl font-black text-primary mt-0.5">{formatINR(grandTotal)}</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-success/10 text-success text-[10px] font-bold border border-success/20">
              Tax Included
            </span>
          </div>

          {/* Total in Words Section (Right below Grand Total Amount) */}
          <div className="mt-3.5 p-3 rounded-2xl bg-hoverBg/60 border border-borderClr/30 text-[10.5px]">
            <span className="text-[9px] font-bold text-txtSecondary uppercase tracking-wider block mb-0.5">
              Total in words
            </span>
            <p className="font-black text-txtPrimary uppercase leading-snug">
              {numberToWordsINR(grandTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-3 pt-2 relative z-10">
        {/* Taller Generate & Issue Button */}
        <button
          onClick={onIssueQuotation}
          className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-extrabold text-xs tracking-wide shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] h-12"
        >
          <Send className="h-4 w-4" />
          Generate & Issue Quotation
        </button>

        {/* 3 Button Row: Back | Save Draft | Preview PDF */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => router.push('/quotations')}
            className="flex items-center justify-center gap-1 px-2.5 py-2.5 rounded-xl bg-hoverBg border border-borderClr/40 text-txtPrimary hover:border-primary/40 text-[11px] font-bold transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </button>

          <button
            onClick={onSaveDraft}
            className="flex items-center justify-center gap-1 px-2.5 py-2.5 rounded-xl bg-hoverBg border border-borderClr/40 text-txtPrimary hover:border-primary/40 text-[11px] font-bold transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </button>

          <button
            onClick={onPreviewPDF}
            className="flex items-center justify-center gap-1 px-2.5 py-2.5 rounded-xl bg-hoverBg border border-borderClr/40 text-txtPrimary hover:border-primary/40 text-[11px] font-bold transition-colors"
          >
            <Eye className="h-3.5 w-3.5 text-primary" />
            Preview PDF
          </button>
        </div>
      </div>
    </div>
  );
};
