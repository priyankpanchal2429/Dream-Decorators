'use client';

import React from 'react';
import { Building2, Phone, Mail, MapPin, Hash, Sparkles, ShieldCheck } from 'lucide-react';
import { CompanyProfile } from '../types';

interface CompanyProfileTabProps {
  profile: CompanyProfile;
  onChange: (field: keyof CompanyProfile, value: string) => void;
}

export const CompanyProfileTab: React.FC<CompanyProfileTabProps> = ({ profile, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Identity & Legal Info Card */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-sm rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 dark:border-zinc-800 gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-zinc-100">
                Company Identity & Registration
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Legal entity details printed on quotations, tax invoices, and delivery challans
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
            Active Verified Profile
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Business Name */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Business Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <Building2 className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={profile.companyName}
                onChange={(e) => onChange('companyName', e.target.value)}
                placeholder="e.g. Dream Decorators"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Official registered commercial trade name</p>
          </div>

          {/* Tagline / Subtitle */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Tagline / Subtitle
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <Sparkles className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={profile.tagline}
                onChange={(e) => onChange('tagline', e.target.value)}
                placeholder="e.g. Luxury Interior & Architectural Decor"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Displayed under the logo on PDF headers</p>
          </div>

          {/* GSTIN */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              GSTIN Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <Hash className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={profile.gstin}
                onChange={(e) => onChange('gstin', e.target.value.toUpperCase())}
                placeholder="24AAACD1234E1Z5"
                maxLength={15}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-bold font-mono text-slate-900 dark:text-zinc-100 uppercase placeholder:text-slate-400 tracking-wider focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">15-digit Goods and Services Tax Identification Number</p>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Official Phone / Hotline <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <Phone className="h-4 w-4" />
              </div>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Primary customer service and inquiry contact</p>
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Billing & Support Email <span className="text-rose-500">*</span>
            </label>
            <div className="relative flex items-center">
              <div className="absolute left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onChange('email', e.target.value)}
                placeholder="support@dreamdecorators.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Official mailbox for statements and automated notifications</p>
          </div>

          {/* Registered Address */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
              Registered Office Address <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 text-slate-400 dark:text-zinc-500 pointer-events-none">
                <MapPin className="h-4 w-4" />
              </div>
              <textarea
                rows={3}
                value={profile.address}
                onChange={(e) => onChange('address', e.target.value)}
                placeholder="Full address with State and PIN code"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50/80 dark:bg-zinc-950 border border-slate-300 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 placeholder:text-slate-400 focus:bg-white dark:focus:bg-zinc-900 focus:border-primary focus:ring-2 focus:ring-primary/20 shadow-2xs transition-all resize-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400">Appears at the footer and letterhead of official tax documents</p>
          </div>
        </div>
      </div>
    </div>
  );
};
