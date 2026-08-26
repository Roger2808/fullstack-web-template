import { Inject, Injectable } from '@nestjs/common';
import { CreateInventoryItemInput, InventoryItem } from '../domain/inventory-item.entity';
import { INVENTORY_REPOSITORY } from '../domain/inventory-item.repository';
import type { InventoryRepository } from '../domain/inventory-item.repository';
import { DuplicateSkuError } from '../domain/errors';

@Injectable()
export class CreateInventoryItemUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(input: CreateInventoryItemInput): Promise<InventoryItem> {
    const existing = await this.inventoryRepository.findBySku(input.clinicId, input.sku);
    if (existing) {
      throw new DuplicateSkuError(input.sku);
    }

    const item = InventoryItem.create(input);
    await this.inventoryRepository.save(item);
    return item;
  }
}
