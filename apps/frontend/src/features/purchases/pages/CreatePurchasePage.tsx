'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { CreatePurchaseForm, PurchaseItem } from '../components/CreatePurchaseForm';
import { numberToWordsINR } from '@/features/quotations/utils/numberToWordsINR';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export function CreatePurchasePage() {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];
  const thirtyDaysLater = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];

  const [vendorName, setVendorName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorAddress, setVendorAddress] = useState('');
  const [vendorGstin, setVendorGstin] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [purchaseInvoiceNo, setPurchaseInvoiceNo] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState(thirtyDaysLater);
  const [paymentTerms, setPaymentTerms] = useState('Net 30 Days Credit');

  const [items, setItems] = useState<PurchaseItem[]>([
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
    const newItem: PurchaseItem = {
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

  const handleUpdateItem = (id: string, field: keyof PurchaseItem, val: any) => {
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
    alert(`Success! Purchase Order/Invoice saved as DRAFT.`);
    router.push('/purchases');
  };

  const handleRecordPurchase = () => {
    if (!vendorName || !purchaseInvoiceNo) {
      alert('Please fill in Supplier Name and Vendor Invoice Number before recording.');
      return;
    }
    alert(`🎉 Success! Purchase Bill ${purchaseInvoiceNo} (₹${grandTotal.toLocaleString('en-IN')}) recorded cleanly!`);
    router.push('/purchases');
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
            onClick={() => router.push('/purchases')}
            className="p-2.5 rounded-xl bg-cardBg border border-borderClr/40 text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Record Purchase Bill</h1>
              <span className="text-[11px] font-extrabold text-indigo-500 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 rounded-full">
                ITC Compliant
              </span>
            </div>
            <p className="text-xs text-txtSecondary mt-0.5">Record inward raw materials, supplier bills & GST ITC claims</p>
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
            onClick={handleRecordPurchase}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            <Send className="h-4 w-4" />
            Record Purchase
          </button>
        </div>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Purchase Form */}
        <motion.div variants={springItemVariants}>
          <CreatePurchaseForm
            vendorName={vendorName}
            setVendorName={setVendorName}
            contactPerson={contactPerson}
            setContactPerson={setContactPerson}
            vendorPhone={vendorPhone}
            setVendorPhone={setVendorPhone}
            vendorAddress={vendorAddress}
            setVendorAddress={setVendorAddress}
            vendorGstin={vendorGstin}
            setVendorGstin={setVendorGstin}
            placeOfSupply={placeOfSupply}
            setPlaceOfSupply={setPlaceOfSupply}
            purchaseInvoiceNo={purchaseInvoiceNo}
            setPurchaseInvoiceNo={setPurchaseInvoiceNo}
            poNumber={poNumber}
            setPoNumber={setPoNumber}
            issueDate={issueDate}
            setIssueDate={setIssueDate}
            dueDate={dueDate}
            setDueDate={setDueDate}
            paymentTerms={paymentTerms}
            setPaymentTerms={setPaymentTerms}
            items={items}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
          />
        </motion.div>

        {/* Bottom Summary Breakdown Card */}
        <motion.div variants={springItemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-txtPrimary uppercase tracking-wider">Purchase Amount in Words</h4>
            <p className="text-xs font-bold text-indigo-500 italic bg-indigo-500/5 p-3 rounded-xl border border-indigo-500/10">
              {grandTotal > 0 ? numberToWordsINR(grandTotal) : 'Zero Rupees Only'}
            </p>
          </div>

          <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-2.5">
            <div className="flex justify-between text-xs text-txtSecondary font-medium">
              <span>Inward Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-xs text-txtSecondary font-medium">
              <span>Input Tax Credit (GST)</span>
              <span>₹{taxAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-2 border-t border-borderClr/30 flex justify-between text-sm font-black text-txtPrimary">
              <span>Total Purchase Amount</span>
              <span className="text-indigo-500">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
