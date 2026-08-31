'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { QuotationHeader } from '../components/QuotationHeader';
import { QuotationStats } from '../components/QuotationStats';
import { QuotationTable } from '../components/QuotationTable';
import { QuotationDetailModal } from '../components/QuotationDetailModal';
import { mockQuotations, mockQuotationStats } from '../constants';
import { Quotation } from '../types';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>(mockQuotations);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedQuotation, setSelectedQuotation] = useState<Quotation | null>(null);

  // Filtered Quotations
  const filteredQuotations = useMemo(() => {
    return quotations.filter((q) => {
      const matchesSearch =
        q.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.customerName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'ALL' || q.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [quotations, searchQuery, statusFilter]);

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      setQuotations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCreateNew = () => {
    alert('Create New Quotation wizard will open here!');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
      >
        <QuotationHeader />
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-6 mt-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Row 1: KPI Summary Cards */}
        <motion.div variants={springItemVariants} className="col-span-12">
          <QuotationStats stats={mockQuotationStats} />
        </motion.div>

        {/* Row 2: Master Data Table */}
        <motion.div variants={springItemVariants} className="col-span-12">
          <QuotationTable
            quotations={filteredQuotations}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onFilterChange={setStatusFilter}
            onView={(q) => setSelectedQuotation(q)}
            onDelete={handleDelete}
          />
        </motion.div>
      </motion.div>

      {/* Modal */}
      <QuotationDetailModal
        quotation={selectedQuotation}
        onClose={() => setSelectedQuotation(null)}
      />
    </div>
  );
}
