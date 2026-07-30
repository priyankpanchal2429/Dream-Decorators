'use client';

import React, { useState } from 'react';
import { CreditCard, User, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { PaymentTransaction } from '../types';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PaymentTransaction>) => void;
}

export const RecordPaymentModal: React.FC<RecordPaymentModalProps> = ({ isOpen, onClose, onSave }) => {
  const [type, setType] = useState<'RECEIVED' | 'PAID'>('RECEIVED');
  const [partyName, setPartyName] = useState('');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'NEFT/RTGS' | 'CHEQUE' | 'CASH'>('UPI');
  const [date, setDate] = useState('2026-07-30');
  const [amount, setAmount] = useState('');
  const [txnRef, setTxnRef] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partyName.trim()) return;

    onSave({
      txnRef: txnRef || `TXN-2026-${Math.floor(100 + Math.random() * 900)}`,
      type,
      partyName,
      date,
      paymentMode,
      amount: parseFloat(amount) || 50000,
      status: 'SUCCESS',
    });

    setPartyName('');
    setAmount('');
    setTxnRef('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Record Payment Transaction"
      description="Add incoming client collection entry or outgoing vendor payout."
      icon={<CreditCard className="h-5 w-5 text-purple-500" />}
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
            className="px-5 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs shadow-lg shadow-purple-500/20 transition-all"
          >
            Record Payment
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        {/* Type Switcher */}
        <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-hoverBg/60 border border-borderClr/30">
          <button
            type="button"
            onClick={() => setType('RECEIVED')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              type === 'RECEIVED'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-txtSecondary hover:text-txtPrimary'
            }`}
          >
            <ArrowDownLeft className="h-4 w-4" />
            RECEIVED (Client Collection)
          </button>
          <button
            type="button"
            onClick={() => setType('PAID')}
            className={`flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
              type === 'PAID'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-txtSecondary hover:text-txtPrimary'
            }`}
          >
            <ArrowUpRight className="h-4 w-4" />
            PAID (Vendor Payout)
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
            Party Name (Client / Vendor) *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma or Gujarat Teak Traders"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-purple-500/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Payment Mode
            </label>
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            >
              <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
              <option value="NEFT/RTGS">NEFT / RTGS / IMPS</option>
              <option value="CHEQUE">Cheque</option>
              <option value="CASH">Cash</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Amount (₹) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 50000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Txn Reference / UTR #
            </label>
            <input
              type="text"
              placeholder="e.g. UTR948201"
              value={txnRef}
              onChange={(e) => setTxnRef(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>
        </div>
      </form>
    </Drawer>
  );
};
