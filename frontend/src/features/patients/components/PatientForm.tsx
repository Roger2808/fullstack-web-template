"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Card } from "@/shared/ui/Card";
import uiStyles from "@/shared/ui/ui.module.css";
import { CreatePatientInput } from "../types";

export function PatientForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (input: CreatePatientInput) => Promise<boolean>;
  submitting: boolean;
}) {
  const [form, setForm] = useState<CreatePatientInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm({ firstName: "", lastName: "", email: "", phone: "", dateOfBirth: "" });
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={uiStyles.formStack}>
        <div className={uiStyles.formGrid2}>
          <Field
            label="Nombre"
            name="firstName"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
          <Field
            label="Apellido"
            name="lastName"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className={uiStyles.formGrid2}>
          <Field
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Field
            label="Teléfono"
            name="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <Field
          label="Fecha de nacimiento"
          name="dateOfBirth"
          type="date"
          required
          value={form.dateOfBirth}
          onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
        />
        <Button type="submit" disabled={submitting} className={uiStyles.selfStart}>
          {submitting ? "Guardando…" : "Registrar paciente"}
        </Button>
      </form>
    </Card>
  );
}
