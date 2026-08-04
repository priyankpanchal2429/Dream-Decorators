'use client';

/**
 * ThemePage — Exact 1:1 WalkClean Brutalist Design System Implementation
 * Matches reference images pixel-for-pixel:
 * - Font: Plus Jakarta Sans (loaded dynamically)
 * - Accent: #16a34a (green)
 * - Shadows: Solid 8px black offset shadow on main cards, 4px black offset shadow on buttons
 * - Stepper: Green check circle, Black active circle, Gray inactive circle with connecting lines
 * - Exact WalkClean & Dream Decorators data matching the reference screenshots 100%
 */

import React, { useState } from 'react';
import {
  Check, ChevronRight, ChevronLeft, X, Printer, Share2, Box, Zap, AlertCircle, ChevronDown, ChevronUp, RefreshCw
} from 'lucide-react';

// ─── Types & Data ────────────────────────────────────────────────────────────

type StepperStep = 1 | 2 | 3 | 4;

interface OrderData {
  serviceName: string;
  qtyText: string;
  servicePrice: number;
  deliveryDist: string;
  deliveryPrice: string; // 'FREE' or amount
  taxPrice: number;
  totalPrice: number;
  orderNumber: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

// Default WalkClean values matching reference image 100%
const WALKCLEAN_DEFAULT: OrderData = {
  serviceName: 'STANDARD',
  qtyText: '1 pair',
  servicePrice: 149,
  deliveryDist: '2 km',
  deliveryPrice: 'FREE',
  taxPrice: 26.82,
  totalPrice: 175.82,
  orderNumber: 'WKC10826',
  street: '11223',
  city: 'surat',
  state: 'gujarat',
  zip: '394340',
};

// ─── Font Injection ─────────────────────────────────────────────────────────
const FontLink = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,800&display=swap"
      rel="stylesheet"
    />
  </>
);

