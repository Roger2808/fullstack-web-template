"use client";

import { Button } from "@/shared/ui/Button";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Patient } from "@/features/patients/types";
import { Appointment, APPOINTMENT_STATUS_LABEL } from "../types";
import styles from "./AppointmentList.module.css";

function patientName(patients: Patient[], patientId: string): string {
  const patient = patients.find((p) => p.id === patientId);
  return patient ? `${patient.firstName} ${patient.lastName}` : "Paciente desconocido";
}

export function AppointmentList({
  appointments,
  patients,
  onConfirm,
  onCancel,
  onComplete,
}: {
  appointments: Appointment[];
  patients: Patient[];
  onConfirm: (id: string) => void;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  if (appointments.length === 0) {
    return <EmptyState>Todavía no hay citas agendadas.</EmptyState>;
  }

  return (
    <div className={styles.list}>
      {appointments.map((appointment) => (
        <div key={appointment.id} className={styles.row}>
          <div className={styles.info}>
            <span className={styles.name}>{patientName(patients, appointment.patientId)}</span>
            <span className={styles.meta}>
              Dr(a). {appointment.doctorName} ·{" "}
              {new Date(appointment.scheduledAt).toLocaleString("es-ES", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div className={styles.actions}>
            <StatusBadge>{APPOINTMENT_STATUS_LABEL[appointment.status]}</StatusBadge>
            {appointment.status === "PENDING" && (
              <Button variant="outline" size="sm" onClick={() => onConfirm(appointment.id)}>
                Confirmar
              </Button>
            )}
            {appointment.status === "CONFIRMED" && (
              <Button variant="outline" size="sm" onClick={() => onComplete(appointment.id)}>
                Completar
              </Button>
            )}
            {(appointment.status === "PENDING" || appointment.status === "CONFIRMED") && (
              <Button variant="danger" size="sm" onClick={() => onCancel(appointment.id)}>
                Cancelar
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
