import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleAppointmentUseCase } from '../application/schedule-appointment.use-case';
import { ListAppointmentsUseCase } from '../application/list-appointments.use-case';
import { ConfirmAppointmentUseCase } from '../application/confirm-appointment.use-case';
import { CancelAppointmentUseCase } from '../application/cancel-appointment.use-case';
import { CompleteAppointmentUseCase } from '../application/complete-appointment.use-case';
import { CreateAppointmentDto } from './dtos/create-appointment.dto';
import { AppointmentResponseDto } from './dtos/appointment-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';

@Controller('appointments')
@UseGuards(JwtAuthGuard)
export class AppointmentsController {
  constructor(
    private readonly scheduleAppointment: ScheduleAppointmentUseCase,
    private readonly listAppointments: ListAppointmentsUseCase,
    private readonly confirmAppointment: ConfirmAppointmentUseCase,
    private readonly cancelAppointment: CancelAppointmentUseCase,
    private readonly completeAppointment: CompleteAppointmentUseCase,
  ) {}

  @Get()
  async list(
    @Query('clinicId') clinicId: string,
  ): Promise<AppointmentResponseDto[]> {
    const appointments = await this.listAppointments.execute(clinicId);
    return appointments.map(AppointmentResponseDto.fromDomain);
  }

  @Post()
  async create(
    @Body() dto: CreateAppointmentDto,
  ): Promise<AppointmentResponseDto> {
    const appointment = await this.scheduleAppointment.execute({
      clinicId: dto.clinicId,
      patientId: dto.patientId,
      doctorName: dto.doctorName,
      scheduledAt: new Date(dto.scheduledAt),
      notes: dto.notes,
    });
    return AppointmentResponseDto.fromDomain(appointment);
  }

  @Patch(':id/confirm')
  async confirm(@Param('id') id: string): Promise<{ success: true }> {
    await this.confirmAppointment.execute(id);
    return { success: true };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string): Promise<{ success: true }> {
    await this.cancelAppointment.execute(id);
    return { success: true };
  }

  @Patch(':id/complete')
  async complete(@Param('id') id: string): Promise<{ success: true }> {
    await this.completeAppointment.execute(id);
    return { success: true };
  }
}
