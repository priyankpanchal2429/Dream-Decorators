'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Search, Plus, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { SalesInvoice } from '../types';
import { formatINR } from '@/features/dashboard/constants';

export default function InvoiceListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const [invoices] = useState<SalesInvoice[]>([
    {
      id: 'inv-101',
      invoiceNumber: 'INV-2026-881',
      customerName: 'Aarav Sharma',
      customerPhone: '+91 98765 43210',
      issueDate: '2026-07-28',
      dueDate: '2026-08-12',
      totalAmount: 126620,
      paidAmount: 126620,
      balanceDue: 0,
      status: 'PAID',
    },
    {
      id: 'inv-102',
      invoiceNumber: 'INV-2026-882',
      customerName: 'Ananya Patel',
      customerPhone: '+91 99256 63965',
      issueDate: '2026-07-20',
      dueDate: '2026-08-04',
      totalAmount: 485000,
      paidAmount: 250000,
      balanceDue: 235000,
      status: 'PARTIAL',
    },
    {
      id: 'inv-103',
      invoiceNumber: 'INV-2026-883',
      customerName: 'Vikram Mehta',
      customerPhone: '+91 97123 88411',
      issueDate: '2026-07-01',
      dueDate: '2026-07-15',
      totalAmount: 210000,
      paidAmount: 0,
      balanceDue: 210000,
      status: 'OVERDUE',
    },
  ]);

  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      const matchesSearch =
        inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'ALL' || inv.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [invoices, searchTerm, selectedStatus]);

  const totalBilled = useMemo(() => invoices.reduce((acc, inv) => acc + inv.totalAmount, 0), [invoices]);
  const totalCollected = useMemo(() => invoices.reduce((acc, inv) => acc + inv.paidAmount, 0), [invoices]);
  const totalDue = useMemo(() => invoices.reduce((acc, inv) => acc + inv.balanceDue, 0), [invoices]);

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
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                <Receipt className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Sales Invoices</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Track GST sales invoices, payment status, and due balances</p>
              </div>
            </div>

            <button
              onClick={() => alert('Create Invoice Modal feature ready!')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              Create Sales Invoice
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Invoiced</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">{formatINR(totalBilled)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Receipt className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Amount Collected</p>
                <h3 className="text-2xl font-black text-emerald-500 mt-1">{formatINR(totalCollected)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Balance Due</p>
                <h3 className="text-2xl font-black text-amber-500 mt-1">{formatINR(totalDue)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Overdue Invoices</p>
                <h3 className="text-2xl font-black text-rose-500 mt-1">
                  {invoices.filter((i) => i.status === 'OVERDUE').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search invoice #, client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
              {['ALL', 'PAID', 'PARTIAL', 'OVERDUE', 'UNPAID'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedStatus === st
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary border border-borderClr/30'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Invoices Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                    <th className="px-6 py-4">Invoice #</th>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Issue Date</th>
                    <th className="px-6 py-4">Due Date</th>
                    <th className="px-6 py-4 text-right">Total Amount</th>
                    <th className="px-6 py-4 text-right">Balance Due</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderClr/20 text-xs">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-hoverBg/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{inv.invoiceNumber}</td>
                      <td className="px-6 py-4 font-semibold text-txtPrimary">{inv.customerName}</td>
                      <td className="px-6 py-4 text-txtSecondary font-medium">{inv.issueDate}</td>
                      <td className="px-6 py-4 text-txtSecondary font-medium">{inv.dueDate}</td>
                      <td className="px-6 py-4 text-right font-black text-txtPrimary">{formatINR(inv.totalAmount)}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${inv.balanceDue > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {formatINR(inv.balanceDue)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            inv.status === 'PAID'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : inv.status === 'PARTIAL'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          }`}
                        >
                          {inv.status}
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
    </AppShell>
  );
}
