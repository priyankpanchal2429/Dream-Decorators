import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  removeNotification: (id: string) => void;
}

// ─── Persistence Helpers ────────────────────────────────────────────────────

const STORAGE_KEY = 'dd-notifications';

/** Clean initial state for production */
const SEED_NOTIFICATIONS: NotificationItem[] = [];

function loadFromStorage(): NotificationItem[] {
  if (typeof window === 'undefined') return SEED_NOTIFICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === null) return SEED_NOTIFICATIONS; // first visit — show seeds
    return JSON.parse(raw) as NotificationItem[];
  } catch {
    return SEED_NOTIFICATIONS;
  }
}

function saveToStorage(notifications: NotificationItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch {
    // Silently ignore storage quota errors
  }
}

// ─── Store ──────────────────────────────────────────────────────────────────

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: loadFromStorage(),

  addNotification: (item) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    set((state) => {
      const updated = [newNotif, ...state.notifications];
      saveToStorage(updated);
      return { notifications: updated };
    });
  },

  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      saveToStorage(updated);
      return { notifications: updated };
    }),

  markAllAsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      saveToStorage(updated);
      return { notifications: updated };
    }),

  clearAll: () => {
    saveToStorage([]);
    set({ notifications: [] });
  },

  removeNotification: (id) =>
    set((state) => {
      const updated = state.notifications.filter((n) => n.id !== id);
      saveToStorage(updated);
      return { notifications: updated };
    }),
}));
