'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, Tag, Layers, DollarSign } from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<InventoryItem>) => void;
}

export const InventoryFormModal: React.FC<InventoryFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [hsn, setHsn] = useState('9403');
  const [stockQuantity, setStockQuantity] = useState('');
  const [unit, setUnit] = useState('NOS');
  const [unitPrice, setUnitPrice] = useState('');
  const [reorderLevel, setReorderLevel] = useState('10');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const qty = parseInt(stockQuantity) || 10;
    const price = parseFloat(unitPrice) || 5000;

    onSave({
      name,
      sku: sku || `SKU-IND-${Math.floor(100 + Math.random() * 900)}`,
      hsn,
      stockQuantity: qty,
      unit,
      unitPrice: price,
      totalValue: qty * price,
      status: qty === 0 ? 'OUT_OF_STOCK' : qty <= (parseInt(reorderLevel) || 10) ? 'LOW_STOCK' : 'IN_STOCK',
    });

    setName('');
    setSku('');
    setStockQuantity('');
    setUnitPrice('');
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
                <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-txtPrimary tracking-tight">Add Stock Item</h2>
                  <p className="text-xs text-txtSecondary">Add raw material or interior product to inventory</p>
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
                  Item Name *
                </label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Teak Wood Dining Chair Frame"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-blue-500/50 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    SKU Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SKU-TW-102"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    HSN / SAC Code
                  </label>
                  <input
                    type="text"
                    placeholder="9403"
                    value={hsn}
                    onChange={(e) => setHsn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    Stock Qty *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 50"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-black focus:outline-none"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    UOM Unit
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
                  >
                    <option value="NOS">NOS</option>
                    <option value="SQFT">SQFT</option>
                    <option value="MTR">MTR</option>
                    <option value="KG">KG</option>
                    <option value="SET">SET</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    Unit Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 8500"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
                  />
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
                  className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 transition-all"
                >
                  Add Stock Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
