'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Plus, Truck, CheckCircle2, Clock, RefreshCw, Loader2 } from 'lucide-react';
import { usePurchases, PurchaseRecord } from '../api/purchases.api';
import { formatINR } from '@/features/dashboard/constants';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function PurchaseListPage() {
  const router = useRouter();
  const { activeFY } = useFinancialYearStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Fetch live purchases from database
  const { data: purchaseData, isLoading, refetch } = usePurchases({
    search: searchTerm || undefined,
    financialYearId: activeFY?.id || activeFY?.shortCode,
  });

  const purchasesList = useMemo(() => {
    return purchaseData?.purchases || [];
  }, [purchaseData]);

  const filteredPurchases = useMemo(() => {
    return purchasesList.filter((po) => {
      const matchesStatus = selectedStatus === 'ALL' || po.status === selectedStatus || po.paymentStatus === selectedStatus;
      return matchesStatus;
    });
  }, [purchasesList, selectedStatus]);

  const totalPurchases = useMemo(
    () => purchasesList.reduce((acc, po) => acc + (Number(po.grandTotal) || 0), 0),
    [purchasesList]
  );
  const totalPaid = useMemo(
    () => purchasesList.reduce((acc, po) => acc + (Number(po.paidAmount) || 0), 0),
    [purchasesList]
  );
  const totalOutstanding = Math.max(0, totalPurchases - totalPaid);

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
              <ShoppingBag className="h-3 w-3" /> Procurement
            </span>
          </div>
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Purchase Invoices & Bills</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Vendor procurement bills for <span className="font-bold text-primary">{activeFY?.label || 'FY 2026-27'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Purchases"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => router.push('/purchases/new')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Record Purchase Bill</span>
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
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Purchases</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalPurchases)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">{purchasesList.length} Vendor bills recorded</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Paid to Suppliers</p>
            <p className="text-2xl font-black text-emerald-500">{formatINR(totalPaid)}</p>
            <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Cleared vendor payments
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Pending Payables</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalOutstanding)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Outstanding vendor ledger</p>
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
                placeholder="Search bill number, vendor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'APPROVED', 'DRAFT', 'PAID', 'UNPAID'].map((status) => (
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
                  <th className="px-6 py-3.5">Bill Number</th>
                  <th className="px-6 py-3.5">Supplier / Vendor</th>
                  <th className="px-6 py-3.5">Date / Due Date</th>
                  <th className="px-6 py-3.5 text-right">Bill Amount</th>
                  <th className="px-6 py-3.5 text-right">Paid</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                      Loading vendor purchases from database...
                    </td>
                  </tr>
                ) : filteredPurchases.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No purchase bills recorded for {activeFY?.label}</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Record raw material and fabric purchases from suppliers.
                      </p>
                      <button
                        onClick={() => router.push('/purchases/new')}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Record First Purchase
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredPurchases.map((po) => {
                    const grand = Number(po.grandTotal) || 0;
                    const paid = Number(po.paidAmount) || 0;
                    return (
                      <tr key={po.id} className="hover:bg-hoverBg/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-txtPrimary">
                          <span className="text-primary font-mono">{po.invoiceNumber}</span>
                          {po.vendorBillNo && (
                            <span className="text-[10px] text-txtSecondary block font-normal">
                              Ref: {po.vendorBillNo}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-bold text-txtPrimary">{po.party?.name || 'Supplier'}</p>
                          <p className="text-[10px] text-txtSecondary">{po.party?.phone || ''}</p>
                        </td>
                        <td className="px-6 py-4 text-txtSecondary">
                          <p>{new Date(po.date).toLocaleDateString('en-IN')}</p>
                          <p className="text-[10px]">Due: {new Date(po.dueDate).toLocaleDateString('en-IN')}</p>
                        </td>
                        <td className="px-6 py-4 text-right font-black text-txtPrimary">
                          {formatINR(grand)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium text-emerald-500">
                          {formatINR(paid)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              po.paymentStatus === 'PAID'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : po.paymentStatus === 'PARTIAL'
                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}
                          >
                            {po.paymentStatus || po.status}
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
