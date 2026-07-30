'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  className,
  maxWidth = 'max-w-xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Right Slide-Over Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10 pointer-events-none">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={cn(
                'pointer-events-auto w-screen glass-panel bg-cardBg border-l border-borderClr/40 shadow-2xl flex flex-col justify-between overflow-hidden',
                maxWidth,
                className
              )}
            >
              {/* Header */}
              {(title || description || icon) && (
                <div className="flex items-center justify-between px-6 py-4 border-b border-borderClr/30 bg-cardBg/90 backdrop-blur-md shrink-0">
                  <div className="flex items-center gap-3">
                    {icon && <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 text-primary">{icon}</div>}
                    <div>
                      {title && <h2 className="text-lg font-black text-txtPrimary tracking-tight">{title}</h2>}
                      {description && <p className="text-xs text-txtSecondary mt-0.5">{description}</p>}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">{children}</div>

              {/* Footer */}
              {footer && (
                <div className="px-6 py-4 border-t border-borderClr/30 bg-cardBg/95 backdrop-blur-md flex items-center justify-end gap-3 shrink-0">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
