'use client';

import React from 'react';
import { CreditCard, QrCode, UploadCloud, Trash2, CheckCircle2, Image as ImageIcon, MapPin, User, Hash, FileCode } from 'lucide-react';
import { BankAccountDetails } from '../types';

interface BankAccountsTabProps {
  bank: BankAccountDetails;
  onChange: (field: keyof BankAccountDetails, value: string | null) => void;
}

export const BankAccountsTab: React.FC<BankAccountsTabProps> = ({ bank, onChange }) => {
  const handleQrUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange('upiQrImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Primary Bank Account Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-zinc-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Bank Account Details
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Rendered on commercial invoices and client quotations for wire transfers
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 self-start sm:self-auto">
            Primary Settlement Account
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Bank Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Bank Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <CreditCard className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={bank.bankName}
                onChange={(e) => onChange('bankName', e.target.value)}
                placeholder="e.g. Bank of Baroda"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Full legal name of the banking institution</p>
          </div>

          {/* Branch Location */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Branch Location <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <MapPin className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={bank.branch}
                onChange={(e) => onChange('branch', e.target.value)}
                placeholder="e.g. Satellite, Ahmedabad"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Local branch where the account is domiciled</p>
          </div>

          {/* Account Holder Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Beneficiary / Account Holder Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <User className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={bank.accName}
                onChange={(e) => onChange('accName', e.target.value)}
                placeholder="e.g. Dream Decorators"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Name as registered in bank records</p>
          </div>

          {/* Account Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Account Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <Hash className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={bank.accNo}
                onChange={(e) => onChange('accNo', e.target.value)}
                placeholder="e.g. 39590200000512"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-bold font-mono text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Current or overdraft account number</p>
          </div>

          {/* IFSC Code */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              IFSC Code <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <FileCode className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={bank.ifsc}
                onChange={(e) => onChange('ifsc', e.target.value.toUpperCase())}
                placeholder="BARB0SATELL"
                maxLength={11}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-bold font-mono text-slate-900 dark:text-zinc-100 uppercase placeholder:text-slate-400 tracking-wider focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">11-character alphanumeric RTGS/NEFT routing code</p>
          </div>
        </div>
      </div>

      {/* UPI & Payment QR Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-zinc-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                UPI & Instant QR Payments
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Enable customers to scan and pay via Google Pay, PhonePe, Paytm, or BHIM
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* UPI ID & Upload Box */}
          <div className="space-y-5 lg:col-span-6">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                UPI ID / VPA Handle
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                  <QrCode className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  value={bank.upiId}
                  onChange={(e) => onChange('upiId', e.target.value)}
                  placeholder="e.g. dreamdecorators@barodampay"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">Printed alongside the QR code on payment receipts</p>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                Upload UPI QR Code Image
              </label>
              <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-zinc-700 hover:border-primary/60 bg-slate-50/50 dark:bg-zinc-950 hover:bg-primary/5 rounded-2xl transition-all duration-200 cursor-pointer group">
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  onChange={handleQrUpload}
                  className="sr-only"
                />
                <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 group-hover:border-primary/30 group-hover:scale-110 shadow-xs transition-all mb-2 text-primary">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 group-hover:text-primary transition-colors">
                  Click or drag UPI QR code to upload
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400 mt-1">
                  Supported formats: PNG, JPG, WEBP, SVG (Max 5MB)
                </span>
              </label>
            </div>
          </div>

          {/* Live QR Preview Panel */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-50/80 dark:bg-zinc-950/80 border border-slate-200 dark:border-zinc-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800">
              <span className="text-xs font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-emerald-500" /> Live Invoice QR Preview
              </span>
              {bank.upiQrImage && (
                <button
                  type="button"
                  onClick={() => onChange('upiQrImage', null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Remove QR
                </button>
              )}
            </div>

            {bank.upiQrImage ? (
              <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs shrink-0">
                  <img
                    src={bank.upiQrImage}
                    alt="UPI QR Preview"
                    className="h-28 w-28 object-contain rounded-lg"
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ready for Print & PDF
                  </span>
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-zinc-100">Scan & Pay via UPI Apps</h4>
                    <p className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">GPay • PhonePe • Paytm • BHIM</p>
                  </div>
                  <div className="pt-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase">UPI ID: </span>
                    <span className="text-xs font-mono font-bold text-slate-900 dark:text-zinc-100 bg-slate-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-zinc-700">
                      {bank.upiId || 'Not Configured'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-xl border border-dashed border-slate-300 dark:border-zinc-700 text-center space-y-2 bg-white/50 dark:bg-zinc-900/50">
                <QrCode className="h-10 w-10 text-slate-400 dark:text-zinc-500 mx-auto" />
                <h4 className="text-xs font-bold text-slate-900 dark:text-zinc-100">No QR Code Uploaded</h4>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400 max-w-xs mx-auto">
                  Upload a merchant UPI QR code image to display instant scan-to-pay on client invoices and receipts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
