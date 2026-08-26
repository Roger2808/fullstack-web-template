import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { InvoiceRepository } from '../domain/invoice.repository';
import { Invoice } from '../domain/invoice.entity';
import { InvoiceMapper } from './invoice.mapper';

@Injectable()
export class PrismaInvoiceRepository implements InvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(invoice: Invoice): Promise<void> {
    const existing = await this.prisma.invoice.findUnique({ where: { id: invoice.id.toString() } });

    if (!existing) {
      await this.prisma.invoice.create({ data: InvoiceMapper.toCreatePersistence(invoice) });
      return;
    }

    await this.prisma.invoice.update({
      where: { id: invoice.id.toString() },
      data: InvoiceMapper.toUpdatePersistence(invoice),
    });
  }

  async findById(id: string): Promise<Invoice | null> {
    const raw = await this.prisma.invoice.findUnique({ where: { id }, include: { items: true } });
    return raw ? InvoiceMapper.toDomain(raw) : null;
  }

  async findAllByClinic(clinicId: string): Promise<Invoice[]> {
    const raw = await this.prisma.invoice.findMany({
      where: { clinicId },
      include: { items: true },
      orderBy: { issuedAt: 'desc' },
    });
    return raw.map(InvoiceMapper.toDomain);
  }

  async sumRevenueByClinic(clinicId: string): Promise<number> {
    const paidInvoices = await this.prisma.invoice.findMany({
      where: { clinicId, status: 'PAID' },
      include: { items: true },
    });
    return paidInvoices.reduce((sum, invoice) => sum + InvoiceMapper.toDomain(invoice).total().amountInCents, 0);
  }

  async countPendingByClinic(clinicId: string): Promise<number> {
    return this.prisma.invoice.count({ where: { clinicId, status: 'PENDING' } });
  }
}
