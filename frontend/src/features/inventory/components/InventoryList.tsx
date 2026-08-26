"use client";

import { Button } from "@/shared/ui/Button";
import { StatusBadge } from "@/shared/ui/StatusBadge";
import { EmptyState } from "@/shared/ui/EmptyState";
import { InventoryItem } from "../types";
import styles from "./InventoryList.module.css";

export function InventoryList({
  items,
  onAdjustStock,
}: {
  items: InventoryItem[];
  onAdjustStock: (id: string, delta: number) => void;
}) {
  if (items.length === 0) {
    return <EmptyState>Todavía no hay artículos en el inventario.</EmptyState>;
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div key={item.id} className={styles.row}>
          <div className={styles.info}>
            <span className={styles.name}>
              {item.name} · {item.sku}
            </span>
            <span className={styles.meta}>
              Cantidad: {item.quantity} · Mínimo: {item.minimumStock} · Costo: $
              {(item.unitCostCents / 100).toFixed(2)}
            </span>
          </div>
          <div className={styles.actions}>
            {item.lowStock && <StatusBadge>Stock bajo</StatusBadge>}
            <Button variant="outline" size="sm" onClick={() => onAdjustStock(item.id, -1)}>
              −1
            </Button>
            <Button variant="outline" size="sm" onClick={() => onAdjustStock(item.id, 1)}>
              +1
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
