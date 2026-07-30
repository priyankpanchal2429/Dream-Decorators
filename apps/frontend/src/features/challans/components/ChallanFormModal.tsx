'use client';

import React, { useState } from 'react';
import { Truck, User } from 'lucide-react';
import { Drawer } from '@/components/ui/Drawer';
import { DeliveryChallan } from '../types';

interface ChallanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<DeliveryChallan>) => void;
}

export const ChallanFormModal: React.FC<ChallanFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [customerName, setCustomerName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [dispatchDate, setDispatchDate] = useState('2026-07-30');
  const [itemCount, setItemCount] = useState('');
  const [status, setStatus] = useState<'DELIVERED' | 'IN_TRANSIT' | 'RETURNED'>('IN_TRANSIT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) return;

    onSave({
      challanNumber: `DC-2026-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      vehicleNumber: vehicleNumber || 'GJ-01-AB-1234',
      dispatchDate,
      itemCount: parseInt(itemCount) || 5,
      status,
    });

    setCustomerName('');
    setVehicleNumber('');
    setItemCount('');
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Create Delivery Challan"
      description="Issue vehicle dispatch note for goods movement and delivery."
      icon={<Truck className="h-5 w-5 text-teal-500" />}
      maxWidth="max-w-xl"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-txtSecondary hover:bg-hoverBg transition-colors font-bold text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs shadow-lg shadow-teal-500/20 transition-all"
          >
            Generate Challan
          </button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium">
        <div>
          <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
            Customer / Recipient Name *
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
            <input
              type="text"
              required
              placeholder="e.g. Aarav Sharma"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary focus:outline-none focus:border-teal-500/50 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Vehicle Number
            </label>
            <input
              type="text"
              placeholder="e.g. GJ-01-AB-4921"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-mono font-bold focus:outline-none uppercase"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Dispatch Date
            </label>
            <input
              type="date"
              value={dispatchDate}
              onChange={(e) => setDispatchDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Items Count (NOS) *
            </label>
            <input
              type="number"
              required
              placeholder="e.g. 5"
              value={itemCount}
              onChange={(e) => setItemCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-txtSecondary uppercase tracking-wider mb-1">
              Delivery Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary font-bold focus:outline-none"
            >
              <option value="IN_TRANSIT">IN TRANSIT (On Road)</option>
              <option value="DELIVERED">DELIVERED (Signed)</option>
              <option value="RETURNED">RETURNED</option>
            </select>
          </div>
        </div>
      </form>
    </Drawer>
  );
};
