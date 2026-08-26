"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/shared/api/config";
import { patientsApi } from "@/features/patients/api";
import { Patient } from "@/features/patients/types";
import { billingApi } from "../api";
import { Invoice, IssueInvoiceInput } from "../types";

export function useInvoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [invoiceList, patientList] = await Promise.all([billingApi.list(), patientsApi.list()]);
      setInvoices(invoiceList);
      setPatients(patientList);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const issue = useCallback(
    async (input: IssueInvoiceInput) => {
      setSubmitting(true);
      setError(null);
      try {
        await billingApi.issue(input);
        await load();
        return true;
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo generar la factura.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [load],
  );

  const pay = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await billingApi.pay(id);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo marcar la factura como pagada.");
      }
    },
    [load],
  );

  const cancel = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await billingApi.cancel(id);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo cancelar la factura.");
      }
    },
    [load],
  );

  return { invoices, patients, loading, error, submitting, issue, pay, cancel };
}
