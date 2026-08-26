"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Card } from "@/shared/ui/Card";
import uiStyles from "@/shared/ui/ui.module.css";
import { Patient } from "@/features/patients/types";
import { ScheduleAppointmentInput } from "../types";

const EMPTY_FORM: ScheduleAppointmentInput = {
  patientId: "",
  doctorName: "",
  scheduledAt: "",
  notes: "",
};

export function AppointmentForm({
  patients,
  onSubmit,
  submitting,
}: {
  patients: Patient[];
  onSubmit: (input: ScheduleAppointmentInput) => Promise<boolean>;
  submitting: boolean;
}) {
  const [form, setForm] = useState<ScheduleAppointmentInput>(EMPTY_FORM);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm(EMPTY_FORM);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={uiStyles.formStack}>
        <div className={uiStyles.formGrid2}>
          <div className={uiStyles.field}>
            <label className={uiStyles.label} htmlFor="patientId">
              Paciente
            </label>
            <select
              id="patientId"
              className={uiStyles.input}
              required
              value={form.patientId}
              onChange={(e) => setForm({ ...form, patientId: e.target.value })}
            >
              <option value="" disabled>
                Selecciona un paciente
              </option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </option>
              ))}
            </select>
          </div>
          <Field
            label="Doctor"
            name="doctorName"
            required
            value={form.doctorName}
            onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
          />
        </div>
        <Field
          label="Fecha y hora"
          name="scheduledAt"
          type="datetime-local"
          required
          value={form.scheduledAt}
          onChange={(e) => setForm({ ...form, scheduledAt: e.target.value })}
        />
        <Field
          label="Notas (opcional)"
          name="notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
        <Button
          type="submit"
          disabled={submitting || patients.length === 0}
          className={uiStyles.selfStart}
        >
          {submitting ? "Agendando…" : "Agendar cita"}
        </Button>
        {patients.length === 0 && (
          <span className={uiStyles.fieldError}>
            Registra al menos un paciente antes de agendar una cita.
          </span>
        )}
      </form>
    </Card>
  );
}
