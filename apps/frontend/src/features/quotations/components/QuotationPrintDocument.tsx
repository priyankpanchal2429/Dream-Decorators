'use client';

import React from 'react';
import { Layers, QrCode } from 'lucide-react';
import { QuotationItem } from '../types';
import { formatINR } from '../../dashboard/constants';
import { numberToWordsINR } from '../utils/numberToWordsINR';

export type CopyType = 'Original' | 'Duplicate' | 'Transport' | 'Office';

interface QuotationPrintDocumentProps {
  quotationNumber: string;
  issueDate: string;
  validUntil: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerAddress?: string;
  customerGstin?: string;
  customerPan?: string;
  placeOfSupply?: string;
  items: QuotationItem[];
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  grandTotal: number;
  notes?: string;
  copyType?: CopyType;
}

export const QuotationPrintDocument: React.FC<QuotationPrintDocumentProps> = ({
  quotationNumber,
  issueDate,
  validUntil,
  customerName,
  customerEmail,
  customerPhone = '+91 98765 43210',
  customerAddress = 'Business Bay, Satellite, Ahmedabad, Gujarat - 380015',
  customerGstin = '24AHBPV9744N1ZL',
  customerPan = 'AHBPV9744N',
  placeOfSupply = 'Gujarat (24)',
  items,
  subtotal,
  taxAmount,
  discountAmount,
  grandTotal,
  notes,
  copyType = 'Original',
}) => {
  const cgstAmount = taxAmount / 2;
  const sgstAmount = taxAmount / 2;
  const totalQty = items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    /* Standard A4 dimensions: 794px width x 1123px height (210mm x 297mm @ 96dpi) */
    <div className="printable-area bg-white text-zinc-800 font-sans w-[794px] min-h-[1123px] p-8 mx-auto flex flex-col justify-between shadow-lg rounded-sm border border-zinc-200 text-[10px] leading-relaxed shrink-0">
      <div>
        {/* Top Header Banner */}
        <div className="flex justify-between items-start pb-4 border-b border-zinc-300">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 border border-primary/20 text-primary rounded-xl">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-zinc-900 leading-none uppercase">
                DREAM DECORATORS
              </h1>
              <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-0.5">
                Luxury Interior & Architectural Decor
              </p>
              <p className="text-[8.5px] text-zinc-500 mt-0.5">
                GSTIN: <span className="font-semibold text-zinc-700">24AAACD1234E1Z5</span> • Tel: <span className="font-semibold text-zinc-700">+91 98765 43210</span>
              </p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider rounded border border-primary/20">
              Quotation / Estimate
            </span>
            <p className="text-xs font-black text-zinc-900">{quotationNumber}</p>
            
            {/* Dedicated Copy Type Badge for this Page */}
            <div>
              <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-0.5 rounded border border-primary/20">
                {copyType} COPY
              </span>
            </div>
          </div>
        </div>

        {/* Client & Metadata Info Grid */}
        <div className="grid grid-cols-12 gap-4 my-4 text-[9.5px]">
          {/* Customer Details - 7 cols */}
          <div className="col-span-7 p-3 bg-zinc-50/80 rounded-lg border border-zinc-200/80">
            <span className="text-[8px] font-bold text-primary uppercase tracking-wider block mb-1">
              Billed / Prepared For
            </span>
            <p className="text-[11px] font-black text-zinc-900">{customerName || 'Aarav Sharma'}</p>
            <p className="text-zinc-600 font-medium">{customerEmail || 'aarav.sharma@example.com'}</p>
            <p className="text-zinc-600 font-medium">{customerAddress}</p>
            <div className="grid grid-cols-2 gap-x-2 mt-2 pt-1.5 border-t border-zinc-200 text-[8.5px]">
              <p><span className="font-medium text-zinc-500">Phone:</span> <span className="font-semibold text-zinc-800">{customerPhone}</span></p>
              <p><span className="font-medium text-zinc-500">GSTIN:</span> <span className="font-semibold text-zinc-800">{customerGstin}</span></p>
              <p><span className="font-medium text-zinc-500">PAN:</span> <span className="font-semibold text-zinc-800">{customerPan}</span></p>
              <p><span className="font-medium text-zinc-500">State:</span> <span className="font-semibold text-zinc-800">{placeOfSupply}</span></p>
            </div>
          </div>

          {/* Quotation Details - 5 cols */}
          <div className="col-span-5 p-3 bg-zinc-50/80 rounded-lg border border-zinc-200 space-y-1.5 text-[9px]">
            <span className="text-[8px] font-bold text-primary uppercase tracking-wider block mb-0.5">
              Quotation Meta
            </span>
            <div className="flex justify-between items-center">
              <span className="font-medium text-zinc-500">Issue Date:</span>
              <span className="font-bold text-zinc-900">{issueDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-zinc-500">Valid Until:</span>
              <span className="font-bold text-primary">{validUntil}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-zinc-500">Payment Terms:</span>
              <span className="font-bold text-zinc-900">50% Advance</span>
            </div>
            <div className="flex justify-between items-center pt-1 border-t border-zinc-200">
              <span className="font-medium text-zinc-500">Status:</span>
              <span className="font-extrabold text-emerald-600 uppercase text-[8.5px]">Proposal Ready</span>
            </div>
          </div>
        </div>

        {/* Itemized Line Items Table (9 Requested Columns) */}
        <div className="overflow-hidden border border-zinc-200 rounded-lg my-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-100 text-zinc-700 text-[8px] font-bold uppercase tracking-wider border-b border-zinc-200">
                <th className="px-2 py-2 text-center w-7">SR.</th>
                <th className="px-3 py-2">PRODUCT / OTHER CHARGES</th>
                <th className="px-2 py-2 text-center w-20">HSN/SAC CODE</th>
                <th className="px-2 py-2 text-center w-12">QTY.</th>
                <th className="px-2 py-2 text-center w-12">UOM</th>
                <th className="px-2 py-2 text-right w-20">PRICE (₹)</th>
                <th className="px-2 py-2 text-right w-16">DISCOUNT</th>
                <th className="px-2 py-2 text-right w-20">CGST + SGST</th>
                <th className="px-3 py-2 text-right w-24">TOTAL (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-[9px]">
              {items.map((item, idx) => {
                const qty = item.quantity || 0;
                const price = item.unitPrice || 0;
                const disc = item.discount || 0;
                const lineSub = Math.max(0, qty * price - disc);
                const lineTotal = lineSub * (1 + (item.taxPercent || 0) / 100);

                return (
                  <tr key={item.id || idx} className="hover:bg-zinc-50/50">
                    <td className="px-2 py-2 text-center font-semibold text-zinc-400">{idx + 1}</td>
                    <td className="px-3 py-2">
                      <span className="font-bold text-zinc-900 block">{item.description || 'Custom Interior Furniture'}</span>
                      <span className="text-[7.5px] text-zinc-500 italic block">{item.itemNotes || 'Teakwood / Velvet • 1 Year Warranty'}</span>
                    </td>
                    <td className="px-2 py-2 text-center text-zinc-500 font-medium">{item.hsnCode || '94036000'}</td>
                    <td className="px-2 py-2 text-center font-bold text-zinc-800">{qty}</td>
                    <td className="px-2 py-2 text-center font-bold text-zinc-600">{item.uom || 'NOS'}</td>
                    <td className="px-2 py-2 text-right font-medium text-zinc-700">{formatINR(price)}</td>
                    <td className="px-2 py-2 text-right font-medium text-zinc-500">{disc > 0 ? `-${formatINR(disc)}` : '₹0'}</td>
                    <td className="px-2 py-2 text-right text-zinc-600 font-semibold">{item.taxPercent}%</td>
                    <td className="px-3 py-2 text-right font-bold text-zinc-900">{formatINR(lineTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-zinc-50 font-semibold text-[8.5px] border-t border-zinc-200">
              <tr>
                <td colSpan={3} className="px-3 py-1.5 text-right uppercase font-bold text-zinc-500">Total Quantity:</td>
                <td colSpan={2} className="px-2 py-1.5 text-center font-bold text-zinc-900 whitespace-nowrap">{totalQty} NOS</td>
                <td colSpan={4} className="px-3 py-1.5 text-right font-bold text-primary text-xs">
                  {formatINR(subtotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Financial Summary & Amount in Words Grid */}
        <div className="grid grid-cols-12 gap-4 my-4 text-[9px]">
          {/* Amount in Words - 7 cols */}
          <div className="col-span-7 p-3 bg-zinc-50/80 rounded-lg border border-zinc-200 space-y-1">
            <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest block">
              Total Amount in Words (E & O.E.)
            </span>
            <p className="text-[9px] font-bold text-zinc-900 uppercase tracking-tight bg-white p-2 border border-zinc-200 rounded">
              {numberToWordsINR(grandTotal)}
            </p>
          </div>

          {/* Financial Totals Math - 5 cols */}
          <div className="col-span-5 p-3 bg-zinc-50/80 rounded-lg border border-zinc-200 space-y-1 text-[9.5px]">
            <div className="flex justify-between text-zinc-600">
              <span className="font-medium">Subtotal:</span>
              <span className="font-bold text-zinc-900">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span className="font-medium">CGST (9%):</span>
              <span className="font-bold text-zinc-900">{formatINR(cgstAmount)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span className="font-medium">SGST (9%):</span>
              <span className="font-bold text-zinc-900">{formatINR(sgstAmount)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span className="font-medium">Discount:</span>
                <span className="font-bold">-{formatINR(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-[11px] font-bold text-zinc-900 pt-1.5 border-t border-zinc-300 mt-1">
              <span>Final Payable:</span>
              <span className="text-primary font-black">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Minimal HSN / SAC Tax Summary Grid */}
        <div className="border border-zinc-200 rounded-lg mb-3 overflow-hidden text-[8px]">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-zinc-100 text-zinc-700 font-bold uppercase border-b border-zinc-200">
                <th rowSpan={2} className="p-1 border-r border-zinc-200">HSN / SAC</th>
                <th rowSpan={2} className="p-1 border-r border-zinc-200">Taxable Value</th>
                <th colSpan={2} className="p-1 border-r border-zinc-200">CGST</th>
                <th colSpan={2} className="p-1 border-r border-zinc-200">SGST</th>
                <th rowSpan={2} className="p-1">Total Tax</th>
              </tr>
              <tr className="bg-zinc-50 text-zinc-600 font-bold border-t border-zinc-200">
                <th className="p-1 border-r border-zinc-200">%</th>
                <th className="p-1 border-r border-zinc-200">Amount</th>
                <th className="p-1 border-r border-zinc-200">%</th>
                <th className="p-1 border-r border-zinc-200">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-medium">
              <tr>
                <td className="p-1 border-r border-zinc-200 font-bold">94036000</td>
                <td className="p-1 border-r border-zinc-200 font-bold">{formatINR(subtotal)}</td>
                <td className="p-1 border-r border-zinc-200">9.00</td>
                <td className="p-1 border-r border-zinc-200">{formatINR(cgstAmount)}</td>
                <td className="p-1 border-r border-zinc-200">9.00</td>
                <td className="p-1 border-r border-zinc-200">{formatINR(sgstAmount)}</td>
                <td className="p-1 font-bold text-zinc-900">{formatINR(taxAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms & Bank Details Footer Grid */}
      <div className="grid grid-cols-12 gap-4 p-3 bg-zinc-50/80 rounded-lg border border-zinc-200 text-[8.5px] mt-auto pt-3 border-t border-zinc-300">
        {/* Terms & Conditions - 7 cols */}
        <div className="col-span-7 space-y-0.5">
          <span className="font-bold text-zinc-800 uppercase tracking-wider block border-b border-zinc-200 pb-0.5">
            Terms & Conditions:
          </span>
          <ol className="list-decimal pl-3 space-y-0.5 text-zinc-600 font-medium">
            <li>Jurisdiction: Ahmedabad, Gujarat.</li>
            <li>Delivery: 3-4 weeks from advance receipt.</li>
            <li>Payment: 50% advance, 50% prior to dispatch.</li>
            <li>Cancellation: 20% of advance is non-refundable.</li>
          </ol>
        </div>

        {/* Bank Details & QR - 5 cols */}
        <div className="col-span-5 flex justify-between items-start border-l border-zinc-200 pl-3">
          <div className="space-y-0.5">
            <span className="font-bold text-zinc-800 uppercase tracking-wider block border-b border-zinc-200 pb-0.5">
              Bank Details
            </span>
            <p><span className="font-medium text-zinc-500">Bank:</span> Bank of Baroda</p>
            <p><span className="font-medium text-zinc-500">Branch:</span> Satellite Ahmedabad</p>
            <p><span className="font-medium text-zinc-500">Acc Name:</span> Dream Decorators</p>
            <p><span className="font-medium text-zinc-500">Acc No:</span> 39590200000512</p>
            <p><span className="font-medium text-zinc-500">IFSC:</span> BARB0SATELL</p>
          </div>

          {/* UPI QR Box */}
          <div className="p-1 bg-white border border-zinc-200 rounded flex flex-col items-center">
            <QrCode className="h-8 w-8 text-zinc-800" />
            <span className="text-[6.5px] font-bold text-zinc-400 mt-0.5">Scan to Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
};
