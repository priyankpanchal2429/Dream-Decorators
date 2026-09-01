'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  ArrowDownLeft,
  ArrowUpRight,
  Receipt,
  ShoppingBag,
  Plus,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface QuickActionItem {
  id: string;
  title: string;
  href: string;
  icon: React.ReactNode;
  iconBg: string;
  textColor: string;
  borderColor: string;
}

export const DashboardQuickCreateBar: React.FC = () => {
  const router = useRouter();

  const actions: QuickActionItem[] = [
    {
      id: 'quotation',
      title: 'Quotation',
      href: '/quotations/new',
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      iconBg: 'bg-blue-500/10 border-blue-500/20',
      textColor: 'group-hover:text-blue-500',
      borderColor: 'hover:border-blue-500/40',
    },
    {
      id: 'inward-payment',
      title: 'Inward Payments',
      href: '/payments',
      icon: <ArrowDownLeft className="h-5 w-5 text-emerald-500" />,
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      textColor: 'group-hover:text-emerald-500',
      borderColor: 'hover:border-emerald-500/40',
    },
    {
      id: 'outward-payment',
      title: 'Outward Payment',
      href: '/payments',
      icon: <ArrowUpRight className="h-5 w-5 text-rose-500" />,
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      textColor: 'group-hover:text-rose-500',
      borderColor: 'hover:border-rose-500/40',
    },
    {
      id: 'sales-invoice',
      title: 'Sales Invoice',
      href: '/invoices/new',
      icon: <Receipt className="h-5 w-5 text-amber-500" />,
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      textColor: 'group-hover:text-amber-500',
      borderColor: 'hover:border-amber-500/40',
    },
    {
      id: 'purchase-invoice',
      title: 'Purchase Invoice',
      href: '/purchases/new',
      icon: <ShoppingBag className="h-5 w-5 text-purple-500" />,
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      textColor: 'group-hover:text-purple-500',
      borderColor: 'hover:border-purple-500/40',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {actions.map((act) => (
        <div
          key={act.id}
          onClick={() => router.push(act.href)}
          className={cn(
            'group cursor-pointer p-4 rounded-3xl bg-cardBg border border-borderClr shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between h-32',
            act.borderColor
          )}
        >
          {/* Top Row: Icon on left, Plus button on right */}
          <div className="flex items-center justify-between">
            <div className={cn('p-2.5 rounded-2xl border shadow-2xs', act.iconBg)}>
              {act.icon}
            </div>

            <div className="h-7 w-7 rounded-full bg-hoverBg border border-borderClr/60 flex items-center justify-center text-txtSecondary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              <Plus className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Bottom Row: Action Title */}
          <div>
            <h4
              className={cn(
                'text-sm font-extrabold text-txtPrimary transition-colors tracking-tight',
                act.textColor
              )}
            >
              {act.title}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
};
