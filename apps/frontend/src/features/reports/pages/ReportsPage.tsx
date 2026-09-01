'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, FileCheck, Layers, Download } from 'lucide-react';
import { formatINR } from '@/features/dashboard/constants';
import { useDashboardStats } from '@/features/dashboard/api/dashboard.api';
import { useInvoices } from '@/features/invoices/api/invoices.api';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function ReportsPage() {
  const { activeFY } = useFinancialYearStore();
  const { data: statsData } = useDashboardStats(activeFY?.id || activeFY?.shortCode);
  const { data: invoiceData } = useInvoices({ financialYearId: activeFY?.id || activeFY?.shortCode });

  const totalRevenue = Number(statsData?.kpis?.totalRevenue || 0);
  const totalPayables = Number(statsData?.kpis?.totalPayables || 0);
  const totalInvoices = Number(statsData?.kpis?.totalInvoices || 0);

  // Computed GST metrics (Assuming 18% standard GST structure)
  const gstCollected = totalRevenue * 0.18;
  const itcCredit = totalPayables * 0.18;
  const netGstPayable = Math.max(0, gstCollected - itcCredit);

  const invoicesList = useMemo(() => invoiceData?.invoices || [], [invoiceData]);

  const handleExportGSTReport = () => {
    const csvRows = [
      [`Dream Decorators - GST Tax Return Summary Report (${activeFY?.label || 'Current FY'})`],
      ['Generated On', new Date().toLocaleString()],
      [],
      ['Metric', 'Amount (INR)'],
      ['Gross Revenue (Sales)', totalRevenue],
      ['Output CGST Collected (9%)', gstCollected / 2],
      ['Output SGST Collected (9%)', gstCollected / 2],
      ['Total Output GST (GSTR-1)', gstCollected],
      ['Input Tax Credit (ITC - Purchases)', itcCredit],
      ['Net Payable GST (GSTR-3B)', netGstPayable],
      [],
      ['Transaction Breakdown'],
      ['Invoice #', 'Party Name', 'Invoice Date', 'Total Amount', 'Status'],
      ...invoicesList.map((inv) => [
        inv.invoiceNumber,
        inv.party?.name || 'Walk-in Client',
        new Date(inv.date).toLocaleDateString('en-IN'),
        inv.grandTotal,
        inv.paymentStatus || inv.status,
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Dream_Decorators_GST_Report_${activeFY?.shortCode || 'FY'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderClr/30"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <BarChart3 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Business Analytics & Reports</h1>
            <p className="text-xs text-txtSecondary mt-0.5">
              Financial summaries, GST filings, and revenue analytics for <span className="font-bold text-primary">{activeFY?.label || 'FY 2026-27'}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleExportGSTReport}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer active:scale-95"
        >
          <Download className="h-4 w-4" />
          Export GST Report (CSV)
        </button>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={springItemVariants} className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-txtSecondary uppercase tracking-widest">
                Gross Revenue ({activeFY?.shortCode || 'FY'})
              </span>
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
            <h2 className="text-3xl font-black text-txtPrimary">{formatINR(totalRevenue)}</h2>
            <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> {totalInvoices} Invoices recorded
            </p>
          </motion.div>

          <motion.div variants={springItemVariants} className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-txtSecondary uppercase tracking-widest">GST Liability (GSTR-3B)</span>
              <FileCheck className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-3xl font-black text-primary">{formatINR(gstCollected)}</h2>
            <p className="text-xs text-txtSecondary font-medium">
              9% CGST ({formatINR(gstCollected / 2)}) + 9% SGST ({formatINR(gstCollected / 2)})
            </p>
          </motion.div>

          <motion.div variants={springItemVariants} className="glass-panel p-6 rounded-3xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-txtSecondary uppercase tracking-widest">Net GST Payable</span>
              <Layers className="h-5 w-5 text-indigo-500" />
            </div>
            <h2 className="text-3xl font-black text-indigo-500">{formatINR(netGstPayable)}</h2>
            <p className="text-xs text-txtSecondary font-medium">After deducting ITC input credit</p>
          </motion.div>
        </div>

        {/* Report Breakdown Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div variants={springItemVariants} className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-txtPrimary">Live Financial Year Summary</h3>
            <div className="space-y-3 text-xs font-semibold">
              <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                <span>Total Taxable Invoices</span>
                <span className="font-bold text-txtPrimary">{totalInvoices}</span>
              </div>
              <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                <span>Total Billed Turnover</span>
                <span className="font-bold text-emerald-500">{formatINR(totalRevenue)}</span>
              </div>
              <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                <span>Total Procurement Cost</span>
                <span className="font-bold text-amber-500">{formatINR(totalPayables)}</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={springItemVariants} className="glass-panel p-6 rounded-3xl space-y-4">
            <h3 className="text-sm font-bold text-txtPrimary">GST Tax Breakdown Summary</h3>
            <div className="space-y-3 text-xs font-semibold">
              <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                <span>Output GST Collected (Sales)</span>
                <span className="font-black text-emerald-500 text-sm">{formatINR(gstCollected)}</span>
              </div>
              <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                <span>Input Tax Credit (ITC - Purchases)</span>
                <span className="font-black text-primary text-sm">-{formatINR(itcCredit)}</span>
              </div>
              <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 flex justify-between items-center text-primary font-black text-sm">
                <span>Net Payable GST</span>
                <span>{formatINR(netGstPayable)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
