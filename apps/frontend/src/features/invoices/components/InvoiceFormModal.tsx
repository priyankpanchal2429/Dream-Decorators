'use client';

import React, { useState } from 'react';
import { Receipt, User } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { SalesInvoice } from '../types';

interface InvoiceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<SalesInvoice>) => void;
}

export const InvoiceFormModal: React.FC<InvoiceFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [customerName, setCustomerName] = useState('Aarav Sharma');
  const [invoiceDate, setInvoiceDate] = useState('2026-07-30');
  const [dueDate, setDueDate] = useState('2026-08-15');
  const [itemDescription, setItemDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'PAID' | 'PARTIAL' | 'OVERDUE'>('PARTIAL');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) || 125000;

    onSave({
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      issueDate: invoiceDate,
      invoiceDate,
      dueDate,
      totalAmount: numAmount,
      balanceDue: status === 'PAID' ? 0 : status === 'PARTIAL' ? Math.round(numAmount * 0.4) : numAmount,
      status,
    });

    setItemDescription('');
    setAmount('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Create Sales Invoice"
      description="Generate tax invoice for client billing and decor installations."
      icon={<Receipt className="h-5 w-5 text-emerald-500" />}
      maxWidth="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-txtSecondary hover:bg-hoverBg transition-colors font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all"
          >
            Generate Invoice
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        <div>
          <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
            Customer / Client Name *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-emerald-500/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Invoice Date
            </label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Payment Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
            Item Description / Services
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Custom Teak Wood Living Room Furniture & Italian Marble Installation"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Total Amount Incl. GST (₹) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 126620"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Payment Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            >
              <option value="PARTIAL">PARTIAL (Deposit Paid)</option>
              <option value="PAID">PAID (Full Payment)</option>
              <option value="OVERDUE">OVERDUE (Unpaid)</option>
            </select>
          </div>
        </div>
      </form>
    </Drawer>
  );
};
