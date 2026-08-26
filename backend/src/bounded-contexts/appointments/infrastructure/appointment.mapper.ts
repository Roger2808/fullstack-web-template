import { Appointment as PrismaAppointment } from '@prisma/client';
import { Appointment, AppointmentStatus } from '../domain/appointment.entity';
import { UniqueEntityId } from '../../../shared/domain/entity';

export class AppointmentMapper {
  static toDomain(raw: PrismaAppointment): Appointment {
    return Appointment.reconstitute(
      {
        clinicId: raw.clinicId,
        patientId: raw.patientId,
        doctorName: raw.doctorName,
        scheduledAt: raw.scheduledAt,
        status: raw.status as AppointmentStatus,
        notes: raw.notes ?? undefined,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(appointment: Appointment) {
    return {
      id: appointment.id.toString(),
      clinicId: appointment.clinicId,
      patientId: appointment.patientId,
      doctorName: appointment.doctorName,
      scheduledAt: appointment.scheduledAt,
      status: appointment.status,
      notes: appointment.notes ?? null,
      updatedAt: appointment.updatedAt,
    };
  }
}
