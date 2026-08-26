export type InvoiceStatus = "PENDING" | "PAID" | "CANCELLED";

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPriceCents: number;
}

export interface Invoice {
  id: string;
  patientId: string;
  status: InvoiceStatus;
  currency: string;
  items: InvoiceItem[];
  totalCents: number;
  issuedAt: string;
  paidAt?: string;
}

export interface IssueInvoiceInput {
  patientId: string;
  items: InvoiceItem[];
}

export const INVOICE_STATUS_LABEL: Record<InvoiceStatus, string> = {
  PENDING: "Pendiente",
  PAID: "Pagada",
  CANCELLED: "Cancelada",
};
