import { InvariantViolationError, NotFoundDomainError } from '../../../shared/domain/domain-error';

export class MedicalRecordNotFoundError extends NotFoundDomainError {
  constructor(id: string) {
    super(`No se encontró el historial médico con id ${id}.`);
  }
}

export class InvalidVisitDateError extends InvariantViolationError {}
