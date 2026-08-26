"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/shared/ui/Button";
import { Field } from "@/shared/ui/Field";
import { Card } from "@/shared/ui/Card";
import uiStyles from "@/shared/ui/ui.module.css";
import { CreateInventoryItemInput } from "../types";

const emptyForm = { name: "", sku: "", quantity: "0", minimumStock: "0", unitCost: "0" };

export function InventoryItemForm({
  onSubmit,
  submitting,
}: {
  onSubmit: (input: CreateInventoryItemInput) => Promise<boolean>;
  submitting: boolean;
}) {
  const [form, setForm] = useState(emptyForm);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const success = await onSubmit({
      name: form.name,
      sku: form.sku,
      quantity: Number(form.quantity),
      minimumStock: Number(form.minimumStock),
      unitCostCents: Math.round(Number(form.unitCost) * 100),
    });
    if (success) {
      setForm(emptyForm);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className={uiStyles.formStack}>
        <div className={uiStyles.formGrid2}>
          <Field
            label="Nombre del artículo"
            name="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Field
            label="SKU"
            name="sku"
            required
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
          />
        </div>
        <div className={uiStyles.formGrid2}>
          <Field
            label="Cantidad inicial"
            name="quantity"
            type="number"
            min={0}
            required
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
          <Field
            label="Stock mínimo"
            name="minimumStock"
            type="number"
            min={0}
            required
            value={form.minimumStock}
            onChange={(e) => setForm({ ...form, minimumStock: e.target.value })}
          />
        </div>
        <Field
          label="Costo unitario (USD)"
          name="unitCost"
          type="number"
          min={0}
          step="0.01"
          required
          value={form.unitCost}
          onChange={(e) => setForm({ ...form, unitCost: e.target.value })}
        />
        <Button type="submit" disabled={submitting} className={uiStyles.selfStart}>
          {submitting ? "Guardando…" : "Registrar artículo"}
        </Button>
      </form>
    </Card>
  );
}
