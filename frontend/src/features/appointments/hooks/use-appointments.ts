"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/shared/api/config";
import { patientsApi } from "@/features/patients/api";
import { Patient } from "@/features/patients/types";
import { appointmentsApi } from "../api";
import { Appointment, ScheduleAppointmentInput } from "../types";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentsResult, patientsResult] = await Promise.all([
        appointmentsApi.list(),
        patientsApi.list(),
      ]);
      setAppointments(appointmentsResult);
      setPatients(patientsResult);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const schedule = useCallback(
    async (input: ScheduleAppointmentInput) => {
      setSubmitting(true);
      setError(null);
      try {
        await appointmentsApi.schedule(input);
        await load();
        return true;
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo agendar la cita.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [load],
  );

  const confirm = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await appointmentsApi.confirm(id);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo confirmar la cita.");
      }
    },
    [load],
  );

  const cancel = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await appointmentsApi.cancel(id);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo cancelar la cita.");
      }
    },
    [load],
  );

  const complete = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await appointmentsApi.complete(id);
        await load();
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo completar la cita.");
      }
    },
    [load],
  );

  return { appointments, patients, loading, error, submitting, schedule, confirm, cancel, complete };
}
