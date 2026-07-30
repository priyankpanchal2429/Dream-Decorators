'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from './theme.store';
import { Tooltip } from '@/components/ui/Tooltip';
import { cn } from '@/utils/cn';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="flex items-center bg-tableHeaderBg p-0.5 rounded-lg border border-borderClr">
      <Tooltip content="Light Mode">
        <button
          onClick={() => setTheme('light')}
          aria-label="Light Mode"
          className={cn(
            'p-1.5 rounded-md transition-all duration-150',
            theme === 'light'
              ? 'bg-cardBg text-primary shadow-xs font-bold'
              : 'text-txtSecondary hover:text-txtPrimary'
          )}
        >
          <Sun className="h-4 w-4" />
        </button>
      </Tooltip>
      <Tooltip content="Dark Mode">
        <button
          onClick={() => setTheme('dark')}
          aria-label="Dark Mode"
          className={cn(
            'p-1.5 rounded-md transition-all duration-150',
            theme === 'dark'
              ? 'bg-cardBg text-primary shadow-xs font-bold'
              : 'text-txtSecondary hover:text-txtPrimary'
          )}
        >
          <Moon className="h-4 w-4" />
        </button>
      </Tooltip>
    </div>
  );
};
