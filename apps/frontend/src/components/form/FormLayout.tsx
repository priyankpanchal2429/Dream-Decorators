import React from 'react';
import { cn } from '@/utils/cn';

export interface FormGridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4;
  className?: string;
}

export const FormGrid: React.FC<FormGridProps> = ({ children, cols = 3, className }) => {
  const colStyles = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return <div className={cn('grid gap-4 w-full', colStyles[cols], className)}>{children}</div>;
};

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, description, children }) => (
  <div className="space-y-4 pb-6 border-b border-borderClr mb-6">
    <div>
      <h3 className="text-sm font-bold text-txtPrimary">{title}</h3>
      {description && <p className="text-xs text-txtSecondary mt-0.5">{description}</p>}
    </div>
    {children}
  </div>
);
