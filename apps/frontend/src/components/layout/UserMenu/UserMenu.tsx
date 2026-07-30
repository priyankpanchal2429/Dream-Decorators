'use client';

import React, { useState } from 'react';
import { User, KeyRound, LogOut, ChevronDown } from 'lucide-react';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none select-none"
      >
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
          DD
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-txtPrimary leading-tight">Admin User</span>
          <span className="text-[10px] text-txtSecondary">Super Administrator</span>
        </div>
        <ChevronDown className="h-4 w-4 text-txtSecondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 rounded-xl bg-cardBg border border-borderClr shadow-lg py-1.5 z-50 animate-fade-in">
          <div className="px-3 py-2 border-b border-borderClr mb-1">
            <p className="text-xs font-bold text-txtPrimary">Dream Decorators Admin</p>
            <p className="text-[10px] text-txtSecondary">admin@dreamdecorators.com</p>
          </div>

          <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-xs text-txtPrimary hover:bg-gray-100">
            <User className="h-4 w-4 text-txtSecondary" />
            Profile Settings
          </a>
          <a href="#" className="flex items-center gap-2 px-3 py-1.5 text-xs text-txtPrimary hover:bg-gray-100">
            <KeyRound className="h-4 w-4 text-txtSecondary" />
            Change Password
          </a>
          <div className="my-1 border-t border-borderClr" />
          <button className="flex items-center gap-2 w-full px-3 py-1.5 text-xs text-danger hover:bg-danger/10 font-medium">
            <LogOut className="h-4 w-4 text-danger" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
