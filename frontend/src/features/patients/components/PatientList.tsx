"use client";

import { Button } from "@/shared/ui/Button";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { Patient } from "../types";
import styles from "./PatientList.module.css";

export function PatientList({
  patients,
  onDeactivate,
}: {
  patients: Patient[];
  onDeactivate: (id: string) => void;
}) {
  if (patients.length === 0) {
    return <EmptyState>Todavía no hay pacientes registrados.</EmptyState>;
  }

  return (
    <div className={styles.list}>
      {patients.map((patient) => (
        <div
          key={patient.id}
          className={`${styles.row} ${!patient.active ? styles.rowInactive : ""}`}
        >
          <div className={styles.info}>
            <span className={styles.name}>
              {patient.firstName} {patient.lastName}
            </span>
            <span className={styles.meta}>
              {patient.email ?? "Sin correo"} · {patient.phone ?? "Sin teléfono"}
            </span>
          </div>
          <div className={styles.actions}>
            <StatusBadge>{patient.active ? "Activo" : "Inactivo"}</StatusBadge>
            {patient.active && (
              <Button variant="outline" size="sm" onClick={() => onDeactivate(patient.id)}>
                Desactivar
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
