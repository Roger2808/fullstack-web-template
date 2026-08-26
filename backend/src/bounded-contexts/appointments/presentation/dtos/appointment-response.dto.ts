import { Appointment, AppointmentStatus } from '../../domain/appointment.entity';

export class AppointmentResponseDto {
  id: string;
  patientId: string;
  doctorName: string;
  scheduledAt: string;
  status: AppointmentStatus;
  notes?: string;

  static fromDomain(appointment: Appointment): AppointmentResponseDto {
    const dto = new AppointmentResponseDto();
    dto.id = appointment.id.toString();
    dto.patientId = appointment.patientId;
    dto.doctorName = appointment.doctorName;
    dto.scheduledAt = appointment.scheduledAt.toISOString();
    dto.status = appointment.status;
    dto.notes = appointment.notes;
    return dto;
  }
}
