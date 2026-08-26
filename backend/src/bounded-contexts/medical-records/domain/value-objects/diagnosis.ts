import { ValueObject } from '../../../../shared/domain/value-object';
import { InvariantViolationError } from '../../../../shared/domain/domain-error';

export class InvalidDiagnosisError extends InvariantViolationError {}

export class Diagnosis extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
  }

  static create(value: string): Diagnosis {
    if (!value?.trim()) {
      throw new InvalidDiagnosisError('El diagnóstico es obligatorio.');
    }
    return new Diagnosis({ value: value.trim() });
  }

  get value(): string {
    return this.props.value;
  }
}
