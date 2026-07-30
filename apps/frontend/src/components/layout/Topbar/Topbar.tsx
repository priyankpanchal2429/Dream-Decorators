'use client';

import React from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import { GlobalSearch } from '../Search/GlobalSearch';
import { FinancialYearSelect } from './FinancialYearSelect';
import { NotificationMenu } from '../Notification/NotificationMenu';
import { UserMenu } from '../UserMenu/UserMenu';
import { ThemeToggle } from '../Theme/ThemeToggle';

interface TopbarProps {
  onToggleMobileSidebar: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleMobileSidebar }) => {
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
        {/* Global Last Synced indicator */}
        <span className="hidden md:flex items-center gap-1.5 text-[11px] text-txtSecondary">
          <RefreshCw className="h-3 w-3" />
          Last synced 2 min ago
        </span>
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
