import { Module } from '@nestjs/common';
import { InventoryController } from './presentation/inventory.controller';
import { CreateInventoryItemUseCase } from './application/create-inventory-item.use-case';
import { ListInventoryItemsUseCase } from './application/list-inventory-items.use-case';
import { GetInventoryItemUseCase } from './application/get-inventory-item.use-case';
import { AdjustStockUseCase } from './application/adjust-stock.use-case';
import { INVENTORY_REPOSITORY } from './domain/inventory-item.repository';
import { PrismaInventoryItemRepository } from './infrastructure/prisma-inventory-item.repository';

@Module({
  controllers: [InventoryController],
  providers: [
    CreateInventoryItemUseCase,
    ListInventoryItemsUseCase,
    GetInventoryItemUseCase,
    AdjustStockUseCase,
    { provide: INVENTORY_REPOSITORY, useClass: PrismaInventoryItemRepository },
  ],
  exports: [INVENTORY_REPOSITORY],
})
export class InventoryModule {}
