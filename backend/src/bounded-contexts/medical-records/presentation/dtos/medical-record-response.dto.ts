import { MedicalRecord } from '../../domain/medical-record.entity';

export class MedicalRecordResponseDto {
  id: string;
  patientId: string;
  visitDate: string;
  diagnosis: string;
  treatment?: string;
  notes?: string;
  createdAt: string;

  static fromDomain(record: MedicalRecord): MedicalRecordResponseDto {
    const dto = new MedicalRecordResponseDto();
    dto.id = record.id.toString();
    dto.patientId = record.patientId;
    dto.visitDate = record.visitDate.toISOString();
    dto.diagnosis = record.diagnosis.value;
    dto.treatment = record.treatment;
    dto.notes = record.notes;
    dto.createdAt = record.createdAt.toISOString();
    return dto;
  }
}
