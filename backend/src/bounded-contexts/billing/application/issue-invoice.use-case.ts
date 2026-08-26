import { Inject, Injectable } from '@nestjs/common';
import { Invoice, IssueInvoiceInput } from '../domain/invoice.entity';
import { INVOICE_REPOSITORY } from '../domain/invoice.repository';
import type { InvoiceRepository } from '../domain/invoice.repository';

@Injectable()
export class IssueInvoiceUseCase {
  constructor(@Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository) {}

  async execute(input: IssueInvoiceInput): Promise<Invoice> {
    const invoice = Invoice.issue(input);
    await this.invoiceRepository.save(invoice);
    return invoice;
  }
}
