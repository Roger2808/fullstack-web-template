export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minimumStock: number;
  unitCostCents: number;
  lowStock: boolean;
}

export interface CreateInventoryItemInput {
  name: string;
  sku: string;
  quantity: number;
  minimumStock: number;
  unitCostCents: number;
}
