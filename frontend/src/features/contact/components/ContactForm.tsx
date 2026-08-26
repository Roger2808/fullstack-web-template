"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Textarea } from "@/shared/ui/Textarea";
import { Alert } from "@/shared/ui/Alert";
import uiStyles from "@/shared/ui/ui.module.css";
import { contactApi } from "../api";
import { ContactMessageInput } from "../types";
import { ApiError } from "@/shared/api/config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

type FieldErrors = Partial<Record<keyof ContactMessageInput, string>>;

function validate(form: ContactMessageInput): FieldErrors {
  const errors: FieldErrors = {};

  if (!form.name.trim()) {
    errors.name = "El nombre es obligatorio.";
  }

  if (!form.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!EMAIL_PATTERN.test(form.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!form.subject.trim()) {
    errors.subject = "El asunto es obligatorio.";
  }

  if (!form.message.trim()) {
    errors.message = "El mensaje es obligatorio.";
  } else if (form.message.trim().length < MIN_MESSAGE_LENGTH) {
    errors.message = `El mensaje debe tener al menos ${MIN_MESSAGE_LENGTH} caracteres.`;
  }

  return errors;
}

const EMPTY_FORM: ContactMessageInput = { name: "", email: "", subject: "", message: "" };

export function ContactForm() {
  const [form, setForm] = useState<ContactMessageInput>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setServerError(undefined);
    setSuccess(false);

    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    try {
      await contactApi.submit(form);
      setForm(EMPTY_FORM);
      setSuccess(true);
    } catch (error) {
      setServerError(
        error instanceof ApiError ? error.message : "No se pudo enviar el mensaje. Intenta de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={uiStyles.formStack} noValidate>
      {success && <Alert variant="success">Gracias por escribirnos, te responderemos pronto.</Alert>}
      {serverError && <Alert variant="error">{serverError}</Alert>}

      <div className={uiStyles.formGrid2}>
        <Field
          label="Nombre"
          name="name"
          required
          value={form.name}
          error={errors.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Field
          label="Correo electrónico"
          name="email"
          type="email"
          required
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <Field
        label="Asunto"
        name="subject"
        required
        value={form.subject}
        error={errors.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      />
      <Textarea
        label="Mensaje"
        name="message"
        required
        value={form.message}
        error={errors.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      />

      <Button type="submit" disabled={submitting} className={uiStyles.selfStart}>
        {submitting ? "Enviando…" : "Enviar mensaje"}
      </Button>
    </form>
  );
}
