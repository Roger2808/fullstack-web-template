"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Card } from "@/shared/ui/Card";
import uiStyles from "@/shared/ui/ui.module.css";
import { CreateMedicalRecordInput } from "../types";

type FormState = Omit<CreateMedicalRecordInput, "patientId">;

const initialState: FormState = { visitDate: "", diagnosis: "", treatment: "", notes: "" };

export function MedicalRecordForm({
  onSubmit,
  submitting,
  disabled,
}: {
  onSubmit: (input: FormState) => Promise<boolean>;
  submitting: boolean;
  disabled: boolean;
}) {
  const [form, setForm] = useState<FormState>(initialState);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const success = await onSubmit(form);
    if (success) setForm(initialState);
  };

  return (
    <Card>
      <fieldset disabled={disabled} className={uiStyles.bareFieldset}>
        <form onSubmit={handleSubmit} className={uiStyles.formStack}>
          <div className={uiStyles.formGrid2}>
            <Field
              label="Fecha de la visita"
              name="visitDate"
              type="date"
              required
              value={form.visitDate}
              onChange={(e) => setForm({ ...form, visitDate: e.target.value })}
            />
            <Field
              label="Tratamiento"
              name="treatment"
              value={form.treatment}
              onChange={(e) => setForm({ ...form, treatment: e.target.value })}
            />
          </div>
          <Field
            label="Diagnóstico"
            name="diagnosis"
            required
            value={form.diagnosis}
            onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
          />
          <Field
            label="Notas"
            name="notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
          <Button type="submit" disabled={submitting || disabled} className={uiStyles.selfStart}>
            {submitting ? "Guardando…" : "Registrar historial"}
          </Button>
        </form>
      </fieldset>
    </Card>
  );
}
