import { Inject, Injectable } from '@nestjs/common';
import { Appointment } from '../domain/appointment.entity';
import { APPOINTMENT_REPOSITORY } from '../domain/appointment.repository';
import type { AppointmentRepository } from '../domain/appointment.repository';

@Injectable()
export class ListAppointmentsUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(clinicId: string): Promise<Appointment[]> {
    return this.appointmentRepository.findAllByClinic(clinicId);
  }
}
