import { MedicalRecord as PrismaMedicalRecord } from '@prisma/client';
import { MedicalRecord } from '../domain/medical-record.entity';
import { Diagnosis } from '../domain/value-objects/diagnosis';
import { UniqueEntityId } from '../../../shared/domain/entity';

export class MedicalRecordMapper {
  static toDomain(raw: PrismaMedicalRecord): MedicalRecord {
    return MedicalRecord.reconstitute(
      {
        clinicId: raw.clinicId,
        patientId: raw.patientId,
        visitDate: raw.visitDate,
        diagnosis: Diagnosis.create(raw.diagnosis),
        treatment: raw.treatment ?? undefined,
        notes: raw.notes ?? undefined,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(record: MedicalRecord) {
    return {
      id: record.id.toString(),
      clinicId: record.clinicId,
      patientId: record.patientId,
      visitDate: record.visitDate,
      diagnosis: record.diagnosis.value,
      treatment: record.treatment ?? null,
      notes: record.notes ?? null,
    };
  }
}
