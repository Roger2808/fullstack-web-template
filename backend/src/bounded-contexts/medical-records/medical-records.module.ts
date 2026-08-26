import { Module } from '@nestjs/common';
import { MedicalRecordsController } from './presentation/medical-records.controller';
import { CreateMedicalRecordUseCase } from './application/create-medical-record.use-case';
import { ListMedicalRecordsByPatientUseCase } from './application/list-medical-records-by-patient.use-case';
import { GetMedicalRecordUseCase } from './application/get-medical-record.use-case';
import { MEDICAL_RECORD_REPOSITORY } from './domain/medical-record.repository';
import { PrismaMedicalRecordRepository } from './infrastructure/prisma-medical-record.repository';

@Module({
  controllers: [MedicalRecordsController],
  providers: [
    CreateMedicalRecordUseCase,
    ListMedicalRecordsByPatientUseCase,
    GetMedicalRecordUseCase,
    { provide: MEDICAL_RECORD_REPOSITORY, useClass: PrismaMedicalRecordRepository },
  ],
  exports: [MEDICAL_RECORD_REPOSITORY],
})
export class MedicalRecordsModule {}
