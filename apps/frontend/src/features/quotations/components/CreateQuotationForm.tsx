'use client';

import React from 'react';
import { Plus, Trash2, User, Calendar, Hash, FileText } from 'lucide-react';
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

      {/* Dynamic Line Items Section */}
      <div className="glass-panel p-6 rounded-3xl space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-borderClr/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-txtPrimary">Line Items & Pricing</h3>
              <p className="text-[10px] text-txtSecondary mt-0.5">Add decor products, interior services, or custom items</p>
            </div>
          </div>

          <button
            onClick={onAddItem}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase tracking-widest">
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3 text-center w-24">Qty</th>
                <th className="px-4 py-3 text-right w-36">Unit Price (₹)</th>
                <th className="px-4 py-3 text-right w-28">GST Tax %</th>
                <th className="px-4 py-3 text-right w-36">Amount</th>
                <th className="px-4 py-3 text-center w-16">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderClr/20">
              {items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      placeholder="e.g. Italian Marble Dining Table"
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => onUpdateItem(item.id, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min={0}
                      value={item.unitPrice}
                      onChange={(e) => onUpdateItem(item.id, 'unitPrice', Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={item.taxPercent}
                      onChange={(e) => onUpdateItem(item.id, 'taxPercent', Number(e.target.value))}
                      className="w-full px-2 py-2 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                    >
                      <option value={0}>0%</option>
                      <option value={5}>5%</option>
                      <option value={12}>12%</option>
                      <option value={18}>18%</option>
                      <option value={28}>28%</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-xs font-black text-txtPrimary">
                      ₹{((item.quantity * item.unitPrice * (1 + item.taxPercent / 100)) || 0).toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      disabled={items.length === 1}
                      onClick={() => onRemoveItem(item.id)}
                      className="p-1.5 rounded-lg text-txtSecondary hover:text-danger hover:bg-danger/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Terms & Notes Section */}
      <div className="glass-panel p-6 rounded-3xl space-y-3">
        <label className="block text-xs font-bold text-txtPrimary uppercase tracking-wider">Terms & Notes for Client</label>
        <textarea
          rows={3}
          placeholder="e.g. 50% advance required before production begins. Valid for 15 days from issue date."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-4 py-3 text-xs rounded-2xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 transition-colors font-medium"
        />
      </div>
    </div>
  );
};
