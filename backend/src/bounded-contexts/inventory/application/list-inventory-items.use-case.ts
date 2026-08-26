import { Inject, Injectable } from '@nestjs/common';
import { InventoryItem } from '../domain/inventory-item.entity';
import { INVENTORY_REPOSITORY } from '../domain/inventory-item.repository';
import type { InventoryRepository } from '../domain/inventory-item.repository';

@Injectable()
export class ListInventoryItemsUseCase {
  constructor(
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(clinicId: string): Promise<InventoryItem[]> {
    return this.inventoryRepository.findAllByClinic(clinicId);
  }
}
