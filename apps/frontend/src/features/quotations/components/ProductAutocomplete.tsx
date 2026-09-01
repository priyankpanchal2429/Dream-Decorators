'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Package, Search, ChevronDown, Loader2 } from 'lucide-react';
import { useInventory } from '@/features/inventory/api/inventory.api';

export interface ProductCatalogItem {
  id: string;
  name: string;
  category?: string;
  uom?: string;
  unitPrice?: number;
}

interface ProductAutocompleteProps {
  value: string;
  onChange: (val: string) => void;
  onSelectProduct: (product: ProductCatalogItem) => void;
}

export const ProductAutocomplete: React.FC<ProductAutocompleteProps> = ({
  value,
  onChange,
  onSelectProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch real inventory from database
  const { data: inventoryData, isLoading } = useInventory({
    search: value || undefined,
  });

  const productsList: ProductCatalogItem[] = (inventoryData?.products || []).map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    uom: p.unitOfMeasure,
    unitPrice: Number(p.sellingPrice) || 0,
  }));

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 340),
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollOrResize = () => updatePosition();
      window.addEventListener('scroll', handleScrollOrResize, true);
      window.addEventListener('resize', handleScrollOrResize);
      return () => {
        window.removeEventListener('scroll', handleScrollOrResize, true);
        window.removeEventListener('resize', handleScrollOrResize);
      };
    }
  }, [isOpen]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement)?.closest('.product-autocomplete-dropdown')
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dropdownMenu = isOpen && mounted ? (
    createPortal(
      <div
        className="product-autocomplete-dropdown fixed z-[99999] bg-white dark:bg-zinc-900 border border-borderClr shadow-2xl rounded-2xl overflow-hidden animate-fade-in"
        style={{
          top: `${coords.top - window.scrollY}px`,
          left: `${coords.left - window.scrollX}px`,
          width: `${coords.width}px`,
          maxHeight: '280px',
        }}
      >
        <div className="p-2.5 border-b border-borderClr/30 bg-hoverBg/60 rounded-t-2xl flex items-center justify-between text-[10px] font-bold text-txtSecondary uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5 text-primary" /> Inventory Catalog
          </span>
          <span className="text-primary font-semibold">Auto-fill details</span>
        </div>

        <div className="max-h-[220px] overflow-y-auto divide-y divide-borderClr/10 py-1">
          {isLoading ? (
            <div className="px-3 py-4 text-xs text-center text-txtSecondary flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              Searching catalog...
            </div>
          ) : productsList.length > 0 ? (
            productsList.map((prod) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => {
                  onChange(prod.name);
                  onSelectProduct(prod);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 text-left hover:bg-hoverBg/80 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="min-w-0 pr-2">
                  <p className="text-xs font-bold text-txtPrimary group-hover:text-primary transition-colors truncate">
                    {prod.name}
                  </p>
                  {prod.category && (
                    <p className="text-[10px] text-txtSecondary truncate">
                      {prod.category}
                    </p>
                  )}
                </div>
                {prod.unitPrice !== undefined && prod.unitPrice > 0 && (
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-primary">₹{prod.unitPrice.toLocaleString('en-IN')}</p>
                    {prod.uom && (
                      <p className="text-[9px] font-bold text-txtSecondary uppercase">Per {prod.uom}</p>
                    )}
                  </div>
                )}
              </button>
            ))
          ) : (
            <div className="px-3 py-3 text-xs text-center text-txtSecondary font-medium">
              No matching inventory items. You can type any custom product name.
            </div>
          )}
        </div>
      </div>,
      document.body
    )
  ) : null;

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type or select product..."
          value={value}
          onFocus={() => {
            updatePosition();
            setIsOpen(true);
          }}
          onChange={(e) => {
            onChange(e.target.value);
            updatePosition();
            setIsOpen(true);
          }}
          className="w-full h-10 pl-3 pr-8 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-bold transition-all"
        />
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-txtSecondary pointer-events-none" />
      </div>

      {dropdownMenu}
    </div>
  );
};
