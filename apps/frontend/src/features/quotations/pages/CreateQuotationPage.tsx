'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, FileText } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { CreateQuotationForm } from '../components/CreateQuotationForm';
import { QuotationSummaryCard } from '../components/QuotationSummaryCard';
import { QuotationPreviewModal } from '../components/QuotationPreviewModal';
import { QuotationItem } from '../types';

export default function CreateQuotationPage() {
  const router = useRouter();

  // Form State with rich defaults
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
    { id: '1', description: 'Custom Velvet Curtains & Drapes', hsnCode: '94036000', quantity: 4, uom: 'NOS', unitPrice: 15500, discount: 0, taxPercent: 18, total: 73160 },
    { id: '2', description: 'Italian Marble Coffee Table', hsnCode: '94036000', quantity: 1, uom: 'NOS', unitPrice: 42000, discount: 0, taxPercent: 18, total: 49560 },
  ]);

  // Dynamic Math
  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    let sub = 0;
    let tax = 0;
    items.forEach((item) => {
      const lineSub = Math.max(0, item.quantity * item.unitPrice - (item.discount || 0));
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
      hsnCode: '94036000',
      quantity: 1,
      uom: 'NOS',
      unitPrice: 5000,
      discount: 0,
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
          const sub = Math.max(0, updated.quantity * updated.unitPrice - (updated.discount || 0));
          updated.total = sub * (1 + updated.taxPercent / 100);
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
        <div className="px-4 md:px-8 max-w-page mx-auto space-y-6">
          {/* Header Bar */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderClr/30"
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

          {/* Full Width Top Section: Form Details & Line Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
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
          </motion.div>

          {/* Bottom Side-By-Side Grid: Left (Terms & Notes) vs Right (Payment Summary) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Left 6-col: Terms & Notes for Client */}
            <div className="glass-panel p-6 rounded-3xl space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3 pb-3 border-b border-borderClr/30">
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-txtPrimary">Terms & Notes for Client</h3>
                    <p className="text-[10px] text-txtSecondary mt-0.5">Specify payment terms, delivery timelines, or custom client notes</p>
                  </div>
                </div>

                <textarea
                  rows={5}
                  placeholder="e.g. 50% advance required before production begins. Proposal valid for 15 days from issue date."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-2xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 transition-colors font-medium leading-relaxed"
                />
              </div>

              <div className="p-3 bg-hoverBg/40 rounded-2xl border border-borderClr/30 text-[11px] text-txtSecondary font-medium">
                <p>💡 <span className="font-bold text-txtPrimary">Tip:</span> These terms will automatically render on the bottom of the printed A4 quotation document.</p>
              </div>
            </div>

            {/* Right 6-col: Payment Summary Card */}
            <div>
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
