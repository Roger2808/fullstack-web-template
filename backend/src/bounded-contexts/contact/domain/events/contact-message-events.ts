import { DomainEvent } from '../../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../../shared/domain/entity';

export class ContactMessageSubmittedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly contactMessageId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.contactMessageId;
  }
}
