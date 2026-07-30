import React from 'react';
import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  showDot = false,
  className,
  ...props
}) => {
  const variants = {
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    success: 'bg-success-50 text-success-700 border-success-100',
    warning: 'bg-warning-50 text-warning-700 border-warning-100',
    danger: 'bg-danger-50 text-danger-700 border-danger-100',
    info: 'bg-blue-50 text-blue-700 border-blue-100',
  };

  const dotColors = {
    neutral: 'bg-neutral-500',
    success: 'bg-success-600',
    warning: 'bg-warning-600',
    danger: 'bg-danger-600',
    info: 'bg-blue-600',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border select-none',
        variants[variant],
        className
      )}
      {...props}
    >
      {showDot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
};
