import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  description = 'An error occurred while fetching or processing data.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-danger-200 bg-danger-50/20">
      <div className="rounded-md bg-danger-100 p-2.5 text-danger-600 mb-3">
        <AlertCircle className="h-5 w-5" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">{title}</h3>
      <p className="text-xs text-neutral-600 max-w-sm mb-4">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="danger" size="sm">
          Retry Action
        </Button>
      )}
    </div>
  );
};
