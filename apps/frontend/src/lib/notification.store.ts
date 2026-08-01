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

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    {
      id: 'notif-1',
      title: 'Invoice INV-2026-001 Approved',
      message: 'Client Aarav Sharma cleared outstanding balance of ₹42,000.',
      timestamp: '10 mins ago',
      type: 'success',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Low Stock Alert',
      message: 'Teak Wood Chair Frame is below reorder level (8 units remaining).',
      timestamp: '25 mins ago',
      type: 'warning',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'New Vendor Registered',
      message: 'Royal Woodcrafts added to vendor directory.',
      timestamp: '1 hour ago',
      type: 'info',
      read: false,
    },
  ],

  addNotification: (item) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    set((state) => ({ notifications: [newNotif, ...state.notifications] }));
  },

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  clearAll: () => set({ notifications: [] }),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
