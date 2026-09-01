'use client';

import React, { useState } from 'react';
import { Plus, Trash2, User, UserPlus, FileText, Hash, MapPin, Mail, Phone, Calendar, Clock, Sparkles, Building, Globe, Scissors, Layers } from 'lucide-react';
import { PlaceOfSupplySelect } from './PlaceOfSupplySelect';
import { ProductAutocomplete } from './ProductAutocomplete';
import { CustomerFormModal } from '@/features/customers/components/CustomerFormModal';
import { CurtainQuotationModule } from './CurtainQuotationModule';
import { QuotationItem } from '../types';
import { INDIAN_GST_STATE_CODES } from '../constants/gstStateCodes';

interface CreateQuotationFormProps {
  companyName: string;
  setCompanyName: (val: string) => void;
  contactPerson: string;
  setContactPerson: (val: string) => void;
  customerName: string;
  setCustomerName: (val: string) => void;
  customerEmail?: string;
  setCustomerEmail?: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  customerAddress: string;
  setCustomerAddress: (val: string) => void;
  customerGstin: string;
  setCustomerGstin: (val: string) => void;
  placeOfSupply: string;
  setPlaceOfSupply: (val: string) => void;
  financialYear: string;
  setFinancialYear: (val: string) => void;
  quotationNumber: string;
  setQuotationNumber: (val: string) => void;
  issueDate: string;
  setIssueDate: (val: string) => void;
  validUntil: string;
  setValidUntil: (val: string) => void;
  items: QuotationItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof QuotationItem, val: any) => void;
  notes: string;
  setNotes: (val: string) => void;
}

