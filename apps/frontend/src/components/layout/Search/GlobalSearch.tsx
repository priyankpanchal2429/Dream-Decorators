'use client';

import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Command, X } from 'lucide-react';

export const GlobalSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-between w-64 px-3 py-2 text-xs rounded-lg border border-borderClr bg-gray-50 text-txtSecondary hover:bg-gray-100 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <SearchIcon className="h-4 w-4 text-txtSecondary" />
          <span>Search...</span>
        </div>
        <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-medium text-txtSecondary bg-white rounded border border-borderClr">
          <Command className="h-3 w-3" />K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-neutral-950/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-xl rounded-xl bg-cardBg border border-borderClr shadow-xl overflow-hidden">
            <div className="flex items-center px-4 border-b border-borderClr">
              <SearchIcon className="h-4 w-4 text-txtSecondary mr-3" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type to search invoices, products, customers..."
                className="w-full py-3 text-sm bg-transparent border-none text-txtPrimary placeholder:text-txtSecondary focus:outline-none"
              />
              <button onClick={() => setIsOpen(false)} className="text-txtSecondary hover:text-txtPrimary">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 text-xs text-txtSecondary text-center">
              {query ? `Searching for "${query}"...` : 'No recent searches'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
