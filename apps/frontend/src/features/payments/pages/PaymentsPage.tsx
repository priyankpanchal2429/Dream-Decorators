'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Search, Plus, ArrowUpRight, ArrowDownLeft, CheckCircle2, RefreshCw, Loader2 } from 'lucide-react';
import { usePayments, useCreatePayment, PaymentRecord } from '../api/payments.api';
import { RecordPaymentModal } from '../components/RecordPaymentModal';
import { formatINR } from '@/features/dashboard/constants';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import { useToastStore } from '@/lib/toast.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function PaymentsPage() {
  const { addToast } = useToastStore();
  const { activeFY } = useFinancialYearStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live payments from database
  const { data: paymentsData, isLoading, refetch } = usePayments({
    search: searchTerm || undefined,
    financialYearId: activeFY?.id || activeFY?.shortCode,
  });

  const createPaymentMutation = useCreatePayment();

  const paymentsList = useMemo(() => {
    return paymentsData?.payments || [];
  }, [paymentsData]);

  const filteredTransactions = useMemo(() => {
    return paymentsList.filter((tx) => {
      const isReceived = tx.party?.type === 'CUSTOMER';
      const type = isReceived ? 'RECEIVED' : 'PAID';
      const matchesType = selectedType === 'ALL' || type === selectedType;
      return matchesType;
    });
  }, [paymentsList, selectedType]);

  const totalReceived = useMemo(() => {
    return paymentsList
      .filter((tx) => tx.party?.type === 'CUSTOMER')
      .reduce((acc, tx) => acc + (Number(tx.amount) || 0), 0);
  }, [paymentsList]);

  const totalPaid = useMemo(() => {
    return paymentsList
      .filter((tx) => tx.party?.type === 'VENDOR')
      .reduce((acc, tx) => acc + (Number(tx.amount) || 0), 0);
  }, [paymentsList]);

  const netCashFlow = totalReceived - totalPaid;

  const handleRecordPayment = async (data: any) => {
    try {
      await createPaymentMutation.mutateAsync({
        partyId: data.partyId,
        financialYearId: activeFY?.id || activeFY?.shortCode,
        amount: Number(data.amount),
        paymentMode: data.paymentMode || 'UPI',
        referenceNo: data.referenceNo,
        remarks: data.remarks,
        paymentDate: new Date().toISOString(),
      });
      addToast({
        title: 'Payment Recorded',
        message: `Transaction of ${formatINR(Number(data.amount))} recorded successfully.`,
        type: 'success',
      });
      setIsModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Failed to Record Payment',
        message: err.message || 'Could not save payment transaction.',
        type: 'error',
      });
    }
  };

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
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Payments & Receipts</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Client receipts and supplier payments for <span className="font-bold text-primary">{activeFY?.label || 'FY 2026-27'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Transactions"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Record New Payment</span>
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
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Received (Inflow)</p>
            <p className="text-2xl font-black text-emerald-500">{formatINR(totalReceived)}</p>
            <p className="text-[10px] text-emerald-500 font-medium">Customer collections</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <ArrowDownLeft className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Paid (Outflow)</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalPaid)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Vendor disbursements</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Net Cash Flow</p>
            <p className={`text-2xl font-black ${netCashFlow >= 0 ? 'text-primary' : 'text-danger'}`}>
              {formatINR(netCashFlow)}
            </p>
            <p className="text-[10px] text-txtSecondary font-medium">Net treasury position</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <CheckCircle2 className="h-5 w-5" />
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
                placeholder="Search transaction number, party..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'RECEIVED', 'PAID'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedType === type
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">
                  <th className="px-6 py-3.5">Payment Ref</th>
                  <th className="px-6 py-3.5">Party / Entity</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Payment Mode</th>
                  <th className="px-6 py-3.5 text-right">Amount</th>
                  <th className="px-6 py-3.5 text-center">Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                      Loading payment transactions from database...
                    </td>
                  </tr>
                ) : filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No transactions found for {activeFY?.label}</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Record customer receipts or vendor bill payments.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Record First Payment
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => {
                    const isReceived = tx.party?.type === 'CUSTOMER';
                    return (
                      <tr key={tx.id} className="hover:bg-hoverBg/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-txtPrimary">
                          <span className="text-primary font-mono">{tx.paymentNumber}</span>
                          {tx.referenceNo && (
                            <span className="text-[10px] text-txtSecondary block font-normal">
                              Ref: {tx.referenceNo}
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-bold text-txtPrimary">{tx.party?.name || 'Walk-in Party'}</p>
                          <p className="text-[10px] text-txtSecondary">{tx.party?.phone || ''}</p>
                        </td>

                        <td className="px-6 py-4 text-txtSecondary">
                          {new Date(tx.paymentDate).toLocaleDateString('en-IN')}
                        </td>

                        <td className="px-6 py-4 text-txtPrimary font-medium">
                          <span className="bg-hoverBg px-2 py-1 rounded text-[11px] font-semibold">
                            {tx.paymentMode}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right font-black text-txtPrimary">
                          <span className={isReceived ? 'text-emerald-500' : 'text-txtPrimary'}>
                            {formatINR(Number(tx.amount) || 0)}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                              isReceived
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}
                          >
                            {isReceived ? 'RECEIVED' : 'PAID'}
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

      {/* Modal */}
      <RecordPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleRecordPayment}
      />
    </div>
  );
}
