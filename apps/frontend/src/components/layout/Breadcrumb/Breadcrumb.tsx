import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-txtSecondary py-2 select-none">
      <a href="#" className="flex items-center gap-1 hover:text-txtPrimary transition-colors">
        <Home className="h-3.5 w-3.5" />
        <span>Dashboard</span>
      </a>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="h-3.5 w-3.5 text-gray-400 shrink-0" />
          {item.href ? (
            <a href={item.href} className="hover:text-txtPrimary transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="font-semibold text-txtPrimary">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
