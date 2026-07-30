'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Building2, User, Phone, Mail, MapPin, FileText, DollarSign } from 'lucide-react';
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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="w-full max-w-lg glass-panel rounded-3xl p-6 shadow-2xl space-y-6 overflow-hidden border border-borderClr/40"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-borderClr/30">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-txtPrimary tracking-tight">Add New Supplier</h2>
                  <p className="text-xs text-txtSecondary">Register vendor for procurement and payables</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                  Vendor / Company Name *
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gujarat Teak Traders"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50"
                  />
                </div>
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
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Patel"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
                    <input
                      type="text"
                      placeholder="+91 98000 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
                    <input
                      type="email"
                      placeholder="vendor@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
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
                    className="w-full px-3 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none"
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

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-borderClr/30">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-txtSecondary hover:bg-hoverBg transition-colors font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold shadow-lg shadow-amber-500/20 transition-all"
                >
                  Save Supplier
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
