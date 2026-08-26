import { InvariantViolationError } from '../../../shared/domain/domain-error';

export class InvalidContactNameError extends InvariantViolationError {
  constructor() {
    super('El nombre es obligatorio.');
  }
}

export class InvalidContactSubjectError extends InvariantViolationError {
  constructor() {
    super('El asunto es obligatorio.');
  }
}

export class InvalidContactMessageError extends InvariantViolationError {
  constructor() {
    super('El mensaje debe tener al menos 10 caracteres.');
  }
}
