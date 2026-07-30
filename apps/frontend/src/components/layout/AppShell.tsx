'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar/Sidebar';
import { Topbar } from './Topbar/Topbar';
import { PageContainer } from './PageContainer/PageContainer';
import { NotificationContainer } from '../ui/Notification';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-appBg text-txtPrimary font-sans antialiased">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} onCloseMobile={() => setIsMobileOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-200">
        <Topbar onToggleMobileSidebar={() => setIsMobileOpen(true)} />
        <main className="flex-1 py-6">
          <PageContainer>{children}</PageContainer>
        </main>
      </div>

      {/* Global Notification Toast Portal */}
      <NotificationContainer />
    </div>
  );
};