// ─── Stepper Component ──────────────────────────────────────────────────────
const Stepper: React.FC<{ currentStep: StepperStep; isErpMode: boolean }> = ({ currentStep, isErpMode }) => {
  const steps = [
    { num: 1, label: isErpMode ? 'SERVICE' : 'SERVICE' },
    { num: 2, label: isErpMode ? 'ITEMS' : 'SHOES' },
    { num: 3, label: 'DELIVERY' },
    { num: 4, label: 'REVIEW' },
  ];

  return (
    <div className="flex items-center justify-center mb-10 select-none">
      {steps.map((step, idx) => {
        const isDone = step.num < currentStep;
        const isActive = step.num === currentStep;

        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm transition-colors ${
                  isDone
                    ? 'bg-[#16a34a] text-white'
                    : isActive
                    ? 'bg-black text-white'
                    : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
              >
                {isDone ? <Check className="w-5 h-5 stroke-[3]" /> : step.num}
              </div>
              {/* Label */}
              <span
                className={`text-[10px] font-black uppercase tracking-wider mt-2 ${
                  isDone ? 'text-[#16a34a]' : isActive ? 'text-black' : 'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connecting line */}
            {idx < steps.length - 1 && (
              <div
                className={`h-[2px] w-20 mx-2 -mt-5 transition-colors ${
                  step.num < currentStep ? 'bg-[#16a34a]' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── Order Summary Sidebar ──────────────────────────────────────────────────
const OrderSummary: React.FC<{
  data: OrderData;
  onEdit: (step: StepperStep) => void;
  isErpMode: boolean;
}> = ({ data, onEdit, isErpMode }) => {
  return (
    <div
      className="w-80 border-2 border-black bg-white p-6 shrink-0 transition-all hover:shadow-[8px_8px_0_#000000]"
    >
      <h3 className="text-base font-extrabold uppercase tracking-tight text-black mb-4">
        ORDER SUMMARY
      </h3>

      <div className="h-[2px] bg-black mb-5" />

      {/* Service row */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-extrabold text-sm text-black uppercase">{isErpMode ? 'SERVICE' : 'Service'}</p>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {data.serviceName} × {data.qtyText}
          </p>
        </div>
        <span className="font-extrabold text-sm text-black">₹{data.servicePrice}</span>
      </div>

      {/* Delivery row */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="font-extrabold text-sm text-black uppercase">Delivery</p>
          <p className="text-xs font-semibold text-gray-500 tracking-wide">{data.deliveryDist}</p>
        </div>
        <span className="font-extrabold text-sm text-black uppercase">{data.deliveryPrice}</span>
      </div>

      {/* Tax row */}
      <div className="flex justify-between items-center mb-5 text-sm">
        <span className="font-bold text-gray-600">Tax (18%)</span>
        <span className="font-extrabold text-black">₹{data.taxPrice.toFixed(2)}</span>
      </div>

      <div className="h-[2px] bg-black mb-5" />

      {/* Total row */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-extrabold text-base uppercase text-black">TOTAL</span>
        <span className="font-extrabold text-2xl text-black">₹{data.totalPrice.toFixed(2)}</span>
      </div>

      {/* Edit buttons row */}
      <div className="grid grid-cols-3 gap-1.5">
        <button
          onClick={() => onEdit(1)}
          className="border border-black bg-white hover:bg-black hover:text-white hover:shadow-[3px_3px_0_#000000] py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-black transition-all"
        >
          Edit Service
        </button>
        <button
          onClick={() => onEdit(2)}
          className="border border-black bg-white hover:bg-black hover:text-white hover:shadow-[3px_3px_0_#000000] py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-black transition-all"
        >
          {isErpMode ? 'Edit Items' : 'Edit Shoes'}
        </button>
        <button
          onClick={() => onEdit(3)}
          className="border border-black bg-white hover:bg-black hover:text-white hover:shadow-[3px_3px_0_#000000] py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-black transition-all"
        >
          Edit Delivery
        </button>
      </div>
    </div>
  );
};

// ─── Step 1: Service Selection ─────────────────────────────────────────────
const Step1View: React.FC<{
  data: OrderData;
  onSelect: (name: string, price: number) => void;
  onNext: () => void;
  isErpMode: boolean;
}> = ({ data, onSelect, onNext, isErpMode }) => {
  const options = isErpMode
    ? [
        { id: 'STANDARD', desc: 'Standard Interior Decor Package', price: 12500 },
        { id: 'PREMIUM', desc: 'Full Luxury Room Makeover', price: 28000 },
        { id: 'BESPOKE', desc: 'Custom Architectural Consultation', price: 50000 },
      ]
    : [
        { id: 'STANDARD', desc: 'Deep cleaning & sole restoration', price: 149 },
        { id: 'PREMIUM', desc: 'Premium suede & leather care', price: 299 },
        { id: 'EXPRESS', desc: 'Same day express turnaround', price: 499 },
      ];

  return (
    <div
      className="border-2 border-black bg-white p-8 flex-1 transition-all hover:shadow-[8px_8px_0_#000000]"
    >
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-black mb-1">
        SERVICE TYPE
      </h2>
      <p className="text-xs font-semibold text-gray-500 mb-6">Select the service level for your order</p>

      <div className="space-y-4 mb-8">
        {options.map((opt) => {
          const isSelected = data.serviceName === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id, opt.price)}
              className={`w-full flex items-center justify-between p-5 border-2 transition-all text-left ${
                isSelected
                  ? 'border-black bg-black text-white shadow-[3px_3px_0_#16a34a]'
                  : 'border-gray-200 bg-white text-black hover:border-black hover:shadow-[4px_4px_0_#000000]'
              }`}
            >
              <div>
                <p className="font-extrabold text-base uppercase tracking-wider">{opt.id}</p>
                <p className={`text-xs mt-1 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                  {opt.desc}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-lg">₹{opt.price}</span>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white stroke-[3]" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onNext}
        className="w-full bg-black text-white font-extrabold text-sm uppercase py-4 flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-[4px_4px_0_#16a34a] transition-all border-2 border-black"
      >
        Next Step <ChevronRight className="w-4 h-4 stroke-[3]" />
      </button>
    </div>
  );
};

// ─── Step 2: Shoe / Item Details (Custom Black Dropdown) ───────────────────
const Step2View: React.FC<{
  onNext: () => void;
  onBack: () => void;
  isErpMode: boolean;
}> = ({ onNext, onBack, isErpMode }) => {
  const [brand, setBrand] = useState(isErpMode ? 'FURNITURE' : 'NIKE');
  const [color, setColor] = useState(isErpMode ? 'WOOD' : 'WHITE');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const brandOptions = isErpMode
    ? ['SELECT CATEGORY', 'FURNITURE', 'CURTAINS', 'WALLPAPER', 'LIGHTING', 'FLOORING']
    : ['SELECT BRAND', 'NIKE', 'ADIDAS', 'PUMA', 'REEBOK'];

  const colorOptions = isErpMode
    ? ['WHITE', 'NATURAL WOOD', 'TEAK', 'WALNUT', 'MATTE BLACK']
    : ['WHITE', 'BLACK', 'RED', 'BLUE', 'GREY'];

  return (
    <div
      className="border-2 border-black bg-white p-8 flex-1 transition-all hover:shadow-[8px_8px_0_#000000]"
    >
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-black mb-6">
        {isErpMode ? 'ITEM DETAILS' : 'SHOE DETAILS'}
      </h2>

      {/* Inner section box */}
      <div className="border border-black p-6 mb-8 relative">
        <h3 className="text-xs font-extrabold uppercase tracking-widest text-black mb-6 border-b border-gray-200 pb-3">
          {isErpMode ? 'ITEM INFORMATION' : 'SHOE INFORMATION'}
        </h3>

        <div className="grid grid-cols-2 gap-6">
          {/* Brand / Category Dropdown */}
          <div className="relative">
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
              {isErpMode ? 'CATEGORY' : 'BRAND'}
            </label>

            {/* Selector box */}
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full border-2 border-black bg-white p-3 flex items-center justify-between font-extrabold text-sm uppercase tracking-wide text-black hover:shadow-[3px_3px_0_#000000] transition-all"
            >
              <span>{brand}</span>
              {dropdownOpen ? (
                <ChevronUp className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <ChevronDown className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>

            {/* Open Dropdown Menu - EXACT matches reference 5 */}
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 bg-black text-white border-2 border-black z-30 shadow-2xl mt-1">
                {brandOptions.map((opt) => {
                  const isSelected = opt === brand;
                  const isTitle = opt.startsWith('SELECT');

                  return (
                    <button
                      key={opt}
                      onClick={() => {
                        if (!isTitle) {
                          setBrand(opt);
                          setDropdownOpen(false);
                        }
                      }}
                      disabled={isTitle}
                      className={`w-full flex items-center justify-between p-3.5 text-xs font-extrabold uppercase tracking-wider transition-colors text-left border-b border-zinc-800 last:border-0 ${
                        isTitle
                          ? 'text-gray-400 bg-zinc-950 font-bold'
                          : 'hover:bg-zinc-900 text-white cursor-pointer'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && !isTitle && (
                        <Check className="w-4 h-4 text-[#16a34a] stroke-[3]" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Color / Material Dropdown */}
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
              {isErpMode ? 'MATERIAL' : 'COLOR'}
            </label>
            <div className="relative">
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full border-2 border-black bg-white p-3 font-extrabold text-sm uppercase tracking-wide text-black appearance-none focus:outline-none pr-10 cursor-pointer hover:shadow-[3px_3px_0_#000000] transition-all"
              >
                {colorOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-5 h-5 stroke-[2.5] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black" />
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="border-2 border-black bg-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000] px-6 py-3.5 font-extrabold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 transition-all"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" /> Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 bg-black text-white font-extrabold text-sm uppercase py-3.5 flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-[4px_4px_0_#16a34a] transition-all border-2 border-black"
        >
          Next Step <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};

// ─── Step 3: Delivery Information (With Error Validation) ──────────────────
const Step3View: React.FC<{
  data: OrderData;
  onChangeData: (updater: (prev: OrderData) => OrderData) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ data, onChangeData, onNext, onBack }) => {
  const [hasError, setHasError] = useState(false);
  const [zipError, setZipError] = useState(false);

  const handleNextClick = () => {
    // Validate ZIP length
    if (!data.zip || data.zip.length !== 6 || isNaN(Number(data.zip))) {
      setHasError(true);
      setZipError(true);
      return;
    }

    setHasError(false);
    setZipError(false);
    onNext();
  };

  return (
    <div className="flex-1">
      {/* Error alert banner - Matches Image 3 exactly */}
      {hasError && (
        <div className="border-2 border-red-500 bg-red-50 text-red-600 p-4 mb-4 font-bold text-sm flex items-center gap-2">
          <span>Please fix the errors before continuing</span>
        </div>
      )}

      <div
        className="border-2 border-black bg-white p-8 transition-all hover:shadow-[8px_8px_0_#000000]"
      >
        <h2 className="text-xl font-extrabold uppercase tracking-wide text-black mb-6">
          DELIVERY INFORMATION
        </h2>

        {/* Street Address */}
        <div className="mb-5">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
            STREET ADDRESS
          </label>
          <input
            type="text"
            value={data.street}
            onChange={(e) => onChangeData((p) => ({ ...p, street: e.target.value }))}
            className="w-full border-2 border-black p-3 text-sm font-bold text-black focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
          />
        </div>

        {/* City / State / ZIP Code */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
              CITY
            </label>
            <input
              type="text"
              value={data.city}
              onChange={(e) => onChangeData((p) => ({ ...p, city: e.target.value }))}
              className="w-full border-2 border-black p-3 text-sm font-bold text-black focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
              STATE
            </label>
            <input
              type="text"
              value={data.state}
              onChange={(e) => onChangeData((p) => ({ ...p, state: e.target.value }))}
              className="w-full border-2 border-black p-3 text-sm font-bold text-black focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
            />
          </div>

          <div>
            <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
              ZIP CODE{' '}
              {zipError && (
                <span className="text-red-500 font-bold normal-case text-xs ml-1">
                  ZIP code must be 6 digits
                </span>
              )}
            </label>
            <input
              type="text"
              value={data.zip}
              onChange={(e) => {
                const val = e.target.value;
                onChangeData((p) => ({ ...p, zip: val }));
                if (val.length === 6) setZipError(false);
              }}
              className={`w-full border-2 p-3 text-sm font-bold text-black focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all ${
                zipError ? 'border-red-500 bg-red-50/20' : 'border-black'
              }`}
            />
          </div>
        </div>

        {/* Distance (KM) */}
        <div className="mb-6">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-2">
            DISTANCE (KM)
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.deliveryDist.replace(' km', '')}
              onChange={(e) =>
                onChangeData((p) => ({ ...p, deliveryDist: `${e.target.value} km` }))
              }
              className="w-full border-2 border-black p-3 text-sm font-bold text-black focus:outline-none pr-14 hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-xs text-gray-500 pointer-events-none">
              KM
            </span>
          </div>
          <p className="text-xs font-bold text-[#16a34a] mt-2">
            💡 Delivery fee: FREE (Free delivery within 3km)
          </p>
        </div>

        {/* Promo Code Box */}
        <div className="border border-black p-5 mb-8">
          <label className="text-[10px] font-extrabold uppercase tracking-widest text-black block mb-3">
            PROMO CODE
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="ENTER CODE"
              className="flex-1 border-2 border-black p-2.5 text-sm font-extrabold text-black uppercase placeholder:text-gray-400 focus:outline-none hover:shadow-[3px_3px_0_#000000] focus:shadow-[3px_3px_0_#000000] transition-all"
            />
            <button className="bg-gray-600 text-white font-extrabold text-xs uppercase px-6 py-2.5 hover:bg-black hover:shadow-[3px_3px_0_#000000] transition-all">
              Apply
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="border-2 border-black bg-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000] px-6 py-3.5 font-extrabold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 transition-all"
          >
            <ChevronLeft className="w-4 h-4 stroke-[3]" /> Back
          </button>

          {/* Trigger error demo or next step */}
          <button
            onClick={handleNextClick}
            className="flex-1 bg-black text-white font-extrabold text-sm uppercase py-3.5 flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-[4px_4px_0_#16a34a] transition-all border-2 border-black"
          >
            Next Step <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Step 4: Final Review & Payment Method ─────────────────────────────────
const Step4View: React.FC<{
  data: OrderData;
  onPlaceOrder: () => void;
  onBack: () => void;
  onEdit: (step: StepperStep) => void;
}> = ({ data, onPlaceOrder, onBack, onEdit }) => {
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'ONLINE'>('ONLINE');

  return (
    <div
      className="border-2 border-black bg-white p-8 flex-1 transition-all hover:shadow-[8px_8px_0_#000000]"
    >
      <h2 className="text-xl font-extrabold uppercase tracking-wide text-black mb-6">
        FINAL REVIEW
      </h2>

      {/* Your Order is Ready box */}
      <div className="border border-black p-4 mb-6 flex items-center gap-3 bg-white">
        <div className="w-6 h-6 rounded-full bg-[#16a34a] flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-white stroke-[3]" />
        </div>
        <span className="font-extrabold text-sm uppercase tracking-wider text-black">
          YOUR ORDER IS READY
        </span>
      </div>

      {/* Details summary block */}
      <div className="border border-black p-4 mb-6 space-y-4">
        <div className="flex justify-between items-start border-b border-gray-100 pb-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-black">
              Service Type
            </p>
            <p className="text-xs font-bold text-gray-500 uppercase">{data.serviceName}</p>
          </div>
          <button
            onClick={() => onEdit(1)}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="flex justify-between items-start border-b border-gray-100 pb-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-black">
              Quantity
            </p>
            <p className="text-xs font-bold text-gray-500">{data.qtyText}</p>
          </div>
          <button
            onClick={() => onEdit(2)}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-black">
              Delivery Address
            </p>
            <p className="text-xs font-bold text-gray-500">
              {data.street}, {data.city}, {data.state} {data.zip}
            </p>
          </div>
          <button
            onClick={() => onEdit(3)}
            className="text-xs font-bold text-blue-600 hover:underline"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="mb-8">
        <p className="text-[10px] font-extrabold uppercase tracking-widest text-black mb-3">
          PAYMENT METHOD{' '}
          <span className="text-gray-400 font-normal tracking-normal lowercase">
            (Choose how you'd like to pay)
          </span>
        </p>

        <div className="grid grid-cols-2 gap-4">
          {/* COD */}
          <button
            onClick={() => setPaymentMethod('COD')}
            className={`border-2 border-black p-6 flex flex-col items-center justify-center transition-all ${
              paymentMethod === 'COD'
                ? 'bg-black text-white hover:shadow-[4px_4px_0_#16a34a]'
                : 'bg-white text-black hover:shadow-[4px_4px_0_#000000]'
            }`}
          >
            <div className="border border-current p-2.5 mb-3">
              <Box className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="font-extrabold text-xs uppercase tracking-wider">
              CASH ON DELIVERY
            </span>
            <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase mt-1">
              PAY WHEN WE DELIVER
            </span>
          </button>

          {/* ONLINE */}
          <button
            onClick={() => setPaymentMethod('ONLINE')}
            className={`border-2 border-black p-6 flex flex-col items-center justify-center transition-all ${
              paymentMethod === 'ONLINE'
                ? 'bg-black text-white hover:shadow-[4px_4px_0_#16a34a]'
                : 'bg-white text-black hover:shadow-[4px_4px_0_#000000]'
            }`}
          >
            <div className="border border-current p-2.5 mb-3 bg-white text-black">
              <Zap className="w-6 h-6 stroke-[2.5]" />
            </div>
            <span className="font-extrabold text-xs uppercase tracking-wider">PAY ONLINE</span>
            <span className="text-[9px] font-bold tracking-wider text-gray-400 uppercase mt-1">
              SECURE ONLINE PAYMENT
            </span>
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="border-2 border-black bg-white hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000] px-6 py-3.5 font-extrabold text-sm uppercase tracking-wider text-black flex items-center gap-1.5 transition-all"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" /> Back
        </button>

        <button
          onClick={onPlaceOrder}
          className="flex-1 bg-black text-white font-extrabold text-sm uppercase py-3.5 flex items-center justify-center gap-2 hover:bg-gray-800 hover:shadow-[4px_4px_0_#16a34a] transition-all border-2 border-black"
        >
          <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
            <Check className="w-3 h-3 text-white stroke-[3]" />
          </div>
          Place Order
        </button>
      </div>
    </div>
  );
};

// ─── Modal Component ───────────────────────────────────────────────────────
const ConfirmationModal: React.FC<{
  data: OrderData;
  onClose: () => void;
}> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 select-none">
      {/* Modal Container */}
      <div
        className="w-[440px] bg-white border-3 border-black relative overflow-hidden transition-all hover:shadow-[10px_10px_0_#000000]"
        style={{ borderWidth: '3px' }}
      >
        {/* Header - Green Background */}
        <div className="bg-[#16a34a] border-b-2 border-black p-5 text-white flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            {/* White box with checkmark */}
            <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-[#16a34a] shrink-0">
              <Check className="w-8 h-8 stroke-[3.5]" />
            </div>
            <div>
              <h2 className="font-black text-xl tracking-wide uppercase leading-tight">
                ORDER CREATED!
              </h2>
              <p className="text-xs font-semibold text-white/90">Complete payment below</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white border-2 border-black text-black flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Order Number row */}
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
              ORDER NUMBER
            </span>
            <span className="text-base font-black tracking-wide text-black">
              {data.orderNumber}
            </span>
          </div>

          <div className="h-[2px] bg-black mb-4" />

          {/* Line Items */}
          <div className="space-y-4 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-black text-sm uppercase text-black">{data.serviceName}</p>
                <p className="text-xs font-semibold text-gray-500">{data.qtyText}</p>
              </div>
              <span className="font-black text-base text-black">₹{data.servicePrice}</span>
            </div>

            <div className="flex justify-between items-start">
              <div>
                <p className="font-black text-sm uppercase text-black">DELIVERY</p>
                <p className="text-xs font-semibold text-gray-500">{data.deliveryDist}</p>
              </div>
              <span className="font-black text-base text-black uppercase">
                {data.deliveryPrice}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="font-bold text-gray-600">TAX (18%)</span>
              <span className="font-bold text-black">₹{data.taxPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="h-[2px] bg-black mb-5" />

          {/* Total row */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-black text-lg uppercase text-black tracking-wider">TOTAL</span>
            <span className="font-black text-3xl text-black">₹{data.totalPrice.toFixed(2)}</span>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              onClick={() => alert('Printing Receipt...')}
              className="border-2 border-black bg-white text-black font-black text-xs uppercase px-4 py-3 flex items-center justify-center gap-2 hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000] transition-all"
            >
              <Printer className="w-4 h-4 stroke-[2.5]" /> PRINT RECEIPT
            </button>
            <button
              onClick={() => alert('Sharing on WhatsApp...')}
              className="border-2 border-black bg-[#16a34a] text-white font-black text-xs uppercase px-4 py-3 flex items-center justify-center gap-2 hover:bg-[#15803d] hover:shadow-[4px_4px_0_#000000] transition-all"
            >
              <Share2 className="w-4 h-4 stroke-[2.5]" /> SHARE ON WHATSAPP
            </button>
          </div>

          {/* Pay Button */}
          <button
            onClick={onClose}
            className="w-full border-2 border-black bg-white text-black font-black text-sm uppercase py-3.5 hover:bg-black hover:text-white hover:shadow-[4px_4px_0_#000000] transition-all tracking-wide"
          >
            Pay ₹{data.totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Theme Page ────────────────────────────────────────────────────────
export default function ThemePage() {
  const [step, setStep] = useState<StepperStep>(3); // Default to step 3 or 1
  const [showModal, setShowModal] = useState(false);
  const [isErpData, setIsErpData] = useState(false); // Toggle WalkClean vs ERP data

  const [orderData, setOrderData] = useState<OrderData>(WALKCLEAN_DEFAULT);

  // Switch between WalkClean & ERP sample datasets
  const toggleDataset = () => {
    if (!isErpData) {
      setOrderData({
        serviceName: 'STANDARD DECOR',
        qtyText: '1 set',
        servicePrice: 12500,
        deliveryDist: '5 km',
        deliveryPrice: 'FREE',
        taxPrice: 2250,
        totalPrice: 14750,
        orderNumber: 'DD2026001',
        street: '123 Main St, Apartment 4B',
        city: 'Mumbai',
        state: 'Maharashtra',
        zip: '400001',
      });
      setIsErpData(true);
    } else {
      setOrderData(WALKCLEAN_DEFAULT);
      setIsErpData(false);
    }
  };

  const handleSelectService = (name: string, price: number) => {
    setOrderData((prev) => {
      const tax = price * 0.18;
      return {
        ...prev,
        serviceName: name,
        servicePrice: price,
        taxPrice: tax,
        totalPrice: price + tax,
      };
    });
  };

  return (
    <div
      className="min-h-screen bg-gray-50 text-black py-10 px-6 antialiased"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <FontLink />

      {/* Top Banner Control Bar */}
      <div className="max-w-5xl mx-auto mb-8 bg-black text-white p-4 flex items-center justify-between border-2 border-black shadow-[4px_4px_0_#16a34a]">
        <div className="flex items-center gap-3">
          <span className="bg-[#16a34a] text-white px-2 py-0.5 font-black text-xs uppercase tracking-wider">
            WalkClean Design System
          </span>
          <span className="font-extrabold text-sm uppercase tracking-wide">
            {isErpData ? 'Dream Decorators ERP Preset' : 'Exact 1:1 Reference Preset'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDataset}
            className="border border-white hover:bg-white hover:text-black px-3 py-1 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Toggle {isErpData ? 'WalkClean Data' : 'ERP Data'}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#16a34a] text-white hover:bg-[#15803d] px-3 py-1 text-xs font-extrabold uppercase tracking-wider transition-colors"
          >
            Open Order Modal
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Stepper Header */}
        <Stepper currentStep={step} isErpMode={isErpData} />

        {/* Main Content + Sidebar Grid */}
        <div className="flex gap-8 items-start">
          {step === 1 && (
            <Step1View
              data={orderData}
              onSelect={handleSelectService}
              onNext={() => setStep(2)}
              isErpMode={isErpData}
            />
          )}

          {step === 2 && (
            <Step2View
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
              isErpMode={isErpData}
            />
          )}

          {step === 3 && (
            <Step3View
              data={orderData}
              onChangeData={setOrderData}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <Step4View
              data={orderData}
              onPlaceOrder={() => setShowModal(true)}
              onBack={() => setStep(3)}
              onEdit={(s) => setStep(s)}
            />
          )}

          {/* Right Order Summary Sidebar */}
          <OrderSummary
            data={orderData}
            onEdit={(s) => setStep(s)}
            isErpMode={isErpData}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfirmationModal data={orderData} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
