'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Package, Search, Check, ChevronDown } from 'lucide-react';

export interface ProductCatalogItem {
  id: string;
  name: string;
  category: string;
  hsnCode: string;
  uom: string;
  unitPrice: number;
}

export const DEFAULT_PRODUCT_CATALOG: ProductCatalogItem[] = [
  { id: 'cat-1', name: 'Burma Teakwood Planks (10ft x 4in)', category: 'Teakwood', hsnCode: '44071000', uom: 'MTR', unitPrice: 1850 },
  { id: 'cat-2', name: 'Italian Royal Blue Velvet Fabric', category: 'Fabrics', hsnCode: '54075200', uom: 'MTR', unitPrice: 838 },
  { id: 'cat-3', name: 'Premium Sheer Fabric (White Silk)', category: 'Fabrics', hsnCode: '54075200', uom: 'MTR', unitPrice: 298 },
  { id: 'cat-4', name: 'Statuario White Italian Marble Slab', category: 'Marble', hsnCode: '68022100', uom: 'SQFT', unitPrice: 650 },
  { id: 'cat-5', name: 'G.Floor Fabric Zebra Blind', category: 'Blinds', hsnCode: '63039200', uom: 'SQFT', unitPrice: 240 },
  { id: 'cat-6', name: 'Sofa Fabric Velvet Roll (Navy)', category: 'Fabrics', hsnCode: '54075200', uom: 'MTR', unitPrice: 950 },
  { id: 'cat-7', name: 'Antique Brass Soft-close Hinges (Pair)', category: 'Hardware', hsnCode: '83021010', uom: 'SET', unitPrice: 890 },
  { id: 'cat-8', name: 'Wallpaper Adhesive Glue 5kg', category: 'Wallpapers', hsnCode: '35069190', uom: 'BOX', unitPrice: 1200 },
  { id: 'cat-9', name: 'Memory Foam Pillow Pair', category: 'Mattresses', hsnCode: '94049090', uom: 'SET', unitPrice: 2400 },
  { id: 'cat-10', name: 'Curtain Stitching Work', category: 'Services', hsnCode: '9988', uom: 'PCS', unitPrice: 130 },
  { id: 'cat-11', name: 'Heavy Duty Aluminum Channel Track', category: 'Hardware', hsnCode: '76109090', uom: 'PCS', unitPrice: 130 },
  { id: 'cat-12', name: 'Curtain Installation & Feeting', category: 'Services', hsnCode: '9954', uom: 'PCS', unitPrice: 250 },
  { id: 'cat-13', name: 'G.Floor Bed Back Cushioning Work', category: 'Furniture', hsnCode: '94035090', uom: 'SQFT', unitPrice: 300 },
  { id: 'cat-14', name: 'Bed Profile Premium Leatherette', category: 'Leather', hsnCode: '41151000', uom: 'MTR', unitPrice: 992 },
  { id: 'cat-15', name: 'Bed Back Upholstery Leatherette', category: 'Leather', hsnCode: '41151000', uom: 'MTR', unitPrice: 962 },
];

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = DEFAULT_PRODUCT_CATALOG.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase()) ||
    item.category.toLowerCase().includes(value.toLowerCase()) ||
    item.hsnCode.includes(value)
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Type or select product..."
          value={value}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onChange(e.target.value);
            setIsOpen(true);
          }}
          className="w-full h-10 pl-3 pr-8 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-bold transition-all"
        />
        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-txtSecondary pointer-events-none" />
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-[120] bg-white dark:bg-zinc-900 border border-borderClr shadow-2xl rounded-2xl overflow-hidden animate-fade-in">
          <div className="p-2 border-b border-borderClr/30 bg-hoverBg/40 flex items-center justify-between text-[10px] font-bold text-txtSecondary uppercase tracking-wider">
            <span>Inventory Catalog</span>
            <span className="text-primary font-semibold">Auto-fill details</span>
          </div>

          <div className="max-h-[220px] overflow-y-auto divide-y divide-borderClr/10 py-1">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => {
                    onChange(prod.name);
                    onSelectProduct(prod);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-hoverBg/70 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="min-w-0 pr-2">
                    <p className="text-xs font-bold text-txtPrimary group-hover:text-primary transition-colors truncate">
                      {prod.name}
                    </p>
                    <p className="text-[10px] text-txtSecondary truncate">
                      {prod.category} • HSN: {prod.hsnCode || 'N/A'}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-black text-primary">₹{prod.unitPrice.toLocaleString('en-IN')}</p>
                    <p className="text-[9px] font-bold text-txtSecondary uppercase">Per {prod.uom}</p>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-3 py-3 text-xs text-center text-txtSecondary font-medium">
                No matching product found. You can type custom item name manually.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
