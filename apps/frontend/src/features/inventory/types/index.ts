export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  hsnCode: string;
  hsn?: string;
  stockQty: number;
  stockQuantity?: number;
  uom: string;
  unit?: string;
  unitPrice: number;
  totalValue?: number;
  reorderLevel: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}
