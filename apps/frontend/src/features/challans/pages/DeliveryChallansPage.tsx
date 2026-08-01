'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Truck, Search, Plus, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { DeliveryChallan } from '../types';
import { ChallanFormModal } from '../components/ChallanFormModal';

export default function DeliveryChallansPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [challans, setChallans] = useState<DeliveryChallan[]>([
    {
      id: 'dc-1',
      challanNumber: 'DC-2026-041',
      customerName: 'Aarav Sharma',
      vehicleNumber: 'GJ-01-AB-4921',
      dispatchDate: '2026-07-28',
      itemCount: 4,
      status: 'DELIVERED',
    },
    {
      id: 'dc-2',
      challanNumber: 'DC-2026-042',
      customerName: 'Ananya Patel',
      vehicleNumber: 'GJ-05-CD-9102',
      dispatchDate: '2026-07-29',
      itemCount: 12,
      status: 'IN_TRANSIT',
    },
  ]);

  const filteredChallans = useMemo(() => {
    return challans.filter((dc) => {
      const matchesSearch =
        dc.challanNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dc.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus === 'ALL' || dc.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [challans, searchTerm, selectedStatus]);

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
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-500">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Delivery Challans</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Track goods movement, vehicle dispatch notes, and delivery confirmations</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/delivery-challans/new')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Create Delivery Challan
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Challans</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">{challans.length}</h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <Truck className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">In Transit</p>
                <h3 className="text-2xl font-black text-amber-500 mt-1">
                  {challans.filter((c) => c.status === 'IN_TRANSIT').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Clock className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Delivered</p>
                <h3 className="text-2xl font-black text-emerald-500 mt-1">
                  {challans.filter((c) => c.status === 'DELIVERED').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Returned</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">0</h3>
              </div>
              <div className="p-3 rounded-xl bg-teal-500/10 text-teal-500">
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
                placeholder="Search challan #, client, vehicle #..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {['ALL', 'DELIVERED', 'IN_TRANSIT', 'RETURNED'].map((st) => (
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

          {/* Challans Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                    <th className="px-6 py-4">Challan #</th>
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Vehicle #</th>
                    <th className="px-6 py-4">Dispatch Date</th>
                    <th className="px-6 py-4 text-center">Items Count</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderClr/20 text-xs">
                  {filteredChallans.map((dc) => (
                    <tr key={dc.id} className="hover:bg-hoverBg/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-primary">{dc.challanNumber}</td>
                      <td className="px-6 py-4 font-semibold text-txtPrimary">{dc.customerName}</td>
                      <td className="px-6 py-4 font-mono text-txtSecondary font-bold">{dc.vehicleNumber}</td>
                      <td className="px-6 py-4 text-txtSecondary font-medium">{dc.dispatchDate}</td>
                      <td className="px-6 py-4 text-center font-bold text-txtPrimary">{dc.itemCount} NOS</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            dc.status === 'DELIVERED'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                          }`}
                        >
                          {dc.status.replace('_', ' ')}
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

      <ChallanFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          const newDc: DeliveryChallan = {
            id: `dc-${Date.now()}`,
            challanNumber: data.challanNumber || `DC-2026-${Math.floor(100 + Math.random() * 900)}`,
            customerName: data.customerName || 'Aarav Sharma',
            vehicleNumber: data.vehicleNumber || 'GJ-01-AB-1234',
            dispatchDate: data.dispatchDate || new Date().toISOString().split('T')[0],
            itemCount: data.itemCount || 5,
            status: data.status || 'IN_TRANSIT',
          };
          setChallans((prev) => [newDc, ...prev]);
          setIsModalOpen(false);
        }}
      />
    </AppShell>
  );
}
