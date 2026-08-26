import { Inject, Injectable } from '@nestjs/common';
import { Invoice } from '../domain/invoice.entity';
import { INVOICE_REPOSITORY } from '../domain/invoice.repository';
import type { InvoiceRepository } from '../domain/invoice.repository';

@Injectable()
export class ListInvoicesUseCase {
  constructor(@Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository) {}

  async execute(clinicId: string): Promise<Invoice[]> {
    return this.invoiceRepository.findAllByClinic(clinicId);
  }
}
