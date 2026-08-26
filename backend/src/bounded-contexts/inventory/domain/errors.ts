import { InvariantViolationError, NotFoundDomainError } from '../../../shared/domain/domain-error';

export class InventoryItemNotFoundError extends NotFoundDomainError {
  constructor(id: string) {
    super(`No se encontró el artículo de inventario con id ${id}.`);
  }
}

export class InvalidSkuError extends InvariantViolationError {}

export class InvalidQuantityError extends InvariantViolationError {}

export class InsufficientStockError extends InvariantViolationError {
  constructor() {
    super('No hay suficiente stock disponible para esta operación.');
  }
}

export class DuplicateSkuError extends InvariantViolationError {
  constructor(sku: string) {
    super(`Ya existe un artículo con el SKU "${sku}" en esta clínica.`);
  }
}
