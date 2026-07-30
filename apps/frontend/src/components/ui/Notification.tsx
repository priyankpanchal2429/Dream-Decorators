'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore } from '@/lib/toast.store';
import { cn } from '@/utils/cn';

export const NotificationContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    info: <Info className="h-4 w-4 text-blue-600" />,
    success: <CheckCircle className="h-4 w-4 text-success-600" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning-600" />,
    error: <AlertCircle className="h-4 w-4 text-danger-600" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'flex items-start justify-between p-3 rounded-lg border bg-white shadow-md text-neutral-900',
            t.type === 'error' && 'border-danger-200 bg-danger-50/20',
            t.type === 'success' && 'border-success-200 bg-success-50/20',
            t.type === 'warning' && 'border-warning-200 bg-warning-50/20'
          )}
        >
          <div className="flex items-start gap-2.5">
            {icons[t.type || 'info']}
            <div className="flex flex-col gap-0.5">
              {t.title && <span className="text-xs font-semibold">{t.title}</span>}
              <span className="text-xs text-neutral-600">{t.message}</span>
            </div>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-neutral-400 hover:text-neutral-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
