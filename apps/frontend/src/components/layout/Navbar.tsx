import React from 'react';
import { Bell, User } from 'lucide-react';
import { Search } from '../ui/Search';

export const Navbar: React.FC = () => {
  return (
    <header className="h-14 border-b border-neutral-200 bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Search placeholder="Search records (Ctrl+K)..." className="w-64" />
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-danger-600" />
        </button>

        <div className="h-4 w-[1px] bg-neutral-200" />

        <div className="flex items-center gap-2 text-xs">
          <div className="h-7 w-7 rounded-full bg-neutral-900 text-white flex items-center justify-center font-semibold text-xs">
            A
          </div>
          <span className="font-medium text-neutral-800">Admin</span>
        </div>
      </div>
    </header>
  );
};
