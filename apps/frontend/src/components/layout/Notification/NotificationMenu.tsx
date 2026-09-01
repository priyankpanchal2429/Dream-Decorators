'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, Check, Trash2 } from 'lucide-react';
import { useNotificationStore } from '@/lib/notification.store';
import { cn } from '@/utils/cn';

export const NotificationMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { notifications, markAsRead, markAllAsRead, clearAll } = useNotificationStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-danger shrink-0 mt-0.5" />;
      default:
        return <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />;
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative p-2 rounded-xl text-txtSecondary hover:bg-hoverBg hover:text-txtPrimary transition-colors focus:outline-none cursor-pointer"
        title="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-danger text-[9px] font-black text-white items-center justify-center"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-cardBg border border-borderClr shadow-2xl p-4 z-[100] animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-borderClr/40">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-txtPrimary">Notifications</span>
              {unreadCount > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-extrabold">
                  {unreadCount} New
                </span>
              ) : (
                <span className="text-[10px] text-txtSecondary font-medium">All caught up</span>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="flex items-center gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline cursor-pointer"
                  >
                    <Check className="h-3 w-3" />
                    Mark all read
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="flex items-center gap-1 text-[10px] font-bold text-txtSecondary hover:text-danger cursor-pointer transition-colors"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear
                </button>
              </div>
            )}
          </div>

          <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-txtSecondary text-xs">
                No notifications right now
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={cn(
                    'flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer border',
                    n.read
                      ? 'bg-hoverBg/20 border-transparent opacity-75'
                      : 'bg-hoverBg/60 border-borderClr/40 shadow-sm'
                  )}
                >
                  {getIcon(n.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={cn('text-xs font-bold', n.read ? 'text-txtSecondary' : 'text-txtPrimary')}>
                        {n.title}
                      </p>
                      <span className="text-[9px] text-txtSecondary font-medium">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-txtSecondary mt-0.5 line-clamp-2 leading-relaxed">
                      {n.message}
                    </p>
                  </div>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1" />}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
