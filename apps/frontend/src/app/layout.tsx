import React from 'react';
import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ReactQueryProvider } from '@/lib/react-query';
import { ThemeProvider } from '@/components/layout/Theme/ThemeProvider';

export const metadata: Metadata = {
  title: 'Dream Decorators ERP',
  description: 'Enterprise Resource Planning system for Dream Decorators',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
