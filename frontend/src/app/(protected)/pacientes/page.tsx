"use client";

import { FeaturePageHeader } from "@/shared/ui/FeaturePageHeader";
import { Alert } from "@/shared/ui/Alert";
import { Spinner } from "@/shared/ui/Spinner";
import pageStyles from "@/shared/ui/FeaturePageHeader.module.css";
import { usePatients } from "@/features/patients/hooks/use-patients";
import { PatientForm } from "@/features/patients/components/PatientForm";
import { PatientList } from "@/features/patients/components/PatientList";

export default function PatientsPage() {
  const { patients, loading, error, submitting, create, deactivate } = usePatients();

  return (
    <div className={pageStyles.page}>
      <FeaturePageHeader
        title="Pacientes"
        subtitle="Registra y consulta la información de los pacientes de la clínica."
      />

      {error && <Alert variant="error">{error}</Alert>}

      <div className={pageStyles.section}>
        <PatientForm onSubmit={create} submitting={submitting} />
      </div>

      <div className={pageStyles.section}>
        {loading ? <Spinner /> : <PatientList patients={patients} onDeactivate={deactivate} />}
      </div>
    </div>
  );
}
