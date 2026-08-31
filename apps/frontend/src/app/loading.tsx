'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function RootLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-lg shadow-primary/10"
      >
        <div className="w-5 h-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </motion.div>
      <div className="space-y-1 text-center">
        <p className="text-xs font-bold text-txtPrimary tracking-wide">Loading workspace...</p>
        <p className="text-[10px] text-txtSecondary">Fetching latest ERP records</p>
      </div>
    </div>
  );
}
