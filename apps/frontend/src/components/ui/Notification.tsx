'use client';

import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useToastStore } from '@/lib/toast.store';
import { cn } from '@/utils/cn';

export const NotificationContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    info: <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />,
    success: <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />,
    error: <AlertCircle className="h-4 w-4 text-danger shrink-0 mt-0.5" />,
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            'pointer-events-auto flex items-start justify-between p-3.5 rounded-2xl border bg-cardBg border-borderClr shadow-xl text-txtPrimary backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-3',
            t.type === 'error' && 'border-danger/30 bg-danger/10',
            t.type === 'success' && 'border-success/30 bg-success/10',
            t.type === 'warning' && 'border-warning/30 bg-warning/10'
          )}
        >
          <div className="flex items-start gap-3">
            {icons[t.type || 'info']}
            <div className="flex flex-col gap-0.5">
              {t.title && <span className="text-xs font-bold text-txtPrimary">{t.title}</span>}
              <span className="text-xs font-medium text-txtSecondary">{t.message}</span>
            </div>
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-txtSecondary hover:text-txtPrimary transition-colors p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
