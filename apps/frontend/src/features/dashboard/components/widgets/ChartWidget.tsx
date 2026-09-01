'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';
import { formatINR } from '../../constants';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import { useRevenueTrend } from '../../api/dashboard.api';

export const ChartWidget: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);
  const { activeFY } = useFinancialYearStore();

  const { data: trendData, isLoading } = useRevenueTrend(activeFY?.id || activeFY?.shortCode);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = React.useMemo(() => {
    if (trendData && trendData.length > 0) {
      return trendData.map((item) => ({
        name: item.month,
        sales: item.sales,
        collected: item.collected,
      }));
    }
    return [
      { name: 'Apr', sales: 45000, collected: 30000 },
      { name: 'May', sales: 62000, collected: 45000 },
      { name: 'Jun', sales: 78000, collected: 60000 },
      { name: 'Jul', sales: 90000, collected: 72000 },
      { name: 'Aug', sales: 110000, collected: 88000 },
      { name: 'Sep', sales: 125000, collected: 105000 },
    ];
  }, [trendData]);

  return (
    <div className="glass-panel p-6 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl backdrop-blur-sm bg-primary/10 border border-primary/20 shadow-sm text-primary">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">Fiscal Revenue & Collection</h3>
            <p className="text-[10px] font-medium text-txtSecondary mt-0.5">
              Monthly breakdown for <span className="font-bold text-primary">{activeFY?.label || 'FY 2026-27'}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success border border-success/20 rounded-md text-[10px] font-bold">
            <TrendingUp className="h-3 w-3" />
            Active Ledger
          </span>
        </div>
      </div>

      <div className="flex-1 w-full h-[250px] relative z-10 mt-2">
        {isMounted && !isLoading ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCollected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.15)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  color: 'var(--color-txt-primary)',
                  fontSize: '12px',
                  boxShadow: '0 8px 16px -2px rgba(0, 0, 0, 0.15)',
                }}
                itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                formatter={(value: any) => [formatINR(value as number), undefined as any]}
              />
              <Area
                type="monotone"
                dataKey="sales"
                name="Billed Sales"
                stroke="var(--color-primary)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorSales)"
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="collected"
                name="Payments Collected"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorCollected)"
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-txtSecondary/50 animate-pulse">
            Loading {activeFY?.label} analytics...
          </div>
        )}
      </div>
    </div>
  );
};
