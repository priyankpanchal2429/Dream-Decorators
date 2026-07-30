import React, { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ label, className, ...props }, ref) => (
  <label className="inline-flex items-center gap-2 text-xs font-semibold text-txtPrimary cursor-pointer select-none">
    <input
      type="checkbox"
      ref={ref}
      className={cn('h-4 w-4 rounded border-borderClr text-primary focus:ring-primary', className)}
      {...props}
    />
    {label && <span>{label}</span>}
  </label>
));
Checkbox.displayName = 'Checkbox';

export interface ToggleSwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(({ label, checked, onChange, className, ...props }, ref) => (
  <label className="inline-flex items-center gap-2.5 text-xs font-semibold text-txtPrimary cursor-pointer select-none">
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
    </div>
    {label && <span>{label}</span>}
  </label>
));
ToggleSwitch.displayName = 'ToggleSwitch';
