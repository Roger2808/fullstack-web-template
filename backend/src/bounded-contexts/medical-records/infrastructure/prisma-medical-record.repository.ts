import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { MedicalRecordRepository } from '../domain/medical-record.repository';
import { MedicalRecord } from '../domain/medical-record.entity';
import { MedicalRecordMapper } from './medical-record.mapper';

@Injectable()
export class PrismaMedicalRecordRepository implements MedicalRecordRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(record: MedicalRecord): Promise<void> {
    const data = MedicalRecordMapper.toPersistence(record);
    await this.prisma.medicalRecord.create({ data });
  }

  async findById(id: string): Promise<MedicalRecord | null> {
    const raw = await this.prisma.medicalRecord.findUnique({ where: { id } });
    return raw ? MedicalRecordMapper.toDomain(raw) : null;
  }

  async findAllByPatient(patientId: string): Promise<MedicalRecord[]> {
    const raw = await this.prisma.medicalRecord.findMany({
      where: { patientId },
      orderBy: { visitDate: 'desc' },
    });
    return raw.map(MedicalRecordMapper.toDomain);
  }

  async countByClinic(clinicId: string): Promise<number> {
    return this.prisma.medicalRecord.count({ where: { clinicId } });
  }
}
