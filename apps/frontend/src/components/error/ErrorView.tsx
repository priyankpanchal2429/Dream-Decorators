import React from 'react';
import { AlertTriangle, WifiOff, ShieldAlert, FileQuestion } from 'lucide-react';
import { Button } from '@/components/button/Button';

interface ErrorViewProps {
  type?: '404' | '403' | '500' | 'network' | 'permission';
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorView: React.FC<ErrorViewProps> = ({
  type = '500',
  title,
  description,
  onRetry,
}) => {
  const defaults = {
    '404': { title: 'Page Not Found', desc: 'The requested resource could not be found on the server.', icon: <FileQuestion className="h-8 w-8 text-warning" /> },
    '403': { title: 'Access Denied', desc: 'You do not have permission to view this section.', icon: <ShieldAlert className="h-8 w-8 text-danger" /> },
    '500': { title: 'Server Error', desc: 'An unexpected internal server error occurred.', icon: <AlertTriangle className="h-8 w-8 text-danger" /> },
    'network': { title: 'Network Disconnected', desc: 'Check your internet connection and try again.', icon: <WifiOff className="h-8 w-8 text-warning" /> },
    'permission': { title: 'Permission Error', desc: 'Contact your System Administrator for access rights.', icon: <ShieldAlert className="h-8 w-8 text-danger" /> },
  };

  const current = defaults[type];

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-borderClr bg-cardBg">
      <div className="p-4 rounded-2xl bg-gray-50 border border-borderClr mb-4">{current.icon}</div>
      <h3 className="text-base font-extrabold text-txtPrimary">{title || current.title}</h3>
      <p className="text-xs text-txtSecondary max-w-sm mt-1 mb-6">{description || current.desc}</p>
      {onRetry && (
        <Button variant="primary" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
