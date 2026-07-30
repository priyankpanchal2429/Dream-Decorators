import React from 'react';
import { cn } from '@/utils/cn';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
}

export const Heading: React.FC<HeadingProps> = ({ level = 1, children, className, ...props }) => {
  const styles = {
    1: 'text-2xl font-bold tracking-tight text-neutral-900',
    2: 'text-xl font-semibold tracking-tight text-neutral-900',
    3: 'text-lg font-semibold text-neutral-900',
    4: 'text-base font-medium text-neutral-900',
  };

  const Component = `h${level}` as React.ElementType;

  return (
    <Component className={cn(styles[level], className)} {...props}>
      {children}
    </Component>
  );
};

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'muted' | 'danger';
}

export const Text: React.FC<TextProps> = ({ size = 'sm', variant = 'primary', children, className, ...props }) => {
  const sizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const variants = {
    primary: 'text-neutral-900',
    secondary: 'text-neutral-700',
    muted: 'text-neutral-500',
    danger: 'text-danger-600',
  };

  return (
    <p className={cn(sizes[size], variants[variant], className)} {...props}>
      {children}
    </p>
  );
};
