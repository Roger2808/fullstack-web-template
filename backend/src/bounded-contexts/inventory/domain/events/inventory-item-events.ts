import { DomainEvent } from '../../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../../shared/domain/entity';

export class InventoryItemCreatedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly itemId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.itemId;
  }
}

export class StockAdjustedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(
    private readonly itemId: UniqueEntityId,
    readonly delta: number,
    readonly newQuantity: number,
  ) {}

  getAggregateId(): UniqueEntityId {
    return this.itemId;
  }
}

export class LowStockDetectedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(
    private readonly itemId: UniqueEntityId,
    readonly quantity: number,
    readonly minimumStock: number,
  ) {}

  getAggregateId(): UniqueEntityId {
    return this.itemId;
  }
}
