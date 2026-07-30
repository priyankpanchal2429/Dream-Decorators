import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  /** Must be called once on client mount to sync with localStorage + DOM */
  initTheme: () => void;
}

/**
 * Updates localStorage.
 */
function applyTheme(mode: ThemeMode) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('dd-theme', mode);
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'light',

  setTheme: (mode) => {
    applyTheme(mode);
    set({ theme: mode });
  },

  initTheme: () => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem('dd-theme') as ThemeMode | null;
    const mode = stored || 'light';
    applyTheme(mode);
    set({ theme: mode });
  },
}));
