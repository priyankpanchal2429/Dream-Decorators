'use client';

import React, { useState } from 'react';
import {
  Landmark,
  CheckCircle2,
  Clock,
  Copy,
  Check,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export const DashboardBankStatusWidget: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const ifscCode = 'HDFC0000318';

  const handleCopy = () => {
    navigator.clipboard.writeText(ifscCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scheduleDays = [
    { label: 'Today', day: 1, isOpen: true, isToday: true },
    { label: 'Wed', day: 2, isOpen: true, isToday: false },
    { label: 'Thu', day: 3, isOpen: true, isToday: false },
    { label: 'Fri', day: 4, isOpen: true, isToday: false },
    { label: 'Sat', day: 5, isOpen: true, isToday: false }, // 1st Sat open
    { label: 'Sun', day: 6, isOpen: false, isToday: false }, // Sun closed
    { label: 'Mon', day: 7, isOpen: true, isToday: false },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl flex flex-col justify-between h-full space-y-3.5">
      {/* Top Header with Bank & Branch Info */}
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-wider">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Open Now
          </span>

          <h4 className="text-sm font-black text-txtPrimary tracking-tight mt-1">
            HDFC Bank Ltd
          </h4>
          <div className="flex items-center gap-1.5 text-[10px] text-txtSecondary font-medium">
            <span>Bardoli Branch, Gujarat</span>
            <span>•</span>
            <span className="font-mono font-bold text-txtPrimary">IFSC: {ifscCode}</span>
            <button
              onClick={handleCopy}
              className="p-0.5 text-txtSecondary hover:text-primary transition-colors cursor-pointer"
              title="Copy IFSC"
            >
              {copied ? <Check className="h-3 w-3 text-success" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
        </div>

        {/* Bank Icon Circle */}
        <div className="h-9 w-9 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center shrink-0 shadow-2xs">
          <Landmark className="h-5 w-5" />
        </div>
      </div>

      {/* Working Timing Box */}
      <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3">
        <div className="h-7 w-7 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="text-xs">
          <p className="font-bold text-txtPrimary leading-snug">
            Today (Tuesday): <span className="text-emerald-600 dark:text-emerald-400">Open</span>
          </p>
          <p className="text-[10px] text-txtSecondary flex items-center gap-1 mt-0.5">
            <Clock className="h-3 w-3" /> 10:00 AM – 04:00 PM
          </p>
        </div>
      </div>

      {/* Next 7 Days Schedule */}
      <div className="pt-2 border-t border-borderClr/30 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-bold text-txtSecondary">
          <span className="uppercase tracking-wider">Next 7 Days Schedule</span>
          <span className="text-[9px] font-semibold text-txtSecondary/70">Lunch: 1:00 – 2:00 PM</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {scheduleDays.map((item, idx) => (
            <div
              key={idx}
              className={cn(
                'py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-1 transition-all',
                item.isToday
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md scale-105'
                  : 'bg-hoverBg/40 border border-borderClr/30 text-txtSecondary'
              )}
            >
              <span className="text-[9px] font-bold">{item.label}</span>
              <span className="text-[11px] font-black">{item.day}</span>
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  item.isToday
                    ? 'bg-amber-400'
                    : item.isOpen
                    ? 'bg-emerald-500'
                    : 'bg-rose-500'
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
