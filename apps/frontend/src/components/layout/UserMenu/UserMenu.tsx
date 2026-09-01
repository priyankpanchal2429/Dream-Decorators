'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, KeyRound, LogOut, ChevronDown, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '@/lib/auth.store';

export const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    router.push('/login');
  };

  const displayName = user?.name || user?.username || 'Admin User';
  const displayId = user?.username ? `@${user.username}` : 'admin';
  const roleLabel = user?.role ? user.role.replace(/_/g, ' ') : 'Super Administrator';

  const initials = displayName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'DD';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors focus:outline-none select-none"
      >
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
          {initials}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-bold text-txtPrimary leading-tight">{displayName}</span>
          <span className="text-[10px] text-txtSecondary">{displayId}</span>
        </div>
        <ChevronDown className="h-3.5 w-3.5 text-txtSecondary" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl bg-cardBg border border-borderClr shadow-xl py-1.5 z-[100] animate-fade-in backdrop-blur-lg">
          <div className="px-3.5 py-2.5 border-b border-borderClr mb-1 bg-black/[0.02] dark:bg-white/[0.02]">
            <div className="flex items-center gap-1.5 mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              <p className="text-xs font-bold text-txtPrimary truncate">{displayName}</p>
            </div>
            <p className="text-[10px] text-txtSecondary capitalize">{roleLabel}</p>
            <p className="text-[10px] text-primary font-mono mt-0.5">{displayId}</p>
          </div>

          <button
            onClick={() => {
              setIsOpen(false);
              router.push('/settings');
            }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-txtPrimary hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
          >
            <User className="h-3.5 w-3.5 text-txtSecondary" />
            Account Settings
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              router.push('/settings');
            }}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-txtPrimary hover:bg-black/5 dark:hover:bg-white/5 text-left transition-colors"
          >
            <KeyRound className="h-3.5 w-3.5 text-txtSecondary" />
            Security & Credentials
          </button>

          <div className="my-1 border-t border-borderClr" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-3.5 py-2 text-xs text-danger hover:bg-danger/10 font-semibold text-left transition-colors"
          >
            <LogOut className="h-3.5 w-3.5 text-danger" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
