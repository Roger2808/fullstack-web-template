import { apiFetch, DEMO_CLINIC_ID } from "@/shared/api/config";
import { CreatePatientInput, Patient } from "./types";

export const patientsApi = {
  list: () => apiFetch<Patient[]>(`/patients?clinicId=${DEMO_CLINIC_ID}`),

  create: (input: CreatePatientInput) =>
    apiFetch<Patient>("/patients", {
      method: "POST",
      body: JSON.stringify({ ...input, clinicId: DEMO_CLINIC_ID }),
    }),

  deactivate: (id: string) =>
    apiFetch<{ success: true }>(`/patients/${id}/deactivate`, { method: "PATCH" }),
};
