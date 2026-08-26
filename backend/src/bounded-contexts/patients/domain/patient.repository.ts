import { Patient } from './patient.entity';

export const PATIENT_REPOSITORY = Symbol('PATIENT_REPOSITORY');

export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  findById(id: string): Promise<Patient | null>;
  findAllByClinic(clinicId: string): Promise<Patient[]>;
  countActiveByClinic(clinicId: string): Promise<number>;
}
