'use client';

/**
 * SettingsPage — WalkClean Brutalist Design System Implementation
 *
 * Sizing:
 * - Full page width maintained (`max-w-page mx-auto`)
 * - Scaled down by ~10% for optimal spacing, padding, and field proportions
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Building2, CreditCard, FileText, Save, Check,
  UploadCloud, QrCode, Trash2, Image as ImageIcon, CheckCircle2
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';

// Dynamic Font Injector
const FontLink = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap"
      rel="stylesheet"
    />
  </>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'bank' | 'terms'>('profile');

  // Business Profile State
  const [companyName, setCompanyName] = useState('Dream Decorators');
  const [tagline, setTagline] = useState('Luxury Interior & Architectural Decor');
  const [gstin, setGstin] = useState('24AAACD1234E1Z5');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('support@dreamdecorators.in');
  const [address, setAddress] = useState('Opp. Business Hub, Satellite, Ahmedabad, Gujarat - 380015');

  // Bank & UPI State
  const [bankName, setBankName] = useState('Bank of Baroda');
  const [branch, setBranch] = useState('Satellite Ahmedabad');
  const [accName, setAccName] = useState('Dream Decorators');
  const [accNo, setAccNo] = useState('39590200000512');
  const [ifsc, setIfsc] = useState('BARB0SATELL');
  const [upiId, setUpiId] = useState('dreamdecorators@barodampay');
  const [upiQrImage, setUpiQrImage] = useState<string | null>(
    'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=dreamdecorators@barodampay&pn=Dream%20Decorators'
  );

  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpiQrImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
      <div
        className="min-h-screen bg-gray-50 pb-12 pt-3 text-black antialiased select-none"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <FontLink />

        {/* Outer Container: Standard Full Page Width */}
        <div className="px-4 md:px-8 max-w-page mx-auto space-y-5">

          {/* Header Bar */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="pt-2 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 bg-black text-white border-2 border-black shrink-0">
                <Settings className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-xl font-black text-black uppercase tracking-wide">
                  BUSINESS SETTINGS
                </h1>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">
                  Manage company profile, GST details, bank accounts, and invoice terms
                </p>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className={`flex items-center justify-center gap-2 px-6 py-3 border-2 border-black font-extrabold text-xs uppercase tracking-wider transition-all ${
                isSaved
                  ? 'bg-[#16a34a] text-white hover:bg-[#15803d] shadow-[3px_3px_0_#000000]'
                  : 'bg-black text-white hover:bg-gray-800 hover:shadow-[3px_3px_0_#16a34a]'
              }`}
            >
              {isSaved ? <Check className="h-4 w-4 stroke-[3]" /> : <Save className="h-4 w-4 stroke-[2.5]" />}
              {isSaved ? 'SETTINGS SAVED!' : 'SAVE CHANGES'}
            </button>
          </motion.div>

          {/* Clean Navigation Tab Bar */}
          <div className="border-b-2 border-black pb-4 mb-2">
            <div className="flex items-center gap-4 overflow-x-auto pt-1 pb-1 px-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center gap-2.5 px-6 py-3 border-2 border-black text-xs font-black uppercase tracking-wide transition-all ${
                  activeTab === 'profile'
                    ? 'bg-black text-white shadow-[4px_4px_0_#16a34a]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000]'
                }`}
              >
                <Building2 className="h-4 w-4 stroke-[2.5] shrink-0" />
                <span>COMPANY PROFILE</span>
              </button>

              <button
                onClick={() => setActiveTab('bank')}
                className={`flex items-center gap-2.5 px-6 py-3 border-2 border-black text-xs font-black uppercase tracking-wide transition-all ${
                  activeTab === 'bank'
                    ? 'bg-black text-white shadow-[4px_4px_0_#16a34a]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000]'
                }`}
              >
                <CreditCard className="h-4 w-4 stroke-[2.5] shrink-0" />
                <span>BANK ACCOUNTS</span>
              </button>

              <button
                onClick={() => setActiveTab('terms')}
                className={`flex items-center gap-2.5 px-6 py-3 border-2 border-black text-xs font-black uppercase tracking-wide transition-all ${
                  activeTab === 'terms'
                    ? 'bg-black text-white shadow-[4px_4px_0_#16a34a]'
                    : 'bg-white text-black hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000]'
                }`}
              >
                <FileText className="h-4 w-4 stroke-[2.5] shrink-0" />
                <span>TERMS & CONDITIONS</span>
              </button>
            </div>
          </div>

          {/* Tab Content 1: Company Profile */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-black bg-white p-7 space-y-5 transition-all hover:shadow-[7px_7px_0_#000000]"
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-black pb-2.5 border-b-2 border-black">
                COMPANY IDENTITY & GST DETAILS
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                    BUSINESS NAME
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                    TAGLINE / SUBTITLE
                  </label>
                  <input
                    type="text"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                    GSTIN NUMBER
                  </label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-black text-black border-2 border-black bg-white focus:outline-none uppercase hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                    PHONE NUMBER
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                    SUPPORT EMAIL
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                    REGISTERED ADDRESS
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab Content 2: Bank & UPI Accounts */}
          {activeTab === 'bank' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-black bg-white p-7 space-y-6 transition-all hover:shadow-[7px_7px_0_#000000]"
            >
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-black pb-2.5 border-b-2 border-black mb-5">
                  BANK ACCOUNT DETAILS (RENDERS ON PDF INVOICES & QUOTATIONS)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                      BANK NAME
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                      BRANCH LOCATION
                    </label>
                    <input
                      type="text"
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-bold text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                      ACCOUNT HOLDER NAME
                    </label>
                    <input
                      type="text"
                      value={accName}
                      onChange={(e) => setAccName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-black text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                      ACCOUNT NUMBER
                    </label>
                    <input
                      type="text"
                      value={accNo}
                      onChange={(e) => setAccNo(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-black text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                      IFSC CODE
                    </label>
                    <input
                      type="text"
                      value={ifsc}
                      onChange={(e) => setIfsc(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-black text-black uppercase border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* UPI & QR Code Section */}
              <div className="pt-5 border-t-2 border-black space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-[#16a34a] text-white border-2 border-black">
                    <QrCode className="h-4.5 w-4.5 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wide text-black">
                      UPI PAYMENT DETAILS & QR CODE UPLOAD
                    </h4>
                    <p className="text-[10.5px] font-semibold text-gray-500">
                      Upload your Google Pay / PhonePe / Paytm UPI QR code to print on invoices & PDF quotations
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
                  {/* UPI VPA ID & Upload */}
                  <div className="space-y-4 lg:col-span-1">
                    <div>
                      <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                        UPI ID / VPA ADDRESS
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        placeholder="e.g. business@okicici"
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs font-black text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                      />
                      <p className="text-[9.5px] font-bold text-gray-500 mt-1 uppercase">
                        Printed alongside QR Code for manual UPI transfers
                      </p>
                    </div>

                    {/* QR Code Upload Control Box */}
                    <div>
                      <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                        UPLOAD UPI QR CODE IMAGE
                      </label>
                      <label className="relative flex flex-col items-center justify-center p-5 border-2 border-dashed border-black bg-white hover:bg-black hover:text-white hover:shadow-[3.5px_3.5px_0_#000000] transition-all cursor-pointer group">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleQrUpload}
                          className="sr-only"
                        />
                        <div className="p-2.5 bg-black text-white border-2 border-black group-hover:bg-white group-hover:text-black transition-colors mb-2">
                          <UploadCloud className="h-5 w-5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider">
                          CLICK TO UPLOAD QR IMAGE
                        </span>
                        <span className="text-[9.5px] font-bold text-gray-400 group-hover:text-gray-300 mt-0.5">
                          PNG, JPG, WEBP, SVG (MAX 5MB)
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Live QR Preview Card */}
                  <div className="lg:col-span-2 p-5 border-2 border-black bg-white space-y-3.5 hover:shadow-[3.5px_3.5px_0_#000000] transition-all">
                    <div className="flex items-center justify-between pb-2.5 border-b-2 border-black">
                      <span className="text-xs font-black uppercase tracking-wider text-black flex items-center gap-1.5">
                        <ImageIcon className="h-4 w-4 text-[#16a34a]" /> LIVE INVOICE QR PREVIEW
                      </span>
                      {upiQrImage && (
                        <button
                          type="button"
                          onClick={() => setUpiQrImage(null)}
                          className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider text-red-600 hover:underline cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5 stroke-[2.5]" /> REMOVE QR
                        </button>
                      )}
                    </div>

                    {upiQrImage ? (
                      <div className="flex flex-col sm:flex-row items-center gap-5 p-3.5 border-2 border-black bg-gray-50">
                        <div className="p-2.5 bg-white border-2 border-black shrink-0">
                          <img
                            src={upiQrImage}
                            alt="UPI QR Code"
                            className="h-32 w-32 object-contain"
                          />
                        </div>

                        <div className="space-y-2.5 text-center sm:text-left">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#16a34a] text-white text-[10.5px] font-black uppercase tracking-wider border border-black">
                            <CheckCircle2 className="h-3.5 w-3.5 stroke-[3]" /> READY FOR INVOICES & QUOTATIONS
                          </div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-wider text-black">
                              SCAN & PAY VIA ANY UPI APP
                            </p>
                            <p className="text-[10.5px] font-bold text-gray-500 mt-0.5">
                              GPay • PhonePe • Paytm • BHIM
                            </p>
                          </div>
                          <div className="pt-0.5">
                            <span className="text-[10.5px] font-extrabold uppercase text-gray-500">UPI ID: </span>
                            <span className="text-xs font-black text-black bg-black text-white px-2 py-0.5 border border-black font-mono">
                              {upiId || 'NOT SET'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-7 border-2 border-dashed border-black text-center space-y-1.5 bg-gray-50">
                        <QrCode className="h-8 w-8 text-gray-400 mx-auto stroke-[2]" />
                        <p className="text-xs font-black uppercase tracking-wider text-black">
                          NO QR CODE IMAGE UPLOADED
                        </p>
                        <p className="text-[9.5px] font-bold text-gray-500">
                          Upload a QR image above to enable instant UPI payment scanning on invoices.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab Content 3: Terms & Conditions */}
          {activeTab === 'terms' && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-black bg-white p-7 space-y-5 transition-all hover:shadow-[7px_7px_0_#000000]"
            >
              <h3 className="text-xs font-black uppercase tracking-wider text-black pb-2.5 border-b-2 border-black">
                DEFAULT TERMS & CONDITIONS
              </h3>
              <div>
                <label className="block text-[9.5px] font-black uppercase tracking-widest text-black mb-1.5">
                  TERMS & PAYMENT POLICY
                </label>
                <textarea
                  rows={6}
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  className="w-full p-3.5 text-xs font-bold leading-relaxed text-black border-2 border-black bg-white focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
                />
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </AppShell>
  );
}
