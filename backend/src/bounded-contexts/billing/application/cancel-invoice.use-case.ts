import { Inject, Injectable } from '@nestjs/common';
import { INVOICE_REPOSITORY } from '../domain/invoice.repository';
import type { InvoiceRepository } from '../domain/invoice.repository';
import { InvoiceNotFoundError } from '../domain/errors';

@Injectable()
export class CancelInvoiceUseCase {
  constructor(@Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository) {}

  async execute(id: string): Promise<void> {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new InvoiceNotFoundError(id);
    }
    invoice.cancel();
    await this.invoiceRepository.save(invoice);
  }
}
