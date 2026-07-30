'use client';

import React from 'react';
import { Eye, Mail, Trash2, Search, Filter } from 'lucide-react';
import { Quotation, QuotationStatus } from '../types';
import { formatINR } from '../../dashboard/constants';
import { cn } from '@/utils/cn';

interface QuotationTableProps {
  quotations: Quotation[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: string;
  onFilterChange: (status: string) => void;
  onView: (quotation: Quotation) => void;
  onDelete: (id: string) => void;
}

export const QuotationTable: React.FC<QuotationTableProps> = ({
  quotations,
  searchQuery,
  onSearchChange,
  statusFilter,
  onFilterChange,
  onView,
  onDelete,
}) => {
  const filterOptions = [
    { label: 'All', value: 'ALL' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Sent', value: 'SENT' },
    { label: 'Accepted', value: 'ACCEPTED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Expired', value: 'EXPIRED' },
  ];

  const getStatusBadge = (status: QuotationStatus) => {
    switch (status) {
      case 'ACCEPTED':
        return 'bg-success/10 text-success border-success/30';
      case 'SENT':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'DRAFT':
        return 'bg-warning/10 text-warning border-warning/30';
      case 'REJECTED':
        return 'bg-danger/10 text-danger border-danger/30';
      case 'EXPIRED':
        return 'bg-txtSecondary/10 text-txtSecondary border-txtSecondary/30';
      default:
        return 'bg-hoverBg text-txtSecondary';
    }
  };

  return (
    <div className="glass-panel p-0 overflow-hidden rounded-3xl h-full flex flex-col">
      {/* Table Glass Header with Search & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 border-b border-borderClr/30 gap-4 relative z-10">
        <div>
          <h3 className="text-sm font-bold text-txtPrimary">Quotations Master List</h3>
          <p className="text-[10px] font-medium text-txtSecondary mt-0.5">Filter, review, and manage client proposals</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-txtSecondary" />
            <input
              type="text"
              placeholder="Search quote or client..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {filterOptions.map((tab) => {
              const isActive = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => onFilterChange(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all shrink-0 ${
                    isActive
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase tracking-widest">
              <th className="px-6 py-3.5">Quote Details</th>
              <th className="px-6 py-3.5">Customer</th>
              <th className="px-6 py-3.5">Issue Date</th>
              <th className="px-6 py-3.5">Valid Until</th>
              <th className="px-6 py-3.5 text-right">Amount</th>
              <th className="px-6 py-3.5 text-center">Status</th>
              <th className="px-6 py-3.5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderClr/20">
            {quotations.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-xs font-semibold text-txtSecondary">
                  No quotations match your search criteria.
                </td>
              </tr>
            ) : (
              quotations.map((q) => (
                <tr key={q.id} className="hover:bg-hoverBg/50 transition-colors group">
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-extrabold text-txtPrimary group-hover:text-primary transition-colors">
                      {q.quotationNumber}
                    </span>
                  </td>

                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
                        {q.customerName.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-txtPrimary">{q.customerName}</span>
                        <span className="text-[10px] text-txtSecondary">{q.customerEmail}</span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-3.5">
                    <span className="text-xs font-medium text-txtPrimary">{q.issueDate}</span>
                  </td>

                  <td className="px-6 py-3.5">
                    <span className="text-xs font-medium text-txtPrimary">{q.validUntil}</span>
                  </td>

                  <td className="px-6 py-3.5 text-right">
                    <span className="text-sm font-black text-txtPrimary">{formatINR(q.totalAmount)}</span>
                  </td>

                  <td className="px-6 py-3.5 text-center">
                    <span
                      className={cn(
                        'px-2.5 py-1 text-[9px] font-bold rounded-md border uppercase tracking-wider inline-flex items-center justify-center',
                        getStatusBadge(q.status)
                      )}
                    >
                      {q.status}
                    </span>
                  </td>

                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onView(q)}
                        title="View Details"
                        className="p-1.5 rounded-lg bg-hoverBg border border-borderClr/50 text-txtSecondary hover:text-primary transition-colors hover:border-primary/30"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => alert(`Sending email to ${q.customerEmail}`)}
                        title="Send Email"
                        className="p-1.5 rounded-lg bg-hoverBg border border-borderClr/50 text-txtSecondary hover:text-primary transition-colors hover:border-primary/30"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(q.id)}
                        title="Delete Quote"
                        className="p-1.5 rounded-lg bg-hoverBg border border-borderClr/50 text-txtSecondary hover:text-danger transition-colors hover:border-danger/30"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
