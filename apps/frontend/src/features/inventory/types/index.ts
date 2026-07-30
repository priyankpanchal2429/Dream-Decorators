export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  hsnCode: string;
  stockQty: number;
  uom: string;
  unitPrice: number;
  reorderLevel: number;
  status: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK';
}
