import { MedicalRecord } from './medical-record.entity';

export const MEDICAL_RECORD_REPOSITORY = Symbol('MEDICAL_RECORD_REPOSITORY');

export interface MedicalRecordRepository {
  save(record: MedicalRecord): Promise<void>;
  findById(id: string): Promise<MedicalRecord | null>;
  findAllByPatient(patientId: string): Promise<MedicalRecord[]>;
  countByClinic(clinicId: string): Promise<number>;
}
