"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/shared/api/config";
import { patientsApi } from "@/features/patients/api";
import { Patient } from "@/features/patients/types";
import { medicalRecordsApi } from "../api";
import { CreateMedicalRecordInput, MedicalRecord } from "../types";

export function useMedicalRecords() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    patientsApi
      .list()
      .then((list) => {
        setPatients(list);
        if (list.length > 0) setSelectedPatientId(list[0].id);
      })
      .catch((err) => setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor."))
      .finally(() => setPatientsLoading(false));
  }, []);

  const loadRecords = useCallback(async (patientId: string) => {
    if (!patientId) return;
    setLoading(true);
    setError(null);
    try {
      setRecords(await medicalRecordsApi.listByPatient(patientId));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords(selectedPatientId);
  }, [selectedPatientId, loadRecords]);

  const create = useCallback(
    async (input: Omit<CreateMedicalRecordInput, "patientId">) => {
      if (!selectedPatientId) return false;
      setSubmitting(true);
      setError(null);
      try {
        await medicalRecordsApi.create({ ...input, patientId: selectedPatientId });
        await loadRecords(selectedPatientId);
        return true;
      } catch (err) {
        setError(err instanceof ApiError ? err.message : "No se pudo registrar el historial.");
        return false;
      } finally {
        setSubmitting(false);
      }
    },
    [selectedPatientId, loadRecords],
  );

  return {
    patients,
    patientsLoading,
    selectedPatientId,
    setSelectedPatientId,
    records,
    loading,
    error,
    submitting,
    create,
  };
}
