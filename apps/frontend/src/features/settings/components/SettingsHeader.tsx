'use client';

import React from 'react';
import { Settings, Save, Check, ShieldCheck } from 'lucide-react';

interface SettingsHeaderProps {
  isSaved: boolean;
  onSave: () => void;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({ isSaved, onSave }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-6 pb-2">
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 flex items-center gap-1.5 shadow-xs">
            <Settings className="h-3 w-3" /> Configuration Hub
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> ERP Master Config
          </span>
        </div>
        <h1 className="text-3xl font-black text-txtPrimary tracking-tight">
          Business{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-purple-500">
            Settings
          </span>{' '}
          ⚙️
        </h1>
        <p className="text-xs md:text-sm font-medium text-txtSecondary mt-1.5">
          Manage company profile, GST registration, banking records, and invoice policies.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all duration-300 cursor-pointer active:scale-95 ${
            isSaved
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 ring-2 ring-emerald-400/40'
              : 'bg-primary hover:bg-primary/90 text-white shadow-primary/25 hover:scale-[1.02]'
          }`}
        >
          {isSaved ? (
            <>
              <Check className="h-4 w-4 stroke-[3]" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
