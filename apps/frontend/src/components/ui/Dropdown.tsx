import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

export const Dropdown = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className, id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-neutral-800">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full appearance-none px-3 py-1.5 text-sm rounded-md border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors pr-9',
              error && 'border-danger-600 focus:ring-danger-600 focus:border-danger-600',
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={String(opt.value)} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 h-4 w-4 text-neutral-400 pointer-events-none" />
        </div>
        {error && <span className="text-xs text-danger-600 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-neutral-500">{helperText}</span>}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';
