'use client';

import React, { useState } from 'react';
import { Building2, User, Phone, Mail } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { Vendor } from '../types';

interface VendorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Vendor>) => void;
}

export const VendorFormModal: React.FC<VendorFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [vendorName, setVendorName] = useState('');
  const [category, setCategory] = useState('Timber & Plywood');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Ahmedabad');
  const [gstin, setGstin] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim()) return;

    onSave({
      vendorName,
      category,
      contactPerson: contactPerson || 'Purchasing Manager',
      phone: phone || '+91 98765 43210',
      email: email || 'vendor@example.com',
      city,
      state: 'Gujarat',
      gstin: gstin || '24AAACV1234F1Z9',
      payable: parseFloat(openingBalance) || 0,
      totalSpend: 0,
      status: 'ACTIVE',
    });

    setVendorName('');
    setContactPerson('');
    setPhone('');
    setEmail('');
    setGstin('');
    setOpeningBalance('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Supplier"
      description="Register vendor details for procurement, raw materials, and payables."
      icon={<Building2 className="h-5 w-5 text-amber-500" />}
      maxWidth="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-txtSecondary hover:bg-hoverBg transition-colors font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            Save Supplier
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        <div>
          <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
            Vendor / Company Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Gujarat Teak Traders"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50 font-bold"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Material Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50 font-bold"
            >
              <option value="Timber & Plywood">Timber & Plywood</option>
              <option value="Fabrics & Drapes">Fabrics & Drapes</option>
              <option value="Marble & Tiles">Marble & Tiles</option>
              <option value="Hardware & Fittings">Hardware & Fittings</option>
              <option value="Lighting & Glass">Lighting & Glass</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Contact Person
            </label>
            <input
              type="text"
              placeholder="e.g. Ramesh Patel"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+91 98000 00000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50 font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="vendor@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              GSTIN
            </label>
            <input
              type="text"
              placeholder="24AAAAA0000A1Z5"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary uppercase font-bold focus:outline-none"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Opening Payable (₹)
            </label>
            <input
              type="number"
              placeholder="0"
              value={openingBalance}
              onChange={(e) => setOpeningBalance(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>
        </div>
      </form>
    </Drawer>
  );
};
