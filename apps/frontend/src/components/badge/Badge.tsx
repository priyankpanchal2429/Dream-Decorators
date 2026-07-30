import React from 'react';
import { cn } from '@/utils/cn';

export interface StatusBadgeProps {
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'APPROVED' | 'CANCELLED' | 'PAID' | 'UNPAID' | 'OVERDUE' | 'DRAFT';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<string, string> = {
    ACTIVE: 'bg-success/10 text-success border-success/30',
    APPROVED: 'bg-success/10 text-success border-success/30',
    PAID: 'bg-success/10 text-success border-success/30',
    PENDING: 'bg-warning/10 text-warning border-warning/30',
    INACTIVE: 'bg-gray-100 text-txtSecondary border-borderClr',
    CANCELLED: 'bg-danger/10 text-danger border-danger/30',
    UNPAID: 'bg-danger/10 text-danger border-danger/30',
    OVERDUE: 'bg-danger/10 text-danger border-danger/30',
    DRAFT: 'bg-gray-100 text-txtSecondary border-borderClr',
  };

  const dots: Record<string, string> = {
    ACTIVE: 'bg-success',
    APPROVED: 'bg-success',
    PAID: 'bg-success',
    PENDING: 'bg-warning',
    INACTIVE: 'bg-txtSecondary',
    CANCELLED: 'bg-danger',
    UNPAID: 'bg-danger',
    OVERDUE: 'bg-danger',
    DRAFT: 'bg-txtSecondary',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider select-none',
        styles[status]
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dots[status])} />
      {status.replace('_', ' ')}
    </span>
  );
};
