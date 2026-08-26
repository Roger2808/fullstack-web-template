import { Module } from '@nestjs/common';
import { AppointmentsController } from './presentation/appointments.controller';
import { ScheduleAppointmentUseCase } from './application/schedule-appointment.use-case';
import { ListAppointmentsUseCase } from './application/list-appointments.use-case';
import { ConfirmAppointmentUseCase } from './application/confirm-appointment.use-case';
import { CancelAppointmentUseCase } from './application/cancel-appointment.use-case';
import { CompleteAppointmentUseCase } from './application/complete-appointment.use-case';
import { APPOINTMENT_REPOSITORY } from './domain/appointment.repository';
import { PrismaAppointmentRepository } from './infrastructure/prisma-appointment.repository';

@Module({
  controllers: [AppointmentsController],
  providers: [
    ScheduleAppointmentUseCase,
    ListAppointmentsUseCase,
    ConfirmAppointmentUseCase,
    CancelAppointmentUseCase,
    CompleteAppointmentUseCase,
    { provide: APPOINTMENT_REPOSITORY, useClass: PrismaAppointmentRepository },
  ],
  exports: [APPOINTMENT_REPOSITORY],
})
export class AppointmentsModule {}
