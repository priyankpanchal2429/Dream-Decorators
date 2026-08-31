import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface FinancialYearItem {
  id: string;
  label: string;
  shortCode: string;
  startDate: string;
  endDate: string;
  status: 'CURRENT' | 'CLOSED' | 'AUDITED';
  isCurrent?: boolean;
}

export const FINANCIAL_YEARS: FinancialYearItem[] = [
  {
    id: 'FY2026-27',
    label: 'FY 2026-27',
    shortCode: '26-27',
    startDate: '01 Apr 2026',
    endDate: '31 Mar 2027',
    status: 'CURRENT',
    isCurrent: true,
  },
  {
    id: 'FY2025-26',
    label: 'FY 2025-26',
    shortCode: '25-26',
    startDate: '01 Apr 2025',
    endDate: '31 Mar 2026',
    status: 'CLOSED',
    isCurrent: false,
  },
  {
    id: 'FY2024-25',
    label: 'FY 2024-25',
    shortCode: '24-25',
    startDate: '01 Apr 2024',
    endDate: '31 Mar 2025',
    status: 'AUDITED',
    isCurrent: false,
  },
];

interface FinancialYearState {
  activeFYId: string;
  activeFY: FinancialYearItem;
  availableFYs: FinancialYearItem[];
  setFinancialYear: (id: string) => void;
}

export const useFinancialYearStore = create<FinancialYearState>()(
  persist(
    (set) => ({
      activeFYId: 'FY2026-27',
      activeFY: FINANCIAL_YEARS[0],
      availableFYs: FINANCIAL_YEARS,
      setFinancialYear: (id: string) => {
        const found = FINANCIAL_YEARS.find((fy) => fy.id === id) || FINANCIAL_YEARS[0];
        set({
          activeFYId: found.id,
          activeFY: found,
        });
      },
    }),
    {
      name: 'dream_decorators_fy_storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
