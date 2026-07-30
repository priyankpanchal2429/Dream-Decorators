import React from 'react';
import { Card } from '@/components/ui/Card';
import { ArrowUpRight, TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

interface DashboardShellProps {
  children?: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner Header */}
      <div className="p-6 rounded-2xl bg-cardBg border border-borderClr shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-txtPrimary tracking-tight">
            Welcome back, Admin! 👋
          </h2>
          <p className="text-xs text-txtSecondary mt-1">
            Here is what is happening across Dream Decorators business operations today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-success bg-success/10 px-3 py-1.5 rounded-lg border border-success/20 inline-flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> System Healthy
          </span>
        </div>
      </div>

      {/* Quick Action Placeholder Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-txtSecondary">Total Sales</span>
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xl font-extrabold text-txtPrimary mt-2">$124,500.00</p>
          <span className="text-[10px] text-success font-semibold mt-1 inline-block">+12% from last month</span>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-txtSecondary">Active Orders</span>
            <ShoppingBag className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xl font-extrabold text-txtPrimary mt-2">48 Orders</p>
          <span className="text-[10px] text-txtSecondary font-semibold mt-1 inline-block">12 Pending Dispatch</span>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-txtSecondary">Total Customers</span>
            <Users className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xl font-extrabold text-txtPrimary mt-2">1,240</p>
          <span className="text-[10px] text-success font-semibold mt-1 inline-block">+54 New this week</span>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-txtSecondary">Stock Valuation</span>
            <ArrowUpRight className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xl font-extrabold text-txtPrimary mt-2">$580,200.00</p>
          <span className="text-[10px] text-txtSecondary font-semibold mt-1 inline-block">Across 3 Warehouses</span>
        </Card>
      </div>

      {/* Main Widget Grid Slot */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-cardBg border border-borderClr p-6 min-h-[300px] flex items-center justify-center text-txtSecondary text-xs">
          [ Future Analytics & Charts Widget Grid Slot ]
        </div>

        <div className="rounded-2xl bg-cardBg border border-borderClr p-6 min-h-[300px] flex items-center justify-center text-txtSecondary text-xs">
          [ Future Recent Activity Widget Slot ]
        </div>
      </div>

      {children}
    </div>
  );
};
