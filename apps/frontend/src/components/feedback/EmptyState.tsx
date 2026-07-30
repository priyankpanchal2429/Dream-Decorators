import React from 'react';
import { Inbox } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'There are no items to display at this time.',
  actionText,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-lg border border-neutral-200 bg-white">
      <div className="rounded-md bg-neutral-100 p-3 text-neutral-400 mb-3">
        <Inbox className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">{title}</h3>
      <p className="text-xs text-neutral-500 max-w-sm mb-5">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} size="sm">
          {actionText}
        </Button>
      )}
    </div>
  );
};
