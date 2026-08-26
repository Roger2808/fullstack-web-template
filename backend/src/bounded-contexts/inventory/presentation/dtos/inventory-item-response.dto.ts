import { InventoryItem } from '../../domain/inventory-item.entity';

export class InventoryItemResponseDto {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  minimumStock: number;
  unitCostCents: number;
  lowStock: boolean;

  static fromDomain(item: InventoryItem): InventoryItemResponseDto {
    const dto = new InventoryItemResponseDto();
    dto.id = item.id.toString();
    dto.name = item.name;
    dto.sku = item.sku.value;
    dto.quantity = item.quantity;
    dto.minimumStock = item.minimumStock;
    dto.unitCostCents = item.unitCost.amountInCents;
    dto.lowStock = item.lowStock;
    return dto;
  }
}
