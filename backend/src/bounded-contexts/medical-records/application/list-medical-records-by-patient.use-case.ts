import { Inject, Injectable } from '@nestjs/common';
import { MedicalRecord } from '../domain/medical-record.entity';
import { MEDICAL_RECORD_REPOSITORY } from '../domain/medical-record.repository';
import type { MedicalRecordRepository } from '../domain/medical-record.repository';

@Injectable()
export class ListMedicalRecordsByPatientUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY)
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) {}

  async execute(patientId: string): Promise<MedicalRecord[]> {
    return this.medicalRecordRepository.findAllByPatient(patientId);
  }
}
