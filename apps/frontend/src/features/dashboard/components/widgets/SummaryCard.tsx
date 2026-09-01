'use client';

import React from 'react';
import { MetricSummary } from '../../types';
import { formatINR } from '../../constants';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SummaryCardProps {
  title: string;
  data: MetricSummary;
  icon: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  data,
  icon,
}) => {
  const isPositive = data.isPositive;
  const trendColor = isPositive ? '#16A34A' : '#DC2626';
  const gradientId = React.useMemo(() => title.replace(/[^a-zA-Z0-9]/g, '-'), [title]);

  // Determine icon background based on title
  const iconBg = title.includes('Sales')
    ? 'bg-primary/10 text-primary'
    : title.includes('Purchase')
    ? 'bg-success/10 text-success'
    : 'bg-danger/10 text-danger';

  return (
    <div className="glass-panel flex flex-col p-5 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg h-full">
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl backdrop-blur-md border border-white/10 shadow-sm", iconBg)}>
            {icon}
          </div>
          <span className="text-sm font-semibold text-txtSecondary tracking-wide">{title}</span>
        </div>
      </div>

      <p className="text-3xl font-black text-txtPrimary tracking-tight mb-6 relative z-10">
        {formatINR(data.monthlyAmount ?? data.todayAmount)}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="bg-hoverBg/50 p-2.5 rounded-xl border border-borderClr/30">
          <p className="text-[10px] font-semibold text-txtSecondary mb-1 uppercase tracking-wider">Today</p>
          <p className="text-sm font-bold text-txtPrimary">{formatINR(data.todayAmount)}</p>
        </div>
        <div className="bg-hoverBg/50 p-2.5 rounded-xl border border-borderClr/30">
          <p className="text-[10px] font-semibold text-txtSecondary mb-1 uppercase tracking-wider">This Month</p>
          <p className="text-sm font-bold text-txtPrimary">{formatINR(data.monthlyAmount)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-borderClr/30 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'text-[10px] font-bold px-2 py-1 rounded-md inline-flex items-center gap-1 shadow-sm',
              isPositive ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {data.trendPercent}%
          </span>
          <span className="text-[10px] text-txtSecondary font-medium">vs last month</span>
        </div>

        {/* Mini Sparkline SVG */}
        <div className="w-20 h-6">
          <svg viewBox="0 0 100 30" className="w-full h-full preserve-3d overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={`gradient-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={trendColor} stopOpacity="0.25" />
                <stop offset="100%" stopColor={trendColor} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,25 C20,20 30,5 50,15 C70,25 80,5 100,10 L100,30 L0,30 Z"
              fill={`url(#gradient-${gradientId})`}
              className="transition-all duration-300"
            />
            <path
              d="M0,25 C20,20 30,5 50,15 C70,25 80,5 100,10"
              fill="none"
              stroke={trendColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              className="drop-shadow-md"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
