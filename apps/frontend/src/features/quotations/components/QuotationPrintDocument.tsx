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
  customerPhone = '7016687499',
  customerAddress = '0, Business Hub, Satellite, Ahmedabad, Gujarat - 380015',
  customerGstin = '24AHBPV9744N1ZL',
  customerPan = 'AHBPV9744N',
  placeOfSupply = 'Gujarat ( 24 )',
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
    <div className="printable-area bg-white text-zinc-900 font-sans w-full max-w-[210mm] min-h-[297mm] mx-auto p-4 sm:p-5 flex flex-col justify-between shadow-2xl rounded-sm border border-zinc-300 text-[10px] leading-tight">
      <div>
        {/* Company Header Banner - Reference UI Style */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 text-white p-3.5 rounded-t-sm shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white text-blue-700 rounded-md font-black shadow">
                <Layers className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight leading-none">DREAM DECORATORS</h1>
                <p className="text-[9px] font-bold text-yellow-300 uppercase tracking-widest mt-0.5">
                  Experts of Luxury Interior & Decor
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[8px] font-bold">
                  <span className="bg-yellow-400 text-zinc-900 px-1.5 py-0.5 rounded uppercase">CURTAINS</span>
                  <span className="bg-yellow-400 text-zinc-900 px-1.5 py-0.5 rounded uppercase">FURNITURE</span>
                  <span className="bg-yellow-400 text-zinc-900 px-1.5 py-0.5 rounded uppercase">LIGHTING</span>
                </div>
              </div>
            </div>

            <div className="text-right text-[9px] space-y-0.5 font-medium">
              <p className="text-base font-black tracking-wide text-white">Rajesh Panchal <span className="text-[9px] text-yellow-300 font-bold uppercase">(Owner)</span></p>
              <p>+91 99 25 66 39 65 📞</p>
              <p>support@dreamdecorators.in 🌐</p>
              <p>Opp. Business Hub, Satellite, Gujarat 📍</p>
              <p className="mt-1 inline-block bg-yellow-400 text-zinc-900 font-black px-2 py-0.5 rounded tracking-wider">
                24AFJPP3546E1ZI
              </p>
            </div>
          </div>
        </div>

        {/* Quotation Title & Copy Type Badge */}
        <div className="flex justify-between items-center py-2 px-1 border-b border-zinc-300 my-1">
          <div></div>
          <h2 className="text-lg font-black text-blue-700 uppercase tracking-wide">Quotation</h2>
          <span className="text-[9px] font-extrabold uppercase tracking-widest text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-300">
            {copyType.toUpperCase()} COPY
          </span>
        </div>

        {/* Customer & Meta Box */}
        <div className="border border-zinc-400 rounded-sm mb-2 overflow-hidden text-[9.5px]">
          <div className="grid grid-cols-12 divide-x divide-zinc-400">
            {/* Customer Details - Left 7 cols */}
            <div className="col-span-7 p-2 bg-zinc-50/50">
              <span className="text-[8px] font-black text-blue-700 uppercase tracking-wider block mb-0.5">
                Customer Detail
              </span>
              <p className="text-xs font-black text-zinc-900">{customerName || 'Madhuvan Farm'}</p>
              <p className="text-zinc-600 font-medium">{customerAddress}</p>
              <div className="grid grid-cols-2 gap-x-2 mt-1 pt-1 border-t border-zinc-200">
                <p><span className="font-bold text-zinc-700">Phone:</span> {customerPhone}</p>
                <p><span className="font-bold text-zinc-700">GSTIN:</span> {customerGstin}</p>
                <p><span className="font-bold text-zinc-700">PAN:</span> {customerPan}</p>
                <p><span className="font-bold text-zinc-700">Place of Supply:</span> {placeOfSupply}</p>
              </div>
            </div>

            {/* Quotation Metadata - Right 5 cols */}
            <div className="col-span-5 grid grid-rows-3 divide-y divide-zinc-400 bg-white">
              <div className="p-1.5 flex justify-between items-center">
                <span className="font-bold text-zinc-600">Quotation No.</span>
                <span className="font-black text-zinc-900 text-xs">{quotationNumber}</span>
              </div>
              <div className="p-1.5 flex justify-between items-center">
                <span className="font-bold text-zinc-600">Quotation Date</span>
                <span className="font-bold text-zinc-900">{issueDate}</span>
              </div>
              <div className="p-1.5 flex justify-between items-center">
                <span className="font-bold text-zinc-600">Expired Date</span>
                <span className="font-bold text-blue-700">{validUntil}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="border border-zinc-400 rounded-sm mb-2 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900 text-white text-[8.5px] font-extrabold uppercase border-b border-zinc-400">
                <th className="p-1.5 border-r border-zinc-700 text-center w-8">Sr. No.</th>
                <th className="p-1.5 border-r border-zinc-700">Name of Product / Service</th>
                <th className="p-1.5 border-r border-zinc-700 text-center w-16">HSN / SAC</th>
                <th className="p-1.5 border-r border-zinc-700 text-center w-16">Qty</th>
                <th className="p-1.5 border-r border-zinc-700 text-right w-20">Rate</th>
                <th className="p-1.5 text-right w-24">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-300 text-[9.5px]">
              {items.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-zinc-50">
                  <td className="p-1.5 border-r border-zinc-300 text-center font-bold text-zinc-500">{idx + 1}</td>
                  <td className="p-1.5 border-r border-zinc-300 font-bold text-zinc-900">
                    <div>{item.description || 'Custom Interior Furniture'}</div>
                    <div className="text-[8px] text-zinc-500 font-normal italic mt-0.5">
                      Premium Teakwood / Velvet finish • Warranty 1 Year
                    </div>
                  </td>
                  <td className="p-1.5 border-r border-zinc-300 text-center font-medium text-zinc-700">84671900</td>
                  <td className="p-1.5 border-r border-zinc-300 text-center font-bold text-zinc-900">{item.quantity}.000 NOS</td>
                  <td className="p-1.5 border-r border-zinc-300 text-right font-medium text-zinc-800">{formatINR(item.unitPrice)}</td>
                  <td className="p-1.5 text-right font-black text-zinc-900">{formatINR(item.quantity * item.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
            {/* Table Totals Row */}
            <tfoot className="border-t border-zinc-400 bg-zinc-50 font-bold text-[9.5px]">
              <tr>
                <td colSpan={3} className="p-1.5 text-right border-r border-zinc-400 uppercase font-black">Total</td>
                <td className="p-1.5 text-center border-r border-zinc-400 font-black">{totalQty}.000 NOS</td>
                <td colSpan={2} className="p-1.5 text-right font-black text-blue-700 text-xs">
                  {formatINR(subtotal)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Financial Breakdown & Amounts in Words */}
        <div className="border border-zinc-400 rounded-sm p-2 mb-2 bg-zinc-50/50">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider block">
                Total in words (E & O.E.)
              </span>
              <p className="text-[9.5px] font-black text-zinc-900 uppercase tracking-tight bg-white px-2 py-1 border border-zinc-300 rounded">
                {numberToWordsINR(grandTotal)}
              </p>
            </div>

            <div className="w-56 space-y-1 text-right text-[9.5px]">
              <div className="flex justify-between">
                <span className="font-semibold text-zinc-600">Subtotal:</span>
                <span className="font-bold text-zinc-900">{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-zinc-600">CGST (9%):</span>
                <span className="font-bold text-zinc-900">{formatINR(cgstAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-zinc-600">SGST (9%):</span>
                <span className="font-bold text-zinc-900">{formatINR(sgstAmount)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span className="font-semibold">Discount:</span>
                  <span className="font-bold">-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-black text-blue-700 pt-1 border-t border-zinc-400">
                <span>Grand Total:</span>
                <span>{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* HSN / SAC Tax Summary Grid */}
        <div className="border border-zinc-400 rounded-sm mb-2 overflow-hidden text-[8.5px]">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-zinc-800 text-white font-bold uppercase border-b border-zinc-400">
                <th rowSpan={2} className="p-1 border-r border-zinc-600">HSN / SAC</th>
                <th rowSpan={2} className="p-1 border-r border-zinc-600">Total Amount</th>
                <th colSpan={2} className="p-1 border-r border-zinc-600">CGST</th>
                <th colSpan={2} className="p-1 border-r border-zinc-600">SGST</th>
                <th rowSpan={2} className="p-1">Total Tax</th>
              </tr>
              <tr className="bg-zinc-700 text-white font-bold border-b border-zinc-400">
                <th className="p-1 border-r border-zinc-600">%</th>
                <th className="p-1 border-r border-zinc-600">Amount</th>
                <th className="p-1 border-r border-zinc-600">%</th>
                <th className="p-1 border-r border-zinc-600">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-300 font-medium">
              <tr>
                <td className="p-1 border-r border-zinc-300 font-bold">84671900, 85015210</td>
                <td className="p-1 border-r border-zinc-300 font-bold">{formatINR(subtotal)}</td>
                <td className="p-1 border-r border-zinc-300">9.00</td>
                <td className="p-1 border-r border-zinc-300">{formatINR(cgstAmount)}</td>
                <td className="p-1 border-r border-zinc-300">9.00</td>
                <td className="p-1 border-r border-zinc-300">{formatINR(sgstAmount)}</td>
                <td className="p-1 font-bold text-zinc-900">{formatINR(taxAmount)}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-1.5 bg-zinc-100 border-t border-zinc-300 font-bold text-[8.5px]">
            <span className="text-zinc-500 uppercase">Total Tax in words: </span>
            <span className="text-zinc-900 uppercase font-black">{numberToWordsINR(taxAmount)}</span>
          </div>
        </div>

        {/* Terms & Bank Details Footer Grid */}
        <div className="border border-zinc-400 rounded-sm p-2 grid grid-cols-12 gap-3 bg-zinc-50/40 text-[8.5px]">
          {/* Terms & Conditions - Left 7 cols */}
          <div className="col-span-7 space-y-1">
            <span className="font-black text-zinc-900 uppercase tracking-wider block border-b border-zinc-300 pb-0.5">
              Terms & Conditions:
            </span>
            <ol className="list-decimal pl-3 space-y-0.5 text-zinc-700 font-medium">
              <li>Jurisdiction: Ahmedabad / Surat.</li>
              <li>Delivery: 3-5 weeks from advance payment receipt.</li>
              <li>Payment: 50% advance, 50% before final dispatch.</li>
              <li>Cancellation: 20% of advance is non-refundable.</li>
              <li>Motor & fabric rates finalized at time of order.</li>
            </ol>
          </div>

          {/* Bank Details & QR - Right 5 cols */}
          <div className="col-span-5 flex justify-between items-start border-l border-zinc-300 pl-3">
            <div className="space-y-0.5">
              <span className="font-black text-zinc-900 uppercase tracking-wider block border-b border-zinc-300 pb-0.5">
                Bank Details
              </span>
              <p><span className="font-bold text-zinc-600">Name:</span> Bank of Baroda</p>
              <p><span className="font-bold text-zinc-600">Branch:</span> Satellite Ahmedabad</p>
              <p><span className="font-bold text-zinc-600">Acc Name:</span> Dream Decorators</p>
              <p><span className="font-bold text-zinc-600">Acc No:</span> 39590200000512</p>
              <p><span className="font-bold text-zinc-600">IFSC:</span> BARB0SATELL</p>
            </div>

            {/* UPI QR Box */}
            <div className="p-1 bg-white border border-zinc-300 rounded shadow-xs flex flex-col items-center">
              <QrCode className="h-10 w-10 text-zinc-900" />
              <span className="text-[7px] font-bold text-zinc-500 mt-0.5">Scan to Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Authorized Signature Footer */}
      <div className="pt-3 border-t border-zinc-300 mt-2 flex justify-between items-end text-[8.5px]">
        <div>
          <p className="font-bold text-zinc-500">Authorized Contact</p>
          <p className="font-black text-zinc-900">support@dreamdecorators.in • +91 99 25 66 39 65</p>
        </div>

        <div className="text-center">
          <div className="w-32 border-b border-zinc-500 mb-0.5"></div>
          <p className="font-black text-zinc-700 uppercase tracking-widest">
            Authorized Signature
          </p>
        </div>
      </div>
    </div>
  );
};
