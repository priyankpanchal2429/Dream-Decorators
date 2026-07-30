'use client';

import React from 'react';
import { InvoiceDueItem } from '../../types';
import { formatINR } from '../../constants';
import { Eye, ArrowRight, BellRing } from 'lucide-react';
import { cn } from '@/utils/cn';

interface InvoiceDueWidgetProps {
  title: string;
  partyLabel: 'Customer' | 'Vendor';
  invoices: InvoiceDueItem[];
}

export function InvoiceDueWidget({
  title,
  partyLabel,
  invoices,
}: InvoiceDueWidgetProps) {
  const displayInvoices = invoices.slice(0, 5);

  return (
    <div className="glass-panel p-0 overflow-hidden rounded-3xl h-full flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-borderClr/30 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl backdrop-blur-sm bg-primary/10 border border-primary/20 shadow-sm text-primary">
            <BellRing className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">{title}</h3>
            <p className="text-[10px] font-medium text-txtSecondary mt-0.5">Upcoming and overdue invoices</p>
          </div>
        </div>
        <button 
          onClick={() => alert(`View All ${title} clicked!`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-txtSecondary hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase tracking-widest">
              <th className="px-6 py-3">Invoice Details</th>
              <th className="px-6 py-3">{partyLabel}</th>
              <th className="px-6 py-3 text-right">Amount</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderClr/20">
            {displayInvoices.map((inv) => {
              // Calculate days left
              const dueDate = new Date(inv.dueDate);
              const today = new Date('2026-07-29');
              const diffTime = dueDate.getTime() - today.getTime();
              const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              
              let statusLabel: string = inv.status;
              if (daysLeft < 0) statusLabel = 'OVERDUE';
              else if (daysLeft === 0) statusLabel = 'Due Today';
              else statusLabel = 'Upcoming';

              return (
                <tr key={inv.id} className="hover:bg-hoverBg/50 transition-colors group">
                  <td className="px-6 py-3.5">
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-txtPrimary group-hover:text-primary transition-colors">{inv.invoiceNumber}</span>
                      <span className="text-[10px] text-txtSecondary mt-0.5">Issued: {inv.invoiceDate}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center text-xs font-bold text-txtPrimary shrink-0">
                        {inv.partyName.charAt(0)}
                      </div>
                      <span className="text-[12px] font-semibold text-txtPrimary truncate max-w-[150px]">{inv.partyName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <span className="text-sm font-black text-txtPrimary">{formatINR(inv.amount)}</span>
                  </td>
                  <td className="px-6 py-3.5 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={cn(
                        "px-2.5 py-1 text-[9px] font-bold rounded-md border inline-flex items-center justify-center uppercase tracking-wider",
                        daysLeft < 0 ? "bg-danger/10 text-danger border-danger/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" : 
                        daysLeft === 0 ? "bg-warning/10 text-warning border-warning/20" : 
                        "bg-primary/10 text-primary border-primary/20"
                      )}>
                        {statusLabel === 'Due Today' ? 'Due Today' : statusLabel === 'OVERDUE' ? 'Overdue' : 'Upcoming'}
                      </span>
                      <span className={cn(
                        "text-[9px] font-semibold",
                        daysLeft < 0 ? "text-danger" : daysLeft === 0 ? "text-warning" : "text-success"
                      )}>
                        {daysLeft < 0 ? `${Math.abs(daysLeft)} days late` : daysLeft === 0 ? "Today" : `in ${daysLeft} days`}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex justify-center gap-2">
                      <button 
                        onClick={() => alert(`Remind ${inv.partyName} for invoice ${inv.invoiceNumber}`)}
                        className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[10px] font-bold hover:bg-primary hover:text-white transition-colors"
                      >
                        {partyLabel === 'Customer' ? 'Remind' : 'Pay'}
                      </button>
                      <button 
                        onClick={() => alert(`View invoice ${inv.invoiceNumber}`)}
                        className="p-1.5 rounded-lg bg-hoverBg border border-borderClr/50 text-txtSecondary hover:text-primary transition-colors hover:border-primary/30"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
