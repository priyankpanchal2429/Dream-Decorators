'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { QuotationItem } from '../types';
import { formatINR } from '../../dashboard/constants';

interface QuotationPrintDocumentProps {
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

export const QuotationPrintDocument: React.FC<QuotationPrintDocumentProps> = ({
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
  return (
    <div className="printable-area bg-white text-zinc-900 p-5 sm:p-6 font-sans w-full max-w-[210mm] aspect-[1/1.414] mx-auto flex flex-col justify-between shadow-2xl rounded-sm border border-zinc-300 text-[11px] overflow-hidden leading-tight">
      <div>
        {/* Top Header Banner */}
        <div className="flex justify-between items-start pb-4 border-b-2 border-zinc-900">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-md">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-zinc-900 leading-none uppercase">
                Dream Decorators
              </h1>
              <p className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5">
                Luxury Interior & Decor
              </p>
              <p className="text-[8px] text-zinc-500 mt-0.5">
                GSTIN: 24AAACD1234E1Z5 • Reg. Office: Business Park, Satellite, Ahmedabad
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="inline-block px-2.5 py-0.5 bg-indigo-50 text-indigo-700 text-[9px] font-black uppercase tracking-wider rounded border border-indigo-200">
              Quotation / Estimate
            </span>
            <p className="text-xs font-black text-zinc-900 mt-1">{quotationNumber}</p>
          </div>
        </div>

        {/* Client & Quote Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 my-4 p-3 bg-zinc-50 rounded-lg border border-zinc-200/80">
          <div>
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest block mb-0.5">
              Billed / Prepared For
            </span>
            <p className="text-[11px] font-black text-zinc-900">{customerName || 'Client Name'}</p>
            <p className="text-[9px] text-zinc-600 font-medium mt-0.5">{customerEmail || 'client@example.com'}</p>
            {customerPhone && <p className="text-[9px] text-zinc-600 font-medium">{customerPhone}</p>}
          </div>

          <div className="text-right space-y-0.5">
            <div>
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Issue Date:</span>
              <span className="text-[9px] font-bold text-zinc-900 ml-1.5">{issueDate}</span>
            </div>
            <div>
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Valid Until:</span>
              <span className="text-[9px] font-bold text-indigo-600 ml-1.5">{validUntil}</span>
            </div>
            <div>
              <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Payment Terms:</span>
              <span className="text-[9px] font-bold text-zinc-900 ml-1.5">50% Advance</span>
            </div>
          </div>
        </div>

        {/* Itemized Line Items Table */}
        <div className="overflow-hidden border border-zinc-300 rounded-md my-4 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white text-[8px] font-bold uppercase tracking-wider">
                <th className="px-3 py-2 w-8">#</th>
                <th className="px-3 py-2">Item Description</th>
                <th className="px-3 py-2 text-center w-14">Qty</th>
                <th className="px-3 py-2 text-right w-24">Unit Price</th>
                <th className="px-3 py-2 text-right w-16">GST %</th>
                <th className="px-3 py-2 text-right w-24">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-[10px]">
              {items.map((item, idx) => (
                <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/40'}>
                  <td className="px-3 py-2 font-bold text-zinc-400">{idx + 1}</td>
                  <td className="px-3 py-2 font-bold text-zinc-900">{item.description || 'Custom Decor Item'}</td>
                  <td className="px-3 py-2 text-center font-bold text-zinc-700">{item.quantity}</td>
                  <td className="px-3 py-2 text-right font-medium text-zinc-800">{formatINR(item.unitPrice)}</td>
                  <td className="px-3 py-2 text-right font-medium text-zinc-600">{item.taxPercent}%</td>
                  <td className="px-3 py-2 text-right font-black text-zinc-900">
                    {formatINR(item.quantity * item.unitPrice * (1 + item.taxPercent / 100))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Math Breakdown */}
        <div className="flex justify-end my-4">
          <div className="w-64 space-y-1 text-[10px]">
            <div className="flex justify-between text-zinc-600">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold text-zinc-900">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span className="font-semibold">Estimated GST Tax:</span>
              <span className="font-bold text-zinc-900">{formatINR(taxAmount)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span className="font-semibold">Discount:</span>
                <span className="font-bold">-{formatINR(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-black text-zinc-900 pt-1.5 border-t-2 border-zinc-900 mt-1">
              <span>Final Payable:</span>
              <span className="text-indigo-600 text-xs">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Terms & Notes */}
        {notes && (
          <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200 my-3 text-[9px]">
            <span className="font-black text-zinc-400 uppercase tracking-widest block mb-0.5">
              Terms & Conditions / Client Notes
            </span>
            <p className="text-zinc-700 font-medium leading-relaxed">{notes}</p>
          </div>
        )}
      </div>

      {/* Footer Signatures - Perfectly Positioned */}
      <div className="pt-4 border-t border-zinc-300">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[8px] text-zinc-400 uppercase font-black tracking-widest">Authorized Contact</p>
            <p className="text-[9px] font-bold text-zinc-900 mt-0.5">support@dreamdecorators.com • +91 98765 00000</p>
          </div>

          <div className="text-center">
            <div className="w-36 border-b border-zinc-400 mb-1"></div>
            <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">
              Authorized Signature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
