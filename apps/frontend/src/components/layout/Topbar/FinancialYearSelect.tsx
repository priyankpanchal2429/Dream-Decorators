import React from 'react';
import { Calendar } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';

export const FinancialYearSelect: React.FC = () => {
  return (
    <div className="flex items-center gap-1.5 bg-gray-50 border border-borderClr px-2.5 py-1 rounded-lg">
      <Calendar className="h-4 w-4 text-primary" />
      <Dropdown
        options={[
          { label: 'FY 2026-27', value: 'FY2026-27' },
          { label: 'FY 2025-26', value: 'FY2025-26' },
        ]}
        className="py-1 text-xs border-none bg-transparent font-semibold text-txtPrimary focus:ring-0"
      />
    </div>
  );
};
