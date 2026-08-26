import { Inject, Injectable } from '@nestjs/common';
import { InventoryItem } from '../domain/inventory-item.entity';
import { INVENTORY_REPOSITORY } from '../domain/inventory-item.repository';
import type { InventoryRepository } from '../domain/inventory-item.repository';
import { InventoryItemNotFoundError } from '../domain/errors';

@Injectable()
export class AdjustStockUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(id: string, delta: number): Promise<InventoryItem> {
    const item = await this.inventoryRepository.findById(id);
    if (!item) {
      throw new InventoryItemNotFoundError(id);
    }
    item.adjustStock(delta);
    await this.inventoryRepository.save(item);
    return item;
  }
}
