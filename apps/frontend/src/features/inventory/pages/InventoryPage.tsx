'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Plus, AlertCircle, Layers, TrendingUp, RefreshCw, Loader2 } from 'lucide-react';
import { useInventory, useCreateProduct, InventoryProduct } from '../api/inventory.api';
import { InventoryFormModal } from '../components/InventoryFormModal';
import { formatINR } from '@/features/dashboard/constants';
import { useToastStore } from '@/lib/toast.store';
import {
  pageHeaderVariants,
  staggerContainerVariants,
  springItemVariants,
} from '@/config/animations';

export default function InventoryPage() {
  const { addToast } = useToastStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live inventory from cloud database
  const { data: inventoryData, isLoading, refetch } = useInventory({
    search: searchTerm || undefined,
  });

  const createProductMutation = useCreateProduct();

  const productsList = useMemo(() => {
    return inventoryData?.products || [];
  }, [inventoryData]);

  const filteredItems = useMemo(() => {
    return productsList.filter((item) => {
      const stock = (item.inventoryStocks || []).reduce((acc, s) => acc + (Number(s.quantity) || 0), 0);
      let status = 'IN_STOCK';
      if (stock === 0) status = 'OUT_OF_STOCK';
      else if (stock <= item.minStockLevel) status = 'LOW_STOCK';

      const matchesStatus = selectedStatus === 'ALL' || status === selectedStatus;
      return matchesStatus;
    });
  }, [productsList, selectedStatus]);

  const totalSKUs = productsList.length;
  const totalValuation = useMemo(() => {
    return productsList.reduce((acc, item) => {
      const stock = (item.inventoryStocks || []).reduce((sum, s) => sum + (Number(s.quantity) || 0), 0);
      return acc + stock * Number(item.sellingPrice || 0);
    }, 0);
  }, [productsList]);

  const lowStockCount = useMemo(() => {
    return productsList.filter((item) => {
      const stock = (item.inventoryStocks || []).reduce((sum, s) => sum + (Number(s.quantity) || 0), 0);
      return stock <= item.minStockLevel;
    }).length;
  }, [productsList]);

  const handleSaveProduct = async (formData: any) => {
    try {
      await createProductMutation.mutateAsync({
        sku: formData.sku,
        name: formData.name,
        category: formData.category || 'WINDOW_CURTAINS',
        hsnCode: formData.hsnCode,
        unitOfMeasure: formData.uom || 'METERS',
        purchasePrice: Number(formData.purchasePrice || 0),
        sellingPrice: Number(formData.sellingPrice || formData.unitPrice || 0),
        taxRatePercent: Number(formData.taxRate || 18),
        minStockLevel: Number(formData.minStockLevel || formData.reorderLevel || 5),
        initialStock: Number(formData.stockQty || 0),
      });
      addToast({
        title: 'Product Cataloged',
        message: `${formData.name} was successfully registered.`,
        type: 'success',
      });
      setIsModalOpen(false);
    } catch (err: any) {
      addToast({
        title: 'Failed to Catalog Product',
        message: err.message || 'Could not save product item.',
        type: 'error',
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <motion.div
        variants={pageHeaderVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-2 border-b border-borderClr/30"
      >
        <div>
          <h1 className="text-2xl font-black text-txtPrimary tracking-tight">Inventory & Catalog</h1>
          <p className="text-xs text-txtSecondary mt-0.5">
            Stock quantities, HSN codes, UOM tracking, and valuation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="p-2.5 rounded-xl bg-hoverBg hover:bg-hoverBg/80 text-txtSecondary hover:text-txtPrimary transition-colors border border-borderClr/40"
            title="Refresh Inventory"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-primary/25 transition-all active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Stock Item</span>
          </button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* KPI 1 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Total SKUs</p>
            <p className="text-2xl font-black text-txtPrimary">{totalSKUs}</p>
            <p className="text-[10px] text-txtSecondary font-medium">Catalog items in system</p>
          </div>
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Layers className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 2 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Inventory Valuation</p>
            <p className="text-2xl font-black text-txtPrimary">{formatINR(totalValuation)}</p>
            <p className="text-[10px] text-emerald-500 font-medium">Realized asset value</p>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
            <TrendingUp className="h-5 w-5" />
          </div>
        </motion.div>

        {/* KPI 3 */}
        <motion.div variants={springItemVariants} className="glass-panel p-5 rounded-3xl flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-txtSecondary uppercase tracking-wider">Low Stock Alerts</p>
            <p className="text-2xl font-black text-txtPrimary">{lowStockCount}</p>
            <p className="text-[10px] text-amber-500 font-medium">Below reorder thresholds</p>
          </div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <AlertCircle className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div variants={springItemVariants} className="col-span-1 md:col-span-3 glass-panel p-0 rounded-3xl overflow-hidden">
          {/* Controls Bar */}
          <div className="p-6 border-b border-borderClr/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-txtSecondary" />
              <input
                type="text"
                placeholder="Search SKU, item name, HSN code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-hoverBg/50 border border-borderClr/40 text-txtPrimary placeholder-txtSecondary/60 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {['ALL', 'IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK'].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    selectedStatus === status
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-txtSecondary hover:text-txtPrimary hover:bg-hoverBg'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-hoverBg/40 border-b border-borderClr/30 text-[10px] font-extrabold text-txtSecondary uppercase tracking-wider">
                  <th className="px-6 py-3.5">SKU & Item Details</th>
                  <th className="px-6 py-3.5">Category</th>
                  <th className="px-6 py-3.5">HSN Code</th>
                  <th className="px-6 py-3.5 text-center">Available Stock</th>
                  <th className="px-6 py-3.5 text-right">Selling Price</th>
                  <th className="px-6 py-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderClr/20">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <Loader2 className="w-5 h-5 animate-spin mx-auto mb-2 text-primary" />
                      Loading inventory records from database...
                    </td>
                  </tr>
                ) : filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-txtSecondary">
                      <p className="font-semibold text-txtPrimary">No inventory cataloged</p>
                      <p className="text-[11px] mt-1 text-txtSecondary">
                        Add fabrics, blinds, wallpapers, or decor items to your warehouse.
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add First Stock Item
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => {
                    const stock = (item.inventoryStocks || []).reduce((acc, s) => acc + (Number(s.quantity) || 0), 0);
                    let statusBadge = 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
                    let statusLabel = 'IN STOCK';
                    if (stock === 0) {
                      statusBadge = 'bg-red-500/10 text-red-500 border-red-500/20';
                      statusLabel = 'OUT OF STOCK';
                    } else if (stock <= item.minStockLevel) {
                      statusBadge = 'bg-amber-500/10 text-amber-500 border-amber-500/20';
                      statusLabel = 'LOW STOCK';
                    }

                    return (
                      <tr key={item.id} className="hover:bg-hoverBg/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-txtPrimary">{item.name}</p>
                          <p className="text-[10px] text-primary font-mono">{item.sku}</p>
                        </td>

                        <td className="px-6 py-4 text-txtSecondary font-medium">
                          {item.category.replace('_', ' ')}
                        </td>

                        <td className="px-6 py-4 text-txtSecondary font-mono text-[11px]">
                          {item.hsnCode || '—'}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className="font-mono font-bold text-txtPrimary bg-hoverBg px-3 py-1 rounded-full text-xs">
                            {stock} {item.unitOfMeasure}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-right font-black text-txtPrimary">
                          {formatINR(Number(item.sellingPrice) || 0)}
                        </td>

                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusBadge}`}>
                            {statusLabel}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <InventoryFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
      />
    </div>
  );
}
