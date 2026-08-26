import { Inject, Injectable } from '@nestjs/common';
import { CreateMedicalRecordInput, MedicalRecord } from '../domain/medical-record.entity';
import { MEDICAL_RECORD_REPOSITORY } from '../domain/medical-record.repository';
import type { MedicalRecordRepository } from '../domain/medical-record.repository';

@Injectable()
export class CreateMedicalRecordUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY)
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) {}

  async execute(input: CreateMedicalRecordInput): Promise<MedicalRecord> {
    const record = MedicalRecord.create(input);
    await this.medicalRecordRepository.save(record);
    return record;
  }
}
