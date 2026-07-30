'use client';

import React from 'react';
import { Calculator, CheckCircle2, Save, Eye, Send } from 'lucide-react';
import { formatINR } from '../../dashboard/constants';

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
  return (
    <div className="glass-panel p-6 rounded-3xl space-y-6 sticky top-6 relative overflow-hidden group">
      {/* Glow */}
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

        <div className="pt-4 border-t border-borderClr/40">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Grand Total</span>
              <p className="text-2xl font-black text-primary mt-1">{formatINR(grandTotal)}</p>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-success/10 text-success text-[10px] font-bold border border-success/20">
              Tax Included
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-2.5 pt-2 relative z-10">
        <button
          onClick={onIssueQuotation}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Send className="h-4 w-4" />
          Generate & Issue Quotation
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onSaveDraft}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-hoverBg border border-borderClr/40 text-txtPrimary hover:border-primary/40 text-xs font-semibold transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </button>

          <button
            onClick={onPreviewPDF}
            className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-hoverBg border border-borderClr/40 text-txtPrimary hover:border-primary/40 text-xs font-semibold transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Preview PDF
          </button>
        </div>
      </div>
    </div>
  );
};
