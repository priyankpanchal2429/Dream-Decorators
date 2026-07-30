import React from 'react';
import { cn } from '@/utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return <div className={cn('animate-pulse rounded bg-neutral-200', className)} />;
};

interface LoadingProps {
  message?: string;
  type?: 'spinner' | 'skeleton';
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...', type = 'spinner' }) => {
  if (type === 'skeleton') {
    return (
      <div className="space-y-3 w-full p-4">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8 text-neutral-500 gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent" />
      <span className="text-xs font-medium text-neutral-700">{message}</span>
    </div>
  );
};
