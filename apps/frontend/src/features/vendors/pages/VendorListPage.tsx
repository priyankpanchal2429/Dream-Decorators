'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Plus, ShoppingBag, CreditCard, Mail, Phone, MapPin, RefreshCw, Loader2 } from 'lucide-react';
import { VendorFormModal } from '../components/VendorFormModal';
import { useVendors, useCreateVendor, VendorParty } from '../api/vendors.api';
import { formatINR } from '@/features/dashboard/constants';
import { useToastStore } from '@/lib/toast.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function VendorListPage() {
  const { addToast } = useToastStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live vendors from cloud database
  const { data: vendorData, isLoading, refetch } = useVendors({
    search: searchTerm || undefined,
  });

  const createVendorMutation = useCreateVendor();

  const vendorsList = useMemo(() => {
    return vendorData?.parties || [];
  }, [vendorData]);

  const filteredVendors = useMemo(() => {
    return vendorsList.filter((v) => {
      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'ACTIVE' && v.isActive) ||
        (selectedStatus === 'INACTIVE' && !v.isActive);
      return matchesStatus;
    });
  }, [vendorsList, selectedStatus]);

  const totalPayable = useMemo(
    () => vendorsList.reduce((acc, v) => acc + (Number(v.openingBalance) || 0), 0),
    [vendorsList]
  );

  const handleSaveVendor = async (formData: any) => {
    try {
      await createVendorMutation.mutateAsync({
        name: formData.vendorName || formData.name,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.mobile || formData.phone || '0000000000',
        gstin: formData.gstNumber || formData.gstin,
        creditLimit: Number(formData.creditLimit || 0),
        openingBalance: Number(formData.openingBalance || 0),
        addressLine1: formData.billingAddress?.addressLine1 || formData.city,
        city: formData.city || 'Ahmedabad',
        state: formData.state || 'Gujarat',
        pincode: formData.pincode || '380054',
      });
      addToast({
        title: 'Vendor Added',
        message: `${formData.vendorName || formData.name} was successfully registered.`,
        type: 'success',
      });
      setIsModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Failed to Add Vendor',
        message: err.message || 'Could not register vendor.',
        type: 'error',
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-2 border-b border-borderClr/30"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
              <Building2 className="h-3 w-3" /> Supply Chain
            </span>
          </div>
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Vendor Directory</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Manage fabric mills, hardware suppliers, and procurement accounts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Vendors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Vendor</span>
          </button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* KPI 1 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Vendors</p>
            <p className="text-2xl font-black text-txtPrimary">{vendorsList.length}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Registered suppliers</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Building2 className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Active Suppliers</p>
            <p className="text-2xl font-black text-txtPrimary">
              {vendorsList.filter((v) => v.isActive).length}
            </p>
            <p className="text-[10px] text-emerald-500 font-medium">Ready for PO issuance</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <ShoppingBag className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Payables</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalPayable)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Vendor credit ledger</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <CreditCard className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 glass-panel p-0 rounded-3xl overflow-hidden">
          {/* Controls Bar */}
          <div className="p-6 border-b border-borderClr/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search vendor name, contact, city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'ACTIVE', 'INACTIVE'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedStatus === status
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">
                  <th className="px-6 py-3.5">Vendor Name</th>
                  <th className="px-6 py-3.5">Contact Number</th>
                  <th className="px-6 py-3.5">Location</th>
                  <th className="px-6 py-3.5 text-right">Credit Limit</th>
                  <th className="px-6 py-3.5 text-right">Opening Balance</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                      Loading vendors from database...
                    </td>
                  </tr>
                ) : filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No vendors registered</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Add fabric suppliers or manufacturers to begin purchasing.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add First Vendor
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((v) => (
                    <tr key={v.id} className="hover:bg-hoverBg/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-primary flex items-center justify-center font-bold text-white shadow-xs">
                            {v.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-txtPrimary">{v.name}</p>
                            <p className="text-[10px] text-txtSecondary flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {v.email || 'No email'}
                            </p>
                            {v.gstin && (
                              <span className="text-[9px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                GST: {v.gstin}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-txtSecondary">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          <span>{v.phone}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-txtPrimary font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-txtSecondary" />
                          <span>
                            {v.addresses?.[0]?.city || 'Ahmedabad'}, {v.addresses?.[0]?.state || 'Gujarat'}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right font-medium text-txtPrimary">
                        {formatINR(Number(v.creditLimit) || 0)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${Number(v.openingBalance) > 0 ? 'text-danger' : 'text-txtSecondary'}`}>
                          {formatINR(Number(v.openingBalance) || 0)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            v.isActive
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                          }`}
                        >
                          {v.isActive ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <VendorFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVendor}
      />
    </div>
  );
}
