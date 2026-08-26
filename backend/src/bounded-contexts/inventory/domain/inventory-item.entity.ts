import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import { Money } from '../../../shared/domain/value-objects/money';
import { Sku } from './value-objects/sku';
import {
  InventoryItemCreatedEvent,
  LowStockDetectedEvent,
  StockAdjustedEvent,
} from './events/inventory-item-events';
import { InsufficientStockError, InvalidQuantityError } from './errors';

export interface InventoryItemProps {
  clinicId: string;
  name: string;
  sku: Sku;
  quantity: number;
  minimumStock: number;
  unitCost: Money;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateInventoryItemInput {
  clinicId: string;
  name: string;
  sku: string;
  quantity: number;
  minimumStock: number;
  unitCostCents: number;
}

export class InventoryItem extends AggregateRoot<InventoryItemProps> {
  private constructor(props: InventoryItemProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(input: CreateInventoryItemInput): InventoryItem {
    if (!Number.isInteger(input.quantity) || input.quantity < 0) {
      throw new InvalidQuantityError('La cantidad inicial debe ser un entero mayor o igual a cero.');
    }
    if (!Number.isInteger(input.minimumStock) || input.minimumStock < 0) {
      throw new InvalidQuantityError('El stock mínimo debe ser un entero mayor o igual a cero.');
    }

    const now = new Date();
    const item = new InventoryItem({
      clinicId: input.clinicId,
      name: input.name,
      sku: Sku.create(input.sku),
      quantity: input.quantity,
      minimumStock: input.minimumStock,
      unitCost: Money.create(input.unitCostCents),
      createdAt: now,
      updatedAt: now,
    });

    item.addDomainEvent(new InventoryItemCreatedEvent(item.id));
    return item;
  }

  static reconstitute(props: InventoryItemProps, id: UniqueEntityId): InventoryItem {
    return new InventoryItem(props, id);
  }

  adjustStock(delta: number): void {
    const newQuantity = this.props.quantity + delta;
    if (newQuantity < 0) {
      throw new InsufficientStockError();
    }

    this.props.quantity = newQuantity;
    this.props.updatedAt = new Date();
    this.addDomainEvent(new StockAdjustedEvent(this.id, delta, newQuantity));

    if (newQuantity <= this.props.minimumStock) {
      this.addDomainEvent(new LowStockDetectedEvent(this.id, newQuantity, this.props.minimumStock));
    }
  }

  get clinicId(): string {
    return this.props.clinicId;
  }

  get name(): string {
    return this.props.name;
  }

  get sku(): Sku {
    return this.props.sku;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get minimumStock(): number {
    return this.props.minimumStock;
  }

  get unitCost(): Money {
    return this.props.unitCost;
  }

  get lowStock(): boolean {
    return this.props.quantity <= this.props.minimumStock;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
