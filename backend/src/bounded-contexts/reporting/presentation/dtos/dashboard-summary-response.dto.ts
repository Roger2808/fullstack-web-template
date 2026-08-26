import { DashboardSummary } from '../../domain/dashboard-summary';

export class DashboardSummaryResponseDto {
  activePatients: number;
  upcomingAppointments: number;
  medicalRecordsCount: number;
  revenueInCents: number;
  pendingInvoices: number;
  lowStockItems: number;

  static fromDomain(summary: DashboardSummary): DashboardSummaryResponseDto {
    const dto = new DashboardSummaryResponseDto();
    dto.activePatients = summary.activePatients;
    dto.upcomingAppointments = summary.upcomingAppointments;
    dto.medicalRecordsCount = summary.medicalRecordsCount;
    dto.revenueInCents = summary.revenueInCents;
    dto.pendingInvoices = summary.pendingInvoices;
    dto.lowStockItems = summary.lowStockItems;
    return dto;
  }
}
