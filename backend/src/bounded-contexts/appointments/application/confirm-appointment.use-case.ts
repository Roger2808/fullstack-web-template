import { Inject, Injectable } from '@nestjs/common';
import { APPOINTMENT_REPOSITORY } from '../domain/appointment.repository';
import type { AppointmentRepository } from '../domain/appointment.repository';
import { AppointmentNotFoundError } from '../domain/errors';

@Injectable()
export class ConfirmAppointmentUseCase {
  constructor(
    @Inject(APPOINTMENT_REPOSITORY) private readonly appointmentRepository: AppointmentRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const appointment = await this.appointmentRepository.findById(id);
    if (!appointment) {
      throw new AppointmentNotFoundError(id);
    }
    appointment.confirm();
    await this.appointmentRepository.save(appointment);
  }
}
