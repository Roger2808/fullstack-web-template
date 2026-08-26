"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/shared/api/config";
import { patientsApi } from "../api";
import { CreatePatientInput, Patient } from "../types";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setPatients(await patientsApi.list());
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (input: CreatePatientInput) => {
      setSubmitting(true);
      setError(null);
      try {
        await patientsApi.create(input);
        await load();
        return true;
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo registrar al paciente.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [load],
  );

  const deactivate = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await patientsApi.deactivate(id);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo desactivar al paciente.");
      }
    },
    [load],
  );

  return { patients, loading, error, submitting, create, deactivate };
}
