'use client';

import { useEffect } from 'react';
import { useThemeStore } from './theme.store';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme, initTheme } = useThemeStore();

  // Initialize from localStorage on mount
  useEffect(() => {
    initTheme();
  }, [initTheme]);

  // Bulletproof dark mode class enforcer
  useEffect(() => {
    const root = document.documentElement;
    
    const enforceClass = () => {
      if (theme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    enforceClass();

    // Prevent Next.js hydration or client-side navigation from wiping the class
    const observer = new MutationObserver(() => {
      const hasDark = root.classList.contains('dark');
      if (theme === 'dark' && !hasDark) {
        root.classList.add('dark');
      } else if (theme === 'light' && hasDark) {
        root.classList.remove('dark');
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [theme]);

  return <>{children}</>;
};
