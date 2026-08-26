import { ValueObject } from '../../../shared/domain/value-object';

interface DashboardSummaryProps {
  activePatients: number;
  upcomingAppointments: number;
  medicalRecordsCount: number;
  revenueInCents: number;
  pendingInvoices: number;
  lowStockItems: number;
}

export class DashboardSummary extends ValueObject<DashboardSummaryProps> {
  private constructor(props: DashboardSummaryProps) {
    super(props);
  }

  static create(props: DashboardSummaryProps): DashboardSummary {
    return new DashboardSummary(props);
  }

  get activePatients(): number {
    return this.props.activePatients;
  }

  get upcomingAppointments(): number {
    return this.props.upcomingAppointments;
  }

  get medicalRecordsCount(): number {
    return this.props.medicalRecordsCount;
  }

  get revenueInCents(): number {
    return this.props.revenueInCents;
  }

  get pendingInvoices(): number {
    return this.props.pendingInvoices;
  }

  get lowStockItems(): number {
    return this.props.lowStockItems;
  }
}
