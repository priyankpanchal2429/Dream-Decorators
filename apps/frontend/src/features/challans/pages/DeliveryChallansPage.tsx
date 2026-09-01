'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Truck, Search, Plus, CheckCircle2, Clock, ShieldCheck, RefreshCw, Loader2 } from 'lucide-react';
import { useDeliveryChallans, DeliveryChallanRecord } from '../api/challans.api';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function DeliveryChallansPage() {
  const router = useRouter();
  const { activeFY } = useFinancialYearStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Fetch live delivery challans from database
  const { data: challansData, isLoading, refetch } = useDeliveryChallans({
    search: searchTerm || undefined,
    financialYearId: activeFY?.id || activeFY?.shortCode,
  });

  const challansList = useMemo(() => {
    return challansData?.challans || [];
  }, [challansData]);

  const filteredChallans = useMemo(() => {
    return challansList.filter((dc) => {
      const matchesStatus = selectedStatus === 'ALL' || dc.status === selectedStatus;
      return matchesStatus;
    });
  }, [challansList, selectedStatus]);

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
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Delivery Challans</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Material gate passes and site deliveries for <span className="font-bold text-primary">{activeFY?.label || 'FY 2026-27'}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Challans"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => router.push('/delivery-challans/new')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Generate Delivery Challan</span>
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
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Dispatched</p>
            <p className="text-2xl font-black text-txtPrimary">{challansList.length}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Challans issued</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Truck className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Delivered on Site</p>
            <p className="text-2xl font-black text-emerald-500">
              {challansList.filter((d) => d.status === 'DELIVERED').length}
            </p>
            <p className="text-[10px] text-emerald-500 font-medium">Customer verified</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">In Transit</p>
            <p className="text-2xl font-black text-amber-500">
              {challansList.filter((d) => d.status === 'DISPATCHED' || d.status === 'DRAFT').length}
            </p>
            <p className="text-[10px] text-amber-500 font-medium">En route to site</p>
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
                placeholder="Search challan number, customer, vehicle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'APPROVED', 'DISPATCHED', 'DELIVERED'].map((status) => (
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
                  <th className="px-6 py-3.5">Challan Number</th>
                  <th className="px-6 py-3.5">Customer</th>
                  <th className="px-6 py-3.5">Vehicle / Transporter</th>
                  <th className="px-6 py-3.5">Dispatch Date</th>
                  <th className="px-6 py-3.5 text-center">Items Count</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                      Loading delivery challans from database...
                    </td>
                  </tr>
                ) : filteredChallans.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No delivery challans recorded for {activeFY?.label}</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Issue gate passes and dispatch challans for site installations.
                      </p>
                      <button
                        onClick={() => router.push('/delivery-challans/new')}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Generate First Challan
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredChallans.map((dc) => (
                    <tr key={dc.id} className="hover:bg-hoverBg/50 transition-colors">
                      <td className="px-6 py-4 font-bold text-txtPrimary">
                        <span className="text-primary font-mono">{dc.challanNumber}</span>
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-bold text-txtPrimary">{dc.party?.name || 'Customer'}</p>
                        <p className="text-[10px] text-txtSecondary">{dc.party?.phone || ''}</p>
                      </td>

                      <td className="px-6 py-4 text-txtSecondary font-medium">
                        <p>{dc.vehicleNumber || 'Standard Transport'}</p>
                        {dc.transporterName && (
                          <p className="text-[10px] text-txtSecondary">{dc.transporterName}</p>
                        )}
                      </td>

                      <td className="px-6 py-4 text-txtSecondary">
                        {new Date(dc.date).toLocaleDateString('en-IN')}
                      </td>

                      <td className="px-6 py-4 text-center font-bold text-txtPrimary">
                        {dc.items?.length || 1}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            dc.status === 'DELIVERED'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : dc.status === 'DISPATCHED'
                              ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}
                        >
                          {dc.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
