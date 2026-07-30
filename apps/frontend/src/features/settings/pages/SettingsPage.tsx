'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Building2, CreditCard, FileText, Save, Check } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bank' | 'terms'>('profile');

  // Business Profile State
  const [companyName, setCompanyName] = useState('Dream Decorators');
  const [tagline, setTagline] = useState('Luxury Interior & Architectural Decor');
  const [gstin, setGstin] = useState('24AAACD1234E1Z5');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('support@dreamdecorators.in');
  const [address, setAddress] = useState('Opp. Business Hub, Satellite, Ahmedabad, Gujarat - 380015');

  // Bank State
  const [bankName, setBankName] = useState('Bank of Baroda');
  const [branch, setBranch] = useState('Satellite Ahmedabad');
  const [accName, setAccName] = useState('Dream Decorators');
  const [accNo, setAccNo] = useState('39590200000512');
  const [ifsc, setIfsc] = useState('BARB0SATELL');

  // Terms State
  const [terms, setTerms] = useState(
    `1. Jurisdiction: Ahmedabad, Gujarat.\n2. Delivery: 3-4 weeks from advance receipt.\n3. Payment: 50% advance, 50% prior to dispatch.\n4. Cancellation: 20% of advance is non-refundable.`
  );

  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

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
                <Settings className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Business Settings</h1>
                <p className="text-xs text-txtSecondary mt-0.5">Manage company profile, GST details, bank accounts, and invoice templates</p>
              </div>
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all"
            >
              {isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              {isSaved ? 'Settings Saved!' : 'Save Changes'}
            </button>
          </motion.div>

          {/* Settings Tabs */}
          <div className="flex items-center gap-2 border-b border-borderClr/30 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary'
              }`}
            >
              <Building2 className="h-4 w-4" /> Company Profile
            </button>

            <button
              onClick={() => setActiveTab('bank')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'bank'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary'
              }`}
            >
              <CreditCard className="h-4 w-4" /> Bank Accounts
            </button>

            <button
              onClick={() => setActiveTab('terms')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'terms'
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-hoverBg/50 text-txtSecondary hover:text-txtPrimary'
              }`}
            >
              <FileText className="h-4 w-4" /> Terms & Conditions
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-txtPrimary pb-2 border-b border-borderClr/30">Company Identity & GST Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Business Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Tagline / Subtitle</label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">GSTIN Number</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Support Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Registered Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Bank Tab */}
          {activeTab === 'bank' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-txtPrimary pb-2 border-b border-borderClr/30">Bank Account Details (Renders on PDF Invoices & Quotations)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Bank Name</label>
                  <input
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Branch Location</label>
                  <input
                    type="text"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Account Holder Name</label>
                  <input
                    type="text"
                    value={accName}
                    onChange={(e) => setAccName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Account Number</label>
                  <input
                    type="text"
                    value={accNo}
                    onChange={(e) => setAccNo(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">IFSC Code</label>
                  <input
                    type="text"
                    value={ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold uppercase"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Terms Tab */}
          {activeTab === 'terms' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-6 rounded-3xl space-y-4">
              <h3 className="text-sm font-bold text-txtPrimary pb-2 border-b border-borderClr/30">Default Terms & Conditions</h3>
              <div>
                <label className="block text-xs font-bold text-txtSecondary mb-1.5 uppercase">Terms & Payment Policy</label>
                <textarea
                  rows={6}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full px-4 py-3 text-xs rounded-2xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-medium leading-relaxed"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
