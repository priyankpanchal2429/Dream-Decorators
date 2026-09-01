'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Landmark,
  Moon,
} from 'lucide-react';
import { cn } from '@/utils/cn';

interface HolidayItem {
  name: string;
  type: 'PUBLIC' | 'BANK';
  day: number;
  dateStr: string;
  icon: React.ReactNode;
  badgeBg: string;
  badgeText: string;
}

export const DashboardCalendarWidget: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = monthNames[month];

  // Specific Holidays for demo / real calendar
  const holidays: HolidayItem[] = [
    {
      name: 'Ganesh Chaturthi',
      type: 'PUBLIC',
      day: 5,
      dateStr: 'Sep 5',
      icon: <Sparkles className="h-3 w-3 text-amber-500" />,
      badgeBg: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
      badgeText: 'PUBLIC',
    },
    {
      name: '2nd Saturday Bank Hol...',
      type: 'BANK',
      day: 12,
      dateStr: 'Sep 12',
      icon: <Landmark className="h-3 w-3 text-rose-500" />,
      badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
      badgeText: 'BANK',
    },
    {
      name: 'Eid-e-Milad',
      type: 'PUBLIC',
      day: 16,
      dateStr: 'Sep 16',
      icon: <Moon className="h-3 w-3 text-emerald-500" />,
      badgeBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
      badgeText: 'PUBLIC',
    },
    {
      name: '4th Saturday Bank Hol...',
      type: 'BANK',
      day: 26,
      dateStr: 'Sep 26',
      icon: <Landmark className="h-3 w-3 text-rose-500" />,
      badgeBg: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
      badgeText: 'BANK',
    },
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Calendar matrix calculation
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun
  const totalDays = new Date(year, month + 1, 0).getDate();

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    daysArray.push(d);
  }

  const todayDate = new Date();
  const isCurrentMonth = todayDate.getFullYear() === year && todayDate.getMonth() === month;
  const currentDayNumber = isCurrentMonth ? todayDate.getDate() : 1;

  return (
    <div className="glass-panel p-5 rounded-3xl flex flex-col justify-between h-full space-y-4">
      {/* Top Controls: < Month Year > | Today | Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-borderClr/30">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-lg text-txtSecondary hover:bg-hoverBg hover:text-txtPrimary transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-black text-txtPrimary tracking-tight">
            {monthName} {year}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-lg text-txtSecondary hover:bg-hoverBg hover:text-txtPrimary transition-colors cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={handleToday}
            className="ml-1 px-2.5 py-0.5 rounded-full bg-hoverBg border border-borderClr/50 text-[10px] font-bold text-txtSecondary hover:text-txtPrimary hover:border-primary/40 transition-all cursor-pointer"
          >
            Today
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2.5 text-[10px] font-bold">
          <span className="flex items-center gap-1 text-amber-500">
            <span className="h-2 w-2 rounded-full bg-amber-400"></span> Public
          </span>
          <span className="flex items-center gap-1 text-rose-500">
            <span className="h-2 w-2 rounded-full bg-rose-400"></span> Bank
          </span>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-1.5">
        {/* Day of week headers */}
        <div className="grid grid-cols-7 text-center text-[10px] font-extrabold text-txtSecondary/70 uppercase tracking-wider">
          <span>SU</span>
          <span>MO</span>
          <span>TU</span>
          <span>WE</span>
          <span>TH</span>
          <span>FR</span>
          <span>SA</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-center text-xs font-bold">
          {daysArray.map((day, idx) => {
            if (!day) {
              return <div key={`empty-${idx}`} className="h-7 w-7" />;
            }

            const isToday = day === currentDayNumber;
            const holiday = holidays.find((h) => h.day === day);

            let dayStyle = 'text-txtPrimary hover:bg-hoverBg/60';
            if (isToday) {
              dayStyle = 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-md scale-105';
            } else if (holiday?.type === 'PUBLIC') {
              dayStyle = 'bg-amber-400/20 text-amber-700 dark:text-amber-300 border border-amber-400/40';
            } else if (holiday?.type === 'BANK') {
              dayStyle = 'bg-rose-400/20 text-rose-700 dark:text-rose-300 border border-rose-400/40';
            }

            return (
              <div key={`day-${day}`} className="flex items-center justify-center">
                <span
                  className={cn(
                    'h-7 w-7 rounded-full flex items-center justify-center transition-all cursor-pointer text-[11px]',
                    dayStyle
                  )}
                  title={holiday ? `${holiday.name} (${holiday.type})` : undefined}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Holidays Section */}
      <div className="pt-2 border-t border-borderClr/30 space-y-2">
        <p className="text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">
          Public & Bank Holidays
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {holidays.slice(0, 3).map((hol, idx) => (
            <div
              key={idx}
              className="p-2 rounded-2xl bg-hoverBg/50 border border-borderClr/40 flex flex-col justify-between gap-1 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <div className="p-1 rounded-lg bg-cardBg border border-borderClr/40">
                  {hol.icon}
                </div>
                <span
                  className={cn(
                    'text-[8px] font-black px-1.5 py-0.5 rounded-md border',
                    hol.badgeBg
                  )}
                >
                  {hol.badgeText}
                </span>
              </div>
              <div>
                <p className="text-[10.5px] font-bold text-txtPrimary truncate" title={hol.name}>
                  {hol.name}
                </p>
                <span className="text-[9px] font-semibold text-txtSecondary">{hol.dateStr}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
