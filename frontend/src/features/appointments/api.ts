import { apiFetch, DEMO_CLINIC_ID } from "@/shared/api/config";
import { Appointment, ScheduleAppointmentInput } from "./types";

export const appointmentsApi = {
  list: () => apiFetch<Appointment[]>(`/appointments?clinicId=${DEMO_CLINIC_ID}`),

  schedule: (input: ScheduleAppointmentInput) =>
    apiFetch<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify({ ...input, clinicId: DEMO_CLINIC_ID }),
    }),

  confirm: (id: string) =>
    apiFetch<{ success: true }>(`/appointments/${id}/confirm`, { method: "PATCH" }),

  cancel: (id: string) =>
    apiFetch<{ success: true }>(`/appointments/${id}/cancel`, { method: "PATCH" }),

  complete: (id: string) =>
    apiFetch<{ success: true }>(`/appointments/${id}/complete`, { method: "PATCH" }),
};
