import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { AppointmentRepository } from '../domain/appointment.repository';
import { Appointment } from '../domain/appointment.entity';
import { AppointmentMapper } from './appointment.mapper';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(appointment: Appointment): Promise<void> {
    const data = AppointmentMapper.toPersistence(appointment);
    await this.prisma.appointment.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<Appointment | null> {
    const raw = await this.prisma.appointment.findUnique({ where: { id } });
    return raw ? AppointmentMapper.toDomain(raw) : null;
  }

  async findAllByClinic(clinicId: string): Promise<Appointment[]> {
    const raw = await this.prisma.appointment.findMany({
      where: { clinicId },
      orderBy: { scheduledAt: 'asc' },
    });
    return raw.map(AppointmentMapper.toDomain);
  }

  async countUpcomingByClinic(clinicId: string): Promise<number> {
    return this.prisma.appointment.count({
      where: {
        clinicId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        scheduledAt: { gte: new Date() },
      },
    });
  }
}
