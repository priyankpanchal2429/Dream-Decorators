'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardHeader } from '../components/DashboardHeader';
import { SummaryCard } from '../components/widgets/SummaryCard';
import { OutstandingCard } from '../components/widgets/OutstandingCard';
import { ProductWidgetCard } from '../components/widgets/ProductWidgetCard';
import { InvoiceDueWidget } from '../components/widgets/InvoiceDueWidget';
import { QuickActionsWidget } from '../components/widgets/QuickActionsWidget';
import { ChartWidget } from '../components/widgets/ChartWidget';
import {
  mockExpenseSummary,
  mockBestSellingProducts,
  mockLowStockProducts,
  mockSalesInvoiceDue,
} from '../constants';
import { MetricSummary, OutstandingSummary } from '../types';
import { Receipt, ShoppingBag, Wallet } from 'lucide-react';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import { useDashboardStats } from '../api/dashboard.api';

export default function DashboardPage() {
  const { activeFY } = useFinancialYearStore();
  const { data: statsData } = useDashboardStats(activeFY?.id || activeFY?.shortCode);

  const salesSummary: MetricSummary = React.useMemo(() => {
    const revenue = statsData?.kpis?.totalRevenue ?? 0;
    const today = statsData?.kpis?.todayRevenue ?? 0;
    return {
      todayAmount: today,
      monthlyAmount: revenue,
      trendPercent: 0,
      isPositive: true,
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      lastUpdated: 'Just now',
    };
  }, [statsData]);

  const purchaseSummary: MetricSummary = React.useMemo(() => {
    const payables = statsData?.kpis?.totalPurchases ?? statsData?.kpis?.totalPayables ?? 0;
    const today = statsData?.kpis?.todayPurchases ?? 0;
    return {
      todayAmount: today,
      monthlyAmount: payables,
      trendPercent: 0,
      isPositive: false,
      sparkline: [0, 0, 0, 0, 0, 0, 0],
      lastUpdated: 'Just now',
    };
  }, [statsData]);

  const salesOutstanding: OutstandingSummary = React.useMemo(() => {
    const receivables = statsData?.kpis?.totalReceivables ?? 0;
    const dueToday = statsData?.kpis?.salesDueToday ?? 0;
    const totalRev = statsData?.kpis?.totalRevenue ?? 0;
    const collected = statsData?.kpis?.totalCollected ?? 0;
    const recoveryPercent = totalRev > 0 ? Math.round((collected / totalRev) * 100) : 0;
    return {
      totalOutstanding: receivables,
      dueToday,
      overdue: 0,
      recoveryPercent,
      pendingCount: statsData?.kpis?.totalInvoices ?? 0,
    };
  }, [statsData]);

  const purchaseOutstanding: OutstandingSummary = React.useMemo(() => {
    const payables = statsData?.kpis?.totalPayables ?? 0;
    const dueToday = statsData?.kpis?.purchasesDueToday ?? 0;
    return {
      totalOutstanding: payables,
      dueToday,
      overdue: 0,
      recoveryPercent: 0,
      pendingCount: 0,
    };
  }, [statsData]);

  return (
    <div className="space-y-6 pb-12">
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
      >
        <DashboardHeader />
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-6 mt-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Row 1: KPIs */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-2 xl:col-span-4">
          <SummaryCard
            title={`Total Sales (${activeFY?.label || 'FY 2026-27'})`}
            data={salesSummary}
            icon={<Receipt className="h-5 w-5" />}
          />
        </motion.div>
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-2 xl:col-span-4">
          <SummaryCard
            title={`Total Purchases (${activeFY?.label || 'FY 2026-27'})`}
            data={purchaseSummary}
            icon={<ShoppingBag className="h-5 w-5" />}
          />
        </motion.div>
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-2 xl:col-span-4">
          <SummaryCard
            title="Total Expenses"
            data={mockExpenseSummary}
            icon={<Wallet className="h-5 w-5" />}
          />
        </motion.div>

        {/* Row 2: Chart & Quick Actions */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-6 xl:col-span-8">
          <ChartWidget />
        </motion.div>
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-6 xl:col-span-4 h-full">
          <QuickActionsWidget />
        </motion.div>

        {/* Row 3: Outstanding */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 xl:col-span-6">
          <OutstandingCard
            title="Sales Outstanding"
            data={salesOutstanding}
            type="receivable"
          />
        </motion.div>
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 xl:col-span-6">
          <OutstandingCard
            title="Purchase Outstanding"
            data={purchaseOutstanding}
            type="payable"
          />
        </motion.div>

        {/* Row 4: Sales Invoice Due */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-6 xl:col-span-12">
          <InvoiceDueWidget
            title="Sales Invoice Due"
            partyLabel="Customer"
            invoices={mockSalesInvoiceDue}
          />
        </motion.div>

        {/* Row 5: Best Selling Products & Low Stock Alerts */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 xl:col-span-6">
          <ProductWidgetCard
            title="Best Selling Products"
            subtitle="Top performers"
            items={mockBestSellingProducts}
            variant="best-selling"
          />
        </motion.div>
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 xl:col-span-6">
          <ProductWidgetCard
            title="Low Stock Alerts"
            subtitle="Requires immediate attention"
            items={mockLowStockProducts}
            variant="low-stock"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
