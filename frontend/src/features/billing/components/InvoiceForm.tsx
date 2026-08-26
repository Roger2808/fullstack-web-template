"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Card } from "@/shared/ui/Card";
import uiStyles from "@/shared/ui/ui.module.css";
import { Patient } from "@/features/patients/types";
import { InvoiceItem, IssueInvoiceInput } from "../types";

const emptyItem: InvoiceItem = { description: "", quantity: 1, unitPriceCents: 0 };

export function InvoiceForm({
  patients,
  onSubmit,
  submitting,
}: {
  patients: Patient[];
  onSubmit: (input: IssueInvoiceInput) => Promise<boolean>;
  submitting: boolean;
}) {
  const [patientId, setPatientId] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([{ ...emptyItem }]);

  const updateItem = (index: number, changes: Partial<InvoiceItem>) => {
    setItems((current) => current.map((item, i) => (i === index ? { ...item, ...changes } : item)));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const success = await onSubmit({ patientId, items });
    if (success) {
      setPatientId("");
      setItems([{ ...emptyItem }]);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={uiStyles.formStack}>
        <div className={uiStyles.field}>
          <label className={uiStyles.label} htmlFor="patientId">
            Paciente
          </label>
          <select
            id="patientId"
            className={uiStyles.input}
            required
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
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

        {items.map((item, index) => (
          <fieldset key={index} className={uiStyles.bareFieldset}>
            <div className={uiStyles.formGrid2}>
              <Field
                label="Descripción"
                name={`description-${index}`}
                required
                value={item.description}
                onChange={(e) => updateItem(index, { description: e.target.value })}
              />
              <Field
                label="Cantidad"
                name={`quantity-${index}`}
                type="number"
                min={1}
                required
                value={item.quantity}
                onChange={(e) => updateItem(index, { quantity: Number(e.target.value) })}
              />
            </div>
            <div className={uiStyles.formGrid2}>
              <Field
                label="Precio unitario (USD)"
                name={`unitPrice-${index}`}
                type="number"
                min={0}
                step="0.01"
                required
                value={item.unitPriceCents / 100}
                onChange={(e) =>
                  updateItem(index, { unitPriceCents: Math.round(Number(e.target.value) * 100) })
                }
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className={uiStyles.selfStart}
                disabled={items.length === 1}
                onClick={() => setItems((current) => current.filter((_, i) => i !== index))}
              >
                Quitar línea
              </Button>
            </div>
          </fieldset>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className={uiStyles.selfStart}
          onClick={() => setItems((current) => [...current, { ...emptyItem }])}
        >
          Agregar línea
        </Button>

        <Button type="submit" disabled={submitting} className={uiStyles.selfStart}>
          {submitting ? "Generando…" : "Generar factura"}
        </Button>
      </form>
    </Card>
  );
}
