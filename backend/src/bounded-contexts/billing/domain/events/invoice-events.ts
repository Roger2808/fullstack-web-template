import { DomainEvent } from '../../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../../shared/domain/entity';

export class InvoiceIssuedEvent implements DomainEvent {
  readonly occurredAt = new Date();
  constructor(private readonly invoiceId: UniqueEntityId) {}
  getAggregateId(): UniqueEntityId {
    return this.invoiceId;
  }
}

export class InvoicePaidEvent implements DomainEvent {
  readonly occurredAt = new Date();
  constructor(private readonly invoiceId: UniqueEntityId) {}
  getAggregateId(): UniqueEntityId {
    return this.invoiceId;
  }
}

export class InvoiceCancelledEvent implements DomainEvent {
  readonly occurredAt = new Date();
  constructor(private readonly invoiceId: UniqueEntityId) {}
  getAggregateId(): UniqueEntityId {
    return this.invoiceId;
  }
}
