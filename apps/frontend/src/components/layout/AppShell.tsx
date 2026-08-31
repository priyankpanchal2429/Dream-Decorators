'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from './Sidebar/Sidebar';
import { Topbar } from './Topbar/Topbar';
import { PageContainer } from './PageContainer/PageContainer';
import { NotificationContainer } from '../ui/Notification';
import { pageTransitionVariants } from '@/config/animations';
import { useAuthStore } from '@/lib/auth.store';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Client-side auth protection
  useEffect(() => {
    if (!isHydrated) return;

    if (!isAuthenticated && pathname !== '/login') {
      router.push('/login');
    } else if (isAuthenticated && pathname === '/login') {
      router.push('/');
    }
  }, [isAuthenticated, pathname, isHydrated, router]);

  // If on login route, render standalone isolated container
  if (pathname === '/login') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
        {children}
        <NotificationContainer />
      </div>
    );
  }

  // Prevent flash of protected UI before client auth state rehydrates
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-appBg">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-appBg text-txtPrimary font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-200">
        <Topbar onToggleMobileSidebar={() => setIsMobileOpen(true)} />
        <main className="flex-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              variants={pageTransitionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <PageContainer>{children}</PageContainer>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Global Notification Toast Portal */}
      <NotificationContainer />
    </div>
  );
};
