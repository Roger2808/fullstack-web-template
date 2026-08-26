"use client";

import { FeaturePageHeader } from "@/shared/ui/FeaturePageHeader";
import { Alert } from "@/shared/ui/Alert";
import { Spinner } from "@/shared/ui/Spinner";
import pageStyles from "@/shared/ui/FeaturePageHeader.module.css";
import { useInvoices } from "@/features/billing/hooks/use-invoices";
import { InvoiceForm } from "@/features/billing/components/InvoiceForm";
import { InvoiceList } from "@/features/billing/components/InvoiceList";

export default function BillingPage() {
  const { invoices, patients, loading, error, submitting, issue, pay, cancel } = useInvoices();

  return (
    <div className={pageStyles.page}>
      <FeaturePageHeader
        title="Facturación"
        subtitle="Genera y controla las facturas de los pacientes de la clínica."
      />

      {error && <Alert variant="error">{error}</Alert>}

      <div className={pageStyles.section}>
        <InvoiceForm patients={patients} onSubmit={issue} submitting={submitting} />
      </div>

      <div className={pageStyles.section}>
        {loading ? (
          <Spinner />
        ) : (
          <InvoiceList invoices={invoices} patients={patients} onPay={pay} onCancel={cancel} />
        )}
      </div>
    </div>
  );
}
