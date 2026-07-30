'use client';

import React from 'react';
import { Plus, Trash2, User, FileText, Hash } from 'lucide-react';
import { QuotationItem } from '../types';

interface CreateQuotationFormProps {
  customerName: string;
  setCustomerName: (val: string) => void;
  customerEmail: string;
  setCustomerEmail: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  quotationNumber: string;
  setQuotationNumber: (val: string) => void;
  issueDate: string;
  setIssueDate: (val: string) => void;
  validUntil: string;
  setValidUntil: (val: string) => void;
  items: QuotationItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof QuotationItem, val: any) => void;
  notes: string;
  setNotes: (val: string) => void;
}

export const CreateQuotationForm: React.FC<CreateQuotationFormProps> = ({
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  customerPhone,
  setCustomerPhone,
  quotationNumber,
  setQuotationNumber,
  issueDate,
  setIssueDate,
  validUntil,
  setValidUntil,
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  notes,
  setNotes,
}) => {
  const uomOptions = ['NOS', 'SQFT', 'MTR', 'PCS', 'SET', 'LOT', 'BOX', 'KG'];

  return (
    <div className="space-y-6">
      {/* Client & General Info Card */}
      <div className="glass-panel p-6 rounded-3xl space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-borderClr/30">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">Client & Proposal Details</h3>
            <p className="text-[10px] text-txtSecondary mt-0.5">Enter recipient contact details and quotation validity</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">Client Name *</label>
            <input
              type="text"
              placeholder="e.g. Aarav Sharma"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 transition-colors font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">Client Email *</label>
            <input
              type="email"
              placeholder="aarav@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 transition-colors font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">Phone Number</label>
            <input
              type="text"
              placeholder="+91 98765 43210"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 transition-colors font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">Quote Number</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-txtSecondary" />
              <input
                type="text"
                value={quotationNumber}
                onChange={(e) => setQuotationNumber(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">Issue Date</label>
            <input
              type="date"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">Valid Until</label>
            <input
              type="date"
              value={validUntil}
              onChange={(e) => setValidUntil(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Line Items & Pricing Table Section */}
      <div className="glass-panel p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-borderClr/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-txtPrimary">Line Items & Pricing</h3>
              <p className="text-[10px] text-txtSecondary mt-0.5">Manage products, expandable item notes, HSN/SAC codes, UOM, and GST tax calculations</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAddItem}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* 9 Column Table: SR. | PRODUCT / OTHER CHARGES | HSN/SAC CODE | QTY. | UOM | PRICE | DISCOUNT | CGST + SGST | TOTAL */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[980px]">
            <thead>
              <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase tracking-wider">
                <th className="px-3 py-3 text-center w-10">SR.</th>
                <th className="px-3 py-3 w-[280px]">PRODUCT / OTHER CHARGES</th>
                <th className="px-3 py-3 text-center w-28">HSN/SAC CODE</th>
                <th className="px-3 py-3 text-center w-20">QTY.</th>
                <th className="px-3 py-3 text-center w-24">UOM</th>
                <th className="px-3 py-3 text-right w-28">PRICE (₹)</th>
                <th className="px-3 py-3 text-right w-24">DISCOUNT</th>
                <th className="px-3 py-3 text-right w-36">CGST + SGST</th>
                <th className="px-3 py-3 text-right w-36">TOTAL (₹)</th>
                <th className="px-3 py-3 text-center w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderClr/20 text-xs">
              {items.map((item, idx) => {
                const qty = item.quantity || 0;
                const price = item.unitPrice || 0;
                const disc = item.discount || 0;
                const lineSub = Math.max(0, qty * price - disc);
                const lineTotal = lineSub * (1 + (item.taxPercent || 0) / 100);

                return (
                  <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                    {/* SR. - Top Aligned */}
                    <td className="px-3 py-3 text-center font-bold text-txtSecondary align-top pt-4">
                      {idx + 1}
                    </td>

                    {/* PRODUCT / OTHER CHARGES + EXPANDABLE ITEM NOTES */}
                    <td className="px-3 py-3 space-y-2 w-[280px] align-top">
                      <input
                        type="text"
                        placeholder="Item Title (e.g. Custom Velvet Curtains)"
                        value={item.description}
                        onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-bold"
                      />
                      {/* Expandable Adjustable Textarea for Item Notes */}
                      <textarea
                        rows={2}
                        placeholder="Item notes & specs (expandable)..."
                        value={item.itemNotes || ''}
                        onChange={(e) => onUpdateItem(item.id, 'itemNotes', e.target.value)}
                        className="w-full px-3 py-1.5 text-[11px] rounded-xl bg-hoverBg/30 border border-borderClr/20 text-txtSecondary placeholder:text-txtSecondary/50 focus:outline-none focus:border-primary/40 font-medium resize-y"
                      />
                    </td>

                    {/* HSN/SAC CODE - Top Aligned with Item Title Input */}
                    <td className="px-3 py-3 align-top">
                      <input
                        type="text"
                        placeholder="94036000"
                        value={item.hsnCode || '94036000'}
                        onChange={(e) => onUpdateItem(item.id, 'hsnCode', e.target.value)}
                        className="w-full px-2 py-2 text-xs text-center rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    {/* QTY. - Top Aligned */}
                    <td className="px-3 py-3 align-top">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
                        className="w-full px-2 py-2 text-xs text-center rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    {/* UOM - Top Aligned */}
                    <td className="px-3 py-3 align-top">
                      <select
                        value={item.uom || 'NOS'}
                        onChange={(e) => onUpdateItem(item.id, 'uom', e.target.value)}
                        className="w-full px-2 py-2 text-xs text-center rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      >
                        {uomOptions.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* PRICE - Top Aligned */}
                    <td className="px-3 py-3 align-top">
                      <input
                        type="number"
                        min={0}
                        value={item.unitPrice}
                        onChange={(e) => onUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                        className="w-full px-2.5 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    {/* DISCOUNT - Top Aligned */}
                    <td className="px-3 py-3 align-top">
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={item.discount || 0}
                        onChange={(e) => onUpdateItem(item.id, 'discount', Number(e.target.value))}
                        className="w-full px-2 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    {/* CGST + SGST - Top Aligned */}
                    <td className="px-3 py-3 align-top">
                      <select
                        value={item.taxPercent}
                        onChange={(e) => onUpdateItem(item.id, 'taxPercent', Number(e.target.value))}
                        className="w-full px-2 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      >
                        <option value={18}>9% - 9%</option>
                        <option value={12}>6% - 6%</option>
                        <option value={5}>2.5% - 2.5%</option>
                        <option value={28}>14% - 14%</option>
                        <option value={0}>0% - 0%</option>
                      </select>
                    </td>

                    {/* TOTAL (₹) - TOP ALIGNED WITH ITEM TITLE */}
                    <td className="px-3 py-3 text-right align-top pt-4">
                      <span className="text-sm font-black text-txtPrimary tracking-tight">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* ACTION - Top Aligned */}
                    <td className="px-3 py-3 text-center align-top pt-3">
                      <button
                        type="button"
                        disabled={items.length === 1}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1.5 rounded-lg text-txtSecondary hover:text-danger hover:bg-danger/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
