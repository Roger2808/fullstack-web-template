import { ValueObject } from '../../../../shared/domain/value-object';
import { InvalidSkuError } from '../errors';

export class Sku extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
  }

  static create(value: string): Sku {
    const normalized = value?.trim().toUpperCase().replace(/\s+/g, '');
    if (!normalized) {
      throw new InvalidSkuError('El SKU no puede estar vacío.');
    }
    return new Sku({ value: normalized });
  }

  get value(): string {
    return this.props.value;
  }
}
