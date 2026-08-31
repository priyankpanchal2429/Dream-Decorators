'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw, Home, ChevronDown, ChevronUp } from 'lucide-react';
import { pageHeaderVariants, springItemVariants } from '@/config/animations';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Log the error to console/analytics
    console.error('Unhandled Application Error caught by boundary:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="glass-panel max-w-xl w-full p-8 rounded-3xl border border-rose-500/20 shadow-2xl space-y-6 text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center">
          <AlertOctagon className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">
            Something went wrong
          </h1>
          <p className="text-xs text-txtSecondary max-w-md mx-auto">
            An unexpected error occurred while processing your request. You can attempt to reload this view or navigate back to the dashboard.
          </p>
        </div>

        {error?.digest && (
          <div className="inline-block px-3 py-1 rounded-full bg-hoverBg border border-borderClr/40 text-[11px] font-mono text-txtSecondary">
            Digest Code: <span className="text-txtPrimary font-bold">{error.digest}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtPrimary border border-borderClr/40 font-bold text-xs transition-all"
          >
            <Home className="h-4 w-4 text-txtSecondary" />
            Dashboard
          </Link>
        </div>

        {/* Optional Collapsible Technical Details */}
        <div className="pt-4 border-t border-borderClr/30 text-left">
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="flex items-center justify-between w-full text-xs font-semibold text-txtSecondary hover:text-txtPrimary transition-colors cursor-pointer"
          >
            <span>Technical Details</span>
            {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>

          {showDetails && (
            <motion.div
              variants={springItemVariants}
              initial="hidden"
              animate="show"
              className="mt-3 p-3.5 rounded-xl bg-hoverBg/70 border border-borderClr/40 font-mono text-[11px] text-rose-500 max-h-48 overflow-auto break-all"
            >
              <p className="font-bold">{error?.name || 'Error'}: {error?.message || 'Unknown error'}</p>
              {error?.stack && (
                <pre className="mt-2 text-[10px] text-txtSecondary whitespace-pre-wrap">
                  {error.stack}
                </pre>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
