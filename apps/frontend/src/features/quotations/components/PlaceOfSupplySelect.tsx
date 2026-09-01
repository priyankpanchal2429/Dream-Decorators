'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check, Search, X } from 'lucide-react';
import { INDIAN_GST_STATE_CODES } from '../constants/gstStateCodes';

interface PlaceOfSupplySelectProps {
  value: string;
  onChange: (val: string) => void;
}

export const PlaceOfSupplySelect: React.FC<PlaceOfSupplySelectProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Click outside to dismiss dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter 38 GST State Codes by search query
  const filteredStates = INDIAN_GST_STATE_CODES.filter((st) =>
    st.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedState = INDIAN_GST_STATE_CODES.find((st) => st.label === value);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-9 pl-9 pr-3 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-left text-txtPrimary focus:outline-none focus:border-primary/50 transition-all flex items-center justify-between cursor-pointer"
      >
        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-txtSecondary" />
        
        <span className={selectedState ? 'font-bold text-txtPrimary truncate' : 'text-txtSecondary/70 truncate'}>
          {selectedState ? selectedState.label : 'Select Place of Supply (State Code)'}
        </span>

        <ChevronDown className={`h-3.5 w-3.5 text-txtSecondary shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu (Scrollable showing 8 items at a time max-h-[260px]) */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-[100] bg-white dark:bg-zinc-900 border border-borderClr shadow-2xl rounded-2xl overflow-hidden animate-fade-in">
          {/* Search Input Bar */}
          <div className="p-2 border-b border-borderClr/30 bg-hoverBg/40 rounded-t-2xl flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-txtSecondary shrink-0 ml-1" />
            <input
              type="text"
              autoFocus
              placeholder="Search state name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs bg-transparent text-txtPrimary placeholder:text-txtSecondary/60 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-0.5 text-txtSecondary hover:text-txtPrimary"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Scrollable Items Container (max-h-[260px] displays exactly ~8 items before scrolling) */}
          <div className="max-h-[260px] overflow-y-auto divide-y divide-borderClr/10 py-1">
            {filteredStates.length > 0 ? (
              filteredStates.map((st) => {
                const isSelected = st.label === value;
                return (
                  <button
                    key={st.code}
                    type="button"
                    onClick={() => {
                      onChange(st.label);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full px-3 py-2 text-xs text-left flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'hover:bg-hoverBg/60 text-txtPrimary font-medium'
                    }`}
                  >
                    <span>{st.label}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-primary shrink-0 ml-2" />}
                  </button>
                );
              })
            ) : (
              <div className="px-3 py-4 text-center text-xs text-txtSecondary font-medium">
                No matching state codes found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
