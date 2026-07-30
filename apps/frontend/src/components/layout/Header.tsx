import React from 'react';
import { Layers } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-brand-600 p-2 text-white">
          <Layers className="h-5 w-5" />
        </div>
        <span className="font-bold text-slate-900 text-lg tracking-tight">Dream Decorators ERP</span>
      </div>
      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
        <span>Production Baseline Architecture v1.0</span>
      </div>
    </header>
  );
};
