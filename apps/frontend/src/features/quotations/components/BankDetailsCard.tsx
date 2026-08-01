'use client';

import React, { useState } from 'react';
import { Landmark, QrCode, Copy, Check, ShieldCheck } from 'lucide-react';

interface BankDetailsCardProps {
  className?: string;
}

export const BankDetailsCard: React.FC<BankDetailsCardProps> = ({ className }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const bankInfo = {
    accountName: 'Dream Decorators',
    bankName: 'Bank of Baroda',
    accountNumber: '39590200000512',
    ifscCode: 'BARB0SATELL',
    branch: 'Satellite Branch, Ahmedabad',
    upiId: 'dreamdecorators@upi',
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className={`glass-panel p-6 rounded-3xl space-y-4 ${className || ''}`}>
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-borderClr/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">Company Bank Details & UPI QR</h3>
            <p className="text-[10px] text-txtSecondary mt-0.5">
              Direct RTGS/NEFT transfer details & instant UPI QR payment
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2.5 py-1 rounded-full border border-success/20">
          <ShieldCheck className="h-3 w-3" /> Verified Account
        </span>
      </div>

      {/* Grid: Bank Details Left vs UPI QR Right */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        {/* Left 2 Cols: Account Fields */}
        <div className="sm:col-span-2 space-y-2.5 text-xs">
          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-hoverBg/40 border border-borderClr/30">
            <div>
              <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider block">
                Account Name
              </span>
              <span className="font-extrabold text-txtPrimary text-xs mt-0.5 block">
                {bankInfo.accountName}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider block">
                Bank Name
              </span>
              <span className="font-extrabold text-txtPrimary text-xs mt-0.5 block">
                {bankInfo.bankName}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-hoverBg/40 border border-borderClr/30">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider block">
                  Account Number
                </span>
                <span className="font-mono font-bold text-txtPrimary text-xs mt-0.5 block tracking-wider">
                  {bankInfo.accountNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(bankInfo.accountNumber, 'acc')}
                className="p-1.5 rounded-lg hover:bg-hoverBg text-txtSecondary hover:text-txtPrimary transition-colors cursor-pointer"
                title="Copy Account Number"
              >
                {copiedField === 'acc' ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between border-l border-borderClr/30 pl-3">
              <div>
                <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider block">
                  IFSC Code
                </span>
                <span className="font-mono font-bold text-primary text-xs mt-0.5 block tracking-wider">
                  {bankInfo.ifscCode}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(bankInfo.ifscCode, 'ifsc')}
                className="p-1.5 rounded-lg hover:bg-hoverBg text-txtSecondary hover:text-txtPrimary transition-colors cursor-pointer"
                title="Copy IFSC Code"
              >
                {copiedField === 'ifsc' ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-hoverBg/40 border border-borderClr/30">
            <div>
              <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider block">
                UPI VPA ID
              </span>
              <span className="font-mono font-extrabold text-txtPrimary text-xs mt-0.5 block">
                {bankInfo.upiId}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleCopy(bankInfo.upiId, 'upi')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary font-bold text-[10px] transition-colors cursor-pointer"
            >
              {copiedField === 'upi' ? (
                <>
                  <Check className="h-3 w-3 text-success" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" /> Copy UPI
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 1 Col: Scannable UPI QR Code Card */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center p-4 rounded-2xl bg-hoverBg/50 border border-borderClr/40 text-center space-y-2">
          <div className="relative p-2.5 bg-white rounded-2xl shadow-md border border-gray-200 group">
            <QrCode className="h-24 w-24 text-zinc-900 transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/5 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
              <span className="px-2 py-1 bg-zinc-900 text-white text-[9px] font-bold rounded-md shadow-sm">
                Scan to Pay
              </span>
            </div>
          </div>
          <div>
            <span className="text-[11px] font-bold text-txtPrimary block">Scan to Pay via UPI</span>
            <p className="text-[9px] text-txtSecondary mt-0.5 font-medium">GPay • PhonePe • Paytm • BHIM</p>
          </div>
        </div>
      </div>
    </div>
  );
};
