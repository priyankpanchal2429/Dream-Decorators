'use client';

import React from 'react';
import { CloudDrizzle, Calendar } from 'lucide-react';
import { useAuthStore } from '@/lib/auth.store';

interface DashboardHeaderProps {
  userName?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName }) => {
  const { user } = useAuthStore();
  const displayName = userName || user?.name || user?.username || 'Priyank';

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(new Date());

  return (
    <div className="flex items-center gap-5 flex-wrap mb-12 md:mb-14 pt-4">
      {/* Clean Regular-Font Heading (Enlarged) */}
      <h1 className="text-4xl md:text-[46px] lg:text-[52px] font-normal text-txtPrimary tracking-tight leading-none">
        Welcome back, {displayName}
      </h1>

      {/* Pill Badge: Weather & Date placed directly next to text */}
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-cardBg border border-borderClr shadow-2xs backdrop-blur-md">
        {/* Weather */}
        <div className="flex items-center gap-2">
          <CloudDrizzle className="w-4 h-4 text-blue-500 shrink-0" />
          <span className="text-xs font-medium text-txtSecondary">
            Surat 30°C Drizzle
          </span>
        </div>

        {/* Vertical Separator */}
        <span className="h-3.5 w-px bg-borderClr/70" />

        {/* Date */}
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-txtSecondary shrink-0" />
          <span className="text-xs font-medium text-txtSecondary">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
