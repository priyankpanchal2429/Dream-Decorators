'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, RefreshCw, AlertCircle, FileText } from 'lucide-react';
import { QuotationStats } from '../components/QuotationStats';
import { QuotationTable } from '../components/QuotationTable';
import { QuotationDetailModal } from '../components/QuotationDetailModal';
import {
  useQuotations,
  useQuotationStats,
  useDeleteQuotation,
  useConvertToInvoice,
  QuotationRecord,
} from '../api/quotations.api';
import { QuotationStatsData } from '../types';
import { mockQuotationStats } from '../constants';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';
import { useToastStore } from '@/lib/toast.store';
import { useFinancialYearStore } from '@/lib/financial-year.store';

export default function QuotationsPage() {
  const router = useRouter();
  const { addToast } = useToastStore();
  const { activeFY } = useFinancialYearStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedQuotation, setSelectedQuotation] = useState<any | null>(null);

  // 1. Fetch live quotations from database filtered by active Financial Year
  const {
    data: quotationsData,
    isLoading: isQuotesLoading,
    isError: isQuotesError,
    refetch: refetchQuotes,
  } = useQuotations({
    status: statusFilter !== 'ALL' ? statusFilter : undefined,
    search: searchQuery || undefined,
    financialYearId: activeFY?.id || activeFY?.shortCode,
  });

  // 2. Fetch live KPI stats filtered by active Financial Year
  const { data: statsData } = useQuotationStats(activeFY?.id || activeFY?.shortCode);

  // 3. Delete & convert mutations
  const deleteMutation = useDeleteQuotation();
  const convertMutation = useConvertToInvoice();

  // Transform backend records to UI Quotation format
  const transformedQuotations = useMemo(() => {
    const rawList = quotationsData?.quotations || [];
    return rawList.map((q: QuotationRecord) => ({
      id: q.id,
      quotationNumber: q.quotationNumber,
      customerName: q.party?.name || 'Walk-in Customer',
      customerEmail: q.party?.email || '',
      customerPhone: q.party?.phone || '',
      customerAddress: q.party?.addresses?.[0]?.addressLine1 || '',
      issueDate: q.date ? new Date(q.date).toLocaleDateString('en-IN') : '',
      validUntil: q.validUntil ? new Date(q.validUntil).toLocaleDateString('en-IN') : '',
      subtotal: Number(q.subTotal) || 0,
      taxAmount: Number(q.taxAmount) || 0,
      discountAmount: Number(q.discountAmount) || 0,
      totalAmount: Number(q.grandTotal) || 0,
      status: (q.status as any) || 'DRAFT',
      notes: q.notes || '',
      rawRecord: q,
      items: (q.items || []).map((item: any, idx: number) => ({
        id: item.id || String(idx + 1),
        description: item.description || item.product?.name || 'Item',
        quantity: Number(item.quantity) || 1,
        unitPrice: Number(item.unitPrice) || 0,
        taxPercent: Number(item.taxRate) || 0,
        taxAmount: Number(item.taxAmount) || 0,
        total: Number(item.totalPrice) || 0,
        uom: item.product?.unitOfMeasure || 'MTR',
      })),
    }));
  }, [quotationsData]);

  // Compute live KPI stats with fallback
  const computedStats: QuotationStatsData = useMemo(() => {
    if (statsData) {
      return {
        totalCount: statsData.totalCount,
        totalValue: statsData.totalPipelineValue,
        acceptedCount: statsData.approvedCount,
        acceptedValue: statsData.approvedValue,
        pendingCount: statsData.draftCount,
        pendingValue: Math.max(0, statsData.totalPipelineValue - statsData.approvedValue),
        conversionRate: parseFloat(statsData.conversionRate) || 0,
      };
    }
    return mockQuotationStats;
  }, [statsData]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      try {
        await deleteMutation.mutateAsync(id);
        addToast({
          title: 'Quotation Deleted',
          message: 'The quotation was removed successfully.',
          type: 'success',
        });
      } catch (err: any) {
        addToast({
          title: 'Delete Failed',
          message: err.message || 'Could not delete quotation.',
          type: 'error',
        });
      }
    }
  };

  const handleConvertToInvoice = async (id: string) => {
    try {
      const res = await convertMutation.mutateAsync({ id });
      addToast({
        title: 'Invoice Created!',
        message: `Quotation converted to Invoice ${res.invoiceNumber}`,
        type: 'success',
      });
      setSelectedQuotation(null);
      router.push('/invoices');
    } catch (err: any) {
      addToast({
        title: 'Conversion Failed',
        message: err.message || 'Could not convert to invoice.',
        type: 'error',
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-2 border-b border-borderClr/30"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
              <FileText className="h-3 w-3" /> Proposals & Estimates
            </span>
          </div>
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Quotation Management</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Create, track, and convert client proposals into formal tax invoices
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetchQuotes()}
            disabled={isQuotesLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Quotes"
          >
            <RefreshCw className={`h-4 w-4 ${isQuotesLoading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() => router.push('/quotations/new')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Quotation</span>
          </button>
        </div>
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
          <QuotationStats stats={computedStats} />
        </motion.div>

        {/* Row 2: Master Data Table */}
        <motion.div variants={springItemVariants} className="col-span-12">
          {isQuotesError ? (
            <div className="glass-panel p-8 rounded-3xl text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-danger mx-auto" />
              <p className="text-sm font-bold text-txtPrimary">Failed to load quotations</p>
              <p className="text-xs text-txtSecondary">Could not retrieve quotation data from server.</p>
              <button
                onClick={() => refetchQuotes()}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold"
              >
                Retry
              </button>
            </div>
          ) : (
            <QuotationTable
              quotations={transformedQuotations}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onFilterChange={setStatusFilter}
              onView={(q) => setSelectedQuotation(q)}
              onDelete={handleDelete}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Quotation Detail Modal */}
      <QuotationDetailModal
        quotation={selectedQuotation}
        onClose={() => setSelectedQuotation(null)}
        onConvertToInvoice={handleConvertToInvoice}
      />
    </div>
  );
}
