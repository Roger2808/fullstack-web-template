import { InvariantViolationError, NotFoundDomainError } from '../../../shared/domain/domain-error';

export class PatientNotFoundError extends NotFoundDomainError {
  constructor(id: string) {
    super(`No se encontró al paciente con id ${id}.`);
  }
}

export class InvalidPatientNameError extends InvariantViolationError {}
export class InvalidDateOfBirthError extends InvariantViolationError {}
export class PatientAlreadyInactiveError extends InvariantViolationError {
  constructor() {
    super('El paciente ya se encuentra inactivo.');
  }
}
