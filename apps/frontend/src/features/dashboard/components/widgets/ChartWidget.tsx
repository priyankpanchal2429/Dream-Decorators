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

// Mock data for the chart
const data = [
  { name: 'Jan', sales: 4000, expenses: 2400 },
  { name: 'Feb', sales: 3000, expenses: 1398 },
  { name: 'Mar', sales: 2000, expenses: 9800 },
  { name: 'Apr', sales: 2780, expenses: 3908 },
  { name: 'May', sales: 1890, expenses: 4800 },
  { name: 'Jun', sales: 2390, expenses: 3800 },
  { name: 'Jul', sales: 3490, expenses: 4300 },
];

export const ChartWidget: React.FC = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="glass-panel p-6 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl backdrop-blur-sm bg-primary/10 border border-primary/20 shadow-sm text-primary">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">Revenue Overview</h3>
            <p className="text-[10px] font-medium text-txtSecondary mt-0.5">Sales vs Expenses (Last 7 Months)</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success border border-success/20 rounded-md text-[10px] font-bold">
            <TrendingUp className="h-3 w-3" />
            +12.5%
          </span>
        </div>
      </div>

      <div className="flex-1 w-full h-[250px] relative z-10 mt-2">
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DC2626" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#DC2626" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.2)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6B7280' }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6B7280' }} 
              tickFormatter={(value) => `₹${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'var(--color-card-bg)', 
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                color: 'var(--color-txt-primary)',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
              formatter={(value: any) => [formatINR(value as number), undefined as any]}
            />
            <Area
              type="monotone"
              dataKey="sales"
              name="Sales"
              stroke="var(--color-primary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#DC2626"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-txtSecondary/50 animate-pulse">
            Loading chart analytics...
          </div>
        )}
      </div>
    </div>
  );
};
