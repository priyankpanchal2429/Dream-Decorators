'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, FileText } from 'lucide-react';
import { CreateQuotationForm } from '../components/CreateQuotationForm';
import { QuotationSummaryCard } from '../components/QuotationSummaryCard';
import { QuotationPreviewModal } from '../components/QuotationPreviewModal';
import { BankDetailsCard } from '../components/BankDetailsCard';
import { QuotationItem } from '../types';
import { useFinancialYearStore } from '@/lib/financial-year.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function CreateQuotationPage() {
  const router = useRouter();
  const { activeFY } = useFinancialYearStore();

  // Form State - Blank by default for new quotation creation
  const today = new Date().toISOString().split('T')[0];
  const fifteenDaysLater = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('Naitik Bhai');
  const [customerName, setCustomerName] = useState('Naitik Bhai');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('24-Gujarat');
  const [financialYear, setFinancialYear] = useState(activeFY?.shortCode || '26-27');
  const [quotationNumber, setQuotationNumber] = useState('0001');
  const [issueDate, setIssueDate] = useState('2026-01-07');
  const [validUntil, setValidUntil] = useState('2026-01-22');
  const [notes, setNotes] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const fullQuotationNumber = useMemo(() => {
    const num = quotationNumber.trim() || '0001';
    const fy = financialYear.trim() || '26-27';
    return `DD-${num}/${fy}`;
  }, [quotationNumber, financialYear]);

  // Line Items State - Pre-filled from vendor quotation (SVR Furnitech - Naitik Bhai, dated 07.01.2026)
  const [items, setItems] = useState<QuotationItem[]>([
    // === CURTAIN ===
    { id: '1', description: 'Living Room Main Fabric', itemNotes: 'Curtain', hsnCode: '', quantity: 10.5, uom: 'MTR', unitPrice: 838, discount: 2200, taxPercent: 0, total: 6599 },
    { id: '2', description: 'Living Room Sheer Fabric', itemNotes: 'Curtain', hsnCode: '', quantity: 10.5, uom: 'MTR', unitPrice: 298, discount: 782, taxPercent: 0, total: 2347 },
    { id: '3', description: 'G.Floor Fabric Zebra', itemNotes: 'Curtain', hsnCode: '', quantity: 29, uom: 'SQFT', unitPrice: 240, discount: 1740, taxPercent: 0, total: 5220 },
    { id: '4', description: 'Guest Room Fabric', itemNotes: 'Curtain', hsnCode: '', quantity: 13.75, uom: 'MTR', unitPrice: 463, discount: 1592, taxPercent: 0, total: 4775 },
    { id: '5', description: 'Children Room Fabric', itemNotes: 'Curtain', hsnCode: '', quantity: 20.25, uom: 'MTR', unitPrice: 672, discount: 3402, taxPercent: 0, total: 10206 },
    { id: '6', description: '1st Floor Front Room Main Fabric', itemNotes: 'Curtain', hsnCode: '', quantity: 32, uom: 'MTR', unitPrice: 672, discount: 5376, taxPercent: 0, total: 16128 },
    { id: '7', description: '1st Floor Front Room Sheer Fabric', itemNotes: 'Curtain', hsnCode: '', quantity: 32, uom: 'MTR', unitPrice: 298, discount: 2384, taxPercent: 0, total: 7152 },
    // === TRACK & STITCHING ===
    { id: '8', description: 'Black Out Aster', itemNotes: 'Track & Stitching', hsnCode: '', quantity: 76.5, uom: 'MTR', unitPrice: 140, discount: 0, taxPercent: 0, total: 10710 },
    { id: '9', description: 'Curtain Stitching', itemNotes: 'Track & Stitching', hsnCode: '', quantity: 37, uom: 'PCS', unitPrice: 130, discount: 0, taxPercent: 0, total: 4810 },
    { id: '10', description: 'Channel', itemNotes: 'Track & Stitching', hsnCode: '', quantity: 52, uom: 'PCS', unitPrice: 130, discount: 0, taxPercent: 0, total: 6760 },
    { id: '11', description: 'Curtain Feeting', itemNotes: 'Track & Stitching', hsnCode: '', quantity: 9, uom: 'PCS', unitPrice: 250, discount: 0, taxPercent: 0, total: 2250 },
    // === BED BACK ===
    { id: '12', description: 'G.Floor Room Bed Back Work', itemNotes: 'Bed Back', hsnCode: '', quantity: 50, uom: 'SQFT', unitPrice: 300, discount: 0, taxPercent: 0, total: 15000 },
    { id: '13', description: 'Bed Profile Leather', itemNotes: 'Bed Back', hsnCode: '', quantity: 2.5, uom: 'MTR', unitPrice: 992, discount: 620, taxPercent: 0, total: 1860 },
    { id: '14', description: 'Bed Back Leather', itemNotes: 'Bed Back', hsnCode: '', quantity: 3, uom: 'MTR', unitPrice: 962, discount: 722, taxPercent: 0, total: 2165 },
    { id: '15', description: 'Children Room Bed Back Work', itemNotes: 'Bed Back', hsnCode: '', quantity: 50, uom: 'SQFT', unitPrice: 300, discount: 0, taxPercent: 0, total: 15000 },
    { id: '16', description: 'Bed Profile Leather', itemNotes: 'Bed Back', hsnCode: '', quantity: 2.5, uom: 'MTR', unitPrice: 965, discount: 603, taxPercent: 0, total: 1809 },
    { id: '17', description: 'Bed Back Leather', itemNotes: 'Bed Back', hsnCode: '', quantity: 3, uom: 'MTR', unitPrice: 1213, discount: 910, taxPercent: 0, total: 2729 },
    { id: '18', description: '1st Floor Front Room Bed Back Work', itemNotes: 'Bed Back', hsnCode: '', quantity: 50, uom: 'SQFT', unitPrice: 300, discount: 0, taxPercent: 0, total: 15000 },
    { id: '19', description: 'Bed Profile Leather', itemNotes: 'Bed Back', hsnCode: '', quantity: 2.5, uom: 'MTR', unitPrice: 1213, discount: 758, taxPercent: 0, total: 2274 },
    { id: '20', description: 'Bed Back Leather', itemNotes: 'Bed Back', hsnCode: '', quantity: 3, uom: 'MTR', unitPrice: 962, discount: 722, taxPercent: 0, total: 2165 },
    { id: '21', description: 'Delivery Charges', itemNotes: '', hsnCode: '', quantity: 1, uom: 'NOS', unitPrice: 2000, discount: 0, taxPercent: 0, total: 2000 },
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
      description: '',
      itemNotes: '',
      hsnCode: '',
      quantity: '' as any,
      uom: 'NOS',
      unitPrice: '' as any,
      discount: '' as any,
      taxPercent: '' as any,
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
    alert(`Success! Quotation ${fullQuotationNumber} saved as DRAFT.`);
    router.push('/quotations');
  };

  const handleIssueQuotation = () => {
    if (!customerName || !customerEmail) {
      alert('Please fill in the Client Name and Client Email before issuing.');
      return;
    }
    alert(`🎉 Success! Quotation ${fullQuotationNumber} (₹${grandTotal.toLocaleString('en-IN')}) has been generated and issued to ${customerName} (${customerEmail})!`);
    router.push('/quotations');
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
                <Sparkles className="h-3 w-3" /> Draft Builder
              </span>
            </div>
            <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Create New Quotation</h1>
          </div>
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
        customerName={customerName || contactPerson || companyName}
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
