'use client';

import React from 'react';
import {
  Building2,
  FileText,
  Plus,
  Trash2,
  Calendar,
  MapPin,
  Phone,
  User,
  Truck,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';
import { PlaceOfSupplySelect } from '@/features/quotations/components/PlaceOfSupplySelect';

export interface ChallanItem {
  id: string;
  description: string;
  itemNotes?: string;
  hsnCode?: string;
  quantity: number;
  uom: string;
  unitPrice: number;
  discount?: number;
  taxPercent: number;
  total: number;
}

interface CreateChallanFormProps {
  companyName: string;
  setCompanyName: (val: string) => void;
  contactPerson: string;
  setContactPerson: (val: string) => void;
  customerPhone: string;
  setCustomerPhone: (val: string) => void;
  customerAddress: string;
  setCustomerAddress: (val: string) => void;
  customerGstin: string;
  setCustomerGstin: (val: string) => void;
  placeOfSupply: string;
  setPlaceOfSupply: (val: string) => void;
  challanNumber: string;
  setChallanNumber: (val: string) => void;
  vehicleNumber: string;
  setVehicleNumber: (val: string) => void;
  transporterName: string;
  setTransporterName: (val: string) => void;
  eWayBillNo: string;
  setEWayBillNo: (val: string) => void;
  issueDate: string;
  setIssueDate: (val: string) => void;
  items: ChallanItem[];
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateItem: (id: string, field: keyof ChallanItem, val: any) => void;
}

const uomOptions = ['NOS', 'SQFT', 'MTR', 'KG', 'SET', 'RFT', 'BOX', 'PCS'];

export const CreateChallanForm: React.FC<CreateChallanFormProps> = ({
  companyName,
  setCompanyName,
  contactPerson,
  setContactPerson,
  customerPhone,
  setCustomerPhone,
  customerAddress,
  setCustomerAddress,
  customerGstin,
  setCustomerGstin,
  placeOfSupply,
  setPlaceOfSupply,
  challanNumber,
  setChallanNumber,
  vehicleNumber,
  setVehicleNumber,
  transporterName,
  setTransporterName,
  eWayBillNo,
  setEWayBillNo,
  issueDate,
  setIssueDate,
  items,
  onAddItem,
  onRemoveItem,
  onUpdateItem,
}) => {
  return (
    <div className="space-y-6">
      {/* 2-Column Grid: Consignee Information & Logistics Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Consignee / Delivery Address */}
        <div className="lg:col-span-7 glass-panel p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderClr/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-txtPrimary">Consignee & Site Delivery Address</h3>
                <p className="text-[10px] text-txtSecondary">Destination client site & GST state code</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
              Dispatch Location
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Client Company Name */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                1. Client / Consignee Name
              </label>
              <input
                type="text"
                placeholder="e.g. Prestige Heights Site"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 2. Contact Person */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                2. Site Contact Person
              </label>
              <input
                type="text"
                placeholder="e.g. Site Supervisor Ramesh"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 3. Phone No */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                3. Site Contact Phone
              </label>
              <input
                type="text"
                placeholder="+91 98980 44556"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 4. Client GSTIN / PAN */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                4. Client GSTIN / PAN
              </label>
              <input
                type="text"
                placeholder="24AAACD1234E1Z5"
                value={customerGstin}
                onChange={(e) => setCustomerGstin(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold uppercase focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 5. Address */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                5. Full Delivery Site Address
              </label>
              <input
                type="text"
                placeholder="Plot 45, Luxury Villas, Science City Road, Ahmedabad"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* 6. Place of Supply * Dropdown Component */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                6. Place of Supply / Destination State *
              </label>
              <PlaceOfSupplySelect value={placeOfSupply} onChange={setPlaceOfSupply} />
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Transport & Logistics Metadata */}
        <div className="lg:col-span-5 glass-panel p-5 sm:p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-borderClr/30">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
                <Truck className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-txtPrimary">Transport & Logistics Info</h3>
                <p className="text-[10px] text-txtSecondary">Vehicle number, transporter & E-Way bill</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {/* Challan Number */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                Challan Number
              </label>
              <input
                type="text"
                value={challanNumber}
                onChange={(e) => setChallanNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-black focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                Vehicle Number
              </label>
              <input
                type="text"
                placeholder="e.g. GJ-01-XX-9821"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold uppercase focus:outline-none focus:border-primary/50"
              />
            </div>

            {/* Transporter & E-Way Bill */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                  Transporter Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Shree Logistics"
                  value={transporterName}
                  onChange={(e) => setTransporterName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                  E-Way Bill No
                </label>
                <input
                  type="text"
                  placeholder="e.g. EWAY-88129"
                  value={eWayBillNo}
                  onChange={(e) => setEWayBillNo(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>

            {/* Dispatch Date */}
            <div>
              <label className="block text-[11px] font-bold text-txtSecondary mb-1 uppercase tracking-wider">
                Dispatch Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-3.5 w-3.5 text-txtSecondary/60" />
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full pl-9 pr-2 py-2 text-xs rounded-xl bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Items Table Section - Reference Layout */}
      <div className="glass-panel p-4 sm:p-5 rounded-2xl space-y-3.5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-borderClr/30">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500">
              <PackageCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-txtPrimary">Dispatch Material Items</h3>
              <p className="text-[10px] text-txtSecondary">Manage dispatched goods, item specifications, quantity, UOM, and declared value</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-hoverBg/60 border border-borderClr/40 text-xs">
              <span className="text-[10px] font-bold text-txtSecondary">Discount :</span>
              <div className="inline-flex p-0.5 rounded-lg bg-cardBg border border-borderClr/30">
                <button type="button" className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-primary text-white shadow-xs">
                  ₹
                </button>
                <button type="button" className="px-2 py-0.5 text-[10px] font-bold rounded-md text-txtSecondary hover:text-txtPrimary transition-colors">
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

        {/* 10 Column Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px] table-fixed">
            <thead>
              <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[9px] font-bold text-txtSecondary uppercase tracking-wider">
                <th className="px-2 py-2.5 text-center w-[3%]">SR.</th>
                <th className="px-2 py-2.5 text-left w-[28%]">PRODUCT / DISPATCH MATERIAL</th>
                <th className="px-2 py-2.5 text-center w-[10%]">HSN/SAC CODE</th>
                <th className="px-2 py-2.5 text-center w-[8%]">QTY.</th>
                <th className="px-2 py-2.5 text-center w-[8%]">UOM</th>
                <th className="px-2 py-2.5 text-right w-[12%]">RATE / VALUE (₹)</th>
                <th className="px-2 py-2.5 text-right w-[9%]">DISCOUNT</th>
                <th className="px-2 py-2.5 text-right w-[10%]">CGST + SGST</th>
                <th className="px-2 py-2.5 text-right w-[11%]">TOTAL (₹)</th>
                <th className="px-2 py-2.5 text-center w-[3%]"></th>
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
                    <td className="px-2 py-2.5 text-center font-bold text-txtSecondary align-top pt-3 text-[11px] w-[3%]">
                      {idx + 1}
                    </td>

                    <td className="px-2 py-2.5 space-y-1.5 w-[28%] align-top">
                      <input
                        type="text"
                        placeholder="Enter Goods Name"
                        value={item.description}
                        onChange={(e) => onUpdateItem(item.id, 'description', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary focus:outline-none focus:border-primary/50 font-bold"
                      />
                      <textarea
                        rows={2}
                        placeholder="Packing Note & Specs..."
                        value={item.itemNotes || ''}
                        onChange={(e) => onUpdateItem(item.id, 'itemNotes', e.target.value)}
                        className="w-full px-2.5 py-1.5 min-h-[50px] text-[10px] rounded-lg bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-txtSecondary placeholder:text-txtSecondary/50 focus:outline-none focus:border-amber-500/50 font-medium resize-y"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[10%]">
                      <input
                        type="text"
                        placeholder="HSN/SAC"
                        value={item.hsnCode || ''}
                        onChange={(e) => onUpdateItem(item.id, 'hsnCode', e.target.value)}
                        className="w-full px-2 py-1.5 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[8%]">
                      <input
                        type="number"
                        min={1}
                        placeholder="Qty."
                        value={item.quantity || ''}
                        onChange={(e) => onUpdateItem(item.id, 'quantity', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-1.5 py-1.5 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[8%]">
                      <select
                        value={item.uom || 'NOS'}
                        onChange={(e) => onUpdateItem(item.id, 'uom', e.target.value)}
                        className="w-full px-1.5 py-1.5 text-xs text-center rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer"
                      >
                        {uomOptions.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-2 py-2.5 align-top w-[12%]">
                      <input
                        type="number"
                        min={0}
                        placeholder="Price"
                        value={item.unitPrice || ''}
                        onChange={(e) => onUpdateItem(item.id, 'unitPrice', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-2 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[9%]">
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={item.discount || ''}
                        onChange={(e) => onUpdateItem(item.id, 'discount', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-1.5 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-medium focus:outline-none focus:border-primary/50"
                      />
                    </td>

                    <td className="px-2 py-2.5 align-top w-[10%]">
                      <select
                        value={item.taxPercent !== undefined && item.taxPercent !== null && item.taxPercent !== ('' as any) ? item.taxPercent : ''}
                        onChange={(e) => onUpdateItem(item.id, 'taxPercent', e.target.value === '' ? '' : Number(e.target.value))}
                        className="w-full px-1.5 py-1.5 text-xs text-right rounded-lg bg-hoverBg/60 border border-borderClr/30 text-txtPrimary font-bold focus:outline-none focus:border-primary/50 cursor-pointer"
                      >
                        <option value="">Select Tax</option>
                        <option value={0}>0%</option>
                        <option value={18}>18% (9+9)</option>
                        <option value={12}>12% (6+6)</option>
                        <option value={5}>5% (2.5+2.5)</option>
                        <option value={28}>28% (14+14)</option>
                      </select>
                    </td>

                    <td className="px-2 py-2.5 text-right align-top pt-3 w-[11%] font-black text-txtPrimary tracking-tight">
                      {lineTotal > 0 ? `₹${lineTotal.toLocaleString('en-IN')}` : 'Total'}
                    </td>

                    <td className="px-2 py-2.5 text-center align-top pt-2 w-[3%]">
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

            {/* Bottom Summary Footer Row */}
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
                  <tr className="bg-amber-500/5 dark:bg-amber-500/10 border-t-2 border-amber-500/20 text-xs font-black text-txtPrimary">
                    <td colSpan={3} className="px-3 py-3 text-right uppercase tracking-wider font-extrabold text-amber-500">
                      Total Goods Value
                    </td>
                    <td className="px-2 py-3 text-center text-txtPrimary font-extrabold">
                      {totalQty > 0 ? totalQty : 0}
                    </td>
                    <td className="px-2 py-3 text-center text-txtSecondary font-medium">--</td>
                    <td className="px-2 py-3 text-right text-txtPrimary">
                      {subtotalSum > 0 ? `₹${subtotalSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-txtPrimary">
                      {discountSum > 0 ? `₹${discountSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-txtPrimary">
                      {taxSum > 0 ? `₹${taxSum.toLocaleString('en-IN')}` : 0}
                    </td>
                    <td className="px-2 py-3 text-right text-amber-500 text-sm font-black">
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
    </div>
  );
};
