import { Inject, Injectable } from '@nestjs/common';
import { MedicalRecord } from '../domain/medical-record.entity';
import { MEDICAL_RECORD_REPOSITORY } from '../domain/medical-record.repository';
import type { MedicalRecordRepository } from '../domain/medical-record.repository';
import { MedicalRecordNotFoundError } from '../domain/errors';

@Injectable()
export class GetMedicalRecordUseCase {
  constructor(
    @Inject(MEDICAL_RECORD_REPOSITORY)
    private readonly medicalRecordRepository: MedicalRecordRepository,
  ) {}

  async execute(id: string): Promise<MedicalRecord> {
    const record = await this.medicalRecordRepository.findById(id);
    if (!record) {
      throw new MedicalRecordNotFoundError(id);
    }
    return record;
  }
}
