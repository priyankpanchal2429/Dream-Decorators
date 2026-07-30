'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Plus, AlertCircle, Layers, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { InventoryItem } from '../types';
import { InventoryFormModal } from '../components/InventoryFormModal';
import { formatINR } from '@/features/dashboard/constants';

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: 'inv-1',
      sku: 'SKU-TK-001',
      name: 'Burma Teakwood Planks (10ft x 4in)',
      category: 'Teakwood',
      hsnCode: '44071000',
      stockQty: 420,
      uom: 'MTR',
      unitPrice: 1850,
      reorderLevel: 100,
      status: 'IN_STOCK',
    },
    {
      id: 'inv-2',
      sku: 'SKU-VL-002',
      name: 'Italian Royal Blue Velvet Fabric',
      category: 'Fabrics',
      hsnCode: '54075200',
      stockQty: 45,
      uom: 'MTR',
      unitPrice: 2400,
      reorderLevel: 50,
      status: 'LOW_STOCK',
    },
    {
      id: 'inv-3',
      sku: 'SKU-MB-003',
      name: 'Statuario White Italian Marble Slab',
      category: 'Marble',
      hsnCode: '68022100',
      stockQty: 850,
      uom: 'SQFT',
      unitPrice: 650,
      reorderLevel: 200,
      status: 'IN_STOCK',
    },
    {
      id: 'inv-4',
      sku: 'SKU-HD-004',
      name: 'Antique Brass Soft-close Hinges (Pair)',
      category: 'Hardware',
      hsnCode: '83021010',
      stockQty: 0,
      uom: 'SET',
      unitPrice: 890,
      reorderLevel: 30,
      status: 'OUT_OF_STOCK',
    },
  ]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [items, searchTerm, selectedStatus]);

  const totalStockValue = useMemo(
    () => items.reduce((acc, item) => acc + item.stockQty * item.unitPrice, 0),
    [items]
  );

  return (
    <AppShell>
      <div className="min-h-screen bg-dashboard-gradient pb-12">
        <div className="px-4 md:px-8 max-w-page mx-auto space-y-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderClr/30"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Inventory & Raw Materials</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Track raw decor stock levels, HSN codes, and reorder alerts</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Stock Item
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Stock Value</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">{formatINR(totalStockValue)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Items In Stock</p>
                <h3 className="text-2xl font-black text-emerald-500 mt-1">
                  {items.filter((i) => i.status === 'IN_STOCK').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <Layers className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Low Stock Alerts</p>
                <h3 className="text-2xl font-black text-amber-500 mt-1">
                  {items.filter((i) => i.status === 'LOW_STOCK').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Out of Stock</p>
                <h3 className="text-2xl font-black text-rose-500 mt-1">
                  {items.filter((i) => i.status === 'OUT_OF_STOCK').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500">
                <Package className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search SKU, item name, category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {['ALL', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedStatus === st
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary border border-borderClr/30'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Inventory Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                    <th className="px-6 py-4">SKU / Code</th>
                    <th className="px-6 py-4">Item Name</th>
                    <th className="px-6 py-4">HSN Code</th>
                    <th className="px-6 py-4 text-center">Stock Level</th>
                    <th className="px-6 py-4 text-right">Unit Price (₹)</th>
                    <th className="px-6 py-4 text-right">Total Value</th>
                    <th className="px-6 py-4 text-center">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderClr/20 text-xs">
                  {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{item.sku}</td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-txtPrimary">{item.name}</div>
                        <span className="text-[10px] text-txtSecondary font-medium">{item.category}</span>
                      </td>
                      <td className="px-6 py-4 text-txtSecondary font-medium">{item.hsnCode}</td>
                      <td className="px-6 py-4 text-center font-bold text-txtPrimary">
                        {item.stockQty} {item.uom}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-txtPrimary">{formatINR(item.unitPrice)}</td>
                      <td className="px-6 py-4 text-right font-black text-txtPrimary">
                        {formatINR(item.stockQty * item.unitPrice)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            item.status === 'IN_STOCK'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : item.status === 'LOW_STOCK'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          }`}
                        >
                          {item.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <InventoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          const newItem: InventoryItem = {
            id: `inv-${Date.now()}`,
            sku: data.sku || `SKU-IND-${Math.floor(100 + Math.random() * 900)}`,
            name: data.name || 'New Stock Item',
            category: 'Decor Materials',
            hsnCode: data.hsnCode || '9403',
            stockQty: data.stockQuantity || 10,
            uom: data.uom || 'NOS',
            unitPrice: data.unitPrice || 5000,
            reorderLevel: 10,
            status: data.status || 'IN_STOCK',
          };
          setItems((prev) => [newItem, ...prev]);
          setIsModalOpen(false);
        }}
      />
    </AppShell>
  );
}
