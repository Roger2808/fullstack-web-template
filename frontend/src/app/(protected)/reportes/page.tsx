"use client";

import { FeaturePageHeader } from "@/shared/ui/FeaturePageHeader";
import { Alert } from "@/shared/ui/Alert";
import { Spinner } from "@/shared/ui/Spinner";
import pageStyles from "@/shared/ui/FeaturePageHeader.module.css";
import { useDashboardSummary } from "@/features/reporting/hooks/use-dashboard-summary";
import { SummaryGrid } from "@/features/reporting/components/SummaryGrid";

export default function ReportingPage() {
  const { summary, loading, error } = useDashboardSummary();

  return (
    <div className={pageStyles.page}>
      <FeaturePageHeader
        title="Reportes"
        subtitle="Métricas clave de la operación diaria de la clínica."
      />

      {error && <Alert variant="error">{error}</Alert>}

      <div className={pageStyles.section}>
        {loading ? <Spinner /> : summary && <SummaryGrid summary={summary} />}
      </div>
    </div>
  );
}
