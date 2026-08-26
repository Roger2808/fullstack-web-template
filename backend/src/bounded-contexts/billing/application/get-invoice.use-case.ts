import { Inject, Injectable } from '@nestjs/common';
import { Invoice } from '../domain/invoice.entity';
import { INVOICE_REPOSITORY } from '../domain/invoice.repository';
import type { InvoiceRepository } from '../domain/invoice.repository';
import { InvoiceNotFoundError } from '../domain/errors';

@Injectable()
export class GetInvoiceUseCase {
  constructor(@Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository) {}

  async execute(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new InvoiceNotFoundError(id);
    }
    return invoice;
  }
}
