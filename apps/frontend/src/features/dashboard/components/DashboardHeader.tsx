'use client';

import React, { useEffect, useState } from 'react';
import { Calendar } from 'lucide-react';

interface DashboardHeaderProps {
  userName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName = 'Admin User' }) => {
  const [greeting, setGreeting] = useState('Welcome');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2 pt-6">
      <div>
        <h1 className="text-3xl font-black text-txtPrimary tracking-tight">
          {greeting}, <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">{userName}</span> 👋
        </h1>
        <p className="text-sm font-medium text-txtSecondary mt-2 flex items-center gap-1.5">
          Here is what's happening with your business today.
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cardBg border border-borderClr shadow-sm glass-panel backdrop-blur-md">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-txtPrimary">{currentDate}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-hoverBg border border-borderClr/50">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </div>
          <span className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Live Sync</span>
        </div>
      </div>
    </div>
  );
};
