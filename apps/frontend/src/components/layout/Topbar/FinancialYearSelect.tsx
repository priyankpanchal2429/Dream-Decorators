'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, Check, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useFinancialYearStore, FinancialYearItem } from '@/lib/financial-year.store';
import { useToastStore } from '@/lib/toast.store';

export const FinancialYearSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeFY, availableFYs, setFinancialYear } = useFinancialYearStore();
  const { addToast } = useToastStore();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (fy: FinancialYearItem) => {
    if (fy.id === activeFY.id) {
      setIsOpen(false);
      return;
    }

    setFinancialYear(fy.id);
    setIsOpen(false);

    addToast({
      type: 'info',
      title: 'Financial Year Changed',
      message: `Active period switched to ${fy.label} (${fy.startDate} - ${fy.endDate}).`,
    });
  };

  const getStatusBadge = (status: FinancialYearItem['status']) => {
    switch (status) {
      case 'CURRENT':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Current
          </span>
        );
      case 'CLOSED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
            <Lock className="h-2.5 w-2.5" />
            Closed
          </span>
        );
      case 'AUDITED':
        return (
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 flex items-center gap-1">
            <CheckCircle2 className="h-2.5 w-2.5" />
            Audited
          </span>
        );
    }
  };

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Trigger Button Matching Design */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-borderClr/60 bg-hoverBg/40 hover:bg-hoverBg/80 hover:border-primary/40 text-txtPrimary font-bold text-xs shadow-xs transition-all cursor-pointer select-none group"
      >
        <Calendar className="h-4 w-4 text-primary shrink-0 transition-transform group-hover:scale-110" />
        <span className="tracking-tight">{activeFY.label}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-txtSecondary transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-primary' : ''
          }`}
        />
      </button>

      {/* Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl glass-panel border border-borderClr/50 bg-cardBg shadow-2xl p-2 z-[100] backdrop-blur-xl focus:outline-none"
            role="listbox"
            tabIndex={-1}
          >
            <div className="px-3 py-2 border-b border-borderClr/30">
              <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">
                Select Financial Year (FY)
              </p>
              <p className="text-[11px] text-txtSecondary mt-0.5">
                Affects invoices, quotations, and reports ledger
              </p>
            </div>

            <div className="py-1 space-y-1">
              {availableFYs.map((fy) => {
                const isSelected = fy.id === activeFY.id;
                return (
                  <button
                    key={fy.id}
                    type="button"
                    onClick={() => handleSelect(fy)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-primary/10 border border-primary/30 text-txtPrimary font-bold shadow-xs'
                        : 'hover:bg-hoverBg/70 text-txtSecondary hover:text-txtPrimary'
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-txtPrimary">{fy.label}</span>
                        {getStatusBadge(fy.status)}
                      </div>
                      <p className="text-[10px] text-txtSecondary font-medium">
                        {fy.startDate} — {fy.endDate}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="p-1 rounded-full bg-primary text-white shrink-0 shadow-xs">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-1 pt-2 border-t border-borderClr/30 px-3 py-1 flex items-center justify-between text-[10px] text-txtSecondary">
              <span className="flex items-center gap-1 font-medium">
                <AlertCircle className="h-3 w-3 text-primary" /> Indian FY Period (Apr–Mar)
              </span>
              <span className="font-mono font-bold text-txtPrimary">v1.0</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
