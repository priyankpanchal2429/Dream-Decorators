'use client';

import React, { useState } from 'react';
import { Customer } from '../types';
import { AppShell } from '@/components/layout/AppShell';
import { Breadcrumb } from '@/components/layout/Breadcrumb/Breadcrumb';
import { PageHeader } from '@/components/layout/PageContainer/PageHeader';
import { Card, StatCard } from '@/components/card';
import { StatusBadge } from '@/components/badge';
import { Button } from '@/components/button/Button';
import { Tabs } from '@/components/common';
import { formatINR } from '@/features/dashboard/constants';
import { ArrowLeft, Building2, MapPin, Phone, Mail, FileText, CreditCard, ShieldAlert, Layers } from 'lucide-react';

interface CustomerDetailPageProps {
  customer: Customer;
  onBack: () => void;
}

export const CustomerDetailPage: React.FC<CustomerDetailPageProps> = ({ customer, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <AppShell>
      <div className="mb-2">
        <Button variant="ghost" size="sm" onClick={onBack} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Back to Customer Directory
        </Button>
      </div>

      <Breadcrumb items={[{ label: 'Customers', href: '#' }, { label: customer.customerName }]} />

      <PageHeader
        title={customer.customerName}
        description={`Code: ${customer.customerCode} • Type: ${customer.customerType}`}
        showFilters={false}
      >
        <div className="flex items-center gap-2 pt-2">
          <StatusBadge status={customer.status === 'BLOCKED' ? 'CANCELLED' : customer.status} />
          {customer.gstNumber && (
            <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded border border-borderClr text-txtPrimary">
              GSTIN: {customer.gstNumber}
            </span>
          )}
        </div>
      </PageHeader>

      <div className="space-y-6">
        {/* ROW 1: Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Total Outstanding"
            value={formatINR(customer.outstandingAmount)}
            subtitle="Current Unpaid Balance"
            icon={<CreditCard className="h-5 w-5" />}
          />
          <StatCard
            title="Credit Limit"
            value={formatINR(customer.creditLimit)}
            subtitle="Approved Credit Window"
            icon={<ShieldAlert className="h-5 w-5" />}
          />
          <StatCard
            title="Opening Balance"
            value={formatINR(customer.openingBalance)}
            subtitle="Carried Forward Balance"
            icon={<FileText className="h-5 w-5" />}
          />
        </div>

        <Tabs
          tabs={[
            { id: 'overview', label: 'Overview & Address' },
            { id: 'transactions', label: 'Transaction Slots (Sales, Quotations, Payments)' },
            { id: 'timeline', label: 'Activity Timeline' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab 1: Overview Details */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <div className="pb-3 border-b border-borderClr mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold text-txtPrimary">Contact Information</h3>
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-2 text-xs text-txtSecondary">
                <p>
                  <strong className="text-txtPrimary">Company:</strong> {customer.companyName || '—'}
                </p>
                <p>
                  <strong className="text-txtPrimary">Contact Person:</strong> {customer.contactPerson || '—'}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary" /> {customer.mobile}
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary" /> {customer.email || '—'}
                </p>
              </div>
            </Card>

            <Card>
              <div className="pb-3 border-b border-borderClr mb-3 flex items-center justify-between">
                <h3 className="text-xs font-bold text-txtPrimary">Billing & Shipping Address</h3>
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div className="space-y-2 text-xs text-txtSecondary">
                <p className="font-semibold text-txtPrimary">{customer.billingAddress.addressLine1}</p>
                <p>
                  {customer.city}, {customer.state} - {customer.pincode}
                </p>
                <p className="text-[10px] text-txtSecondary">Country: {customer.billingAddress.country}</p>
              </div>
            </Card>
          </div>
        )}

        {/* Tab 2: Transaction Slots */}
        {activeTab === 'transactions' && (
          <Card>
            <div className="p-8 text-center text-xs text-txtSecondary">
              <Layers className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="font-bold text-txtPrimary text-sm">Transaction Slots Ready</p>
              <p className="mt-1 max-w-sm mx-auto">
                Quotations, Sales Invoices, Payments, and Delivery Challans will automatically surface here filtered by <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-primary">customer_id: {customer.id}</code>.
              </p>
            </div>
          </Card>
        )}

        {/* Tab 3: Timeline */}
        {activeTab === 'timeline' && (
          <Card>
            <h3 className="text-xs font-bold text-txtPrimary mb-3">Customer Audit & Activity Log</h3>
            <div className="space-y-3 text-xs text-txtSecondary">
              <div className="flex items-center justify-between border-b border-borderClr/60 pb-2">
                <span>Customer Profile Created</span>
                <span className="font-mono text-[10px]">{customer.createdAt}</span>
              </div>
              <div className="flex items-center justify-between border-b border-borderClr/60 pb-2">
                <span>Profile Details Updated</span>
                <span className="font-mono text-[10px]">{customer.updatedAt}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
};
