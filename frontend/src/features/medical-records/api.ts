import { apiFetch, DEMO_CLINIC_ID } from "@/shared/api/config";
import { CreateMedicalRecordInput, MedicalRecord } from "./types";

export const medicalRecordsApi = {
  listByPatient: (patientId: string) =>
    apiFetch<MedicalRecord[]>(`/medical-records?patientId=${patientId}`),

  create: (input: CreateMedicalRecordInput) =>
    apiFetch<MedicalRecord>("/medical-records", {
      method: "POST",
      body: JSON.stringify({ ...input, clinicId: DEMO_CLINIC_ID }),
    }),
};
