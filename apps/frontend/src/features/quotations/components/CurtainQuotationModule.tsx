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

  // Default Items State (pre-filled with user example for instant testing)
  const [items, setItems] = useState<CurtainItem[]>([
    {
      id: 'c-1',
      itemName: 'Living Room Main Curtain',
      width: { feet: 8, inches: 0 }, // 96 inches
      height: { feet: 4, inches: 0 }, // 48 inches
      totalWidthInches: 96,
      totalHeightInches: 48,
      fabricWidthsRequired: 5,
      calculatedMtr: 6.10,
      totalMtr: 7,
      perMtrPrice: 450,
      subtotal: 3150,
      discountType: 'PERCENTAGE',
      discountValue: 10,
      discountAmount: 315,
      totalPrice: 2835,
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
      width: { feet: 6, inches: 0 },
      height: { feet: 7, inches: 0 },
      totalWidthInches: 72,
      totalHeightInches: 84,
      fabricWidthsRequired: 4,
      calculatedMtr: 8.53,
      totalMtr: 9,
      perMtrPrice: 500,
      subtotal: 4500,
      discountType: 'PERCENTAGE',
      discountValue: 0,
      discountAmount: 0,
      totalPrice: 4500,
    };
    setItems((prev) => [...prev, newItem]);
  };

  // Remove Item Row
  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((it) => it.id !== id));
    }
  };

  // Summary Totals Math
  const summary = useMemo(() => {
    const totalItems = items.length;
    const totalMtrSum = items.reduce((acc, it) => acc + (it.totalMtr || 0), 0);
    const subtotalSum = items.reduce((acc, it) => acc + (it.subtotal || 0), 0);
    const discountSum = items.reduce((acc, it) => acc + (it.discountAmount || 0), 0);
    const grandTotal = items.reduce((acc, it) => acc + (it.totalPrice || 0), 0);

    return {
      totalItems,
      totalMtrSum,
      subtotalSum,
      discountSum,
      grandTotal,
    };
  }, [items]);

  // Convert Curtain Items to QuotationItems for main quotation builder
  const handleImportToMainQuotation = () => {
    if (!onImportToQuotation) return;

    const quotationItems: QuotationItem[] = items.map((cItem, idx) => ({
      id: `curtain-${Date.now()}-${idx}`,
      description: cItem.itemName || `Curtain Item #${idx + 1}`,
      itemNotes: `Window: ${cItem.width.feet}ft ${cItem.width.inches}in (${cItem.totalWidthInches}") x ${cItem.height.feet}ft ${cItem.height.inches}in (${cItem.totalHeightInches}") | Fabric Widths: ${cItem.fabricWidthsRequired} | Total MTR: ${cItem.totalMtr}`,
      hsnCode: '54075200',
      quantity: cItem.totalMtr,
      uom: 'MTR',
      unitPrice: cItem.perMtrPrice,
      discount: cItem.discountAmount,
      taxPercent: 0,
      total: cItem.totalPrice,
    }));

    onImportToQuotation(quotationItems);
    alert(`🎉 Successfully synced ${items.length} curtain fabric items (Total ${summary.totalMtrSum} MTR, ₹${summary.grandTotal.toLocaleString('en-IN')}) into your main quotation!`);
  };

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl space-y-5 border border-primary/20 bg-gradient-to-br from-cardBg via-cardBg to-primary/5 shadow-xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-borderClr/30">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary shadow-xs">
            <Scissors className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-primary text-white uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="h-3 w-3" /> Curtain Fabric Calculator
              </span>
              <span className="text-[10px] font-bold text-txtSecondary">
                Finished Pleat: 20" per Width
              </span>
            </div>
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
              <th className="px-2 py-3 text-center w-[16%]">WINDOW WIDTH</th>
              <th className="px-2 py-3 text-center w-[16%]">WINDOW HEIGHT</th>
              <th className="px-2 py-3 text-center w-[9%]">TOTAL MTR</th>
              <th className="px-2 py-3 text-right w-[11%]">PER MTR PRICE (₹)</th>
              <th className="px-2 py-3 text-right w-[10%]">DISCOUNT</th>
              <th className="px-2 py-3 text-right w-[12%]">
                <span className="text-xs font-black text-primary uppercase">TOTAL PRICE (₹)</span>
              </th>
              <th className="px-2 py-3 text-center w-[3%]"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderClr/20 text-xs">
            {items.map((item, idx) => (
              <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                {/* # */}
                <td className="px-2 py-3 text-center font-bold text-txtSecondary align-top pt-4 text-[11px] w-[3%]">
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
                <td className="px-2 py-3 align-top w-[16%]">
                  <FeetInchesInput
                    feet={item.width.feet}
                    inches={item.width.inches}
                    onFeetChange={(ft) => updateCurtainItem(item.id, { width: { ...item.width, feet: ft } })}
                    onInchesChange={(inc) => updateCurtainItem(item.id, { width: { ...item.width, inches: inc } })}
                    hasError={item.totalWidthInches <= 0}
                  />
                </td>

                {/* WINDOW HEIGHT (Feet / Inches) */}
                <td className="px-2 py-3 align-top w-[16%]">
                  <FeetInchesInput
                    feet={item.height.feet}
                    inches={item.height.inches}
                    onFeetChange={(ft) => updateCurtainItem(item.id, { height: { ...item.height, feet: ft } })}
                    onInchesChange={(inc) => updateCurtainItem(item.id, { height: { ...item.height, inches: inc } })}
                    hasError={item.totalHeightInches <= 0}
                  />
                </td>

                {/* TOTAL MTR (CEILING Whole Number Badge) */}
                <td className="px-2 py-3 text-center align-top pt-2.5 w-[9%]">
                  <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 flex flex-col items-center justify-center">
                    <span className="text-sm font-black text-primary">
                      {item.totalMtr} MTR
                    </span>
                    <span className="text-[9px] font-bold text-txtSecondary">
                      ({item.calculatedMtr.toFixed(2)})
                    </span>
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

                {/* DISCOUNT (Toggle Pill + Input) */}
                <td className="px-2 py-3 align-top w-[10%] space-y-1">
                  <div className="flex items-center justify-end gap-1">
                    <div className="inline-flex p-0.5 rounded-lg bg-cardBg border border-borderClr/30">
                      <button
                        type="button"
                        onClick={() => updateCurtainItem(item.id, { discountType: 'PERCENTAGE' })}
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md transition-colors ${
                          item.discountType === 'PERCENTAGE' ? 'bg-primary text-white shadow-xs' : 'text-txtSecondary'
                        }`}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => updateCurtainItem(item.id, { discountType: 'FIXED' })}
                        className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md transition-colors ${
                          item.discountType === 'FIXED' ? 'bg-primary text-white shadow-xs' : 'text-txtSecondary'
                        }`}
                      >
                        ₹
                      </button>
                    </div>
                  </div>

                  <input
                    type="number"
                    min={0}
                    placeholder="0"
                    value={item.discountValue || ''}
                    onChange={(e) => updateCurtainItem(item.id, { discountValue: e.target.value === '' ? 0 : Number(e.target.value) })}
                    className="w-full h-10 px-2 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 transition-all"
                  />
                  {item.discountAmount > 0 && (
                    <div className="text-[9px] text-right font-bold text-success">
                      -₹{item.discountAmount.toLocaleString('en-IN')}
                    </div>
                  )}
                </td>

                {/* TOTAL PRICE (₹) */}
                <td className="px-2 py-3 text-right align-top pt-3 w-[12%] font-black tracking-tight">
                  <span className="text-base font-black text-txtPrimary">
                    ₹{item.totalPrice.toLocaleString('en-IN')}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-2 py-3 text-center align-top pt-3 w-[3%]">
                  <button
                    type="button"
                    disabled={items.length === 1}
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 rounded-lg text-txtSecondary hover:text-danger hover:bg-danger/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grand Total Summary Footer Card */}
      <div className="p-4 rounded-2xl bg-hoverBg/50 border border-borderClr/40 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <div>
            <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Total Items</p>
            <p className="text-sm font-black text-txtPrimary">{summary.totalItems} Curtains</p>
          </div>
          <div className="h-8 w-px bg-borderClr/40" />
          <div>
            <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Total Fabric Required</p>
            <p className="text-sm font-black text-primary">{summary.totalMtrSum} MTR</p>
          </div>
          <div className="h-8 w-px bg-borderClr/40" />
          <div>
            <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Total Subtotal</p>
            <p className="text-sm font-black text-txtPrimary">₹{summary.subtotalSum.toLocaleString('en-IN')}</p>
          </div>
          <div className="h-8 w-px bg-borderClr/40" />
          <div>
            <p className="text-[10px] font-bold text-txtSecondary uppercase tracking-wider">Total Discounts</p>
            <p className="text-sm font-black text-success">-₹{summary.discountSum.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">Grand Total Price</p>
            <p className="text-xl font-black text-primary tracking-tight">₹{summary.grandTotal.toLocaleString('en-IN')}</p>
          </div>

          {onImportToQuotation && (
            <button
              type="button"
              onClick={handleImportToMainQuotation}
              className="px-4 py-2.5 rounded-xl bg-primary text-white font-black text-xs hover:bg-primary-hover transition-all shadow-md flex items-center gap-1.5 cursor-pointer ml-2"
            >
              Sync to Quotation
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
