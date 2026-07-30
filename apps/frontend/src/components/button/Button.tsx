import React from 'react';
import { cn } from '@/utils/cn';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-primary text-white border-transparent hover:bg-primary-hover shadow-xs',
    secondary: 'bg-gray-100 text-txtPrimary border-borderClr hover:bg-gray-200',
    outline: 'border-borderClr bg-cardBg text-txtPrimary hover:bg-gray-50',
    ghost: 'border-transparent text-txtSecondary hover:bg-gray-100 hover:text-txtPrimary',
    danger: 'bg-danger text-white border-transparent hover:bg-danger/90 focus:ring-danger shadow-xs',
    success: 'bg-success text-white border-transparent hover:bg-success/90 focus:ring-success shadow-xs',
    link: 'border-transparent text-primary underline-offset-4 hover:underline p-0 focus:ring-0',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], variant !== 'link' && sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}
      {children && <span>{children}</span>}
      {!isLoading && rightIcon}
    </button>
  );
};
