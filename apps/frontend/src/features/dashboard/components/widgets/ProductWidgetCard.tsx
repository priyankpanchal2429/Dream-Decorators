'use client';

import React from 'react';
import { ProductSummaryItem } from '../../types';
import { formatINR } from '../../constants';
import { cn } from '@/utils/cn';
import { ArrowRight, Package, TrendingUp, AlertCircle } from 'lucide-react';

type WidgetVariant = 'best-selling' | 'least-selling' | 'low-stock';

interface ProductWidgetCardProps {
  title: string;
  subtitle: string;
  items: ProductSummaryItem[];
  variant: WidgetVariant;
}

export function ProductWidgetCard({
  title,
  subtitle,
  items,
  variant,
}: ProductWidgetCardProps) {
  const displayItems = items.slice(0, 5);

  const getHeaderIcon = () => {
    if (variant === 'best-selling') return <TrendingUp className="h-4 w-4 text-primary" />;
    if (variant === 'low-stock') return <AlertCircle className="h-4 w-4 text-warning" />;
    return <Package className="h-4 w-4 text-txtSecondary" />;
  };

  return (
    <div className="glass-panel p-0 overflow-hidden flex flex-col h-[340px] rounded-3xl relative group">
      <div className="flex items-center justify-between px-6 pt-6 pb-4 relative z-10 border-b border-borderClr/30">
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-xl backdrop-blur-sm border shadow-sm",
            variant === 'best-selling' ? "bg-primary/10 border-primary/20" : 
            variant === 'low-stock' ? "bg-warning/10 border-warning/20" : "bg-cardBg border-white/10"
          )}>
            {getHeaderIcon()}
          </div>
          <div>
            <h3 className="text-sm font-bold text-txtPrimary">{title}</h3>
            {subtitle && <p className="text-[10px] font-medium text-txtSecondary mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <button 
          onClick={() => alert(`View All ${title} clicked!`)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-txtSecondary hover:text-primary hover:bg-primary/5 transition-colors border border-transparent hover:border-primary/10"
        >
          View All
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Table Header */}
      <div className="px-6 py-2.5 bg-hoverBg/30 flex items-center text-[9px] font-bold text-txtSecondary uppercase tracking-widest relative z-10">
        <div className="flex-1">Product</div>
        {variant !== 'low-stock' && (
          <>
            <div className="w-16 text-right">Qty</div>
            <div className="w-24 text-right">Revenue</div>
          </>
        )}
        {variant === 'low-stock' && (
          <>
            <div className="w-16 text-right">Stock</div>
            <div className="w-16 text-right">Reorder</div>
          </>
        )}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="flex flex-col p-2 gap-1">
          {displayItems.map((item) => (
            <div key={item.id} className="flex items-center px-4 py-3 rounded-xl hover:bg-hoverBg/60 transition-colors border border-transparent hover:border-borderClr/50 group/item cursor-pointer" onClick={() => alert(`Clicked on ${item.name}`)}>
              {/* Thumbnail */}
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center shrink-0 mr-3 border border-borderClr shadow-sm overflow-hidden">
                <Package className="h-4 w-4 text-txtSecondary opacity-60 group-hover/item:scale-110 transition-transform duration-300" />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0 pr-3">
                <p className="text-xs font-bold text-txtPrimary truncate mb-1 group-hover/item:text-primary transition-colors">{item.name}</p>
                <p className="text-[10px] text-txtSecondary truncate">{item.category}</p>
              </div>

              {/* Metrics */}
              {variant !== 'low-stock' && (
                <>
                  <div className="w-16 text-right">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-hoverBg border border-borderClr/50 text-[11px] font-bold text-txtPrimary">{item.quantitySold}</span>
                  </div>
                  <div className="w-24 text-right">
                    <span className="text-[11px] font-black text-txtPrimary">{formatINR(item.revenue)}</span>
                  </div>
                </>
              )}

              {variant === 'low-stock' && (
                <>
                  <div className="w-16 text-right">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-warning/10 border border-warning/20 text-[11px] font-bold text-warning">{item.currentStock}</span>
                  </div>
                  <div className="w-16 text-right">
                    <span className="text-[11px] font-bold text-txtSecondary">{item.reorderLevel}</span>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
