'use client';

import React, { useState } from 'react';
import { Customer } from '../types';
import { mockCustomers } from '../constants';
import { AppShell } from '@/components/layout/AppShell';
import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';
import { PageHeader } from '@/components/layout/PageContainer/PageHeader';
import { CustomerTable } from '../components/CustomerTable';
import { CustomerFilters } from '../components/CustomerFilters';
import { CustomerFormModal } from '../components/CustomerFormModal';
import { DeleteModal } from '@/components/modal/DeleteModal';
import { CustomerDetailPage } from './CustomerDetailPage';
import { useToastStore } from '@/lib/toast.store';

export const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(null);

  const { addToast } = useToastStore();

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      !search ||
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.customerCode.toLowerCase().includes(search.toLowerCase()) ||
      c.mobile.includes(search) ||
      (c.gstNumber && c.gstNumber.toLowerCase().includes(search.toLowerCase()));

    const matchesType = !typeFilter || c.customerType === typeFilter;
    const matchesStatus = !statusFilter || c.status === statusFilter;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleSaveCustomer = (data: Partial<Customer>) => {
    if (editingCustomer) {
      setCustomers((prev) =>
        prev.map((c) => (c.id === editingCustomer.id ? ({ ...c, ...data } as Customer) : c))
      );
      addToast({ type: 'success', title: 'Customer Updated', message: `${data.customerName} saved successfully.` });
    } else {
      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        customerCode: `CUST-00${customers.length + 1}`,
        customerName: data.customerName || 'New Customer',
        companyName: data.companyName,
        mobile: data.mobile || '',
        email: data.email,
        gstNumber: data.gstNumber,
        customerType: data.customerType || 'BUSINESS',
        billingAddress: data.billingAddress || { addressLine1: '', city: '', state: '', pincode: '', country: 'India' },
        shippingAddress: data.shippingAddress || { addressLine1: '', city: '', state: '', pincode: '', country: 'India' },
        city: data.city || 'Bengaluru',
        state: data.state || 'Karnataka',
        pincode: data.pincode || '560001',
        creditLimit: data.creditLimit || 0,
        openingBalance: 0,
        outstandingAmount: 0,
        status: 'ACTIVE',
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        isDeleted: false,
      };
      setCustomers((prev) => [newCust, ...prev]);
      addToast({ type: 'success', title: 'Customer Added', message: `${newCust.customerName} created.` });
    }
    setIsFormOpen(false);
    setEditingCustomer(null);
  };

  const handleDeleteConfirm = () => {
    if (deletingCustomer) {
      setCustomers((prev) => prev.filter((c) => c.id !== deletingCustomer.id));
      addToast({ type: 'error', title: 'Customer Deleted', message: `${deletingCustomer.customerName} removed.` });
      setDeletingCustomer(null);
    }
  };

  if (selectedCustomer) {
    return <CustomerDetailPage customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} />;
  }

  return (
    <AppShell>
      <Breadcrumb items={[{ label: 'Customer Management' }]} />

      <PageHeader
        title="Customer Directory"
        description="Manage customer profiles, credit limits, addresses, and outstanding ledger balances."
        primaryActionText="New Customer"
        onPrimaryAction={() => {
          setEditingCustomer(null);
          setIsFormOpen(true);
        }}
      />

      <CustomerFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        onClear={() => {
          setSearch('');
          setTypeFilter('');
          setStatusFilter('');
        }}
      />

      <CustomerTable
        customers={filteredCustomers}
        onView={(cust) => setSelectedCustomer(cust)}
        onEdit={(cust) => {
          setEditingCustomer(cust);
          setIsFormOpen(true);
        }}
        onDelete={(cust) => setDeletingCustomer(cust)}
      />

      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCustomer(null);
        }}
        onSave={handleSaveCustomer}
        initialData={editingCustomer}
      />

      <DeleteModal
        isOpen={!!deletingCustomer}
        onClose={() => setDeletingCustomer(null)}
        onConfirm={handleDeleteConfirm}
        itemName={deletingCustomer?.customerName}
      />
    </AppShell>
  );
};
