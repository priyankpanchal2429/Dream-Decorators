'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, UserCheck, TrendingUp, AlertCircle, Phone, Mail, MapPin } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Customer } from '../types';
import { CustomerFormModal } from '../components/CustomerFormModal';
import { formatINR } from '@/features/dashboard/constants';

export default function CustomerListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 'cust-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      phone: '+91 98765 43210',
      city: 'Ahmedabad',
      state: 'Gujarat',
      gstin: '24AHBPV9744N1ZL',
      totalOrders: 6,
      totalSpent: 485000,
      outstanding: 42000,
      status: 'ACTIVE',
      lastOrderDate: '2026-07-28',
    },
    {
      id: 'cust-2',
      name: 'Ananya Patel',
      email: 'ananya.p@decorstudio.in',
      phone: '+91 99256 63965',
      city: 'Surat',
      state: 'Gujarat',
      gstin: '24AFJPP3546E1ZI',
      totalOrders: 12,
      totalSpent: 1250000,
      outstanding: 0,
      status: 'ACTIVE',
      lastOrderDate: '2026-07-25',
    },
    {
      id: 'cust-3',
      name: 'Vikram Mehta',
      email: 'vikram@mehtahomes.com',
      phone: '+91 97123 88411',
      city: 'Vadodara',
      state: 'Gujarat',
      totalOrders: 3,
      totalSpent: 210000,
      outstanding: 35000,
      status: 'ACTIVE',
      lastOrderDate: '2026-07-15',
    },
    {
      id: 'cust-4',
      name: 'Pooja Iyer',
      email: 'pooja.iyer@gmail.com',
      phone: '+91 98401 22904',
      city: 'Mumbai',
      state: 'Maharashtra',
      gstin: '27AAACD9912F1ZM',
      totalOrders: 1,
      totalSpent: 85000,
      outstanding: 0,
      status: 'INACTIVE',
      lastOrderDate: '2026-05-10',
    },
  ]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const nameStr = (cust.name || cust.customerName || '').toLowerCase();
      const emailStr = (cust.email || '').toLowerCase();
      const phoneStr = cust.phone || cust.mobile || '';
      const cityStr = (cust.city || '').toLowerCase();
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        nameStr.includes(search) ||
        emailStr.includes(search) ||
        phoneStr.includes(search) ||
        cityStr.includes(search);
      const matchesStatus = selectedStatus === 'ALL' || cust.status === selectedStatus;
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, selectedStatus]);

  const totalRevenue = useMemo(() => customers.reduce((acc, c) => acc + (c.totalSpent || c.outstandingAmount || 0), 0), [customers]);
  const totalOutstanding = useMemo(() => customers.reduce((acc, c) => acc + (c.outstanding || c.outstandingAmount || 0), 0), [customers]);

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
              <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Client Directory</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Manage customer accounts, billing details, and order history</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add New Client
            </button>
          </motion.div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Clients</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">{customers.length}</h3>
              </div>
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Lifetime Revenue</p>
                <h3 className="text-2xl font-black text-primary mt-1">{formatINR(totalRevenue)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Outstanding</p>
                <h3 className="text-2xl font-black text-danger mt-1">{formatINR(totalOutstanding)}</h3>
              </div>
              <div className="p-3 rounded-xl bg-rose-500/10 text-rose-500">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>

            <div className="glass-panel p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Active Accounts</p>
                <h3 className="text-2xl font-black text-txtPrimary mt-1">
                  {customers.filter((c) => c.status === 'ACTIVE').length}
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search by client name, email, phone, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
              />
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto">
              {['ALL', 'ACTIVE', 'INACTIVE'].map((st) => (
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

          {/* Customer Table */}
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Contact Details</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-center">Orders</th>
                    <th className="px-6 py-4 text-right">Total Spent</th>
                    <th className="px-6 py-4 text-right">Outstanding</th>
                    <th className="px-6 py-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borderClr/20 text-xs">
                  {filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-hoverBg/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-bold text-txtPrimary text-sm">{c.name}</div>
                        {c.gstin && (
                          <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mt-1 inline-block">
                            GSTIN: {c.gstin}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-txtSecondary text-xs">
                          <Mail className="h-3.5 w-3.5 text-primary" />
                          <span>{c.email}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-txtSecondary text-xs">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          <span>{c.phone}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-txtPrimary font-medium">
                          <MapPin className="h-3.5 w-3.5 text-txtSecondary" />
                          <span>
                            {c.city}, {c.state}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-txtPrimary bg-hoverBg px-3 py-1 rounded-full text-xs">
                          {c.totalOrders}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="font-black text-txtPrimary">{formatINR(c.totalSpent || c.outstandingAmount || 0)}</span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${(c.outstanding || c.outstandingAmount || 0) > 0 ? 'text-danger' : 'text-txtSecondary'}`}>
                          {formatINR(c.outstanding || c.outstandingAmount || 0)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            c.status === 'ACTIVE'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                          }`}
                        >
                          {c.status}
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

      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          const newCust: Customer = {
            id: `cust-${Date.now()}`,
            name: data.customerName || data.name || 'New Client',
            customerName: data.customerName || data.name || 'New Client',
            email: data.email || 'client@example.com',
            phone: data.mobile || data.phone || '+91 90000 00000',
            mobile: data.mobile || data.phone || '+91 90000 00000',
            city: data.city || 'Ahmedabad',
            state: data.state || 'Gujarat',
            gstin: data.gstNumber || data.gstin || '',
            totalOrders: 1,
            totalSpent: 0,
            outstanding: data.openingBalance || 0,
            status: 'ACTIVE',
            lastOrderDate: new Date().toISOString().split('T')[0],
          };
          setCustomers((prev) => [newCust, ...prev]);
          setIsModalOpen(false);
        }}
      />
    </AppShell>
  );
}
