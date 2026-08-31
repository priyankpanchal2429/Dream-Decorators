'use client';

import React, { useEffect } from 'react';
import '@/styles/globals.css';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Fatal Root Application Error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 antialiased font-sans">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/90 border border-red-500/20 shadow-2xl space-y-6 text-center backdrop-blur-xl">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center">
            <AlertOctagon className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Application Error
            </h1>
            <p className="text-xs text-slate-400">
              A critical error prevented Dream Decorators from loading properly. Please refresh the page to reload the application.
            </p>
          </div>

          {error?.digest && (
            <div className="inline-block px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-400">
              Code: <span className="text-slate-200 font-bold">{error.digest}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
