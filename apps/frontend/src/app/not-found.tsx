'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import { pageHeaderVariants } from '@/config/animations';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="glass-panel max-w-lg w-full p-8 rounded-3xl border border-borderClr/40 shadow-2xl space-y-6 text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center">
          <FileQuestion className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-black text-primary tracking-tight">404</div>
          <h1 className="text-xl font-black text-txtPrimary tracking-tight">
            Page Not Found
          </h1>
          <p className="text-xs text-txtSecondary max-w-sm mx-auto">
            The page or resource you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtPrimary border border-borderClr/40 font-bold text-xs transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-txtSecondary" />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-lg shadow-primary/20 transition-all"
          >
            <Home className="h-4 w-4" />
            Return to Dashboard
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
