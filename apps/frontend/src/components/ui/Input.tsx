import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-neutral-800">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && <div className="absolute left-3 text-neutral-400 pointer-events-none">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-3 py-1.5 text-sm rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900 focus:border-neutral-900 transition-colors',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-danger-600 focus:ring-danger-600 focus:border-danger-600',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 text-neutral-400">{rightIcon}</div>}
        </div>
        {error && <span className="text-xs text-danger-600 font-medium">{error}</span>}
        {helperText && !error && <span className="text-xs text-neutral-500">{helperText}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
