"use client";

import { FeaturePageHeader } from "@/shared/ui/FeaturePageHeader";
import { Alert } from "@/shared/ui/Alert";
import { Spinner } from "@/shared/ui/Spinner";
import pageStyles from "@/shared/ui/FeaturePageHeader.module.css";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { AppointmentForm } from "@/features/appointments/components/AppointmentForm";
import { AppointmentList } from "@/features/appointments/components/AppointmentList";

export default function AppointmentsPage() {
  const { appointments, patients, loading, error, submitting, schedule, confirm, cancel, complete } =
    useAppointments();

  return (
    <div className={pageStyles.page}>
      <FeaturePageHeader
        title="Citas"
        subtitle="Agenda y da seguimiento a las citas médicas de la clínica."
      />

      {error && <Alert variant="error">{error}</Alert>}

      <div className={pageStyles.section}>
        <AppointmentForm patients={patients} onSubmit={schedule} submitting={submitting} />
      </div>

      <div className={pageStyles.section}>
        {loading ? (
          <Spinner />
        ) : (
          <AppointmentList
            appointments={appointments}
            patients={patients}
            onConfirm={confirm}
            onCancel={cancel}
            onComplete={complete}
          />
        )}
      </div>
    </div>
  );
}
