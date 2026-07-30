'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Users,
  Building2,
  Receipt,
  ShoppingBag,
  Package,
  CreditCard,
  Truck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Layers,
  X,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Tooltip } from '@/components/ui/Tooltip';

export interface SidebarProps {
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isMobileOpen, onCloseMobile }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { title: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" /> },
    { title: 'Quotation', href: '/quotations', icon: <FileText className="h-5 w-5" /> },
    { title: 'Customers', href: '/customers', icon: <Users className="h-5 w-5" /> },
    { title: 'Vendors', href: '/vendors', icon: <Building2 className="h-5 w-5" /> },
    { title: 'Sales Invoice', href: '/invoices', icon: <Receipt className="h-5 w-5" /> },
    { title: 'Purchase Invoice', href: '/purchases', icon: <ShoppingBag className="h-5 w-5" /> },
    { title: 'Inventory', href: '/inventory', icon: <Package className="h-5 w-5" /> },
    { title: 'Payments', href: '/payments', icon: <CreditCard className="h-5 w-5" /> },
    { title: 'Delivery Challan', href: '/delivery-challans', icon: <Truck className="h-5 w-5" /> },
    { title: 'Reports', href: '/reports', icon: <BarChart3 className="h-5 w-5" /> },
    { title: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-neutral-950/50 backdrop-blur-xs lg:hidden animate-fade-in"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 z-50 bg-cardBg border-r border-borderClr flex flex-col transition-all duration-200 ease-in-out select-none',
          isCollapsed ? 'w-20' : 'w-64',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand Header */}
        <div className="h-topbar px-4 flex items-center justify-between border-b border-borderClr">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="rounded-xl bg-primary p-2 text-white shrink-0 shadow-sm">
              <Layers className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold text-txtPrimary text-sm tracking-tight leading-none">
                  Dream Decorators
                </span>
                <span className="text-[10px] font-medium text-txtSecondary mt-1">ERP Business Platform</span>
              </div>
            )}
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-txtSecondary hover:bg-hoverBg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const content = (
              <Link
                key={idx}
                href={item.href}
                className={cn(
                  'flex items-center gap-3.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-txtSecondary hover:bg-hoverBg hover:text-txtPrimary'
                )}
              >
                <span className="shrink-0">{item.icon}</span>
                {!isCollapsed && <span className="truncate">{item.title}</span>}
              </Link>
            );

            return isCollapsed ? (
              <Tooltip key={idx} content={item.title} position="right">
                {content}
              </Tooltip>
            ) : (
              content
            );
          })}
        </nav>

        {/* Footer Collapse Toggle & Logout */}
        <div className="p-3 border-t border-borderClr space-y-1">
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="hidden lg:flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-txtSecondary hover:bg-hoverBg hover:text-txtPrimary transition-colors"
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5 shrink-0" /> : <ChevronLeft className="h-5 w-5 shrink-0" />}
            {!isCollapsed && <span>Collapse Menu</span>}
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-semibold text-danger hover:bg-danger/10 transition-colors">
            <LogOut className="h-5 w-5 shrink-0 text-danger" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
