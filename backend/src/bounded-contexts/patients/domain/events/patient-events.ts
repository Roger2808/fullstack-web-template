import { DomainEvent } from '../../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../../shared/domain/entity';

export class PatientRegisteredEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly patientId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.patientId;
  }
}

export class PatientDeactivatedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly patientId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.patientId;
  }
}
