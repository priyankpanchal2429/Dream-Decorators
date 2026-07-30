import React from 'react';
import { Customer } from '../types';
import { Table, Column } from '@/components/ui/Table';
import { StatusBadge } from '@/components/badge/Badge';
import { Button } from '@/components/button/Button';
import { formatINR } from '@/features/dashboard/constants';
import { Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  isLoading?: boolean;
  onView: (cust: Customer) => void;
  onEdit: (cust: Customer) => void;
  onDelete: (cust: Customer) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  isLoading = false,
  onView,
  onEdit,
  onDelete,
}) => {
  const columns: Column<Customer>[] = [
    {
      header: 'Code',
      cell: (item) => <span className="font-bold text-txtPrimary">{item.customerCode}</span>,
    },
    {
      header: 'Customer Name',
      cell: (item) => (
        <div className="flex flex-col">
          <span className="font-extrabold text-txtPrimary">{item.customerName}</span>
          {item.contactPerson && <span className="text-[10px] text-txtSecondary">Contact: {item.contactPerson}</span>}
        </div>
      ),
    },
    { header: 'Mobile', accessorKey: 'mobile' },
    {
      header: 'Company / GST',
      cell: (item) => (
        <div className="flex flex-col max-w-[160px]">
          <span className="truncate text-txtPrimary font-medium">{item.companyName || '—'}</span>
          {item.gstNumber && <span className="text-[9px] font-mono text-txtSecondary">{item.gstNumber}</span>}
        </div>
      ),
    },
    {
      header: 'City & State',
      cell: (item) => (
        <span className="text-xs text-txtSecondary">
          {item.city}, {item.state}
        </span>
      ),
    },
    {
      header: 'Outstanding',
      cell: (item) => (
        <span className="font-extrabold text-txtPrimary">{formatINR(item.outstandingAmount)}</span>
      ),
    },
    {
      header: 'Status',
      cell: (item) => <StatusBadge status={item.status === 'BLOCKED' ? 'CANCELLED' : item.status} />,
    },
    {
      header: 'Actions',
      cell: (item) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => onView(item)}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onEdit(item)}>
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onDelete(item)}>
            <Trash2 className="h-3.5 w-3.5 text-danger" />
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={customers} keyExtractor={(item) => item.id} isLoading={isLoading} />;
};
