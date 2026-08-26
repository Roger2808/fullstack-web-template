import { ValueObject } from '../../../../shared/domain/value-object';
import { InvariantViolationError } from '../../../../shared/domain/domain-error';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class InvalidEmailError extends InvariantViolationError {}

export class Email extends ValueObject<{ value: string }> {
  private constructor(props: { value: string }) {
    super(props);
  }

  static create(value: string): Email {
    if (!EMAIL_PATTERN.test(value)) {
      throw new InvalidEmailError(
        `"${value}" no es un correo electrónico válido.`,
      );
    }
    return new Email({ value: value.trim().toLowerCase() });
  }

  get value(): string {
    return this.props.value;
  }
}
