import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IssueInvoiceUseCase } from '../application/issue-invoice.use-case';
import { ListInvoicesUseCase } from '../application/list-invoices.use-case';
import { GetInvoiceUseCase } from '../application/get-invoice.use-case';
import { PayInvoiceUseCase } from '../application/pay-invoice.use-case';
import { CancelInvoiceUseCase } from '../application/cancel-invoice.use-case';
import { CreateInvoiceDto } from './dtos/create-invoice.dto';
import { InvoiceResponseDto } from './dtos/invoice-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(
    private readonly issueInvoice: IssueInvoiceUseCase,
    private readonly listInvoices: ListInvoicesUseCase,
    private readonly getInvoice: GetInvoiceUseCase,
    private readonly payInvoice: PayInvoiceUseCase,
    private readonly cancelInvoice: CancelInvoiceUseCase,
  ) {}

  @Get()
  async list(
    @Query('clinicId') clinicId: string,
  ): Promise<InvoiceResponseDto[]> {
    const invoices = await this.listInvoices.execute(clinicId);
    return invoices.map(InvoiceResponseDto.fromDomain);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<InvoiceResponseDto> {
    const invoice = await this.getInvoice.execute(id);
    return InvoiceResponseDto.fromDomain(invoice);
  }

  @Post()
  async create(@Body() dto: CreateInvoiceDto): Promise<InvoiceResponseDto> {
    const invoice = await this.issueInvoice.execute({
      clinicId: dto.clinicId,
      patientId: dto.patientId,
      currency: dto.currency,
      items: dto.items,
    });
    return InvoiceResponseDto.fromDomain(invoice);
  }

  @Patch(':id/pay')
  async pay(@Param('id') id: string): Promise<{ success: true }> {
    await this.payInvoice.execute(id);
    return { success: true };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<{ success: true }> {
    await this.cancelInvoice.execute(id);
    return { success: true };
  }
}
