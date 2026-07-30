import React from 'react';
import { Button } from '@/components/ui/Button';
import { Filter, Download, Printer, Plus } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  showFilters?: boolean;
  showExport?: boolean;
  showPrint?: boolean;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  primaryActionText,
  onPrimaryAction,
  showFilters = true,
  showExport = true,
  showPrint = true,
  children,
}) => {
  return (
    <div className="py-4 border-b border-borderClr mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-txtPrimary tracking-tight">{title}</h1>
          {description && <p className="text-xs text-txtSecondary mt-1">{description}</p>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {showFilters && (
            <Button variant="outline" size="sm" leftIcon={<Filter className="h-3.5 w-3.5" />}>
              Filter
            </Button>
          )}
          {showExport && (
            <Button variant="outline" size="sm" leftIcon={<Download className="h-3.5 w-3.5" />}>
              Export
            </Button>
          )}
          {showPrint && (
            <Button variant="outline" size="sm" leftIcon={<Printer className="h-3.5 w-3.5" />}>
              Print
            </Button>
          )}
          {primaryActionText && onPrimaryAction && (
            <Button
              variant="primary"
              size="sm"
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              onClick={onPrimaryAction}
            >
              {primaryActionText}
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};
