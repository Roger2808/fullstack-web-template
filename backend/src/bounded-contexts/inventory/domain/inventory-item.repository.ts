import { InventoryItem } from './inventory-item.entity';

export const INVENTORY_REPOSITORY = Symbol('INVENTORY_REPOSITORY');

export interface InventoryRepository {
  save(item: InventoryItem): Promise<void>;
  findById(id: string): Promise<InventoryItem | null>;
  findAllByClinic(clinicId: string): Promise<InventoryItem[]>;
  findBySku(clinicId: string, sku: string): Promise<InventoryItem | null>;
  countLowStockByClinic(clinicId: string): Promise<number>;
}
