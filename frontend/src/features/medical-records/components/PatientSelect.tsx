"use client";

import { Field } from "@/shared/ui/Field";
import { Patient } from "@/features/patients/types";
import uiStyles from "@/shared/ui/ui.module.css";

export function PatientSelect({
  patients,
  value,
  onChange,
}: {
  patients: Patient[];
  value: string;
  onChange: (id: string) => void;
}) {
  if (patients.length === 0) {
    return <Field label="Paciente" name="patientId" value="" disabled placeholder="No hay pacientes registrados" />;
  }

  return (
    <div className={uiStyles.field}>
      <label className={uiStyles.label} htmlFor="patientId">
        Paciente
      </label>
      <select
        id="patientId"
        className={uiStyles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {patients.map((patient) => (
          <option key={patient.id} value={patient.id}>
            {patient.firstName} {patient.lastName}
          </option>
        ))}
      </select>
    </div>
  );
}
