'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, Info } from 'lucide-react';
import { cn } from '@/utils/cn';

export const NotificationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-lg text-txtSecondary hover:bg-gray-100 hover:text-txtPrimary transition-colors focus:outline-none"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-danger" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-xl bg-cardBg border border-borderClr shadow-lg p-3 z-50 animate-fade-in">
          <div className="flex items-center justify-between pb-2 border-b border-borderClr">
            <span className="text-xs font-bold text-txtPrimary">Notifications</span>
            <span className="text-[10px] font-semibold text-primary">3 New</span>
          </div>

          <div className="py-2 space-y-2 max-h-64 overflow-y-auto">
            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50 text-xs">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-txtPrimary">Invoice INV-2026-001 Approved</p>
                <p className="text-[10px] text-txtSecondary">10 mins ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-2 rounded-lg bg-gray-50 text-xs">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-txtPrimary">New Vendor Registered</p>
                <p className="text-[10px] text-txtSecondary">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