export const CreateQuotationForm: React.FC<CreateQuotationFormProps> = ({
  companyName,
  setCompanyName,
  contactPerson,
  setContactPerson,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  customerGstin,
  setCustomerGstin,
  placeOfSupply,
  setPlaceOfSupply,
  financialYear,
  setFinancialYear,
  quotationNumber,
  setQuotationNumber,
  issueDate,
  setIssueDate,
  validUntil,
  setValidUntil,
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
  notes,
  setNotes,
}) => {
  const uomOptions = ['NOS', 'SQFT', 'MTR', 'PCS', 'SET', 'LOT', 'BOX', 'KG'];
  const [itemMode, setItemMode] = useState<'STANDARD' | 'CURTAINS'>('STANDARD');
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  // Handle importing calculated curtain items into main quotation
  const handleImportCurtains = (curtainItems: QuotationItem[]) => {
    // Append or replace items
    curtainItems.forEach((cItem) => {
      // Find empty row or add new
      onAddItem();
    });
    setItemMode('STANDARD');
  };

  // Handle saving new client from modal directly into quotation form
  const handleSaveNewClient = (clientData: any) => {
    if (clientData.companyName) setCompanyName(clientData.companyName);
    if (clientData.customerName) {
      setContactPerson(clientData.customerName);
      setCustomerName(clientData.customerName);
    }
    if (setCustomerEmail && clientData.email) setCustomerEmail(clientData.email);
    if (clientData.mobile) setCustomerPhone(clientData.mobile);
    if (clientData.billingAddress?.addressLine1) setCustomerAddress(clientData.billingAddress.addressLine1);
    if (clientData.gstNumber) setCustomerGstin(clientData.gstNumber);
    if (clientData.state) setPlaceOfSupply(clientData.state);
  };

  // Calculate validity days dynamically
  const validityDays = React.useMemo(() => {
    if (!issueDate || !validUntil) return 15;
    const start = new Date(issueDate).getTime();
    const end = new Date(validUntil).getTime();
    const diff = Math.max(0, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
    return diff || 15;
  }, [issueDate, validUntil]);

  return (
    <div className="space-y-4">
      {/* Inline Customer Creation Modal */}
      <CustomerFormModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSave={handleSaveNewClient}
      />

      {/* Client & General Info - 2-Subpanel Structured Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Sub-Panel (7 Cols): Client Contact & Site Address */}
        <div className="lg:col-span-7 glass-panel p-4 sm:p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderClr/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <User className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-txtPrimary">Client Information</h3>
                <p className="text-[10px] text-txtSecondary">Company, contact person, GST details, and site address</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAddClientOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <UserPlus className="h-3.5 w-3.5" />
              + Add New Client
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Company Name */}
            <div>
              <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                Company Name
              </label>
              <input
                type="text"
                placeholder="e.g. Dream Decorators Pvt Ltd"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-9 px-3.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium transition-all"
              />
            </div>

            {/* 3. Contact Person */}
            <div>
              <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                Contact Person
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={contactPerson || customerName}
                onChange={(e) => {
                  setContactPerson(e.target.value);
                  setCustomerName(e.target.value);
                }}
                className="w-full h-9 px-3.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium transition-all"
              />
            </div>

            {/* 4. Phone No */}
            <div>
              <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                Phone No
              </label>
              <input
                type="text"
                placeholder="+91 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full h-9 px-3.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium transition-all"
              />
            </div>

            {/* 5. GSTIN / PAN */}
            <div>
              <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                GSTIN / PAN
              </label>
              <input
                type="text"
                placeholder="e.g. 24AHBPV9744N1ZL"
                value={customerGstin}
                onChange={(e) => setCustomerGstin(e.target.value.toUpperCase())}
                className="w-full h-9 px-3.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-mono font-bold tracking-wider uppercase transition-all"
              />
            </div>

            {/* 6. Address & Place of Supply (Side-By-Side Row) */}
            <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3">
              {/* Address (Bigger Width) */}
              <div className="flex-1">
                <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="e.g. 104 Harmony Heights, CG Road, Ahmedabad, Gujarat 380009"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full h-9 px-3.5 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium transition-all"
                />
              </div>

              {/* Place of Supply (Compact Fixed Width) */}
              <div className="w-full sm:w-60 shrink-0">
                <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                  Place of Supply <span className="text-primary">*</span>
                </label>
                <PlaceOfSupplySelect value={placeOfSupply} onChange={setPlaceOfSupply} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sub-Panel (5 Cols): Proposal Metadata & Validity */}
        <div className="lg:col-span-5 glass-panel p-4 sm:p-5 rounded-2xl space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-borderClr/30">
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-txtPrimary">Proposal Metadata</h3>
                <p className="text-[10px] text-txtSecondary">Quotation reference # and validity dates</p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-[10px] font-bold text-txtSecondary uppercase tracking-wider">
                    Quote Number
                  </label>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    AUTO-GEN
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* DD Prefix Badge */}
                  <span className="h-9 px-3 rounded-xl bg-primary/10 border border-primary/20 text-primary font-black text-xs flex items-center shrink-0">
                    DD-
                  </span>
                  {/* Quotation Number Input */}
                  <div className="relative flex-1">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-txtSecondary" />
                    <input
                      type="text"
                      value={quotationNumber}
                      onChange={(e) => setQuotationNumber(e.target.value)}
                      className="w-full h-9 pl-9 pr-3 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 transition-all tracking-wider"
                    />
                  </div>
                  {/* Financial Year Input/Suffix */}
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="text-xs font-extrabold text-txtSecondary">/</span>
                    <input
                      type="text"
                      placeholder="26-27"
                      value={financialYear}
                      onChange={(e) => setFinancialYear(e.target.value)}
                      className="w-20 h-9 px-2 text-xs text-center rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-extrabold focus:outline-none focus:border-primary/50 transition-all tracking-wider"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="w-full h-9 px-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                    Validity Preset
                  </label>
                  <select
                    value={validityDays}
                    onChange={(e) => {
                      const days = Number(e.target.value);
                      if (days && issueDate) {
                        const start = new Date(issueDate).getTime();
                        const next = new Date(start + days * 86400000).toISOString().split('T')[0];
                        setValidUntil(next);
                      }
                    }}
                    className="w-full h-9 px-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer transition-all"
                  >
                    <option value={15}>15 Days</option>
                    <option value={30}>30 Days</option>
                    <option value={45}>45 Days</option>
                    <option value={60}>60 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-txtSecondary mb-1.5 uppercase tracking-wider">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full h-9 px-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-primary/50 font-medium transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Validity Days Banner */}
          <div className="p-2.5 rounded-xl bg-hoverBg/40 border border-borderClr/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-[11px] font-semibold text-txtSecondary">Proposal Validity Duration:</span>
            </div>
            <span className="text-[11px] font-extrabold text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-lg">
              {validityDays} Days
            </span>
          </div>
        </div>
      </div>

      {/* Line Items & Pricing Table Section - Mode Switcher Header */}
      <div className="space-y-4">
        {/* Mode Switcher Banner Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-hoverBg/40 border border-borderClr/30">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-txtSecondary uppercase tracking-wider">Quotation Mode:</span>
            <div className="inline-flex p-1 rounded-xl bg-cardBg border border-borderClr/40 shadow-xs">
              <button
                type="button"
                onClick={() => setItemMode('STANDARD')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  itemMode === 'STANDARD'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-txtSecondary hover:text-txtPrimary'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                Standard Items Table
              </button>

              <button
                type="button"
                onClick={() => setItemMode('CURTAINS')}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                  itemMode === 'CURTAINS'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-txtSecondary hover:text-txtPrimary'
                }`}
              >
                <Scissors className="h-3.5 w-3.5" />
                Curtain Fabric Calculator
              </button>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-txtSecondary">
            {itemMode === 'CURTAINS'
              ? '✂️ Automatically converts Feet/Inches to Meterage & calculates pleated fabric rules'
              : '📦 Standard products, HSN/SAC codes, UOM, and GST tax calculations'}
          </div>
        </div>

        {/* Render Curtain Module or Standard Table based on itemMode */}
        {itemMode === 'CURTAINS' ? (
          <CurtainQuotationModule />
        ) : (
          <div className="glass-panel p-4 sm:p-5 rounded-2xl space-y-3.5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-borderClr/30">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-500">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-txtPrimary">Product Items</h3>
                  <p className="text-[10px] text-txtSecondary">Manage products, item notes, UOM, and GST tax calculations</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Discount Unit Toggle Pill [ ₹ | % ] */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-hoverBg/60 border border-borderClr/40 text-xs">
                  <span className="text-[10px] font-bold text-txtSecondary">Discount :</span>
                  <div className="inline-flex p-0.5 rounded-lg bg-cardBg border border-borderClr/30">
                    <button
                      type="button"
                      className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-primary text-white shadow-xs"
                    >
                      ₹
                    </button>
                    <button
                      type="button"
                      className="px-2 py-0.5 text-[10px] font-bold rounded-md text-txtSecondary hover:text-txtPrimary transition-colors"
                    >
                      %
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onAddItem}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer ml-1"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Item
                </button>
              </div>
            </div>

        {/* 9 Column Table matching Clean Quotation Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
            <thead>
              <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[10px] font-bold text-txtSecondary uppercase tracking-wider">
                <th className="px-2 py-3 text-center w-[3%]">SR.</th>
                <th className="px-2 py-3 text-left w-[48%]">PRODUCT / OTHER CHARGES</th>
                <th className="px-2 py-3 text-center w-[8%]">QTY.</th>
                <th className="px-2 py-3 text-center w-[8%]">UOM</th>
                <th className="px-2 py-3 text-right w-[9%]">PRICE (₹)</th>
                <th className="px-2 py-3 text-right w-[7%]">DISCOUNT</th>
                <th className="px-2 py-3 text-right w-[8%]">CGST + SGST</th>
                <th className="px-2 py-3 text-right w-[14%]">
                  <span className="text-xs font-black text-primary uppercase tracking-wide">TOTAL (₹)</span>
                </th>
                <th className="px-2 py-3 text-center w-[3%]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderClr/20 text-xs">
              {items.map((item, idx) => {
                const qty = item.quantity || 0;
                const price = item.unitPrice || 0;
                const disc = item.discount || 0;
                const lineSub = Math.max(0, qty * price - disc);
                const taxP = typeof item.taxPercent === 'number' ? item.taxPercent : 0;
                const lineTotal = (qty || price || disc) ? lineSub * (1 + taxP / 100) : 0;

                return (
                  <tr key={item.id} className="hover:bg-hoverBg/30 transition-colors">
                    {/* SR. */}
                    <td className="px-2 py-3 text-center font-bold text-txtSecondary align-top pt-3 text-[11px] w-[3%]">
                      {idx + 1}
                    </td>

                    {/* PRODUCT AUTOCOMPLETE + ITEM NOTES */}
                    <td className="px-2 py-3 space-y-2 w-[48%] align-top">
                      <ProductAutocomplete
                        value={item.description}
                        onChange={(val) => onUpdateItem(item.id, 'description', val)}
                        onSelectProduct={(prod) => {
                          if (prod.uom) onUpdateItem(item.id, 'uom', prod.uom);
                          if (prod.unitPrice) onUpdateItem(item.id, 'unitPrice', prod.unitPrice);
                        }}
                      />
                      <textarea
                        rows={2}
                        placeholder="Item Note..."
                        value={item.itemNotes || ''}
                        onChange={(e) => onUpdateItem(item.id, 'itemNotes', e.target.value)}
                        className="w-full px-3 py-2 min-h-[60px] text-[11px] rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-txtSecondary placeholder:text-txtSecondary/50 focus:outline-none focus:border-amber-500/50 font-medium resize-y transition-all"
                      />
                    </td>

                    {/* DEDICATED QTY COLUMN */}
                    <td className="px-2 py-3 align-top w-[8%]">
                      <input
                        type="number"
                        min={1}
                        placeholder="Qty."
                        value={item.quantity || ''}
                        onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full h-10 px-2 py-2 text-xs text-center rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </td>

                    {/* DEDICATED UOM COLUMN */}
                    <td className="px-2 py-3 align-top w-[7%]">
                      <select
                        value={item.uom || 'NOS'}
                        onChange={(e) => onUpdateItem(item.id, 'uom', e.target.value)}
                        className="w-full h-10 px-2 py-2 text-xs text-center rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer transition-all"
                      >
                        {uomOptions.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* PRICE (₹) - Compact 8% width */}
                    <td className="px-2 py-3 align-top w-[8%]">
                      <input
                        type="number"
                        min={0}
                        placeholder="Price"
                        value={item.unitPrice || ''}
                        onChange={(e) => onUpdateItem(item.id, 'unitPrice', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full h-10 px-2 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </td>

                    {/* DISCOUNT - Compact 6% width */}
                    <td className="px-2 py-3 align-top w-[6%]">
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={item.discount || ''}
                        onChange={(e) => onUpdateItem(item.id, 'discount', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full h-10 px-1.5 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50 transition-all"
                      />
                    </td>

                    {/* CGST + SGST - Compact 7% width, right next to Total */}
                    <td className="px-2 py-3 align-top w-[7%]">
                      <select
                        value={item.taxPercent !== undefined && item.taxPercent !== null && item.taxPercent !== ('' as any) ? item.taxPercent : ''}
                        onChange={(e) => onUpdateItem(item.id, 'taxPercent', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full h-10 px-1 py-2 text-xs text-right rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer transition-all"
                      >
                        <option value="">Tax</option>
                        <option value={0}>0%</option>
                        <option value={18}>18%</option>
                        <option value={12}>12%</option>
                        <option value={5}>5%</option>
                        <option value={28}>28%</option>
                      </select>
                    </td>

                    {/* TOTAL (₹) - Tight 11% width right next to CGST+SGST */}
                    <td className="px-2 py-3 text-right align-top pt-2.5 w-[11%] font-black text-sm text-txtPrimary tracking-tight">
                      <span className="text-sm font-black text-txtPrimary">
                        {lineTotal > 0 ? `₹${lineTotal.toLocaleString('en-IN')}` : 'Total'}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="px-2 py-3 text-center align-top pt-2 w-[3%]">
                      <button
                        type="button"
                        disabled={items.length === 1}
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 rounded-lg text-txtSecondary hover:text-danger hover:bg-danger/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

            {/* Bottom Summary Footer Row (Total Quotation Val Layout) */}
            <tfoot>
              {(() => {
                const totalQty = items.reduce((acc, curr) => acc + (curr.quantity || 0), 0);
                const subtotalSum = items.reduce((acc, curr) => acc + Math.max(0, (curr.quantity || 0) * (curr.unitPrice || 0)), 0);
                const discountSum = items.reduce((acc, curr) => acc + (curr.discount || 0), 0);
                const taxSum = items.reduce((acc, curr) => {
                  const lineSub = Math.max(0, (curr.quantity || 0) * (curr.unitPrice || 0) - (curr.discount || 0));
                  const taxP = typeof curr.taxPercent === 'number' ? curr.taxPercent : 0;
                  return acc + lineSub * (taxP / 100);
                }, 0);
                const grandTotalSum = items.reduce((acc, curr) => {
                  const lineSub = Math.max(0, (curr.quantity || 0) * (curr.unitPrice || 0) - (curr.discount || 0));
                  const taxP = typeof curr.taxPercent === 'number' ? curr.taxPercent : 0;
                  return acc + lineSub * (1 + taxP / 100);
                }, 0);

                return (
                  <tr className="bg-primary/5 dark:bg-primary/10 border-t-2 border-primary/20 text-xs font-black text-txtPrimary">
                    <td colSpan={3} className="px-3 py-3 text-right uppercase tracking-wider font-extrabold text-primary">
                      Total Quotation Val
                    </td>
                    <td className="px-2 py-3 text-center text-txtPrimary font-extrabold">
                      {totalQty > 0 ? totalQty : 0}
                    </td>
                    <td className="px-2 py-3 text-center text-txtSecondary font-medium">--</td>
                    <td className="px-2 py-3 text-right text-txtPrimary font-bold">
                      {subtotalSum > 0 ? `₹${subtotalSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-txtPrimary font-bold">
                      {discountSum > 0 ? `₹${discountSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-txtPrimary font-bold">
                      {taxSum > 0 ? `₹${taxSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-primary text-base font-black">
                      {grandTotalSum > 0 ? `₹${grandTotalSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td></td>
                  </tr>
                );
              })()}
            </tfoot>
          </table>
        </div>
      </div>
    )}
      </div>
    </div>
  );
};
