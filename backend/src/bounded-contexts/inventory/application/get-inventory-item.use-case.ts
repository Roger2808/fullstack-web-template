import { Inject, Injectable } from '@nestjs/common';
import { InventoryItem } from '../domain/inventory-item.entity';
import { INVENTORY_REPOSITORY } from '../domain/inventory-item.repository';
import type { InventoryRepository } from '../domain/inventory-item.repository';
import { InventoryItemNotFoundError } from '../domain/errors';

@Injectable()
export class GetInventoryItemUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(id: string): Promise<InventoryItem> {
    const item = await this.inventoryRepository.findById(id);
    if (!item) {
      throw new InventoryItemNotFoundError(id);
    }
    return item;
  }
}
