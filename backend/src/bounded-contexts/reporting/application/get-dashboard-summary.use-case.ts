import { Inject, Injectable } from '@nestjs/common';
import { PATIENT_REPOSITORY } from '../../patients/domain/patient.repository';
import type { PatientRepository } from '../../patients/domain/patient.repository';
import { APPOINTMENT_REPOSITORY } from '../../appointments/domain/appointment.repository';
import type { AppointmentRepository } from '../../appointments/domain/appointment.repository';
import { MEDICAL_RECORD_REPOSITORY } from '../../medical-records/domain/medical-record.repository';
import type { MedicalRecordRepository } from '../../medical-records/domain/medical-record.repository';
import { INVOICE_REPOSITORY } from '../../billing/domain/invoice.repository';
import type { InvoiceRepository } from '../../billing/domain/invoice.repository';
import { INVENTORY_REPOSITORY } from '../../inventory/domain/inventory-item.repository';
import type { InventoryRepository } from '../../inventory/domain/inventory-item.repository';
import { DashboardSummary } from '../domain/dashboard-summary';

@Injectable()
export class GetDashboardSummaryUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepository: PatientRepository,
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: AppointmentRepository,
    @Inject(MEDICAL_RECORD_REPOSITORY)
    private readonly medicalRecordRepository: MedicalRecordRepository,
    @Inject(INVOICE_REPOSITORY) private readonly invoiceRepository: InvoiceRepository,
    @Inject(INVENTORY_REPOSITORY) private readonly inventoryRepository: InventoryRepository,
  ) {}

  async execute(clinicId: string): Promise<DashboardSummary> {
    const [
      activePatients,
      upcomingAppointments,
      medicalRecordsCount,
      revenueInCents,
      pendingInvoices,
      lowStockItems,
    ] = await Promise.all([
      this.patientRepository.countActiveByClinic(clinicId),
      this.appointmentRepository.countUpcomingByClinic(clinicId),
      this.medicalRecordRepository.countByClinic(clinicId),
      this.invoiceRepository.sumRevenueByClinic(clinicId),
      this.invoiceRepository.countPendingByClinic(clinicId),
      this.inventoryRepository.countLowStockByClinic(clinicId),
    ]);

    return DashboardSummary.create({
      activePatients,
      upcomingAppointments,
      medicalRecordsCount,
      revenueInCents,
      pendingInvoices,
      lowStockItems,
    });
  }
}
