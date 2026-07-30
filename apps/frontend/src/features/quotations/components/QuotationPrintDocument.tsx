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
    <div className="printable-area bg-white text-zinc-900 font-sans w-full max-w-[210mm] min-h-[297mm] mx-auto p-6 flex flex-col justify-between shadow-2xl rounded-sm border border-zinc-200 text-xs leading-tight">
      <div>
        {/* Top Header Banner - Clean Modern Branding */}
        <div className="flex justify-between items-start pb-5 border-b-2 border-indigo-900">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-indigo-700 to-primary text-white rounded-xl shadow-md">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight text-zinc-900 leading-none uppercase">
                DREAM DECORATORS
              </h1>
              <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider mt-1">
                Luxury Interior & Architectural Decor
              </p>
              <p className="text-[9px] text-zinc-500 mt-1">
                GSTIN: <span className="font-bold text-zinc-700">24AAACD1234E1Z5</span> • Tel: <span className="font-bold text-zinc-700">+91 98765 43210</span> • Email: <span className="font-bold text-zinc-700">info@dreamdecorators.com</span>
              </p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-wider rounded-md border border-indigo-200">
              QUOTATION / ESTIMATE
            </span>
            <p className="text-sm font-black text-zinc-900">{quotationNumber}</p>
            <span className="inline-block text-[9px] font-extrabold uppercase tracking-widest text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {copyType} COPY
            </span>
          </div>
        </div>

        {/* Client & Metadata Info Grid */}
        <div className="grid grid-cols-12 gap-4 my-5">
          {/* Customer Details - 7 cols */}
          <div className="col-span-7 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider block mb-1">
              Billed / Prepared For
            </span>
            <p className="text-xs font-black text-zinc-900">{customerName || 'Aarav Sharma'}</p>
            <p className="text-[10px] text-zinc-600 font-medium mt-0.5">{customerEmail || 'aarav.sharma@example.com'}</p>
            <p className="text-[10px] text-zinc-600 font-medium">{customerAddress}</p>
            <div className="grid grid-cols-2 gap-x-2 mt-2 pt-2 border-t border-zinc-200/80 text-[9.5px]">
              <p><span className="font-bold text-zinc-500">Phone:</span> <span className="font-semibold text-zinc-800">{customerPhone}</span></p>
              <p><span className="font-bold text-zinc-500">GSTIN:</span> <span className="font-semibold text-zinc-800">{customerGstin}</span></p>
              <p><span className="font-bold text-zinc-500">PAN:</span> <span className="font-semibold text-zinc-800">{customerPan}</span></p>
              <p><span className="font-bold text-zinc-500">State:</span> <span className="font-semibold text-zinc-800">{placeOfSupply}</span></p>
            </div>
          </div>

          {/* Quotation Details - 5 cols */}
          <div className="col-span-5 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-2 text-[10px]">
            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-wider block mb-1">
              Quotation Meta
            </span>
            <div className="flex justify-between items-center">
              <span className="font-bold text-zinc-500">Issue Date:</span>
              <span className="font-extrabold text-zinc-900">{issueDate}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-zinc-500">Valid Until:</span>
              <span className="font-extrabold text-indigo-600">{validUntil}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-zinc-500">Payment Terms:</span>
              <span className="font-extrabold text-zinc-900">50% Advance</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-zinc-500">Status:</span>
              <span className="font-extrabold text-emerald-600 uppercase">PROPOSAL READY</span>
            </div>
          </div>
        </div>

        {/* Itemized Line Items Table */}
        <div className="overflow-hidden border border-zinc-300 rounded-xl my-5 shadow-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white text-[9px] font-black uppercase tracking-wider">
                <th className="px-3.5 py-2.5 w-10 text-center">#</th>
                <th className="px-3.5 py-2.5">Name of Product / Service</th>
                <th className="px-3.5 py-2.5 text-center w-20">HSN / SAC</th>
                <th className="px-3.5 py-2.5 text-center w-14">Qty</th>
                <th className="px-3.5 py-2.5 text-right w-24">Rate (₹)</th>
                <th className="px-3.5 py-2.5 text-right w-16">GST %</th>
                <th className="px-3.5 py-2.5 text-right w-28">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 text-[10.5px]">
              {items.map((item, idx) => (
                <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'}>
                  <td className="px-3.5 py-3 text-center font-bold text-zinc-400">{idx + 1}</td>
                  <td className="px-3.5 py-3">
                    <span className="font-black text-zinc-900 block">{item.description || 'Custom Interior Furniture'}</span>
                    <span className="text-[8.5px] text-zinc-500 font-normal italic">High Grade Material • 1 Year Warranty</span>
                  </td>
                  <td className="px-3.5 py-3 text-center font-medium text-zinc-600">94036000</td>
                  <td className="px-3.5 py-3 text-center font-bold text-zinc-900">{item.quantity} NOS</td>
                  <td className="px-3.5 py-3 text-right font-semibold text-zinc-800">{formatINR(item.unitPrice)}</td>
                  <td className="px-3.5 py-3 text-right font-medium text-zinc-600">{item.taxPercent}%</td>
                  <td className="px-3.5 py-3 text-right font-black text-zinc-900">
                    {formatINR(item.quantity * item.unitPrice * (1 + item.taxPercent / 100))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-zinc-100 font-bold text-[10px] border-t-2 border-zinc-300">
              <tr>
                <td colSpan={3} className="px-3.5 py-2 text-right uppercase font-black">Total Quantity:</td>
                <td className="px-3.5 py-2 text-center font-black">{totalQty} NOS</td>
                <td colSpan={3} className="px-3.5 py-2 text-right font-black text-indigo-700 text-xs">
                  {formatINR(subtotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Financial Summary & Amount in Words Grid */}
        <div className="grid grid-cols-12 gap-4 my-5">
          {/* Amount in Words - 7 cols */}
          <div className="col-span-7 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5">
            <span className="text-[8.5px] font-black text-zinc-400 uppercase tracking-widest block">
              Total Amount in Words (E & O.E.)
            </span>
            <p className="text-[10px] font-black text-zinc-900 uppercase tracking-tight bg-white p-2.5 border border-zinc-300 rounded-lg">
              {numberToWordsINR(grandTotal)}
            </p>
          </div>

          {/* Financial Totals Math - 5 cols */}
          <div className="col-span-5 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 space-y-1.5 text-[10.5px]">
            <div className="flex justify-between text-zinc-600">
              <span className="font-semibold">Subtotal:</span>
              <span className="font-bold text-zinc-900">{formatINR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span className="font-semibold">CGST (9%):</span>
              <span className="font-bold text-zinc-900">{formatINR(cgstAmount)}</span>
            </div>
            <div className="flex justify-between text-zinc-600">
              <span className="font-semibold">SGST (9%):</span>
              <span className="font-bold text-zinc-900">{formatINR(sgstAmount)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-rose-600">
                <span className="font-semibold">Discount:</span>
                <span className="font-bold">-{formatINR(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs font-black text-zinc-900 pt-2 border-t-2 border-zinc-900 mt-1">
              <span>Final Payable:</span>
              <span className="text-indigo-600 text-sm font-black">{formatINR(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* HSN / SAC Tax Summary Grid */}
        <div className="border border-zinc-300 rounded-xl mb-4 overflow-hidden text-[9px]">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white font-bold uppercase">
                <th rowSpan={2} className="p-1.5 border-r border-zinc-700">HSN / SAC</th>
                <th rowSpan={2} className="p-1.5 border-r border-zinc-700">Taxable Value</th>
                <th colSpan={2} className="p-1.5 border-r border-zinc-700">CGST</th>
                <th colSpan={2} className="p-1.5 border-r border-zinc-700">SGST</th>
                <th rowSpan={2} className="p-1.5">Total Tax</th>
              </tr>
              <tr className="bg-zinc-800 text-white font-bold border-t border-zinc-700">
                <th className="p-1 border-r border-zinc-700">%</th>
                <th className="p-1 border-r border-zinc-700">Amount</th>
                <th className="p-1 border-r border-zinc-700">%</th>
                <th className="p-1 border-r border-zinc-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 font-medium">
              <tr>
                <td className="p-1.5 border-r border-zinc-300 font-bold">94036000</td>
                <td className="p-1.5 border-r border-zinc-300 font-bold">{formatINR(subtotal)}</td>
                <td className="p-1.5 border-r border-zinc-300">9.00</td>
                <td className="p-1.5 border-r border-zinc-300">{formatINR(cgstAmount)}</td>
                <td className="p-1.5 border-r border-zinc-300">9.00</td>
                <td className="p-1.5 border-r border-zinc-300">{formatINR(sgstAmount)}</td>
                <td className="p-1.5 font-bold text-zinc-900">{formatINR(taxAmount)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Terms & Bank Details Footer Grid */}
        <div className="grid grid-cols-12 gap-4 p-3.5 bg-zinc-50 rounded-xl border border-zinc-200 text-[9px] my-3">
          {/* Terms & Conditions - 7 cols */}
          <div className="col-span-7 space-y-1">
            <span className="font-black text-zinc-900 uppercase tracking-wider block border-b border-zinc-200 pb-0.5">
              Terms & Conditions:
            </span>
            <ol className="list-decimal pl-3 space-y-0.5 text-zinc-600 font-medium">
              <li>Jurisdiction: Ahmedabad, Gujarat.</li>
              <li>Delivery: 3-4 weeks from advance payment receipt.</li>
              <li>Payment terms: 50% advance, 50% prior to dispatch.</li>
              <li>Cancellation: 20% of advance is non-refundable.</li>
            </ol>
          </div>

          {/* Bank Details & QR - 5 cols */}
          <div className="col-span-5 flex justify-between items-start border-l border-zinc-200 pl-3">
            <div className="space-y-0.5">
              <span className="font-black text-zinc-900 uppercase tracking-wider block border-b border-zinc-200 pb-0.5">
                Bank Details
              </span>
              <p><span className="font-bold text-zinc-500">Bank:</span> Bank of Baroda</p>
              <p><span className="font-bold text-zinc-500">Branch:</span> Satellite Ahmedabad</p>
              <p><span className="font-bold text-zinc-500">Acc Name:</span> Dream Decorators</p>
              <p><span className="font-bold text-zinc-500">Acc No:</span> 39590200000512</p>
              <p><span className="font-bold text-zinc-500">IFSC:</span> BARB0SATELL</p>
            </div>

            {/* UPI QR Box */}
            <div className="p-1 bg-white border border-zinc-300 rounded-lg shadow-xs flex flex-col items-center">
              <QrCode className="h-9 w-9 text-zinc-900" />
              <span className="text-[7px] font-bold text-zinc-500 mt-0.5">Scan to Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Signature Footer */}
      <div className="pt-4 border-t border-zinc-300 flex justify-between items-end text-[9px] mt-auto">
        <div>
          <p className="font-bold text-zinc-400 uppercase tracking-wider">Authorized Contact</p>
          <p className="font-black text-zinc-900 mt-0.5">info@dreamdecorators.com • +91 98765 43210</p>
        </div>

        <div className="text-center">
          <div className="w-36 border-b border-zinc-500 mb-1"></div>
          <p className="font-black text-zinc-700 uppercase tracking-widest">
            Authorized Signature
          </p>
        </div>
      </div>
    </div>
  );
};
