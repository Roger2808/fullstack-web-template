import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import { Money } from '../../../shared/domain/value-objects/money';
import { InvoiceLineItem } from './value-objects/invoice-line-item';
import { InvoiceIssuedEvent, InvoicePaidEvent, InvoiceCancelledEvent } from './events/invoice-events';
import { InvoiceMustHaveItemsError, InvalidInvoiceTransitionError } from './errors';

export type InvoiceStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export interface InvoiceProps {
  clinicId: string;
  patientId: string;
  status: InvoiceStatus;
  currency: string;
  items: InvoiceLineItem[];
  issuedAt: Date;
  paidAt?: Date;
}

export interface IssueInvoiceInput {
  clinicId: string;
  patientId: string;
  currency?: string;
  items: { description: string; quantity: number; unitPriceCents: number }[];
}

export class Invoice extends AggregateRoot<InvoiceProps> {
  private constructor(props: InvoiceProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static issue(input: IssueInvoiceInput): Invoice {
    if (!input.items || input.items.length === 0) {
      throw new InvoiceMustHaveItemsError();
    }

    const currency = input.currency ?? 'USD';
    const items = input.items.map((item) =>
      InvoiceLineItem.create(item.description, item.quantity, Money.create(item.unitPriceCents, currency)),
    );

    const invoice = new Invoice({
      clinicId: input.clinicId,
      patientId: input.patientId,
      status: 'PENDING',
      currency,
      items,
      issuedAt: new Date(),
    });

    invoice.addDomainEvent(new InvoiceIssuedEvent(invoice.id));
    return invoice;
  }

  static reconstitute(props: InvoiceProps, id: UniqueEntityId): Invoice {
    return new Invoice(props, id);
  }

  total(): Money {
    return this.props.items.reduce(
      (acc, item) => acc.add(item.subtotal()),
      Money.zero(this.props.currency),
    );
  }

  markAsPaid(): void {
    if (this.props.status !== 'PENDING') {
      throw new InvalidInvoiceTransitionError('Solo una factura pendiente puede marcarse como pagada.');
    }
    this.props.status = 'PAID';
    this.props.paidAt = new Date();
    this.addDomainEvent(new InvoicePaidEvent(this.id));
  }

  cancel(): void {
    if (this.props.status !== 'PENDING') {
      throw new InvalidInvoiceTransitionError('Solo una factura pendiente puede cancelarse.');
    }
    this.props.status = 'CANCELLED';
    this.addDomainEvent(new InvoiceCancelledEvent(this.id));
  }

  get clinicId(): string {
    return this.props.clinicId;
  }

  get patientId(): string {
    return this.props.patientId;
  }

  get status(): InvoiceStatus {
    return this.props.status;
  }

  get currency(): string {
    return this.props.currency;
  }

  get items(): InvoiceLineItem[] {
    return this.props.items;
  }

  get issuedAt(): Date {
    return this.props.issuedAt;
  }

  get paidAt(): Date | undefined {
    return this.props.paidAt;
  }
}
