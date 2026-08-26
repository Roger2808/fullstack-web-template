import { Invoice } from '../../domain/invoice.entity';

class InvoiceItemResponse {
  description: string;
  quantity: number;
  unitPriceCents: number;
}

export class InvoiceResponseDto {
  id: string;
  patientId: string;
  status: string;
  currency: string;
  items: InvoiceItemResponse[];
  totalCents: number;
  issuedAt: string;
  paidAt?: string;

  static fromDomain(invoice: Invoice): InvoiceResponseDto {
    const dto = new InvoiceResponseDto();
    dto.id = invoice.id.toString();
    dto.patientId = invoice.patientId;
    dto.status = invoice.status;
    dto.currency = invoice.currency;
    dto.items = invoice.items.map((item) => ({
      description: item.description,
      quantity: item.quantity,
      unitPriceCents: item.unitPrice.amountInCents,
    }));
    dto.totalCents = invoice.total().amountInCents;
    dto.issuedAt = invoice.issuedAt.toISOString();
    dto.paidAt = invoice.paidAt?.toISOString();
    return dto;
  }
}
