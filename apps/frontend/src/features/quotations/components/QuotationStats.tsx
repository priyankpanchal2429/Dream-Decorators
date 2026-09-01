'use client';

import React from 'react';
import { FileCheck, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { QuotationStatsData } from '../types';
import { formatINR } from '../../dashboard/constants';
import { cn } from '@/utils/cn';

interface QuotationStatsProps {
  stats: QuotationStatsData;
}

export const QuotationStats: React.FC<QuotationStatsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Quotation Value',
      value: formatINR(stats.totalValue || 0),
      subtitle: `${stats.totalCount || 0} Proposals issued`,
      todayValue: formatINR(stats.todayValue || 0),
      monthlyValue: formatINR(stats.monthlyValue || stats.totalValue || 0),
      trend: stats.totalCount > 0 ? '+100%' : '0%',
      isPositive: true,
      icon: <FileCheck className="h-5 w-5 text-primary" />,
      glowColor: 'bg-primary',
      iconBg: 'bg-primary/10 border-primary/20',
      trendColor: '#16A34A',
    },
    {
      title: 'Accepted Deals',
      value: formatINR(stats.acceptedValue || 0),
      subtitle: `${stats.acceptedCount || 0} Approved by clients`,
      todayValue: formatINR(stats.todayAcceptedValue || 0),
      monthlyValue: formatINR(stats.monthlyAcceptedValue || stats.acceptedValue || 0),
      trend: stats.acceptedCount > 0 ? '+100%' : '0%',
      isPositive: true,
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      glowColor: 'bg-success',
      iconBg: 'bg-success/10 border-success/20',
      trendColor: '#16A34A',
    },
    {
      title: 'Pending Decisions',
      value: formatINR(stats.pendingValue || 0),
      subtitle: `${stats.pendingCount || 0} Awaiting response`,
      todayValue: formatINR(stats.todayPendingValue || 0),
      monthlyValue: formatINR(stats.monthlyPendingValue || stats.pendingValue || 0),
      trend: stats.pendingCount > 0 ? 'Active' : '0%',
      isPositive: false,
      icon: <Clock className="h-5 w-5 text-warning" />,
      glowColor: 'bg-warning',
      iconBg: 'bg-warning/10 border-warning/20',
      trendColor: '#DC2626',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="glass-panel flex flex-col p-5 rounded-3xl relative overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full"
        >
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className={cn("p-2.5 rounded-xl backdrop-blur-md border shadow-sm", card.iconBg)}>
                {card.icon}
              </div>
              <span className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">{card.title}</span>
            </div>
          </div>

          <p className="text-3xl font-black text-txtPrimary tracking-tight mb-5 relative z-10">
            {card.value}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
            <div className="bg-hoverBg/50 p-2.5 rounded-2xl border border-borderClr/30">
              <p className="text-[10px] font-semibold text-txtSecondary mb-0.5 uppercase tracking-wider">Today</p>
              <p className="text-xs font-bold text-txtPrimary">{card.todayValue}</p>
            </div>
            <div className="bg-hoverBg/50 p-2.5 rounded-2xl border border-borderClr/30">
              <p className="text-[10px] font-semibold text-txtSecondary mb-0.5 uppercase tracking-wider">This Month</p>
              <p className="text-xs font-bold text-txtPrimary">{card.monthlyValue}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-borderClr/30 relative z-10">
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 shadow-xs',
                  card.isPositive ? 'bg-success/10 text-success border border-success/20' : 'bg-danger/10 text-danger border border-danger/20'
                )}
              >
                <TrendingUp className="h-3 w-3" />
                {card.trend}
              </span>
              <span className="text-[10px] text-txtSecondary font-medium">vs last month</span>
            </div>

            {/* Sparkline SVG */}
            <div className="w-20 h-6">
              <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={card.trendColor} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={card.trendColor} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,25 C20,18 30,8 50,15 C70,22 80,6 100,10 L100,30 L0,30 Z"
                  fill={`url(#grad-${idx})`}
                />
                <path
                  d="M0,25 C20,18 30,8 50,15 C70,22 80,6 100,10"
                  fill="none"
                  stroke={card.trendColor}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
