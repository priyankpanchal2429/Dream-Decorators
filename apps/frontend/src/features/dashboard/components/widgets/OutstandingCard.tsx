'use client';

import React from 'react';
import { OutstandingSummary } from '../../types';
import { formatINR } from '../../constants';
import { Wallet, ArrowRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface OutstandingCardProps {
  title: string;
  data: OutstandingSummary;
  type: 'receivable' | 'payable';
}

export const OutstandingCard: React.FC<OutstandingCardProps> = ({
  title,
  data,
  type,
}) => {
  const percentage = data.recoveryPercent;
  const isReceivable = type === 'receivable';
    
  return (
    <div className="glass-panel flex flex-col p-6 rounded-3xl relative overflow-hidden group h-full">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn("p-2.5 rounded-xl backdrop-blur-sm border border-white/10 shadow-sm",
            isReceivable ? "bg-primary/10 text-primary" : "bg-warning/10 text-warning"
          )}>
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-sm font-bold text-txtPrimary">{title}</span>
        </div>
        <button 
          onClick={() => alert(`View All ${title} clicked!`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-txtSecondary hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="mb-6 relative z-10">
        <p className="text-sm font-medium text-txtSecondary mb-1">Total Balance</p>
        <p className="text-4xl font-black text-txtPrimary tracking-tight">
          {formatINR(data.totalOutstanding)}
        </p>
      </div>

      <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-borderClr/30 relative z-10">
        <div className="bg-hoverBg/40 p-3 rounded-xl border border-borderClr/30">
          <p className="text-[11px] font-semibold text-txtSecondary mb-1.5 uppercase tracking-wide">Due Today</p>
          <p className="text-base font-bold text-warning">{formatINR(data.dueToday)}</p>
        </div>
        
        <div className="bg-hoverBg/40 p-3 rounded-xl border border-borderClr/30">
          <p className="text-[11px] font-semibold text-txtSecondary mb-1.5 uppercase tracking-wide">Overdue</p>
          <p className="text-base font-bold text-danger">{formatINR(data.overdue)}</p>
        </div>

        <div className="bg-hoverBg/40 p-3 rounded-xl border border-borderClr/30 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-1.5">
            <p className="text-[11px] font-semibold text-txtSecondary uppercase tracking-wide">
              {isReceivable ? 'Collection' : 'Payment'}
            </p>
            <p className="text-xs font-bold text-success">{percentage}%</p>
          </div>
          <div className="h-2 w-full bg-borderClr/50 rounded-full overflow-hidden shadow-inner">
            <div 
              className={cn("h-full rounded-full transition-all duration-1000 ease-out", 
                isReceivable ? "bg-gradient-to-r from-success to-emerald-400" : "bg-gradient-to-r from-warning to-amber-400"
              )} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
