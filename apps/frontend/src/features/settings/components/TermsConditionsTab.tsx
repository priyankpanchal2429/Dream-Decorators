'use client';

import React from 'react';
import { FileText, Info, ShieldAlert } from 'lucide-react';
import { TermsAndConditions } from '../types';

interface TermsConditionsTabProps {
  terms: TermsAndConditions;
  onChange: (value: string) => void;
}

export const TermsConditionsTab: React.FC<TermsConditionsTabProps> = ({ terms, onChange }) => {
  const clauseCount = terms.terms.split('\n').filter((l) => l.trim().length > 0).length;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-zinc-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Default Terms & Conditions
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Standard contractual terms printed at the bottom of all generated quotations and tax invoices
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
            Default Policy Template
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Terms & Conditions Policy Text <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={8}
              value={terms.terms}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Enter standard payment, delivery, and legal jurisdiction terms..."
              className="w-full p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-medium text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 leading-relaxed focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all font-mono"
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 dark:text-zinc-400 gap-2 pt-1">
              <span>Lines are printed verbatim in sequential order on official documents.</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200">
                {clauseCount} clause{clauseCount === 1 ? '' : 's'} configured
              </span>
            </div>
          </div>

          {/* Quick guidance notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                <Info className="h-4 w-4 text-primary" /> Recommended Commercial Clauses
              </span>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal">
                Specify advance deposit percentage (e.g. 50%), balance due timeline prior to dispatch, and delivery lead times.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4 text-amber-500" /> Jurisdiction & Cancellation
              </span>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-normal">
                State governing legal court jurisdiction (e.g. Ahmedabad, Gujarat) and forfeiture rules if the client cancels.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
