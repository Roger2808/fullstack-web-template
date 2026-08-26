import { InvariantViolationError, NotFoundDomainError } from '../../../shared/domain/domain-error';

export class InvoiceNotFoundError extends NotFoundDomainError {
  constructor(id: string) {
    super(`No se encontró la factura con id ${id}.`);
  }
}

export class InvalidInvoiceItemError extends InvariantViolationError {}
export class InvoiceMustHaveItemsError extends InvariantViolationError {
  constructor() {
    super('La factura debe tener al menos una línea de detalle.');
  }
}
export class InvalidInvoiceTransitionError extends InvariantViolationError {}
