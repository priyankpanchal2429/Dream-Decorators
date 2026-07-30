'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardHeader } from '../components/DashboardHeader';
import { SummaryCard } from '../components/widgets/SummaryCard';
import { OutstandingCard } from '../components/widgets/OutstandingCard';
import { ProductWidgetCard } from '../components/widgets/ProductWidgetCard';
import { InvoiceDueWidget } from '../components/widgets/InvoiceDueWidget';
import { QuickActionsWidget } from '../components/widgets/QuickActionsWidget';
import { ChartWidget } from '../components/widgets/ChartWidget';
import {
  mockSalesSummary,
  mockPurchaseSummary,
  mockExpenseSummary,
  mockSalesOutstanding,
  mockPurchaseOutstanding,
  mockBestSellingProducts,
  mockLeastSellingProducts,
  mockLowStockProducts,
  mockSalesInvoiceDue,
} from '../constants';
import { Receipt, ShoppingBag, Wallet } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="min-h-screen bg-dashboard-gradient pb-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <DashboardHeader />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-6 mt-6 px-4 md:px-8 max-w-page mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Row 1: KPIs */}
          <motion.div variants={item} className="col-span-1 md:col-span-2 xl:col-span-4">
            <SummaryCard
              title="Total Sales"
              data={mockSalesSummary}
              icon={<Receipt className="h-5 w-5" />}
            />
          </motion.div>
          <motion.div variants={item} className="col-span-1 md:col-span-2 xl:col-span-4">
            <SummaryCard
              title="Total Purchase"
              data={mockPurchaseSummary}
              icon={<ShoppingBag className="h-5 w-5" />}
            />
          </motion.div>
          <motion.div variants={item} className="col-span-1 md:col-span-2 xl:col-span-4">
            <SummaryCard
              title="Total Expense"
              data={mockExpenseSummary}
              icon={<Wallet className="h-5 w-5" />}
            />
          </motion.div>

          {/* Row 2: Chart & Quick Actions */}
          <motion.div variants={item} className="col-span-1 md:col-span-6 xl:col-span-8">
            <ChartWidget />
          </motion.div>
          <motion.div variants={item} className="col-span-1 md:col-span-6 xl:col-span-4 h-full">
            <QuickActionsWidget />
          </motion.div>

          {/* Row 3: Outstanding */}
          <motion.div variants={item} className="col-span-1 md:col-span-3 xl:col-span-6">
            <OutstandingCard
              title="Sales Outstanding"
              data={mockSalesOutstanding}
              type="receivable"
            />
          </motion.div>
          <motion.div variants={item} className="col-span-1 md:col-span-3 xl:col-span-6">
            <OutstandingCard
              title="Purchase Outstanding"
              data={mockPurchaseOutstanding}
              type="payable"
            />
          </motion.div>

          {/* Row 4: Invoice Due & Best Selling */}
          <motion.div variants={item} className="col-span-1 md:col-span-4 xl:col-span-8">
            <InvoiceDueWidget
              title="Sales Invoice Due"
              partyLabel="Customer"
              invoices={mockSalesInvoiceDue}
            />
          </motion.div>
          <motion.div variants={item} className="col-span-1 md:col-span-2 xl:col-span-4 flex flex-col gap-6">
            <ProductWidgetCard
              title="Best Selling Products"
              subtitle="Top performers"
              items={mockBestSellingProducts}
              variant="best-selling"
            />
            <ProductWidgetCard
              title="Low Stock Alerts"
              subtitle="Requires immediate attention"
              items={mockLowStockProducts}
              variant="low-stock"
            />
          </motion.div>
        </motion.div>
      </div>
    </AppShell>
  );
}
