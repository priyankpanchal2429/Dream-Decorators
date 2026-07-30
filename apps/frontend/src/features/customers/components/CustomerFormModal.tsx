'use client';

import React, { useState } from 'react';
import { Customer } from '../types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/button/Button';
import { Input, CurrencyInput, GSTInput, PhoneInput, Textarea } from '@/components/input';
import { Dropdown } from '@/components/ui/Dropdown';
import { FormGrid, FormSection } from '@/components/form';
import { Checkbox } from '@/components/check';

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Customer>) => void;
  initialData?: Customer | null;
}

export const CustomerFormModal: React.FC<CustomerFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.customerName || '');
  const [company, setCompany] = useState(initialData?.companyName || '');
  const [mobile, setMobile] = useState(initialData?.mobile || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [gst, setGst] = useState(initialData?.gstNumber || '');
  const [type, setType] = useState<any>(initialData?.customerType || 'BUSINESS');
  const [creditLimit, setCreditLimit] = useState(initialData?.creditLimit || 0);

  const [addressLine1, setAddressLine1] = useState(initialData?.billingAddress?.addressLine1 || '');
  const [city, setCity] = useState(initialData?.city || 'Bengaluru');
  const [state, setState] = useState(initialData?.state || 'Karnataka');
  const [pincode, setPincode] = useState(initialData?.pincode || '560001');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      customerName: name,
      companyName: company,
      mobile,
      email,
      gstNumber: gst,
      customerType: type,
      creditLimit: Number(creditLimit),
      city,
      state,
      pincode,
      billingAddress: { addressLine1, city, state, pincode, country: 'India' },
      shippingAddress: { addressLine1, city, state, pincode, country: 'India' },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Customer' : 'Add New Customer'}
      description="Create a new customer profile or update existing details."
      className="max-w-3xl"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
            Save Customer
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <FormSection title="General Information">
          <FormGrid cols={3}>
            <Input label="Customer Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
            <Dropdown
              label="Customer Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              options={[
                { label: 'Business', value: 'BUSINESS' },
                { label: 'Individual', value: 'INDIVIDUAL' },
                { label: 'Dealer', value: 'DEALER' },
                { label: 'Distributor', value: 'DISTRIBUTOR' },
              ]}
            />
            <PhoneInput label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
            <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <GSTInput label="GSTIN Number" value={gst} onChange={(e) => setGst(e.target.value)} />
          </FormGrid>
        </FormSection>

        <FormSection title="Billing & Shipping Address">
          <FormGrid cols={3}>
            <Input label="Address Line 1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
            <Input label="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            <Input label="State" value={state} onChange={(e) => setState(e.target.value)} required />
            <Input label="PIN Code" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
          </FormGrid>
        </FormSection>

        <FormSection title="Credit & Accounting Limits">
          <FormGrid cols={2}>
            <CurrencyInput label="Credit Limit (₹)" value={creditLimit} onChange={(e) => setCreditLimit(Number(e.target.value))} />
            <Dropdown
              label="Payment Terms"
              options={[
                { label: 'Net 15 Days', value: 'NET_15' },
                { label: 'Net 30 Days', value: 'NET_30' },
                { label: 'Immediate / Cash on Delivery', value: 'COD' },
              ]}
            />
          </FormGrid>
        </FormSection>
      </form>
    </Modal>
  );
};
