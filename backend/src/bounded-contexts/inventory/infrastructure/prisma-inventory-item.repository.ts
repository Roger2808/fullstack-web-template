import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { InventoryRepository } from '../domain/inventory-item.repository';
import { InventoryItem } from '../domain/inventory-item.entity';
import { InventoryItemMapper } from './inventory-item.mapper';
import { Sku } from '../domain/value-objects/sku';

@Injectable()
export class PrismaInventoryItemRepository implements InventoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(item: InventoryItem): Promise<void> {
    const data = InventoryItemMapper.toPersistence(item);
    await this.prisma.inventoryItem.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<InventoryItem | null> {
    const raw = await this.prisma.inventoryItem.findUnique({ where: { id } });
    return raw ? InventoryItemMapper.toDomain(raw) : null;
  }

  async findAllByClinic(clinicId: string): Promise<InventoryItem[]> {
    const raw = await this.prisma.inventoryItem.findMany({
      where: { clinicId },
      orderBy: { createdAt: 'desc' },
    });
    return raw.map(InventoryItemMapper.toDomain);
  }

  async findBySku(clinicId: string, sku: string): Promise<InventoryItem | null> {
    const normalized = Sku.create(sku).value;
    const raw = await this.prisma.inventoryItem.findUnique({
      where: { clinicId_sku: { clinicId, sku: normalized } },
    });
    return raw ? InventoryItemMapper.toDomain(raw) : null;
  }

  async countLowStockByClinic(clinicId: string): Promise<number> {
    const items = await this.prisma.inventoryItem.findMany({
      where: { clinicId },
      select: { quantity: true, minimumStock: true },
    });
    return items.filter((item) => item.quantity <= item.minimumStock).length;
  }
}
