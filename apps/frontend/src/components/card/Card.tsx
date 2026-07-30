import React from 'react';
import { cn } from '@/utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => (
  <div className={cn('rounded-xl border border-borderClr bg-cardBg p-4 shadow-xs text-txtPrimary', className)} {...props}>
    {children}
  </div>
);

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: string;
  isPositive?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon, trend, isPositive = true }) => (
  <Card className="hover:border-primary/50 transition-colors">
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-txtSecondary">{title}</span>
      {icon && <div className="p-2 rounded-xl bg-primary/10 text-primary">{icon}</div>}
    </div>
    <p className="text-2xl font-extrabold text-txtPrimary mt-2 tracking-tight">{value}</p>
    {(subtitle || trend) && (
      <div className="flex items-center gap-1.5 mt-2">
        {trend && (
          <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded', isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger')}>
            {trend}
          </span>
        )}
        {subtitle && <span className="text-[10px] font-medium text-txtSecondary">{subtitle}</span>}
      </div>
    )}
  </Card>
);
