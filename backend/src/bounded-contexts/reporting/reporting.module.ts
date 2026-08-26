import { Module } from '@nestjs/common';
import { PatientsModule } from '../patients/patients.module';
import { AppointmentsModule } from '../appointments/appointments.module';
import { MedicalRecordsModule } from '../medical-records/medical-records.module';
import { BillingModule } from '../billing/billing.module';
import { InventoryModule } from '../inventory/inventory.module';
import { ReportingController } from './presentation/reporting.controller';
import { GetDashboardSummaryUseCase } from './application/get-dashboard-summary.use-case';

@Module({
  imports: [PatientsModule, AppointmentsModule, MedicalRecordsModule, BillingModule, InventoryModule],
  controllers: [ReportingController],
  providers: [GetDashboardSummaryUseCase],
})
export class ReportingModule {}
