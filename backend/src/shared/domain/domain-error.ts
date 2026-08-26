export abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

export class NotFoundDomainError extends DomainError {}
export class InvariantViolationError extends DomainError {}
