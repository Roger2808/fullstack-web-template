import { ValueObject } from '../../../../shared/domain/value-object';
import { Money } from '../../../../shared/domain/value-objects/money';
import { InvalidInvoiceItemError } from '../errors';

interface InvoiceLineItemProps {
  description: string;
  quantity: number;
  unitPrice: Money;
}

export class InvoiceLineItem extends ValueObject<InvoiceLineItemProps> {
  private constructor(props: InvoiceLineItemProps) {
    super(props);
  }

  static create(description: string, quantity: number, unitPrice: Money): InvoiceLineItem {
    if (!description?.trim()) {
      throw new InvalidInvoiceItemError('La descripción de la línea de factura es obligatoria.');
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new InvalidInvoiceItemError('La cantidad debe ser un entero mayor a cero.');
    }
    return new InvoiceLineItem({ description: description.trim(), quantity, unitPrice });
  }

  subtotal(): Money {
    return Money.create(this.props.unitPrice.amountInCents * this.props.quantity, this.props.unitPrice.currency);
  }

  get description(): string {
    return this.props.description;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get unitPrice(): Money {
    return this.props.unitPrice;
  }
}
