import { Card } from "@/shared/ui/Card";
import { DashboardSummary } from "../types";
import styles from "./SummaryGrid.module.css";

function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("es", { style: "currency", currency: "USD" });
}

export function SummaryGrid({ summary }: { summary: DashboardSummary }) {
  const tiles = [
    { label: "Pacientes activos", value: summary.activePatients },
    { label: "Citas próximas", value: summary.upcomingAppointments },
    { label: "Historiales registrados", value: summary.medicalRecordsCount },
    { label: "Ingresos cobrados", value: formatCurrency(summary.revenueInCents) },
    { label: "Facturas pendientes", value: summary.pendingInvoices },
    { label: "Insumos con stock bajo", value: summary.lowStockItems, warning: summary.lowStockItems > 0 },
  ];

  return (
    <div className={styles.grid}>
      {tiles.map((tile) => (
        <Card key={tile.label} className={tile.warning ? styles.warning : undefined}>
          <div className={styles.value}>{tile.value}</div>
          <div className={styles.label}>{tile.label}</div>
        </Card>
      ))}
    </div>
  );
}
