'use client';

import React from 'react';
import {
  Building2,
  FileText,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Phone,
  User,
  Receipt,
  ShoppingBag,
} from 'lucide-react';
import { PlaceOfSupplySelect } from '@/features/quotations/components/PlaceOfSupplySelect';

export interface PurchaseItem {
  id: string;
  description: string;
  itemNotes?: string;
  hsnCode?: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  discount?: number;
  taxPercent: number;
  total: number;
}

interface CreatePurchaseFormProps {
  vendorName: string;
  setVendorName: (val: string) => void;
  contactPerson: string;
  setContactPerson: (val: string) => void;
  vendorPhone: string;
  setVendorPhone: (val: string) => void;
  vendorAddress: string;
  setVendorAddress: (val: string) => void;
  vendorGstin: string;
  setVendorGstin: (val: string) => void;
  placeOfSupply: string;
  setPlaceOfSupply: (val: string) => void;
  purchaseInvoiceNo: string;
  setPurchaseInvoiceNo: (val: string) => void;
  poNumber: string;
  setPoNumber: (val: string) => void;
  issueDate: string;
  setIssueDate: (val: string) => void;
  dueDate: string;
  setDueDate: (val: string) => void;
  paymentTerms: string;
  setPaymentTerms: (val: string) => void;
  items: PurchaseItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof PurchaseItem, val: any) => void;
}

const uomOptions = ['NOS', 'SQFT', 'MTR', 'KG', 'SET', 'RFT', 'BOX', 'PCS'];

