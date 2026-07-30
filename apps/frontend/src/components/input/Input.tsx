import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { IndianRupee, Percent, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-txtPrimary">
            {label} {props.required && <span className="text-danger">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && <div className="absolute left-3 text-txtSecondary pointer-events-none">{leftIcon}</div>}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full px-3 py-2 text-xs rounded-xl border border-borderClr bg-cardBg text-txtPrimary placeholder:text-txtSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
              leftIcon && 'pl-9',
              rightIcon && 'pr-9',
              error && 'border-danger focus:ring-danger',
              className
            )}
            {...props}
          />
          {rightIcon && <div className="absolute right-3 text-txtSecondary">{rightIcon}</div>}
        </div>
        {error && <span className="text-[10px] text-danger font-semibold">{error}</span>}
        {helperText && !error && <span className="text-[10px] text-txtSecondary">{helperText}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export const CurrencyInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => (
  <Input ref={ref} leftIcon={<IndianRupee className="h-3.5 w-3.5" />} placeholder="0.00" {...props} />
));
CurrencyInput.displayName = 'CurrencyInput';

export const PercentageInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => (
  <Input ref={ref} rightIcon={<Percent className="h-3.5 w-3.5" />} placeholder="18.00" {...props} />
));
PercentageInput.displayName = 'PercentageInput';

export const GSTInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => (
  <Input ref={ref} placeholder="22AAAAA0000A1Z5" maxLength={15} className="uppercase font-mono" {...props} />
));
GSTInput.displayName = 'GSTInput';

export const PhoneInput = forwardRef<HTMLInputElement, BaseInputProps>((props, ref) => (
  <Input ref={ref} leftIcon={<Phone className="h-3.5 w-3.5" />} placeholder="+91 98765 43210" {...props} />
));
PhoneInput.displayName = 'PhoneInput';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const areaId = id || props.name;
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={areaId} className="text-xs font-semibold text-txtPrimary">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          className={cn(
            'w-full px-3 py-2 text-xs rounded-xl border border-borderClr bg-cardBg text-txtPrimary placeholder:text-txtSecondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors min-h-[80px]',
            error && 'border-danger focus:ring-danger',
            className
          )}
          {...props}
        />
        {error && <span className="text-[10px] text-danger font-semibold">{error}</span>}
        {helperText && !error && <span className="text-[10px] text-txtSecondary">{helperText}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
