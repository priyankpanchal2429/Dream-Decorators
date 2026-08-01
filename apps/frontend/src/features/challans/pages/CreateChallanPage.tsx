'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Send } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { CreateChallanForm, ChallanItem } from '../components/CreateChallanForm';
import { numberToWordsINR } from '@/features/quotations/utils/numberToWordsINR';

export function CreateChallanPage() {
  const router = useRouter();

  const today = new Date().toISOString().split('T')[0];

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerGstin, setCustomerGstin] = useState('');
  const [placeOfSupply, setPlaceOfSupply] = useState('');
  const [challanNumber, setChallanNumber] = useState(`DC-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [eWayBillNo, setEWayBillNo] = useState('');
  const [issueDate, setIssueDate] = useState(today);

  const [items, setItems] = useState<ChallanItem[]>([
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
    const newItem: ChallanItem = {
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

  const handleUpdateItem = (id: string, field: keyof ChallanItem, val: any) => {
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
    alert(`Success! Delivery Challan ${challanNumber} saved as DRAFT.`);
    router.push('/delivery-challans');
  };

  const handleIssueChallan = () => {
    if (!companyName || !vehicleNumber) {
      alert('Please fill in Consignee Name and Vehicle Number before issuing challan.');
      return;
    }
    alert(`🎉 Success! Delivery Challan ${challanNumber} generated cleanly!`);
    router.push('/delivery-challans');
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
                onClick={() => router.push('/delivery-challans')}
                className="p-2.5 rounded-xl bg-cardBg border border-borderClr/40 text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Create Delivery Challan</h1>
                  <span className="text-[11px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                    Goods Dispatch Note
                  </span>
                </div>
                <p className="text-xs text-txtSecondary mt-0.5">Generate material dispatch note & vehicle transport receipt</p>
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
                onClick={handleIssueChallan}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" />
                Issue Challan
              </button>
            </div>
          </motion.div>

          {/* Challan Form */}
          <CreateChallanForm
            companyName={companyName}
            setCompanyName={setCompanyName}
            contactPerson={contactPerson}
            setContactPerson={setContactPerson}
            customerPhone={customerPhone}
            setCustomerPhone={setCustomerPhone}
            customerAddress={customerAddress}
            setCustomerAddress={setCustomerAddress}
            customerGstin={customerGstin}
            setCustomerGstin={setCustomerGstin}
            placeOfSupply={placeOfSupply}
            setPlaceOfSupply={setPlaceOfSupply}
            challanNumber={challanNumber}
            setChallanNumber={setChallanNumber}
            vehicleNumber={vehicleNumber}
            setVehicleNumber={setVehicleNumber}
            transporterName={transporterName}
            setTransporterName={setTransporterName}
            eWayBillNo={eWayBillNo}
            setEWayBillNo={setEWayBillNo}
            issueDate={issueDate}
            setIssueDate={setIssueDate}
            items={items}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            onUpdateItem={handleUpdateItem}
          />

          {/* Bottom Summary Breakdown Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 glass-panel p-5 rounded-2xl space-y-3">
              <h4 className="text-xs font-bold text-txtPrimary uppercase tracking-wider">Declared Goods Value in Words</h4>
              <p className="text-xs font-bold text-amber-500 italic bg-amber-500/5 p-3 rounded-xl border border-amber-500/10">
                {grandTotal > 0 ? numberToWordsINR(grandTotal) : 'Zero Rupees Only'}
              </p>
            </div>

            <div className="lg:col-span-5 glass-panel p-5 rounded-2xl space-y-2.5">
              <div className="flex justify-between text-xs text-txtSecondary font-medium">
                <span>Material Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-txtSecondary font-medium">
                <span>Tax Component</span>
                <span>₹{taxAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="pt-2 border-t border-borderClr/30 flex justify-between text-sm font-black text-txtPrimary">
                <span>Declared Goods Value</span>
                <span className="text-amber-500">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
