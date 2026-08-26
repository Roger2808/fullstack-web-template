import { DomainEvent } from '../../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../../shared/domain/entity';

export class AppointmentScheduledEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly appointmentId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.appointmentId;
  }
}

export class AppointmentConfirmedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly appointmentId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.appointmentId;
  }
}

export class AppointmentCancelledEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly appointmentId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.appointmentId;
  }
}

export class AppointmentCompletedEvent implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(private readonly appointmentId: UniqueEntityId) {}

  getAggregateId(): UniqueEntityId {
    return this.appointmentId;
  }
}
