"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Card } from "@/shared/ui/Card";
import { Alert } from "@/shared/ui/Alert";
import uiStyles from "@/shared/ui/ui.module.css";
import { LoginInput } from "../types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  email?: string;
  password?: string;
}

function validate(form: LoginInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!form.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (form.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  return errors;
}

export function LoginForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (input: LoginInput) => Promise<{ success: boolean; error?: string }>;
  submitting: boolean;
}) {
  const [form, setForm] = useState<LoginInput>({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | undefined>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(undefined);

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    const result = await onSubmit(form);
    if (!result.success) {
      setServerError(result.error ?? "No se pudo iniciar sesión.");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={uiStyles.formStack} noValidate>
        {serverError && <Alert variant="error">{serverError}</Alert>}

        <Field
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Field
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={form.password}
          error={errors.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button type="submit" disabled={submitting} className={uiStyles.selfStart}>
          {submitting ? "Ingresando…" : "Iniciar sesión"}
        </Button>
      </form>
    </Card>
  );
}
