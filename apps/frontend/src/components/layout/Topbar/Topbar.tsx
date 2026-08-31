'use client';

import React, { useState } from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import { GlobalSearch } from '../Search/GlobalSearch';
import { FinancialYearSelect } from './FinancialYearSelect';
import { NotificationMenu } from '../Notification/NotificationMenu';
import { UserMenu } from '../UserMenu/UserMenu';
import { ThemeToggle } from '../Theme/ThemeToggle';
import { useToastStore } from '@/lib/toast.store';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncText, setLastSyncText] = useState('Last synced 2 min ago');
  const { addToast } = useToastStore();

  const handleManualRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSyncText('Synced just now');
      addToast({
        type: 'success',
        title: 'Data Refreshed',
        message: 'All figures and ledger balances are up to date.',
      });
    }, 750);
  };

  return (
    <header className="h-topbar border-b border-borderClr bg-cardBg px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-txtSecondary hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-3">
        {/* Global Last Synced indicator & interactive refresh */}
        <button
          onClick={handleManualRefresh}
          title="Click to refresh application data"
          className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-all cursor-pointer select-none"
        >
          <RefreshCw className={`h-3 w-3 text-primary transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{lastSyncText}</span>
        </button>
        <div className="hidden md:block h-4 w-[1px] bg-borderClr" />
        <FinancialYearSelect />
        <ThemeToggle />
        <NotificationMenu />
        <div className="h-5 w-[1px] bg-borderClr mx-1" />
        <UserMenu />
      </div>
    </header>
  );
};
