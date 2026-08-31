'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Send, Eye, FileSpreadsheet } from 'lucide-react';
import { CreateInvoiceForm, InvoiceItem } from '../components/CreateInvoiceForm';
import { numberToWordsINR } from '@/features/quotations/utils/numberToWordsINR';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export function CreateInvoicePage() {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];
  const fifteenDaysLater = new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState(fifteenDaysLater);
  const [paymentTerms, setPaymentTerms] = useState('Net 15 Days');
  const [poNumber, setPoNumber] = useState('');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', itemNotes: '', hsnCode: '', quantity: '' as any, uom: 'NOS', unitPrice: '' as any, discount: '' as any, taxPercent: '' as any, total: 0 },
  ]);

  const { subtotal, taxAmount, grandTotal } = useMemo(() => {
    let sub = 0;
    let tax = 0;
    items.forEach((item) => {
      const q = item.quantity || 0;
      const p = item.unitPrice || 0;
      const d = item.discount || 0;
      const lineSub = Math.max(0, q * p - d);
      const taxP = typeof item.taxPercent === 'number' ? item.taxPercent : 0;
      sub += lineSub;
      tax += lineSub * (taxP / 100);
    });
    return { subtotal: sub, taxAmount: tax, grandTotal: sub + tax };
  }, [items]);

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
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

  const handleUpdateItem = (id: string, field: keyof InvoiceItem, val: any) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: val };
          const q = updated.quantity || 0;
          const p = updated.unitPrice || 0;
          const d = updated.discount || 0;
          const sub = Math.max(0, q * p - d);
          const taxP = typeof updated.taxPercent === 'number' ? updated.taxPercent : 0;
          updated.total = sub * (1 + taxP / 100);
          return updated;
        }
        return item;
      })
    );
  };

  const handleSaveDraft = () => {
    alert(`Success! Invoice ${invoiceNumber} saved as DRAFT.`);
    router.push('/invoices');
  };

  const handleIssueInvoice = () => {
    if (!companyName && !contactPerson) {
      alert('Please fill in the Company Name or Contact Person before issuing.');
      return;
    }
    alert(`🎉 Success! Invoice ${invoiceNumber} (₹${grandTotal.toLocaleString('en-IN')}) has been generated!`);
    router.push('/invoices');
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
            onClick={() => router.push('/invoices')}
            className="p-2.5 rounded-xl bg-cardBg border border-borderClr/40 text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Create Sales Invoice</h1>
              <span className="text-[11px] font-extrabold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                GST Compliant
              </span>
            </div>
            <p className="text-xs text-txtSecondary mt-0.5">Generate B2B/B2C tax invoice with live GST breakdown</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveDraft}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-hoverBg/60 border border-borderClr/40 text-txtSecondary hover:text-txtPrimary text-xs font-bold transition-all cursor-pointer"
          >
            <Save className="h-4 w-4" />
            Save Draft
          </button>

          <button
            onClick={handleIssueInvoice}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Issue Invoice
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Invoice Form */}
        <motion.div variants={springItemVariants}>
          <CreateInvoiceForm
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
            invoiceNumber={invoiceNumber}
            setInvoiceNumber={setInvoiceNumber}
            issueDate={issueDate}
            setIssueDate={setIssueDate}
            dueDate={dueDate}
            setDueDate={setDueDate}
            paymentTerms={paymentTerms}
            setPaymentTerms={setPaymentTerms}
            poNumber={poNumber}
            setPoNumber={setPoNumber}
            items={items}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
          />
        </motion.div>

        {/* Bottom Summary Breakdown Card */}
        <motion.div variants={springItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-txtPrimary uppercase tracking-wider">Amount in Words</h4>
            <p className="text-xs font-bold text-primary italic bg-primary/5 p-3 rounded-xl border border-primary/10">
              {grandTotal > 0 ? numberToWordsINR(grandTotal) : 'Zero Rupees Only'}
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-2.5">
            <div className="flex justify-between text-xs text-txtSecondary font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-txtSecondary font-medium">
              <span>Tax Amount (GST)</span>
              <span>₹{taxAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-borderClr/30 flex justify-between text-sm font-black text-txtPrimary">
              <span>Grand Total</span>
              <span className="text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
