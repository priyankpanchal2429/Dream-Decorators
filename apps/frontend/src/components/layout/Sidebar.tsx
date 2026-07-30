import React from 'react';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  Settings,
  FileText,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { cn } from '@/utils/cn';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
  isActive?: boolean;
}

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const items: NavItem[] = [
    { title: 'Dashboard', href: '#', icon: <LayoutDashboard className="h-4 w-4" />, isActive: true },
    { title: 'Products', href: '#', icon: <Package className="h-4 w-4" /> },
    { title: 'Customers', href: '#', icon: <Users className="h-4 w-4" /> },
    { title: 'Orders', href: '#', icon: <ShoppingCart className="h-4 w-4" />, badge: '12' },
    { title: 'Invoices', href: '#', icon: <FileText className="h-4 w-4" /> },
    { title: 'Settings', href: '#', icon: <Settings className="h-4 w-4" /> },
  ];

  return (
    <aside className={cn('w-64 border-r border-neutral-200 bg-white flex flex-col h-screen select-none', className)}>
      <div className="h-14 px-5 flex items-center gap-2.5 border-b border-neutral-200">
        <div className="rounded-md bg-neutral-900 p-1.5 text-white">
          <Layers className="h-4 w-4" />
        </div>
        <span className="font-bold text-neutral-900 text-sm tracking-tight">Dream Decorators</span>
      </div>

      <div className="flex-1 py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Navigation
        </div>
        {items.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            className={cn(
              'flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors',
              item.isActive
                ? 'bg-neutral-900 text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
            )}
          >
            <div className="flex items-center gap-2.5">
              {item.icon}
              <span>{item.title}</span>
            </div>
            {item.badge && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded text-[10px] font-semibold',
                  item.isActive ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {item.badge}
              </span>
            )}
          </a>
        ))}
      </div>

      <div className="p-3 border-t border-neutral-200">
        <div className="flex items-center justify-between px-3 py-2 rounded-md bg-neutral-50 border border-neutral-200">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-neutral-900">Admin User</span>
            <span className="text-[10px] text-neutral-500">admin@dreamdecorators.com</span>
          </div>
          <ChevronRight className="h-4 w-4 text-neutral-400" />
        </div>
      </div>
    </aside>
  );
};
