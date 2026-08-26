"use client";

import { EmptyState } from "@/shared/ui/EmptyState";
import { MedicalRecord } from "../types";
import styles from "./MedicalRecordList.module.css";

export function MedicalRecordList({ records }: { records: MedicalRecord[] }) {
  if (records.length === 0) {
    return <EmptyState>Este paciente todavía no tiene historiales registrados.</EmptyState>;
  }

  return (
    <div className={styles.list}>
      {records.map((record) => (
        <div key={record.id} className={styles.row}>
          <span className={styles.date}>
            {new Date(record.visitDate).toLocaleDateString("es-ES")}
          </span>
          <span className={styles.diagnosis}>{record.diagnosis}</span>
          {record.treatment && <span className={styles.meta}>Tratamiento: {record.treatment}</span>}
          {record.notes && <span className={styles.meta}>Notas: {record.notes}</span>}
        </div>
      ))}
    </div>
  );
}
