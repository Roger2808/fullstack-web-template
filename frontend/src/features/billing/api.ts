import { apiFetch, DEMO_CLINIC_ID } from "@/shared/api/config";
import { Invoice, IssueInvoiceInput } from "./types";

export const billingApi = {
  list: () => apiFetch<Invoice[]>(`/invoices?clinicId=${DEMO_CLINIC_ID}`),

  issue: (input: IssueInvoiceInput) =>
    apiFetch<Invoice>("/invoices", {
      method: "POST",
      body: JSON.stringify({ ...input, clinicId: DEMO_CLINIC_ID }),
    }),

  pay: (id: string) => apiFetch<{ success: true }>(`/invoices/${id}/pay`, { method: "PATCH" }),

  cancel: (id: string) =>
    apiFetch<{ success: true }>(`/invoices/${id}/cancel`, { method: "PATCH" }),
};
