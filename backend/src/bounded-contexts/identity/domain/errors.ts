import {
  InvariantViolationError,
  NotFoundDomainError,
} from '../../../shared/domain/domain-error';

export class UserNotFoundError extends NotFoundDomainError {
  constructor(id: string) {
    super(`No se encontró al usuario con id ${id}.`);
  }
}

export class InvalidCredentialsError extends InvariantViolationError {
  constructor() {
    super('Correo electrónico o contraseña incorrectos.');
  }
}

export class UserInactiveError extends InvariantViolationError {
  constructor() {
    super('Este usuario se encuentra inactivo.');
  }
}
