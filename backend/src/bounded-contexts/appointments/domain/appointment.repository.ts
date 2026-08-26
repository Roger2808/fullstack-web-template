import { Appointment } from './appointment.entity';

export const APPOINTMENT_REPOSITORY = Symbol('APPOINTMENT_REPOSITORY');

export interface AppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findById(id: string): Promise<Appointment | null>;
  findAllByClinic(clinicId: string): Promise<Appointment[]>;
  countUpcomingByClinic(clinicId: string): Promise<number>;
}
