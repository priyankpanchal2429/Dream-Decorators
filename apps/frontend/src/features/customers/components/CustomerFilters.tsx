import React from 'react';
import { CustomerType, CustomerStatus } from '../types';
import { Search } from '@/components/ui/Search';
import { Dropdown } from '@/components/ui/Dropdown';
import { Button } from '@/components/button/Button';
import { FilterX } from 'lucide-react';

interface CustomerFiltersProps {
  search: string;
  onSearchChange: (val: string) => void;
  typeFilter: string;
  onTypeChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  onClear: () => void;
}

export const CustomerFilters: React.FC<CustomerFiltersProps> = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeChange,
  statusFilter,
  onStatusChange,
  onClear,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-cardBg border border-borderClr shadow-xs mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <Search
          value={search}
          onChange={onSearchChange}
          placeholder="Search by name, code, mobile, GSTIN..."
          className="w-full md:w-72"
        />

        <Dropdown
          value={typeFilter}
          onChange={(e) => onTypeChange(e.target.value)}
          options={[
            { label: 'All Customer Types', value: '' },
            { label: 'Individual', value: 'INDIVIDUAL' },
            { label: 'Business', value: 'BUSINESS' },
            { label: 'Dealer', value: 'DEALER' },
            { label: 'Distributor', value: 'DISTRIBUTOR' },
          ]}
          className="w-44"
        />

        <Dropdown
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          options={[
            { label: 'All Statuses', value: '' },
            { label: 'Active', value: 'ACTIVE' },
            { label: 'Inactive', value: 'INACTIVE' },
            { label: 'Blocked', value: 'BLOCKED' },
          ]}
          className="w-36"
        />
      </div>

      {(search || typeFilter || statusFilter) && (
        <Button variant="ghost" size="sm" onClick={onClear} leftIcon={<FilterX className="h-3.5 w-3.5" />}>
          Clear Filters
        </Button>
      )}
    </div>
  );
};
