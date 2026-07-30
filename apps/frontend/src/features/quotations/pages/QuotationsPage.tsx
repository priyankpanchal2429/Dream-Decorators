'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { AppShell } from '@/components/layout/AppShell';
import { QuotationHeader } from '../components/QuotationHeader';
import { QuotationStats } from '../components/QuotationStats';
import { QuotationTable } from '../components/QuotationTable';
import { QuotationDetailModal } from '../components/QuotationDetailModal';
import { mockQuotations, mockQuotationStats } from '../constants';
import { Quotation } from '../types';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

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
    <AppShell>
      <div className="min-h-screen bg-dashboard-gradient pb-12">
        <div className="px-4 md:px-8 max-w-page mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <QuotationHeader />
          </motion.div>

          {/* Bento Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-6 mt-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Row 1: KPI Summary Cards */}
            <motion.div variants={item} className="col-span-12">
              <QuotationStats stats={mockQuotationStats} />
            </motion.div>

            {/* Row 2: Master Data Table */}
            <motion.div variants={item} className="col-span-12">
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
        </div>

        {/* Modal */}
        <QuotationDetailModal
          quotation={selectedQuotation}
          onClose={() => setSelectedQuotation(null)}
        />
      </div>
    </AppShell>
  );
}
