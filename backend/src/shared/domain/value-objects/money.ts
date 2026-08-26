import { ValueObject } from '../value-object';
import { InvariantViolationError } from '../domain-error';

interface MoneyProps {
  amountInCents: number;
  currency: string;
}

export class InvalidMoneyError extends InvariantViolationError {}

export class Money extends ValueObject<MoneyProps> {
  private constructor(props: MoneyProps) {
    super(props);
  }

  static create(amountInCents: number, currency = 'USD'): Money {
    if (!Number.isInteger(amountInCents) || amountInCents < 0) {
      throw new InvalidMoneyError(
        'El monto debe ser un entero en centavos mayor o igual a cero.',
      );
    }
    return new Money({ amountInCents, currency });
  }

  static zero(currency = 'USD'): Money {
    return new Money({ amountInCents: 0, currency });
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money({
      amountInCents: this.props.amountInCents + other.props.amountInCents,
      currency: this.props.currency,
    });
  }

  private assertSameCurrency(other: Money): void {
    if (this.props.currency !== other.props.currency) {
      throw new InvalidMoneyError('No se pueden combinar montos con distinta moneda.');
    }
  }

  get amountInCents(): number {
    return this.props.amountInCents;
  }

  get currency(): string {
    return this.props.currency;
  }
}
