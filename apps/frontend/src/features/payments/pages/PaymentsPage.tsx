'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Search, Plus, ArrowUpRight, ArrowDownLeft, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { RecordPaymentModal } from '../components/RecordPaymentModal';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    {
      id: 'tx-1',
      txnRef: 'TXN-2026-991',
      type: 'RECEIVED',
      partyName: 'Aarav Sharma',
      date: '2026-07-28',
      paymentMode: 'UPI',
      amount: 126620,
      status: 'SUCCESS',
    },
    {
      id: 'tx-2',
      txnRef: 'TXN-2026-992',
      type: 'PAID',
      partyName: 'Gujarat Teak Traders',
      date: '2026-07-26',
      paymentMode: 'NEFT/RTGS',
      amount: 450000,
      status: 'SUCCESS',
    },
    {
      id: 'tx-3',
      txnRef: 'TXN-2026-993',
      type: 'RECEIVED',
      partyName: 'Ananya Patel',
      date: '2026-07-25',
      paymentMode: 'NEFT/RTGS',
      amount: 250000,
      status: 'SUCCESS',
    },
  ]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch =
        tx.txnRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.partyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'ALL' || tx.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, selectedType]);

  const totalReceived = useMemo(
    () => transactions.filter((t) => t.type === 'RECEIVED').reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );
  const totalPaid = useMemo(
    () => transactions.filter((t) => t.type === 'PAID').reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  return (
    <AppShell>
      <div className="min-h-screen bg-dashboard-gradient pb-12">
        <div className="px-4 md:px-8 max-w-page mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderClr/30"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Payments & Ledger</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Track incoming client collections and outgoing vendor payables</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Record Payment
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Incoming Collections</p>
                <h3 className="text-2xl font-black text-emerald-500 mt-1">{formatINR(totalReceived)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <ArrowDownLeft className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Vendor Payables Cleared</p>
                <h3 className="text-2xl font-black text-rose-500 mt-1">{formatINR(totalPaid)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Net Cash Balance</p>
                <h3 className="text-2xl font-black text-primary mt-1">{formatINR(totalReceived - totalPaid)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Transactions</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">{transactions.length}</h3>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search txn ref, party name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {['ALL', 'RECEIVED', 'PAID'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedType === type
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary border border-borderClr/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Payments Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                    <th className="px-6 py-4">Transaction Ref</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Party Name</th>
                    <th className="px-6 py-4">Payment Mode</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-right">Amount (₹)</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderClr/20 text-xs">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-hoverBg/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{tx.txnRef}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            tx.type === 'RECEIVED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-txtPrimary">{tx.partyName}</td>
                      <td className="px-6 py-4 font-bold text-txtSecondary">{tx.paymentMode}</td>
                      <td className="px-6 py-4 text-txtSecondary font-medium">{tx.date}</td>
                      <td className="px-6 py-4 text-right font-black text-txtPrimary">{formatINR(tx.amount)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <RecordPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          const newTx: PaymentTransaction = {
            id: `tx-${Date.now()}`,
            txnRef: data.txnRef || `TXN-2026-${Math.floor(100 + Math.random() * 900)}`,
            type: data.type || 'RECEIVED',
            partyName: data.partyName || 'Client / Vendor',
            date: data.date || new Date().toISOString().split('T')[0],
            paymentMode: data.paymentMode || 'UPI',
            amount: data.amount || 50000,
            status: 'SUCCESS',
          };
          setTransactions((prev) => [newTx, ...prev]);
          setIsModalOpen(false);
        }}
      />
    </AppShell>
  );
}
