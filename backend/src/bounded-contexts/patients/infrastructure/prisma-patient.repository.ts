import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { PatientRepository } from '../domain/patient.repository';
import { Patient } from '../domain/patient.entity';
import { PatientMapper } from './patient.mapper';

@Injectable()
export class PrismaPatientRepository implements PatientRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(patient: Patient): Promise<void> {
    const data = PatientMapper.toPersistence(patient);
    await this.prisma.patient.upsert({
      where: { id: data.id },
      create: data,
      update: data,
    });
  }

  async findById(id: string): Promise<Patient | null> {
    const raw = await this.prisma.patient.findUnique({ where: { id } });
    return raw ? PatientMapper.toDomain(raw) : null;
  }

  async findAllByClinic(clinicId: string): Promise<Patient[]> {
    const raw = await this.prisma.patient.findMany({
      where: { clinicId },
      orderBy: { createdAt: 'desc' },
    });
    return raw.map(PatientMapper.toDomain);
  }

  async countActiveByClinic(clinicId: string): Promise<number> {
    return this.prisma.patient.count({ where: { clinicId, active: true } });
  }
}
