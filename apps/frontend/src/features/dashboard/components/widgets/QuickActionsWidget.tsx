'use client';

import React from 'react';
import { FileText, Users, Box, Receipt, ArrowDownToLine, ArrowUpFromLine, Truck, MoreHorizontal, Zap } from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  colorClass: string;
}

const actions: QuickActionProps[] = [
  { label: 'New Quotation', icon: <FileText className="h-5 w-5" />, onClick: () => alert('New Quotation action triggered!'), colorClass: 'text-primary bg-primary/10 border-primary/20 hover:bg-primary/20' },
  { label: 'New Customer', icon: <Users className="h-5 w-5" />, onClick: () => alert('New Customer action triggered!'), colorClass: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20 hover:bg-indigo-500/20' },
  { label: 'New Product', icon: <Box className="h-5 w-5" />, onClick: () => alert('New Product action triggered!'), colorClass: 'text-amber-500 bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20' },
  { label: 'Sales Invoice', icon: <Receipt className="h-5 w-5" />, onClick: () => alert('New Sales Invoice action triggered!'), colorClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20 hover:bg-emerald-500/20' },
  { label: 'Purchase Invoice', icon: <FileText className="h-5 w-5" />, onClick: () => alert('New Purchase Invoice action triggered!'), colorClass: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20 hover:bg-cyan-500/20' },
  { label: 'Receive Payment', icon: <ArrowDownToLine className="h-5 w-5" />, onClick: () => alert('Receive Payment action triggered!'), colorClass: 'text-green-500 bg-green-500/10 border-green-500/20 hover:bg-green-500/20' },
  { label: 'Make Payment', icon: <ArrowUpFromLine className="h-5 w-5" />, onClick: () => alert('Make Payment action triggered!'), colorClass: 'text-rose-500 bg-rose-500/10 border-rose-500/20 hover:bg-rose-500/20' },
  { label: 'Delivery Challan', icon: <Truck className="h-5 w-5" />, onClick: () => alert('Delivery Challan action triggered!'), colorClass: 'text-purple-500 bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20' },
];

export const QuickActionsWidget: React.FC = () => {
  return (
    <div className="glass-panel p-6 rounded-3xl h-full flex flex-col relative overflow-hidden group">
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl backdrop-blur-sm bg-primary/10 border border-primary/20 shadow-sm text-primary">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">Quick Actions</h3>
            <p className="text-[10px] font-medium text-txtSecondary mt-0.5">Most used shortcuts</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10 mt-auto">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-hoverBg/40 border border-borderClr/30 hover:border-borderClr transition-all duration-300 hover:scale-105 hover:bg-hoverBg hover:shadow-md group/btn"
          >
            <div className={cn("p-3 rounded-xl border transition-colors mb-2", action.colorClass)}>
              {action.icon}
            </div>
            <span className="text-[10px] font-bold text-txtPrimary text-center leading-tight group-hover/btn:text-primary transition-colors">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
