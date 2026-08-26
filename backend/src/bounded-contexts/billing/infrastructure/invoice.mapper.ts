import { Invoice as PrismaInvoice, InvoiceItem as PrismaInvoiceItem } from '@prisma/client';
import { Invoice, InvoiceStatus } from '../domain/invoice.entity';
import { InvoiceLineItem } from '../domain/value-objects/invoice-line-item';
import { Money } from '../../../shared/domain/value-objects/money';
import { UniqueEntityId } from '../../../shared/domain/entity';

type PrismaInvoiceWithItems = PrismaInvoice & { items: PrismaInvoiceItem[] };

export class InvoiceMapper {
  static toDomain(raw: PrismaInvoiceWithItems): Invoice {
    return Invoice.reconstitute(
      {
        clinicId: raw.clinicId,
        patientId: raw.patientId,
        status: raw.status as InvoiceStatus,
        currency: raw.currency,
        items: raw.items.map((item) =>
          InvoiceLineItem.create(item.description, item.quantity, Money.create(item.unitPriceCents, raw.currency)),
        ),
        issuedAt: raw.issuedAt,
        paidAt: raw.paidAt ?? undefined,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toCreatePersistence(invoice: Invoice) {
    return {
      id: invoice.id.toString(),
      clinicId: invoice.clinicId,
      patientId: invoice.patientId,
      status: invoice.status,
      currency: invoice.currency,
      issuedAt: invoice.issuedAt,
      paidAt: invoice.paidAt ?? null,
      items: {
        create: invoice.items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          unitPriceCents: item.unitPrice.amountInCents,
        })),
      },
    };
  }

  static toUpdatePersistence(invoice: Invoice) {
    return {
      status: invoice.status,
      paidAt: invoice.paidAt ?? null,
    };
  }
}
