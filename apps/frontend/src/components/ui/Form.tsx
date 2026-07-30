import React from 'react';
import { cn } from '@/utils/cn';

interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  children,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-1 w-full', className)}>
      {label && <label className="text-xs font-semibold text-neutral-800">{label}</label>}
      {children}
      {error && <span className="text-xs text-danger-600 font-medium">{error}</span>}
      {helperText && !error && <span className="text-xs text-neutral-500">{helperText}</span>}
    </div>
  );
};
