"use client";

import { FeaturePageHeader } from "@/shared/ui/FeaturePageHeader";
import { Alert } from "@/shared/ui/Alert";
import { Spinner } from "@/shared/ui/Spinner";
import pageStyles from "@/shared/ui/FeaturePageHeader.module.css";
import { useMedicalRecords } from "@/features/medical-records/hooks/use-medical-records";
import { MedicalRecordForm } from "@/features/medical-records/components/MedicalRecordForm";
import { MedicalRecordList } from "@/features/medical-records/components/MedicalRecordList";
import { PatientSelect } from "@/features/medical-records/components/PatientSelect";

export default function MedicalRecordsPage() {
  const {
    patients,
    patientsLoading,
    selectedPatientId,
    setSelectedPatientId,
    records,
    loading,
    error,
    submitting,
    create,
  } = useMedicalRecords();

  return (
    <div className={pageStyles.page}>
      <FeaturePageHeader
        title="Historiales Médicos"
        subtitle="Consulta el historial clínico de cada paciente y registra nuevas visitas."
      />

      {error && <Alert variant="error">{error}</Alert>}

      <div className={pageStyles.section}>
        {patientsLoading ? (
          <Spinner />
        ) : (
          <PatientSelect
            patients={patients}
            value={selectedPatientId}
            onChange={setSelectedPatientId}
          />
        )}
      </div>

      <div className={pageStyles.section}>
        <MedicalRecordForm onSubmit={create} submitting={submitting} disabled={!selectedPatientId} />
      </div>

      <div className={pageStyles.section}>
        {loading ? <Spinner /> : <MedicalRecordList records={records} />}
      </div>
    </div>
  );
}
