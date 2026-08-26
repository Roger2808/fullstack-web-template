export type AppointmentStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

export interface Appointment {
  id: string;
  patientId: string;
  doctorName: string;
  scheduledAt: string;
  status: AppointmentStatus;
  notes?: string;
}

export interface ScheduleAppointmentInput {
  patientId: string;
  doctorName: string;
  scheduledAt: string;
  notes?: string;
}

export const APPOINTMENT_STATUS_LABEL: Record<AppointmentStatus, string> = {
  PENDING: "Pendiente",
  CONFIRMED: "Confirmada",
  CANCELLED: "Cancelada",
  COMPLETED: "Completada",
};
