'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search, Plus, Truck, CheckCircle2, Clock } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { PurchaseOrder } from '../types';
import { PurchaseFormModal } from '../components/PurchaseFormModal';
import { formatINR } from '@/features/dashboard/constants';

export default function PurchaseListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [purchases, setPurchases] = useState<PurchaseOrder[]>([
    {
      id: 'po-1',
      poNumber: 'PO-2026-104',
      vendorName: 'Gujarat Teak Traders',
      category: 'Timber & Teakwood',
      orderDate: '2026-07-26',
      amount: 450000,
      status: 'RECEIVED',
    },
    {
      id: 'po-2',
      poNumber: 'PO-2026-105',
      vendorName: 'Royal Velvet Fabrics',
      category: 'Fabrics & Curtains',
      orderDate: '2026-07-28',
      amount: 185000,
      status: 'PENDING',
    },
    {
      id: 'po-3',
      poNumber: 'PO-2026-106',
      vendorName: 'Italian Marble Imports',
      category: 'Marble & Stone',
      orderDate: '2026-07-15',
      amount: 820000,
      status: 'RECEIVED',
    },
  ]);

  const filteredPurchases = useMemo(() => {
    return purchases.filter((po) => {
      const matchesSearch =
        po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        po.vendorName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'ALL' || po.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [purchases, searchTerm, selectedStatus]);

  const totalProcurement = useMemo(() => purchases.reduce((acc, p) => acc + p.amount, 0), [purchases]);

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
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Purchase Invoices & Orders</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Manage raw material purchase orders, vendor invoices, and stock receipts</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              New Purchase Order
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Procurement</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">{formatINR(totalProcurement)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <ShoppingBag className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Orders Received</p>
                <h3 className="text-2xl font-black text-emerald-500 mt-1">
                  {purchases.filter((p) => p.status === 'RECEIVED').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Pending Goods</p>
                <h3 className="text-2xl font-black text-amber-500 mt-1">
                  {purchases.filter((p) => p.status === 'PENDING').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Active Suppliers</p>
                <h3 className="text-2xl font-black text-indigo-500 mt-1">3</h3>
              </div>
              <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Truck className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search PO #, vendor name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {['ALL', 'RECEIVED', 'PENDING', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedStatus === st
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary border border-borderClr/30'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Purchases Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                    <th className="px-6 py-4">PO #</th>
                    <th className="px-6 py-4">Vendor Supplier</th>
                    <th className="px-6 py-4">Material Category</th>
                    <th className="px-6 py-4">Order Date</th>
                    <th className="px-6 py-4 text-right">Order Spend</th>
                    <th className="px-6 py-4 text-center">Receipt Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderClr/20 text-xs">
                  {filteredPurchases.map((po) => (
                    <tr key={po.id} className="hover:bg-hoverBg/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{po.poNumber}</td>
                      <td className="px-6 py-4 font-semibold text-txtPrimary">{po.vendorName}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          {po.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-txtSecondary font-medium">{po.orderDate}</td>
                      <td className="px-6 py-4 text-right font-black text-txtPrimary">{formatINR(po.amount)}</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            po.status === 'RECEIVED'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}
                        >
                          {po.status}
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

      <PurchaseFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          const newPo: PurchaseOrder = {
            id: `po-${Date.now()}`,
            poNumber: data.poNumber || `PO-2026-${Math.floor(100 + Math.random() * 900)}`,
            vendorName: data.vendorName || 'Gujarat Teak Traders',
            category: data.category || 'Timber & Teakwood',
            orderDate: data.orderDate || new Date().toISOString().split('T')[0],
            amount: data.totalAmount || 180000,
            status: data.status || 'RECEIVED',
          };
          setPurchases((prev) => [newPo, ...prev]);
          setIsModalOpen(false);
        }}
      />
    </AppShell>
  );
}
