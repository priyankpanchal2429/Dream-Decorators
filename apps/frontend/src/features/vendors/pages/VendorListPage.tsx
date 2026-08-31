'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Plus, ShoppingBag, CreditCard, Mail, Phone, MapPin } from 'lucide-react';
import { Vendor } from '../types';
import { VendorFormModal } from '../components/VendorFormModal';
import { formatINR } from '@/features/dashboard/constants';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function VendorListPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 'ven-1',
      name: 'Gujarat Teak Traders',
      category: 'Timber & Teakwood',
      contactPerson: 'Rajesh Panchal',
      phone: '+91 99256 63965',
      email: 'sales@gujaratteak.in',
      city: 'Gandhinagar',
      gstin: '24AAACD5512A1ZX',
      totalPurchases: 840000,
      payableBalance: 65000,
      status: 'ACTIVE',
    },
    {
      id: 'ven-2',
      name: 'Royal Velvet Fabrics',
      category: 'Fabrics & Curtains',
      contactPerson: 'Karan Shah',
      phone: '+91 98981 10293',
      email: 'orders@royalvelvet.com',
      city: 'Surat',
      gstin: '24AHBPV1120N1ZK',
      totalPurchases: 520000,
      payableBalance: 0,
      status: 'ACTIVE',
    },
    {
      id: 'ven-3',
      name: 'Italian Marble Imports',
      category: 'Marble & Stone',
      contactPerson: 'Sanjay Jain',
      phone: '+91 97110 44522',
      email: 'info@italianmarble.co.in',
      city: 'Ahmedabad',
      gstin: '24AFJPP8819E1Z8',
      totalPurchases: 1450000,
      payableBalance: 120000,
      status: 'ACTIVE',
    },
  ]);

  const filteredVendors = useMemo(() => {
    return vendors.filter((v) => {
      const matchesSearch =
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || v.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [vendors, searchTerm, selectedCategory]);

  const totalSpend = useMemo(() => vendors.reduce((acc, v) => acc + v.totalPurchases, 0), [vendors]);
  const totalPayable = useMemo(() => vendors.reduce((acc, v) => acc + v.payableBalance, 0), [vendors]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="pt-6 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-borderClr/30"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Vendor Management</h1>
            <p className="text-xs text-txtSecondary mt-0.5">Manage material suppliers, trade partners, and payables</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Supplier
        </button>
      </motion.div>

      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Active Suppliers</p>
              <h3 className="text-2xl font-black text-txtPrimary mt-1">{vendors.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <Building2 className="h-5 w-5" />
            </div>
          </motion.div>

          <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Total Procurement</p>
              <h3 className="text-2xl font-black text-indigo-500 mt-1">{formatINR(totalSpend)}</h3>
            </div>
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </motion.div>

          <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Pending Payables</p>
              <h3 className="text-2xl font-black text-amber-500 mt-1">{formatINR(totalPayable)}</h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-500">
              <CreditCard className="h-5 w-5" />
            </div>
          </motion.div>

          <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-widest">Material Categories</p>
              <h3 className="text-2xl font-black text-txtPrimary mt-1">4</h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Building2 className="h-5 w-5" />
            </div>
          </motion.div>
        </div>

        {/* Filter Bar */}
        <motion.div variants={springItemVariants} className="glass-panel p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
            <input
              type="text"
              placeholder="Search vendor, contact person, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
            {['ALL', 'Timber & Teakwood', 'Fabrics & Curtains', 'Marble & Stone'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary border border-borderClr/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Vendor Table */}
        <motion.div variants={springItemVariants} className="glass-panel rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9.5px] font-bold text-txtSecondary uppercase tracking-widest">
                  <th className="px-6 py-4">Vendor / Supplier</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Contact Person</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4 text-right">Total Purchases</th>
                  <th className="px-6 py-4 text-right">Payable Balance</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20 text-xs">
                {filteredVendors.map((v) => (
                  <tr key={v.id} className="hover:bg-hoverBg/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-txtPrimary text-sm">{v.name}</div>
                      <span className="text-[10px] font-semibold text-txtSecondary">GSTIN: {v.gstin}</span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20">
                        {v.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 space-y-1">
                      <div className="font-semibold text-txtPrimary">{v.contactPerson}</div>
                      <div className="flex items-center gap-1.5 text-txtSecondary text-xs">
                        <Mail className="h-3 w-3 text-primary" />
                        <span>{v.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-txtSecondary text-xs">
                        <Phone className="h-3 w-3 text-primary" />
                        <span>{v.phone}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-txtPrimary font-medium">
                        <MapPin className="h-3.5 w-3.5 text-txtSecondary" />
                        <span>{v.city}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className="font-black text-txtPrimary">{formatINR(v.totalPurchases)}</span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className={`font-bold ${v.payableBalance > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
                        {formatINR(v.payableBalance)}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      <VendorFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(data) => {
          const newVen: Vendor = {
            id: `ven-${Date.now()}`,
            name: data.vendorName || data.name || 'New Supplier',
            category: data.category || 'Timber & Plywood',
            contactPerson: data.contactPerson || 'Sales Desk',
            phone: data.phone || '+91 90000 00000',
            email: data.email || 'supplier@example.com',
            city: data.city || 'Ahmedabad',
            gstin: data.gstin || '',
            totalPurchases: 0,
            payableBalance: data.payable || 0,
            status: 'ACTIVE',
          };
          setVendors((prev) => [newVen, ...prev]);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
