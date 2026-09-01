'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, FileText, CheckCircle, Save, Loader2 } from 'lucide-react';
import { CreateQuotationForm } from '../components/CreateQuotationForm';
import { QuotationSummaryCard } from '../components/QuotationSummaryCard';
import { QuotationPreviewModal } from '../components/QuotationPreviewModal';
import { BankDetailsCard } from '../components/BankDetailsCard';
import { QuotationItem } from '../types';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import { useCreateQuotation, useNextQuotationNumber } from '../api/quotations.api';
import { useToastStore } from '@/lib/toast.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function CreateQuotationPage() {
  const router = useRouter();
  const { activeFY } = useFinancialYearStore();
  const { addToast } = useToastStore();

  const { data: nextNumData } = useNextQuotationNumber(activeFY?.id);
  const createMutation = useCreateQuotation();

  const today = new Date().toISOString().split('T')[0];
  const fifteenDaysLater = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('24-Gujarat');
  const [financialYear, setFinancialYear] = useState(activeFY?.shortCode || '26-27');
  const [quotationNumber, setQuotationNumber] = useState('0001');
  const [issueDate, setIssueDate] = useState(today);
  const [validUntil, setValidUntil] = useState(fifteenDaysLater);
  const [notes, setNotes] = useState('50% advance along with order confirmation. Balance upon installation.');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountUnit, setDiscountUnit] = useState<'AMOUNT' | 'PERCENT'>('AMOUNT');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Auto-sync sequence from backend
  useEffect(() => {
    if (nextNumData?.sequence) {
      setQuotationNumber(String(nextNumData.sequence).padStart(4, '0'));
    }
  }, [nextNumData]);

  const fullQuotationNumber = useMemo(() => {
    const num = quotationNumber.trim() || '0001';
    const fy = financialYear.trim() || '26-27';
    return `DD-${num}/${fy}`;
  }, [quotationNumber, financialYear]);

  // Clean starter line item for real quotation creation
  const [items, setItems] = useState<QuotationItem[]>([
    {
      id: '1',
      description: '',
      itemNotes: '',
      hsnCode: '',
      quantity: 1,
      uom: 'MTR',
      unitPrice: 0,
      discount: 0,
      taxPercent: 12,
      total: 0,
    },
  ]);

  // Dynamic Math with Discount Unit support
  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    let sub = 0;
    let tax = 0;
    items.forEach((item) => {
      const q = Number(item.quantity) || 0;
      const p = Number(item.unitPrice) || 0;
      const d = Number(item.discount) || 0;
      const discAmt = discountUnit === 'PERCENT' ? (q * p * d) / 100 : d;
      const lineSub = Math.max(0, q * p - discAmt);
      const lineTax = lineSub * ((Number(item.taxPercent) || 0) / 100);
      sub += lineSub;
      tax += lineTax;
    });
    const total = Math.max(0, sub + tax - Number(discountAmount || 0));
    return { subtotal: sub, taxAmount: tax, grandTotal: total };
  }, [items, discountAmount, discountUnit]);

  // Item Handlers
  const handleAddItem = () => {
    const newItem: QuotationItem = {
      id: Date.now().toString(),
      description: '',
      itemNotes: '',
      hsnCode: '',
      quantity: 1,
      uom: 'MTR',
      unitPrice: 0,
      discount: 0,
      taxPercent: 12,
      total: 0,
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
          const qty = Number(updated.quantity) || 0;
          const price = Number(updated.unitPrice) || 0;
          const disc = Number(updated.discount) || 0;
          const taxPct = Number(updated.taxPercent) || 0;
          const discAmt = discountUnit === 'PERCENT' ? (qty * price * disc) / 100 : disc;
          const lineSub = Math.max(0, qty * price - discAmt);
          updated.total = lineSub * (1 + taxPct / 100);
          return updated;
        }
        return item;
      })
    );
  };

  // Submit Actions
  const handleSaveDraft = async () => {
    try {
      const payload = {
        quotationNumber: fullQuotationNumber,
        customerName: customerName || contactPerson || companyName || 'Walk-in Client',
        customerEmail,
        customerPhone,
        customerAddress,
        customerGstin,
        companyName,
        contactPerson,
        placeOfSupply,
        financialYearId: activeFY?.id,
        issueDate,
        validUntil,
        status: 'DRAFT',
        discountAmount: Number(discountAmount || 0),
        notes,
        items: items.map((i) => ({
          description: i.description,
          quantity: Number(i.quantity) || 1,
          unitRate: Number(i.unitPrice) || 0,
          taxPercent: Number(i.taxPercent) || 0,
          discount: Number(i.discount) || 0,
        })),
      };

      await createMutation.mutateAsync(payload);
      addToast({
        title: 'Draft Saved',
        message: `Quotation ${fullQuotationNumber} saved as Draft.`,
        type: 'success',
      });
      router.push('/quotations');
    } catch (err: any) {
      addToast({
        title: 'Save Failed',
        message: err.message || 'Could not save quotation draft.',
        type: 'error',
      });
    }
  };

  const handleIssueQuotation = async () => {
    if (!customerName && !companyName && !contactPerson) {
      addToast({
        title: 'Client Required',
        message: 'Please enter a Client Name or Company Name before issuing.',
        type: 'warning',
      });
      return;
    }

    try {
      const payload = {
        quotationNumber: fullQuotationNumber,
        customerName: customerName || contactPerson || companyName,
        customerEmail,
        customerPhone,
        customerAddress,
        customerGstin,
        companyName,
        contactPerson,
        placeOfSupply,
        financialYearId: activeFY?.id,
        issueDate,
        validUntil,
        status: 'APPROVED',
        discountAmount: Number(discountAmount || 0),
        notes,
        items: items.map((i) => ({
          description: i.description,
          quantity: Number(i.quantity) || 1,
          unitRate: Number(i.unitPrice) || 0,
          taxPercent: Number(i.taxPercent) || 0,
          discount: Number(i.discount) || 0,
        })),
      };

      await createMutation.mutateAsync(payload);
      addToast({
        title: 'Quotation Issued!',
        message: `Quotation ${fullQuotationNumber} generated successfully!`,
        type: 'success',
      });
      router.push('/quotations');
    } catch (err: any) {
      addToast({
        title: 'Issue Failed',
        message: err.message || 'Could not issue quotation.',
        type: 'error',
      });
    }
  };

  const handlePreviewPDF = () => {
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
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
                <Sparkles className="h-3 w-3" /> Quotation Studio
              </span>
            </div>
            <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Create New Quotation</h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleSaveDraft}
            disabled={createMutation.isPending}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtPrimary font-bold text-xs border border-borderClr/40 transition-colors"
          >
            {createMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            <span>Save Draft</span>
          </button>
          <button
            onClick={handleIssueQuotation}
            disabled={createMutation.isPending}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            {createMutation.isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
            <span>Issue & Send</span>
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Full Width Top Section: Form Details & Line Items */}
        <motion.div variants={springItemVariants}>
          <CreateQuotationForm
            companyName={companyName}
            setCompanyName={setCompanyName}
            contactPerson={contactPerson}
            setContactPerson={setContactPerson}
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerEmail={customerEmail}
            setCustomerEmail={setCustomerEmail}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerAddress={customerAddress}
            setCustomerAddress={setCustomerAddress}
            customerGstin={customerGstin}
            setCustomerGstin={setCustomerGstin}
            placeOfSupply={placeOfSupply}
            setPlaceOfSupply={setPlaceOfSupply}
            financialYear={financialYear}
            setFinancialYear={setFinancialYear}
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
            discountUnit={discountUnit}
            setDiscountUnit={setDiscountUnit}
          />
        </motion.div>

        {/* Bottom Side-By-Side Grid: Left (Terms & Notes) vs Right (Payment Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left 6-col: Terms & Notes for Client & Bank Details */}
          <motion.div variants={springItemVariants} className="space-y-6">
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
                  rows={4}
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

            {/* Bank Details & UPI QR Code Card */}
            <BankDetailsCard />
          </motion.div>

          {/* Right 6-col: Payment Summary Card */}
          <motion.div variants={springItemVariants}>
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
          </motion.div>
        </div>
      </motion.div>

      {/* A4 PDF Preview Modal */}
      <QuotationPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        quotationNumber={fullQuotationNumber}
        issueDate={issueDate}
        validUntil={validUntil}
        companyName={companyName}
        contactPerson={contactPerson}
        customerName={customerName || contactPerson || companyName || 'Client'}
        customerEmail={customerEmail}
        customerPhone={customerPhone}
        customerAddress={customerAddress}
        customerGstin={customerGstin}
        placeOfSupply={placeOfSupply}
        items={items}
        subtotal={subtotal}
        taxAmount={taxAmount}
        discountAmount={discountAmount}
        grandTotal={grandTotal}
        notes={notes}
      />
    </div>
  );
}
