'use client';

import React, { useState } from 'react';
import { ShoppingBag, Building2 } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { PurchaseInvoice } from '../types';
import { useToastStore } from '@/lib/toast.store';
import { useNotificationStore } from '@/lib/notification.store';

interface PurchaseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PurchaseInvoice>) => void;
}

export const PurchaseFormModal: React.FC<PurchaseFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState('Timber & Teakwood');
  const [poDate, setPoDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'RECEIVED' | 'PENDING'>('RECEIVED');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount) || 180000;

    onSave({
      poNumber: `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
      vendorName,
      category,
      orderDate: poDate,
      totalAmount: numAmount,
      amount: numAmount,
      status,
    });

    useToastStore.getState().addToast({
      type: 'success',
      title: 'Purchase Order Created',
      message: `PO for ${vendorName} of ₹${numAmount.toLocaleString('en-IN')} has been raised.`,
    });
    useNotificationStore.getState().addNotification({
      title: 'New Purchase Order',
      message: `Purchase order raised with ${vendorName} for ₹${numAmount.toLocaleString('en-IN')}.`,
      type: 'success',
    });

    setAmount('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="New Purchase Order"
      description="Create PO for raw material procurement from vendors."
      icon={<ShoppingBag className="h-5 w-5 text-indigo-500" />}
      maxWidth="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-txtSecondary hover:bg-hoverBg transition-colors font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20 transition-all"
          >
            Create Purchase Order
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        <div>
          <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
            Supplier / Vendor Name *
          </label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
            <input
              type="text"
              required
              placeholder="e.g. Gujarat Teak Traders"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-indigo-500/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Material Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            >
              <option value="Timber & Teakwood">Timber & Teakwood</option>
              <option value="Fabrics & Drapes">Fabrics & Drapes</option>
              <option value="Marble & Tiles">Marble & Tiles</option>
              <option value="Hardware & Fittings">Hardware & Fittings</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Order Date
            </label>
            <input
              type="date"
              value={poDate}
              onChange={(e) => setPoDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Procurement Amount (₹) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 180000"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Receipt Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            >
              <option value="RECEIVED">RECEIVED (In Stock)</option>
              <option value="PENDING">PENDING (In Transit)</option>
            </select>
          </div>
        </div>
      </form>
    </Drawer>
  );
};
