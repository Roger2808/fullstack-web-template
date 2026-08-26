import { Invoice } from './invoice.entity';

export const INVOICE_REPOSITORY = Symbol('INVOICE_REPOSITORY');

export interface InvoiceRepository {
  save(invoice: Invoice): Promise<void>;
  findById(id: string): Promise<Invoice | null>;
  findAllByClinic(clinicId: string): Promise<Invoice[]>;
  sumRevenueByClinic(clinicId: string): Promise<number>;
  countPendingByClinic(clinicId: string): Promise<number>;
}
