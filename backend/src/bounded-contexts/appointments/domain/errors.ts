import { InvariantViolationError, NotFoundDomainError } from '../../../shared/domain/domain-error';

export class AppointmentNotFoundError extends NotFoundDomainError {
  constructor(id: string) {
    super(`No se encontró la cita con id ${id}.`);
  }
}

export class InvalidScheduleError extends InvariantViolationError {}
export class InvalidAppointmentTransitionError extends InvariantViolationError {}
