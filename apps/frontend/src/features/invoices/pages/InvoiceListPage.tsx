'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Receipt, Search, Plus, CheckCircle2, Clock, AlertTriangle, RefreshCw, Loader2, Eye } from 'lucide-react';
import { useInvoices, InvoiceRecord } from '../api/invoices.api';
import { formatINR } from '@/features/dashboard/constants';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function InvoiceListPage() {
  const router = useRouter();
  const { activeFY } = useFinancialYearStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Fetch live invoices from database
  const { data: invoiceData, isLoading, refetch } = useInvoices({
    search: searchTerm || undefined,
    financialYearId: activeFY?.id || activeFY?.shortCode,
  });

  const invoicesList = useMemo(() => {
    return invoiceData?.invoices || [];
  }, [invoiceData]);

  const filteredInvoices = useMemo(() => {
    return invoicesList.filter((inv) => {
      const matchesStatus =
        selectedStatus === 'ALL' ||
        inv.paymentStatus === selectedStatus ||
        inv.status === selectedStatus;
      return matchesStatus;
    });
  }, [invoicesList, selectedStatus]);

  const totalBilled = useMemo(
    () => invoicesList.reduce((acc, inv) => acc + (Number(inv.grandTotal) || 0), 0),
    [invoicesList]
  );
  const totalPaid = useMemo(
    () => invoicesList.reduce((acc, inv) => acc + (Number(inv.paidAmount) || 0), 0),
    [invoicesList]
  );
  const totalBalanceDue = Math.max(0, totalBilled - totalPaid);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-2 border-b border-borderClr/30"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
              <Receipt className="h-3 w-3" /> Billing & Invoicing
            </span>
          </div>
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Sales Tax Invoices</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            GST compliant tax invoices for <span className="font-bold text-primary">{activeFY?.label || 'FY 2026-27'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Invoices"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => router.push('/invoices/new')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Generate New Invoice</span>
          </button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* KPI 1 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Billed</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalBilled)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">{invoicesList.length} Invoices issued</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Receipt className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Paid Amount</p>
            <p className="text-2xl font-black text-emerald-500">{formatINR(totalPaid)}</p>
            <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Cleared receipts
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Outstanding Receivables</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalBalanceDue)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Pending client dues</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Clock className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 glass-panel p-0 rounded-3xl overflow-hidden">
          {/* Controls Bar */}
          <div className="p-6 border-b border-borderClr/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search invoice number, client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'PAID', 'PARTIAL', 'UNPAID', 'OVERDUE'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedStatus === status
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">
                  <th className="px-6 py-3.5">Invoice Details</th>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Date / Due Date</th>
                  <th className="px-6 py-3.5 text-right">Total Amount</th>
                  <th className="px-6 py-3.5 text-right">Paid</th>
                  <th className="px-6 py-3.5 text-right">Balance Due</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-txtSecondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                      Loading invoices from database...
                    </td>
                  </tr>
                ) : filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No invoices found for {activeFY?.label}</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Generate a new GST invoice or convert an approved quotation.
                      </p>
                      <button
                        onClick={() => router.push('/invoices/new')}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Generate First Invoice
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((inv) => {
                    const grand = Number(inv.grandTotal) || 0;
                    const paid = Number(inv.paidAmount) || 0;
                    const balance = Math.max(0, grand - paid);
                    return (
                      <tr key={inv.id} className="hover:bg-hoverBg/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-txtPrimary">
                          <span className="text-primary font-mono">{inv.invoiceNumber}</span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-txtPrimary">{inv.party?.name || 'Walk-in Client'}</p>
                          <p className="text-[10px] text-txtSecondary">{inv.party?.phone || ''}</p>
                        </td>
                        <td className="px-6 py-4 text-txtSecondary">
                          <p>{new Date(inv.date).toLocaleDateString('en-IN')}</p>
                          <p className="text-[10px]">Due: {new Date(inv.dueDate).toLocaleDateString('en-IN')}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-black text-txtPrimary">
                          {formatINR(grand)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-emerald-500">
                          {formatINR(paid)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className={`font-bold ${balance > 0 ? 'text-danger' : 'text-txtSecondary'}`}>
                            {formatINR(balance)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              inv.paymentStatus === 'PAID'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : inv.paymentStatus === 'PARTIAL'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}
                          >
                            {inv.paymentStatus || inv.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
