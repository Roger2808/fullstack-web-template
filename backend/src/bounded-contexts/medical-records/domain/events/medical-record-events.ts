import { DomainEvent } from '../../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../../shared/domain/entity';

export class MedicalRecordCreatedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly medicalRecordId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.medicalRecordId;
  }
}
