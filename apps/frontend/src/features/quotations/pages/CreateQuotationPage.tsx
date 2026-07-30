'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { CreateQuotationForm } from '../components/CreateQuotationForm';
import { QuotationSummaryCard } from '../components/QuotationSummaryCard';
import { QuotationPreviewModal } from '../components/QuotationPreviewModal';
import { QuotationItem } from '../types';

export default function CreateQuotationPage() {
  const router = useRouter();

  // Form State with rich defaults for instant testing
  const [customerName, setCustomerName] = useState('Aarav Sharma');
  const [customerEmail, setCustomerEmail] = useState('aarav.sharma@example.com');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [quotationNumber, setQuotationNumber] = useState(`QT-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [issueDate, setIssueDate] = useState('2026-07-30');
  const [validUntil, setValidUntil] = useState('2026-08-15');
  const [notes, setNotes] = useState('50% advance payment required. Proposal valid for 15 days from issue date.');
  const [discountAmount, setDiscountAmount] = useState(2000);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Line Items State
  const [items, setItems] = useState<QuotationItem[]>([
    { id: '1', description: 'Custom Velvet Curtains & Drapes', quantity: 4, unitPrice: 15500, taxPercent: 18, total: 73160 },
    { id: '2', description: 'Italian Marble Coffee Table', quantity: 1, unitPrice: 42000, taxPercent: 18, total: 49560 },
  ]);

  // Dynamic Math
  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    let sub = 0;
    let tax = 0;
    items.forEach((item) => {
      const lineSub = item.quantity * item.unitPrice;
      const lineTax = lineSub * (item.taxPercent / 100);
      sub += lineSub;
      tax += lineTax;
    });
    const total = Math.max(0, sub + tax - discountAmount);
    return { subtotal: sub, taxAmount: tax, grandTotal: total };
  }, [items, discountAmount]);

  // Item Handlers
  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: 'New Interior Decor Item',
      quantity: 1,
      unitPrice: 5000,
      taxPercent: 18,
      total: 5900,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleUpdateItem = (id: string, field: keyof QuotationItem, val: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: val };
          updated.total = updated.quantity * updated.unitPrice * (1 + updated.taxPercent / 100);
          return updated;
        }
        return item;
      })
    );
  };

  // Submit Actions
  const handleSaveDraft = () => {
    alert(`Success! Quotation ${quotationNumber} saved as DRAFT.`);
    router.push('/quotations');
  };

  const handleIssueQuotation = () => {
    if (!customerName || !customerEmail) {
      alert('Please fill in the Client Name and Client Email before issuing.');
      return;
    }
    alert(`🎉 Success! Quotation ${quotationNumber} (₹${grandTotal.toLocaleString('en-IN')}) has been generated and issued to ${customerName} (${customerEmail})!`);
    router.push('/quotations');
  };

  const handlePreviewPDF = () => {
    setIsPreviewOpen(true);
  };

  return (
    <AppShell>
      <div className="min-h-screen bg-dashboard-gradient pb-12">
        <div className="px-4 md:px-8 max-w-page mx-auto">
          {/* Header Bar */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderClr/30 mb-6"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/quotations')}
                className="p-2.5 rounded-xl bg-cardBg border border-borderClr/40 text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Draft Builder
                  </span>
                </div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Create New Quotation</h1>
              </div>
            </div>
          </motion.div>

          {/* Form & Summary Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="grid grid-cols-1 xl:grid-cols-12 gap-6"
          >
            {/* Form Section - 8 cols */}
            <div className="xl:col-span-8">
              <CreateQuotationForm
                customerName={customerName}
                setCustomerName={setCustomerName}
                customerEmail={customerEmail}
                setCustomerEmail={setCustomerEmail}
                customerPhone={customerPhone}
                setCustomerPhone={setCustomerPhone}
                quotationNumber={quotationNumber}
                setQuotationNumber={setQuotationNumber}
                issueDate={issueDate}
                setIssueDate={setIssueDate}
                validUntil={validUntil}
                setValidUntil={setValidUntil}
                items={items}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
                onUpdateItem={handleUpdateItem}
                notes={notes}
                setNotes={setNotes}
              />
            </div>

            {/* Live Financial Summary Section - 4 cols */}
            <div className="xl:col-span-4">
              <QuotationSummaryCard
                subtotal={subtotal}
                taxAmount={taxAmount}
                discountAmount={discountAmount}
                setDiscountAmount={setDiscountAmount}
                grandTotal={grandTotal}
                onSaveDraft={handleSaveDraft}
                onIssueQuotation={handleIssueQuotation}
                onPreviewPDF={handlePreviewPDF}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* A4 PDF Preview Modal */}
      <QuotationPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        quotationNumber={quotationNumber}
        issueDate={issueDate}
        validUntil={validUntil}
        customerName={customerName}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        items={items}
        subtotal={subtotal}
        taxAmount={taxAmount}
        discountAmount={discountAmount}
        grandTotal={grandTotal}
        notes={notes}
      />
    </AppShell>
  );
}
