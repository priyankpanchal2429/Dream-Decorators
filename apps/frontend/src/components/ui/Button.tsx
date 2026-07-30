import React from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

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
    'inline-flex items-center justify-center font-medium transition-colors border rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-1 disabled:opacity-50 disabled:pointer-events-none select-none';

  const variants = {
    primary: 'bg-neutral-900 text-white border-transparent hover:bg-neutral-800',
    secondary: 'bg-neutral-100 text-neutral-900 border-neutral-200 hover:bg-neutral-200',
    outline: 'border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50',
    ghost: 'border-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
    danger: 'bg-danger-600 text-white border-transparent hover:bg-danger-700 focus:ring-danger-600',
    link: 'border-transparent text-neutral-900 underline-offset-4 hover:underline p-0 focus:ring-0',
  };

  const sizes = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], variant !== 'link' && sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
