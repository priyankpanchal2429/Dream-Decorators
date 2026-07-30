'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Building2, Calendar, DollarSign } from 'lucide-react';
import { PurchaseInvoice } from '../types';

interface PurchaseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<PurchaseInvoice>) => void;
}

export const PurchaseFormModal: React.FC<PurchaseFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [vendorName, setVendorName] = useState('Gujarat Teak Traders');
  const [category, setCategory] = useState('Timber & Teakwood');
  const [poDate, setPoDate] = useState('2026-07-30');
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
      status,
    });

    setAmount('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl space-y-6 overflow-hidden border border-borderClr/40"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-borderClr/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-txtPrimary tracking-tight">New Purchase Order</h2>
                  <p className="text-xs text-txtSecondary">Create PO for raw material procurement</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
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

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-borderClr/30">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-txtSecondary hover:bg-hoverBg transition-colors font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/20 transition-all"
                >
                  Create Purchase Order
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
