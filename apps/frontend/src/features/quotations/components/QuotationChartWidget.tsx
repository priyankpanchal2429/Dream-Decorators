'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { FileSpreadsheet, TrendingUp } from 'lucide-react';
import { formatINR } from '../../dashboard/constants';

const chartData = [
  { month: 'Jan', issued: 450000, accepted: 320000 },
  { month: 'Feb', monthName: 'Feb', issued: 520000, accepted: 410000 },
  { month: 'Mar', issued: 610000, accepted: 480000 },
  { month: 'Apr', issued: 480000, accepted: 390000 },
  { month: 'May', issued: 730000, accepted: 590000 },
  { month: 'Jun', issued: 690000, accepted: 510000 },
  { month: 'Jul', issued: 820000, accepted: 646180 },
];

export const QuotationChartWidget: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl backdrop-blur-sm bg-indigo-500/10 border border-indigo-500/20 shadow-sm text-indigo-500">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">Proposals & Conversion Pipeline</h3>
            <p className="text-[10px] font-medium text-txtSecondary mt-0.5">Issued Value vs Accepted Deals (Monthly)</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 px-3 py-1 bg-success/10 text-success border border-success/20 rounded-md text-[10px] font-bold">
          <TrendingUp className="h-3 w-3" />
          68.5% Win Rate
        </span>
      </div>

      <div className="flex-1 w-full h-[250px] relative z-10 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(229, 231, 235, 0.2)" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#6B7280' }} dy={10} />
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
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
              formatter={(value: any) => [formatINR(value as number), undefined as any]}
            />
            <Bar dataKey="issued" name="Issued Value" fill="#6366F1" radius={[6, 6, 0, 0]} maxBarSize={30} />
            <Bar dataKey="accepted" name="Accepted Deals" fill="#10B981" radius={[6, 6, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
