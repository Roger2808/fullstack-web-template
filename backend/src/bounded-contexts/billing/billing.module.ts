import { Module } from '@nestjs/common';
import { InvoicesController } from './presentation/invoices.controller';
import { IssueInvoiceUseCase } from './application/issue-invoice.use-case';
import { ListInvoicesUseCase } from './application/list-invoices.use-case';
import { GetInvoiceUseCase } from './application/get-invoice.use-case';
import { PayInvoiceUseCase } from './application/pay-invoice.use-case';
import { CancelInvoiceUseCase } from './application/cancel-invoice.use-case';
import { INVOICE_REPOSITORY } from './domain/invoice.repository';
import { PrismaInvoiceRepository } from './infrastructure/prisma-invoice.repository';

@Module({
  controllers: [InvoicesController],
  providers: [
    IssueInvoiceUseCase,
    ListInvoicesUseCase,
    GetInvoiceUseCase,
    PayInvoiceUseCase,
    CancelInvoiceUseCase,
    { provide: INVOICE_REPOSITORY, useClass: PrismaInvoiceRepository },
  ],
  exports: [INVOICE_REPOSITORY],
})
export class BillingModule {}
