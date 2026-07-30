import React from 'react';
import { cn } from '@/utils/cn';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className }) => {
  return (
    <div className={cn('max-w-page w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12', className)}>
      {children}
    </div>
  );
};
