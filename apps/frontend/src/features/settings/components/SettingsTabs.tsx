'use client';

import React from 'react';
import { Building2, CreditCard, FileText } from 'lucide-react';
import { SettingsTabType, TabItem } from '../types';
import { settingsTabs } from '../constants';

interface SettingsTabsProps {
  activeTab: SettingsTabType;
  onSelectTab: (tab: SettingsTabType) => void;
}

export const SettingsTabs: React.FC<SettingsTabsProps> = ({ activeTab, onSelectTab }) => {
  const getIcon = (iconName: TabItem['iconName']) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="h-4 w-4 shrink-0" />;
      case 'CreditCard':
        return <CreditCard className="h-4 w-4 shrink-0" />;
      case 'FileText':
        return <FileText className="h-4 w-4 shrink-0" />;
    }
  };

  return (
    <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/90 dark:border-zinc-800 shadow-xs overflow-x-auto">
      {settingsTabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer shrink-0 ${
              isActive
                ? 'bg-primary text-white shadow-md shadow-primary/25 scale-[1.01]'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800/60'
            }`}
          >
            {getIcon(tab.iconName)}
            <div className="flex flex-col text-left">
              <span className="leading-tight">{tab.label}</span>
              <span
                className={`text-[10px] font-normal leading-none mt-0.5 ${
                  isActive ? 'text-white/85' : 'text-slate-400 dark:text-zinc-500'
                }`}
              >
                {tab.description}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
