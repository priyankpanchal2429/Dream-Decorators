'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, DollarSign, FileCheck, Layers, Download } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { formatINR } from '@/features/dashboard/constants';

export default function ReportsPage() {
  const handleExportGSTReport = () => {
    const csvContent = [
      ['Dream Decorators - GST Tax Return Summary Report (FY 2025-2026)'],
      ['Generated On', new Date().toLocaleString()],
      [],
      ['Metric', 'Amount (INR)'],
      ['Gross Revenue (Sales)', 4850000],
      ['Output CGST Collected (9%)', 436500],
      ['Output SGST Collected (9%)', 436500],
      ['Total Output GST (GSTR-1)', 873000],
      ['Input Tax Credit (ITC - Purchases)', 420000],
      ['Net Payable GST (GSTR-3B)', 453000],
      [],
      ['Recent Transaction Breakdown'],
      ['Invoice #', 'Party Name', 'Taxable Value', 'CGST 9%', 'SGST 9%', 'Total GST', 'Status'],
      ['INV-2026-881', 'Aarav Sharma', 107305, 9657, 9657, 19315, 'PAID'],
      ['INV-2026-882', 'Ananya Patel', 411016, 36992, 36992, 73984, 'PARTIAL'],
      ['INV-2026-883', 'Vikram Mehta', 177966, 16017, 16017, 32034, 'OVERDUE'],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dream_Decorators_GST_Report_FY2026.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Business Analytics & Reports</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Financial summaries, GST filings, and sales conversion metrics</p>
              </div>
            </div>

            <button
              onClick={handleExportGSTReport}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Export GST Report
            </button>
          </motion.div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-txtSecondary uppercase tracking-widest">Gross Revenue (FY 2026)</span>
                <DollarSign className="h-5 w-5 text-emerald-500" />
              </div>
              <h2 className="text-3xl font-black text-txtPrimary">{formatINR(4850000)}</h2>
              <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> +24% vs last financial year
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-txtSecondary uppercase tracking-widest">GST Liability (GSTR-3B)</span>
                <FileCheck className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-black text-primary">{formatINR(873000)}</h2>
              <p className="text-xs text-txtSecondary font-medium">9% CGST ({formatINR(436500)}) + 9% SGST ({formatINR(436500)})</p>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-txtSecondary uppercase tracking-widest">Net Profit Margin</span>
                <Layers className="h-5 w-5 text-indigo-500" />
              </div>
              <h2 className="text-3xl font-black text-indigo-500">32.8%</h2>
              <p className="text-xs text-txtSecondary font-medium">High margin custom interior decor projects</p>
            </div>
          </div>

          {/* Report Breakdown Panels */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-txtPrimary">Top Revenue Categories</h3>
              <div className="space-y-3 text-xs font-semibold">
                <div>
                  <div className="flex justify-between mb-1 text-txtPrimary">
                    <span>Custom Interior Furniture</span>
                    <span className="font-bold">₹24,50,000 (50.5%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-hoverBg overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-[50.5%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-txtPrimary">
                    <span>Italian Marble Flooring</span>
                    <span className="font-bold">₹14,50,000 (29.9%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-hoverBg overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[29.9%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1 text-txtPrimary">
                    <span>Velvet Drapes & Curtains</span>
                    <span className="font-bold">₹9,50,000 (19.6%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-hoverBg overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full w-[19.6%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-txtPrimary">GST Tax Breakdown Summary</h3>
              <div className="space-y-3 text-xs font-semibold">
                <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                  <span>Output GST Collected (Sales)</span>
                  <span className="font-black text-emerald-500 text-sm">{formatINR(873000)}</span>
                </div>
                <div className="p-3 bg-hoverBg/50 rounded-2xl border border-borderClr/30 flex justify-between items-center">
                  <span>Input Tax Credit (ITC - Purchases)</span>
                  <span className="font-black text-primary text-sm">-{formatINR(420000)}</span>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl border border-primary/20 flex justify-between items-center text-primary font-black text-sm">
                  <span>Net Payable GST</span>
                  <span>{formatINR(453000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
