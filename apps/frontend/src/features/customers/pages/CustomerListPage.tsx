'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Plus, UserCheck, TrendingUp, AlertCircle, Phone, Mail, MapPin, RefreshCw, Loader2 } from 'lucide-react';
import { CustomerFormModal } from '../components/CustomerFormModal';
import { useCustomers, useCreateCustomer, CustomerParty } from '../api/customers.api';
import { formatINR } from '@/features/dashboard/constants';
import { useToastStore } from '@/lib/toast.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function CustomerListPage() {
  const { addToast } = useToastStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 1. Fetch live customers from cloud PostgreSQL
  const { data: customerData, isLoading, isError, refetch } = useCustomers({
    search: searchTerm || undefined,
  });

  const createCustomerMutation = useCreateCustomer();

  const customersList = useMemo(() => {
    return customerData?.parties || [];
  }, [customerData]);

  const filteredCustomers = useMemo(() => {
    return customersList.filter((cust) => {
      const matchesStatus =
        selectedStatus === 'ALL' ||
        (selectedStatus === 'ACTIVE' && cust.isActive) ||
        (selectedStatus === 'INACTIVE' && !cust.isActive);
      return matchesStatus;
    });
  }, [customersList, selectedStatus]);

  const totalRevenue = useMemo(
    () => customersList.reduce((acc, c) => acc + (Number(c.openingBalance) || 0), 0),
    [customersList]
  );
  const totalOutstanding = useMemo(
    () => customersList.reduce((acc, c) => acc + (Number(c.openingBalance) || 0), 0),
    [customersList]
  );

  const handleSaveCustomer = async (formData: any) => {
    try {
      await createCustomerMutation.mutateAsync({
        name: formData.customerName || formData.name,
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
        title: 'Customer Added',
        message: `${formData.customerName || formData.name} was successfully registered.`,
        type: 'success',
      });
      setIsModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Failed to Add Customer',
        message: err.message || 'Could not register customer.',
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
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Customers</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Manage client profiles, GST registrations, site addresses, and ledgers
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Customers"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Client</span>
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
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Clients</p>
            <p className="text-2xl font-black text-txtPrimary">{customersList.length}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Registered in cloud database</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Users className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Active Clients</p>
            <p className="text-2xl font-black text-txtPrimary">
              {customersList.filter((c) => c.isActive).length}
            </p>
            <p className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
              <UserCheck className="h-3 w-3" /> Ready for invoicing
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <UserCheck className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total Ledger Balance</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalOutstanding)}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Accumulated balances</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <TrendingUp className="h-5 w-5" />
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
                placeholder="Search by client name, email, phone..."
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
                  <th className="px-6 py-3.5">Client Details</th>
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
                      Loading clients from database...
                    </td>
                  </tr>
                ) : filteredCustomers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No clients found</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Get started by adding your first client to the directory.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add First Client
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map((c) => (
                    <tr key={c.id} className="hover:bg-hoverBg/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-primary flex items-center justify-center font-bold text-white shadow-xs">
                            {c.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-txtPrimary">{c.name}</p>
                            <p className="text-[10px] text-txtSecondary flex items-center gap-1">
                              <Mail className="h-3 w-3" /> {c.email || 'No email'}
                            </p>
                            {c.gstin && (
                              <span className="text-[9px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                GST: {c.gstin}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-txtSecondary">
                        <div className="flex items-center gap-1.5">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                          <span>{c.phone}</span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-txtPrimary font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-txtSecondary" />
                          <span>
                            {c.addresses?.[0]?.city || 'Ahmedabad'}, {c.addresses?.[0]?.state || 'Gujarat'}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-right font-medium text-txtPrimary">
                        {formatINR(Number(c.creditLimit) || 0)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className={`font-bold ${Number(c.openingBalance) > 0 ? 'text-danger' : 'text-txtSecondary'}`}>
                          {formatINR(Number(c.openingBalance) || 0)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            c.isActive
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                              : 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
                          }`}
                        >
                          {c.isActive ? 'ACTIVE' : 'INACTIVE'}
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
      <CustomerFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}
