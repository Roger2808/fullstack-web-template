"use client";

import { Button } from "@/shared/ui/Button";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Patient } from "@/features/patients/types";
import { Invoice, INVOICE_STATUS_LABEL } from "../types";
import styles from "./InvoiceList.module.css";

function formatCents(cents: number, currency: string) {
  return new Intl.NumberFormat("es", { style: "currency", currency }).format(cents / 100);
}

export function InvoiceList({
  invoices,
  patients,
  onPay,
  onCancel,
}: {
  invoices: Invoice[];
  patients: Patient[];
  onPay: (id: string) => void;
  onCancel: (id: string) => void;
}) {
  if (invoices.length === 0) {
    return <EmptyState>Todavía no hay facturas generadas.</EmptyState>;
  }

  const patientName = (patientId: string) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : "Paciente desconocido";
  };

  return (
    <div className={styles.list}>
      {invoices.map((invoice) => (
        <div key={invoice.id} className={styles.row}>
          <div className={styles.info}>
            <span className={styles.name}>{patientName(invoice.patientId)}</span>
            <span className={styles.meta}>
              {formatCents(invoice.totalCents, invoice.currency)} ·{" "}
              {new Date(invoice.issuedAt).toLocaleDateString("es")}
            </span>
          </div>
          <div className={styles.actions}>
            <StatusBadge>{INVOICE_STATUS_LABEL[invoice.status]}</StatusBadge>
            {invoice.status === "PENDING" && (
              <>
                <Button variant="outline" size="sm" onClick={() => onPay(invoice.id)}>
                  Marcar como pagada
                </Button>
                <Button variant="danger" size="sm" onClick={() => onCancel(invoice.id)}>
                  Cancelar
                </Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
