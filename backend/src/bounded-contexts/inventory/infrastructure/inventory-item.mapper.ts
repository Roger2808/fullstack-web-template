import { InventoryItem as PrismaInventoryItem } from '@prisma/client';
import { InventoryItem } from '../domain/inventory-item.entity';
import { Sku } from '../domain/value-objects/sku';
import { Money } from '../../../shared/domain/value-objects/money';
import { UniqueEntityId } from '../../../shared/domain/entity';

export class InventoryItemMapper {
  static toDomain(raw: PrismaInventoryItem): InventoryItem {
    return InventoryItem.reconstitute(
      {
        clinicId: raw.clinicId,
        name: raw.name,
        sku: Sku.create(raw.sku),
        quantity: raw.quantity,
        minimumStock: raw.minimumStock,
        unitCost: Money.create(raw.unitCostCents),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(item: InventoryItem) {
    return {
      id: item.id.toString(),
      clinicId: item.clinicId,
      name: item.name,
      sku: item.sku.value,
      quantity: item.quantity,
      minimumStock: item.minimumStock,
      unitCostCents: item.unitCost.amountInCents,
      updatedAt: item.updatedAt,
    };
  }
}
