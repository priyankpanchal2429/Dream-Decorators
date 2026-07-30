'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Calendar, Sparkles } from 'lucide-react';

export const QuotationHeader: React.FC = () => {
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 pt-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> Proposals Hub
          </span>
        </div>
        <h1 className="text-3xl font-black text-txtPrimary tracking-tight">
          Quotation <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-500">Management</span> 📄
        </h1>
        <p className="text-sm font-medium text-txtSecondary mt-1.5 flex items-center gap-1.5">
          Track, issue, and analyze client estimates and conversion pipelines.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cardBg border border-borderClr shadow-sm glass-panel backdrop-blur-md">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-txtPrimary">{currentDate}</span>
        </div>

        <Link
          href="/quotations/new"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Create Quotation
        </Link>
      </div>
    </div>
  );
};
