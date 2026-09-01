'use client';

import React from 'react';
import { feetInchesToInches } from '../utils/curtainCalculator';

interface FeetInchesInputProps {
  label?: string;
  feet: number;
  inches: number;
  onFeetChange: (val: number) => void;
  onInchesChange: (val: number) => void;
  hasError?: boolean;
}

export const FeetInchesInput: React.FC<FeetInchesInputProps> = ({
  label,
  feet,
  inches,
  onFeetChange,
  onInchesChange,
  hasError,
}) => {
  const totalInches = feetInchesToInches(feet, inches);

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between text-[10px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
          <span>{label}</span>
          <span className="text-primary font-bold">({totalInches}")</span>
        </div>
      )}
      <div
        className={`flex items-center gap-1 h-10 px-1 rounded-xl bg-hoverBg/60 border ${
          hasError ? 'border-danger' : 'border-borderClr/30'
        } focus-within:border-primary/50 transition-all`}
      >
        {/* Feet Input */}
        <div className="flex-1 h-8 flex items-center gap-1 bg-cardBg/80 px-2 rounded-lg border border-borderClr/20">
          <input
            type="number"
            min={0}
            placeholder="0"
            value={feet || ''}
            onChange={(e) => onFeetChange(e.target.value === '' ? 0 : Math.max(0, Number(e.target.value)))}
            className="w-full text-xs font-bold text-txtPrimary text-center bg-transparent focus:outline-none"
          />
          <span className="text-[10px] font-extrabold text-txtSecondary uppercase shrink-0">ft</span>
        </div>

        {/* Inches Input */}
        <div className="flex-1 h-8 flex items-center gap-1 bg-cardBg/80 px-2 rounded-lg border border-borderClr/20">
          <input
            type="number"
            min={0}
            max={11}
            placeholder="0"
            value={inches || ''}
            onChange={(e) => {
              const val = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
              onInchesChange(val);
            }}
            className="w-full text-xs font-bold text-txtPrimary text-center bg-transparent focus:outline-none"
          />
          <span className="text-[10px] font-extrabold text-txtSecondary uppercase shrink-0">in</span>
        </div>
      </div>
    </div>
  );
};
