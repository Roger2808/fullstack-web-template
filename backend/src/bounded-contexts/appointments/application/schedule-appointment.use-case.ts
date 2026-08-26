import { Inject, Injectable } from '@nestjs/common';
import { Appointment, ScheduleAppointmentInput } from '../domain/appointment.entity';
import { APPOINTMENT_REPOSITORY } from '../domain/appointment.repository';
import type { AppointmentRepository } from '../domain/appointment.repository';

@Injectable()
export class ScheduleAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(input: ScheduleAppointmentInput): Promise<Appointment> {
    const appointment = Appointment.schedule(input);
    await this.appointmentRepository.save(appointment);
    return appointment;
  }
}
