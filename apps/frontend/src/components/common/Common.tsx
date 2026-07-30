import React, { useState } from 'react';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange }) => (
  <div className="flex items-center gap-2 border-b border-borderClr pb-px">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => onChange(tab.id)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-xs font-bold border-b-2 transition-colors -mb-px select-none',
          activeTab === tab.id
            ? 'border-primary text-primary'
            : 'border-transparent text-txtSecondary hover:text-txtPrimary'
        )}
      >
        <span>{tab.label}</span>
        {tab.count !== undefined && (
          <span className={cn('px-1.5 py-0.5 rounded-full text-[10px]', activeTab === tab.id ? 'bg-primary/10 text-primary' : 'bg-hoverBg text-txtSecondary')}>
            {tab.count}
          </span>
        )}
      </button>
    ))}
  </div>
);

export const Avatar: React.FC<{ name: string; size?: 'sm' | 'md' | 'lg' }> = ({ name, size = 'md' }) => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const sizes = {
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm',
  };

  return (
    <div className={cn('rounded-full bg-primary text-white font-extrabold flex items-center justify-center shrink-0 shadow-xs', sizes[size])}>
      {initials}
    </div>
  );
};
