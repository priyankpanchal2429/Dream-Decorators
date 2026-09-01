'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Scissors, Calculator, Check, AlertCircle, ArrowRight, Sparkles, Layers } from 'lucide-react';
import { CurtainItem, DiscountType } from '../types/curtain';
import { FeetInchesInput } from './FeetInchesInput';
import { calculateCurtainFabric, calculateCurtainPrice, validateCurtainItem } from '../utils/curtainCalculator';
import { QuotationItem } from '../types';

interface CurtainQuotationModuleProps {
  onImportToQuotation?: (quotationItems: QuotationItem[]) => void;
}

export const CurtainQuotationModule: React.FC<CurtainQuotationModuleProps> = ({
  onImportToQuotation,
}) => {
  // Preset Item Name suggestions
  const presetSuggestions = [
    'Living Room Main Curtain',
    'Living Room Sheer Fabric',
    'Master Bed Room Main Curtain',
    'Guest Room Sheer Curtain',
    'Dining Area Curtain',
  ];

  // Default Items State (Clean starter row)
  const [items, setItems] = useState<CurtainItem[]>([
    {
      id: 'c-1',
      itemName: '',
      width: { feet: 0, inches: 0 },
      height: { feet: 0, inches: 0 },
      totalWidthInches: 0,
      totalHeightInches: 0,
      fabricWidthsRequired: 0,
      calculatedMtr: 0,
      totalMtr: 0,
      perMtrPrice: 0,
      subtotal: 0,
      discountType: 'PERCENTAGE',
      discountValue: 0,
      discountAmount: 0,
      totalPrice: 0,
    },
  ]);

  // Recalculate item fields when dimensions, pricing, or discount change
  const updateCurtainItem = (id: string, updates: Partial<CurtainItem>) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id !== id) return item;

        const updatedItem = { ...item, ...updates };

        // 1. Calculate Fabric Meterage
        const fabric = calculateCurtainFabric(
          updatedItem.width.feet,
          updatedItem.width.inches,
          updatedItem.height.feet,
          updatedItem.height.inches
        );

        // 2. Calculate Pricing
        const pricing = calculateCurtainPrice(
          fabric.totalMtr,
          updatedItem.perMtrPrice,
          updatedItem.discountValue,
          updatedItem.discountType
        );

        // 3. Validation
        const err = validateCurtainItem(
          updatedItem.width.feet,
          updatedItem.width.inches,
          updatedItem.height.feet,
          updatedItem.height.inches,
          updatedItem.perMtrPrice,
          updatedItem.discountValue,
          updatedItem.discountType
        );

        return {
          ...updatedItem,
          totalWidthInches: fabric.totalWidthInches,
          totalHeightInches: fabric.totalHeightInches,
          fabricWidthsRequired: fabric.fabricWidthsRequired,
          calculatedMtr: fabric.calculatedMtr,
          totalMtr: fabric.totalMtr,
          subtotal: pricing.subtotal,
          discountAmount: pricing.discountAmount,
          totalPrice: pricing.totalPrice,
          validationError: err,
        };
      })
    );
  };

  // Add Item Row
  const handleAddItem = () => {
    const newItem: CurtainItem = {
      id: Date.now().toString(),
      itemName: '',
      width: { feet: 0, inches: 0 },
      height: { feet: 0, inches: 0 },
      totalWidthInches: 0,
      totalHeightInches: 0,
      fabricWidthsRequired: 0,
      calculatedMtr: 0,
      totalMtr: 0,
      perMtrPrice: 0,
      subtotal: 0,
      discountType: 'PERCENTAGE',
      discountValue: 0,
      discountAmount: 0,
      totalPrice: 0,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Remove Item Row
  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  // Aggregate Totals
  const { totalMeterage, totalAmount, totalDiscount, grandTotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        totalMeterage: acc.totalMeterage + item.totalMtr,
        totalAmount: acc.totalAmount + item.subtotal,
        totalDiscount: acc.totalDiscount + item.discountAmount,
        grandTotal: acc.grandTotal + item.totalPrice,
      }),
      { totalMeterage: 0, totalAmount: 0, totalDiscount: 0, grandTotal: 0 }
    );
  }, [items]);

  // Convert and export curtain items to standard quotation line items
  const handleImportToMainQuotation = () => {
    if (!onImportToQuotation) return;

    const quotationItems: QuotationItem[] = items.map((item) => ({
      id: item.id,
      description: item.itemName || 'Custom Pleated Curtain',
      itemNotes: `Window Size: ${item.width.feet}'${item.width.inches}"(W) × ${item.height.feet}'${item.height.inches}"(H) • ${item.fabricWidthsRequired} Pleated Widths (${item.totalMtr} MTR)`,
      quantity: item.totalMtr,
      uom: 'MTR',
      unitPrice: item.perMtrPrice,
      discount: item.discountAmount,
      taxPercent: 12,
      total: item.totalPrice,
    }));

    onImportToQuotation(quotationItems);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl space-y-5 border border-primary/20 shadow-lg">
      {/* Header with Title & Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-borderClr/30">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-white shadow-md shadow-primary/20">
            <Scissors className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-txtPrimary tracking-tight">Curtain Quotation Module</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onImportToQuotation && (
            <button
              type="button"
              onClick={handleImportToMainQuotation}
              className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-hover transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="h-4 w-4" />
              Sync to Main Quotation
            </button>
          )}

          <button
            type="button"
            onClick={handleAddItem}
            className="px-3.5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-xs flex items-center gap-1 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Curtain
          </button>
        </div>
      </div>

      {/* Rules Notice Badge */}
      <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-txtSecondary text-xs flex items-start gap-2 font-medium leading-relaxed">
        <Calculator className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-txtPrimary">Formula Rules Active:</span> Fabric Roll Width = 54", Pleated Finished Width = 20". Fabric Widths = <code className="text-primary font-mono font-bold">CEILING(Width / 20)</code>. Total MTR = <code className="text-primary font-mono font-bold">CEILING((Widths × Height) × 0.0254)</code>.
        </div>
      </div>

      {/* Interactive Curtain Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[950px] table-fixed">
          <thead>
            <tr className="bg-hoverBg/60 border-b border-borderClr/40 text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">
              <th className="px-2 py-3 text-center w-[3%]">#</th>
              <th className="px-3 py-3 text-left w-[26%]">ITEM NAME</th>
              <th className="px-2 py-3 text-center w-[15%]">WINDOW WIDTH</th>
              <th className="px-2 py-3 text-center w-[15%]">WINDOW HEIGHT</th>
              <th className="px-2 py-3 text-center w-[9%]">TOTAL MTR</th>
              <th className="px-2 py-3 text-right w-[11%]">PER MTR PRICE (₹)</th>
              <th className="px-2 py-3 text-right w-[11%]">DISCOUNT</th>
              <th className="px-2 py-3 text-right w-[10%]">
                <span className="text-xs font-black text-primary uppercase">TOTAL (₹)</span>
              </th>
              <th className="px-2 py-3 text-center w-[4%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderClr/20 text-xs">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                {/* # */}
                <td className="px-2 py-3 text-center font-bold text-txtSecondary align-top pt-3 text-[11px] w-[3%]">
                  {idx + 1}
                </td>

                {/* ITEM NAME + PRESET SUGGESTIONS */}
                <td className="px-3 py-3 space-y-1.5 w-[26%] align-top">
                  <input
                    type="text"
                    placeholder="e.g. Living Room Main Curtain"
                    value={item.itemName}
                    onChange={(e) => updateCurtainItem(item.id, { itemName: e.target.value })}
                    className="w-full h-10 px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-bold transition-all"
                  />
                  {/* Preset Pills */}
                  <div className="flex flex-wrap gap-1">
                    {presetSuggestions.slice(0, 3).map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => updateCurtainItem(item.id, { itemName: sug })}
                        className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-hoverBg/80 border border-borderClr/30 text-txtSecondary hover:text-primary transition-colors cursor-pointer"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                  {item.validationError && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-danger pt-0.5">
                      <AlertCircle className="h-3 w-3 shrink-0" />
                      <span>{item.validationError}</span>
                    </div>
                  )}
                </td>

                {/* WINDOW WIDTH (Feet / Inches) */}
                <td className="px-2 py-3 align-top w-[15%]">
                  <FeetInchesInput
                    feet={item.width.feet}
                    inches={item.width.inches}
                    onFeetChange={(ft) => updateCurtainItem(item.id, { width: { ...item.width, feet: ft } })}
                    onInchesChange={(inc) => updateCurtainItem(item.id, { width: { ...item.width, inches: inc } })}
                    hasError={item.totalWidthInches <= 0}
                  />
                  <div className="text-[10px] text-center font-bold text-txtSecondary mt-1">
                    {item.totalWidthInches}" ({item.fabricWidthsRequired} Widths)
                  </div>
                </td>

                {/* WINDOW HEIGHT (Feet / Inches) */}
                <td className="px-2 py-3 align-top w-[15%]">
                  <FeetInchesInput
                    feet={item.height.feet}
                    inches={item.height.inches}
                    onFeetChange={(ft) => updateCurtainItem(item.id, { height: { ...item.height, feet: ft } })}
                    onInchesChange={(inc) => updateCurtainItem(item.id, { height: { ...item.height, inches: inc } })}
                    hasError={item.totalHeightInches <= 0}
                  />
                  <div className="text-[10px] text-center font-bold text-txtSecondary mt-1">
                    {item.totalHeightInches}" Total Height
                  </div>
                </td>

                {/* TOTAL MTR (CEILING Whole Number Badge - Exact h-10 height) */}
                <td className="px-2 py-3 text-center align-top w-[9%]">
                  <div className="h-10 px-2 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center gap-1">
                    <span className="text-xs font-black text-primary">
                      {item.totalMtr} MTR
                    </span>
                  </div>
                  <div className="text-[9px] font-bold text-txtSecondary text-center mt-1">
                    ({item.calculatedMtr.toFixed(2)})
                  </div>
                </td>

                {/* PER MTR PRICE (₹) */}
                <td className="px-2 py-3 align-top w-[11%]">
                  <input
                    type="number"
                    min={0}
                    placeholder="450"
                    value={item.perMtrPrice || ''}
                    onChange={(e) => updateCurtainItem(item.id, { perMtrPrice: e.target.value === '' ? 0 : Number(e.target.value) })}
                    className="w-full h-10 px-3 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 transition-all"
                  />
                  <div className="text-[9px] text-right font-semibold text-txtSecondary mt-1">
                    Subtotal: ₹{item.subtotal.toLocaleString('en-IN')}
                  </div>
                </td>

                {/* DISCOUNT (Unified h-10 Group with Embedded Switcher) */}
                <td className="px-2 py-3 align-top w-[11%]">
                  <div className="flex items-center h-10 rounded-xl bg-hoverBg/60 border border-borderClr/30 overflow-hidden focus-within:border-primary/50 transition-all">
                    <div className="flex p-0.5 bg-cardBg/80 border-r border-borderClr/30 shrink-0">
                      <button
                        type="button"
                        onClick={() => updateCurtainItem(item.id, { discountType: 'PERCENTAGE' })}
                        className={`px-1.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${
                          item.discountType === 'PERCENTAGE'
                            ? 'bg-primary text-white shadow-xs'
                            : 'text-txtSecondary hover:text-txtPrimary'
                        }`}
                        title="Percentage Discount (%)"
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCurtainItem(item.id, { discountType: 'FIXED' })}
                        className={`px-1.5 py-1 text-[9px] font-bold rounded-md transition-all cursor-pointer ${
                          item.discountType === 'FIXED'
                            ? 'bg-primary text-white shadow-xs'
                            : 'text-txtSecondary hover:text-txtPrimary'
                        }`}
                        title="Flat Rupee Discount (₹)"
                      >
                        ₹
                      </button>
                    </div>
                    <input
                      type="number"
                      min={0}
                      placeholder="0"
                      value={item.discountValue || ''}
                      onChange={(e) => updateCurtainItem(item.id, { discountValue: e.target.value === '' ? 0 : Number(e.target.value) })}
                      className="w-full h-full px-2 text-xs text-right bg-transparent text-txtPrimary font-bold focus:outline-none"
                    />
                  </div>
                  {item.discountAmount > 0 && (
                    <div className="text-[9px] text-right font-bold text-emerald-500 mt-1">
                      -₹{item.discountAmount.toLocaleString('en-IN')}
                    </div>
                  )}
                </td>

                {/* TOTAL PRICE (₹) */}
                <td className="px-2 py-3 text-right align-top w-[10%]">
                  <div className="h-10 flex items-center justify-end font-black text-sm text-txtPrimary tracking-tight">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[9px] text-right text-txtSecondary font-medium mt-1">
                    Net line total
                  </div>
                </td>

                {/* ACTION (Trash - Exact h-10 size) */}
                <td className="px-2 py-3 text-center align-top w-[4%]">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={items.length <= 1}
                    className="h-10 w-10 mx-auto rounded-xl flex items-center justify-center text-txtSecondary hover:text-danger hover:bg-danger/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Remove curtain line"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Calculation Summary Footer Card */}
      <div className="p-4 rounded-2xl bg-hoverBg/40 border border-borderClr/30 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-txtSecondary font-medium">Curtain Lines:</span>
            <span className="ml-1.5 font-bold text-txtPrimary">{items.length}</span>
          </div>
          <div>
            <span className="text-txtSecondary font-medium">Total Fabric Required:</span>
            <span className="ml-1.5 font-black text-primary text-sm">{totalMeterage} MTR</span>
          </div>
          <div>
            <span className="text-txtSecondary font-medium">Gross Subtotal:</span>
            <span className="ml-1.5 font-bold text-txtPrimary">₹{totalAmount.toLocaleString('en-IN')}</span>
          </div>
          {totalDiscount > 0 && (
            <div>
              <span className="text-txtSecondary font-medium">Total Discount:</span>
              <span className="ml-1.5 font-bold text-emerald-500">-₹{totalDiscount.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-txtSecondary font-bold uppercase tracking-wider">Curtain Batch Total:</span>
          <span className="text-lg font-black text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};