export const CreatePurchaseForm: React.FC<CreatePurchaseFormProps> = ({
  vendorName,
  setVendorName,
  contactPerson,
  setContactPerson,
  vendorPhone,
  setVendorPhone,
  vendorAddress,
  setVendorAddress,
  vendorGstin,
  setVendorGstin,
  placeOfSupply,
  setPlaceOfSupply,
  purchaseInvoiceNo,
  setPurchaseInvoiceNo,
  poNumber,
  setPoNumber,
  issueDate,
  setIssueDate,
  dueDate,
  setDueDate,
  paymentTerms,
  setPaymentTerms,
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}) => {
  return (
    <div className="space-y-6">
      {/* 2-Column Grid: Vendor Details & Purchase Metadata */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Vendor Information */}
        <div className="lg:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderClr/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-txtPrimary">Vendor Information</h3>
                <p className="text-[10px] text-txtSecondary">Supplier billing details and GST origin state</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full">
              Inward Supplier
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Vendor Company Name */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                1. Vendor / Supplier Name
              </label>
              <input
                type="text"
                placeholder="e.g. Apex Hardware & Fabrics"
                value={vendorName}
                onChange={(e) => setVendorName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 2. Contact Person */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                2. Contact Person
              </label>
              <input
                type="text"
                placeholder="e.g. Mr. Sureshbhai Patel"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 3. Phone No */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                3. Phone No
              </label>
              <input
                type="text"
                placeholder="+91 98250 11223"
                value={vendorPhone}
                onChange={(e) => setVendorPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 4. GSTIN / PAN */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                4. Vendor GSTIN / PAN
              </label>
              <input
                type="text"
                placeholder="24AHBPK8912E1Z2"
                value={vendorGstin}
                onChange={(e) => setVendorGstin(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold uppercase focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 5. Address */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                5. Supplier Address
              </label>
              <input
                type="text"
                placeholder="Industrial Area, GIDC Naroda, Ahmedabad"
                value={vendorAddress}
                onChange={(e) => setVendorAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 6. Place of Supply * Dropdown Component */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                6. Place of Supply *
              </label>
              <PlaceOfSupplySelect value={placeOfSupply} onChange={setPlaceOfSupply} />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Purchase Metadata */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderClr/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-txtPrimary">Purchase Invoice Details</h3>
                <p className="text-[10px] text-txtSecondary">Vendor invoice no, PO reference & inward date</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Vendor Invoice No */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                Vendor Invoice Number *
              </label>
              <input
                type="text"
                value={purchaseInvoiceNo}
                placeholder="e.g. APEX-INV-9901"
                onChange={(e) => setPurchaseInvoiceNo(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-black focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* PO Reference */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                Purchase Order (PO) Ref
              </label>
              <input
                type="text"
                placeholder="e.g. PO-2026-044"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Inward Date & Due Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                  Inward Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-txtSecondary/60" />
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                  Payment Due Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-txtSecondary/60" />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full pl-9 pr-2 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                  />
                </div>
              </div>
            </div>

            {/* Payment Terms Dropdown */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                Vendor Credit Terms
              </label>
              <select
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer"
              >
                <option value="Immediate Cash / UPI">Immediate Cash / UPI</option>
                <option value="Net 15 Days Credit">Net 15 Days Credit</option>
                <option value="Net 30 Days Credit">Net 30 Days Credit</option>
                <option value="50% Advance, 50% Credit">50% Advance, 50% Credit</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Items Table Section - Reference Layout */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-borderClr/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-txtPrimary">Inward Purchased Items</h3>
              <p className="text-[10px] text-txtSecondary">Record raw materials, fabrics, hardware, and inward GST ITC tax rates</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-hoverBg/60 border border-borderClr/40 text-xs">
              <span className="text-[10px] font-bold text-txtSecondary">Discount :</span>
              <div className="inline-flex p-0.5 rounded-lg bg-cardBg border border-borderClr/30">
                <button type="button" className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-primary text-white shadow-xs">
                  ₹
                </button>
                <button type="button" className="px-2 py-0.5 text-[10px] font-bold rounded-md text-txtSecondary hover:text-txtPrimary transition-colors">
                  %
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onAddItem}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer ml-1"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Item
            </button>
          </div>
        </div>

        {/* 10 Column Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
            <thead>
              <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase tracking-wider">
                <th className="px-2 py-2.5 text-center w-[3%]">SR.</th>
                <th className="px-2 py-2.5 text-left w-[28%]">PRODUCT / RAW MATERIAL</th>
                <th className="px-2 py-2.5 text-center w-[10%]">HSN/SAC CODE</th>
                <th className="px-2 py-2.5 text-center w-[8%]">QTY.</th>
                <th className="px-2 py-2.5 text-center w-[8%]">UOM</th>
                <th className="px-2 py-2.5 text-right w-[12%]">PURCHASE PRICE (₹)</th>
                <th className="px-2 py-2.5 text-right w-[9%]">DISCOUNT</th>
                <th className="px-2 py-2.5 text-right w-[10%]">CGST + SGST (ITC)</th>
                <th className="px-2 py-2.5 text-right w-[11%]">TOTAL (₹)</th>
                <th className="px-2 py-2.5 text-center w-[3%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderClr/20 text-xs">
              {items.map((item, idx) => {
                const qty = item.quantity || 0;
                const price = item.unitPrice || 0;
                const disc = item.discount || 0;
                const lineSub = Math.max(0, qty * price - disc);
                const taxP = typeof item.taxPercent === 'number' ? item.taxPercent : 0;
                const lineTotal = (qty || price || disc) ? lineSub * (1 + taxP / 100) : 0;

                return (
                  <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                    <td className="px-2 py-2.5 text-center font-bold text-txtSecondary align-top pt-3 text-[11px] w-[3%]">
                      {idx + 1}
                    </td>

                    <td className="px-2 py-2.5 space-y-1.5 w-[28%] align-top">
                      <input
                        type="text"
                        placeholder="Enter Material / Item Name"
                        value={item.description}
                        onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-bold"
                      />
                      <textarea
                        rows={2}
                        placeholder="Item Note & Specifications..."
                        value={item.itemNotes || ''}
                        onChange={(e) => onUpdateItem(item.id, 'itemNotes', e.target.value)}
                        className="w-full px-2.5 py-1.5 min-h-[50px] text-[10px] rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-txtSecondary placeholder:text-txtSecondary/50 focus:outline-none focus:border-amber-500/50 font-medium resize-y"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[10%]">
                      <input
                        type="text"
                        placeholder="HSN/SAC"
                        value={item.hsnCode || ''}
                        onChange={(e) => onUpdateItem(item.id, 'hsnCode', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[8%]">
                      <input
                        type="number"
                        min={1}
                        placeholder="Qty."
                        value={item.quantity || ''}
                        onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-1.5 py-1.5 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[8%]">
                      <select
                        value={item.uom || 'NOS'}
                        onChange={(e) => onUpdateItem(item.id, 'uom', e.target.value)}
                        className="w-full px-1.5 py-1.5 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer"
                      >
                        {uomOptions.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-2 py-2.5 align-top w-[12%]">
                      <input
                        type="number"
                        min={0}
                        placeholder="Price"
                        value={item.unitPrice || ''}
                        onChange={(e) => onUpdateItem(item.id, 'unitPrice', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[9%]">
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={item.discount || ''}
                        onChange={(e) => onUpdateItem(item.id, 'discount', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-1.5 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[10%]">
                      <select
                        value={item.taxPercent !== undefined && item.taxPercent !== null && item.taxPercent !== ('' as any) ? item.taxPercent : ''}
                        onChange={(e) => onUpdateItem(item.id, 'taxPercent', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-1.5 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer"
                      >
                        <option value="">Select Tax</option>
                        <option value={0}>0%</option>
                        <option value={18}>18% (9+9)</option>
                        <option value={12}>12% (6+6)</option>
                        <option value={5}>5% (2.5+2.5)</option>
                        <option value={28}>28% (14+14)</option>
                      </select>
                    </td>

                    <td className="px-2 py-2.5 text-right align-top pt-3 w-[11%] font-black text-txtPrimary tracking-tight">
                      {lineTotal > 0 ? `₹${lineTotal.toLocaleString('en-IN')}` : 'Total'}
                    </td>

                    <td className="px-2 py-2.5 text-center align-top pt-2 w-[3%]">
                      <button
                        type="button"
                        disabled={items.length === 1}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 rounded-lg text-txtSecondary hover:text-danger hover:bg-danger/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Bottom Summary Footer Row */}
            <tfoot>
              {(() => {
                const totalQty = items.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
                const subtotalSum = items.reduce((acc, curr) => acc + Math.max(0, (curr.quantity || 0) * (curr.unitPrice || 0)), 0);
                const discountSum = items.reduce((acc, curr) => acc + (curr.discount || 0), 0);
                const taxSum = items.reduce((acc, curr) => {
                  const lineSub = Math.max(0, (curr.quantity || 0) * (curr.unitPrice || 0) - (curr.discount || 0));
                  const taxP = typeof curr.taxPercent === 'number' ? curr.taxPercent : 0;
                  return acc + lineSub * (taxP / 100);
                }, 0);
                const grandTotalSum = items.reduce((acc, curr) => {
                  const lineSub = Math.max(0, (curr.quantity || 0) * (curr.unitPrice || 0) - (curr.discount || 0));
                  const taxP = typeof curr.taxPercent === 'number' ? curr.taxPercent : 0;
                  return acc + lineSub * (1 + taxP / 100);
                }, 0);

                return (
                  <tr className="bg-indigo-500/5 dark:bg-indigo-500/10 border-t-2 border-indigo-500/20 text-xs font-black text-txtPrimary">
                    <td colSpan={3} className="px-3 py-3 text-right uppercase tracking-wider font-extrabold text-indigo-500">
                      Total Purchase Val
                    </td>
                    <td className="px-2 py-3 text-center text-txtPrimary font-extrabold">
                      {totalQty > 0 ? totalQty : 0}
                    </td>
                    <td className="px-2 py-3 text-center text-txtSecondary font-medium">--</td>
                    <td className="px-2 py-3 text-right text-txtPrimary">
                      {subtotalSum > 0 ? `₹${subtotalSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-txtPrimary">
                      {discountSum > 0 ? `₹${discountSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-txtPrimary">
                      {taxSum > 0 ? `₹${taxSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-indigo-500 text-sm font-black">
                      {grandTotalSum > 0 ? `₹${grandTotalSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td></td>
                  </tr>
                );
              })()}
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
