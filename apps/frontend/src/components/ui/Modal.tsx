import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/40 p-4">
      <div className={cn('relative w-full max-w-lg rounded-lg bg-white p-6 border border-neutral-200 shadow-lg', className)}>
        <div className="flex items-start justify-between pb-3 border-b border-neutral-100">
          <div>
            {title && <h3 className="text-base font-semibold text-neutral-900">{title}</h3>}
            {description && <p className="text-xs text-neutral-500 mt-0.5">{description}</p>}
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="py-4">{children}</div>
        {footer && <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};
