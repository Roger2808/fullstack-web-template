import { Module } from '@nestjs/common';
import { PatientsController } from './presentation/patients.controller';
import { RegisterPatientUseCase } from './application/register-patient.use-case';
import { ListPatientsUseCase } from './application/list-patients.use-case';
import { GetPatientUseCase } from './application/get-patient.use-case';
import { DeactivatePatientUseCase } from './application/deactivate-patient.use-case';
import { PATIENT_REPOSITORY } from './domain/patient.repository';
import { PrismaPatientRepository } from './infrastructure/prisma-patient.repository';

@Module({
  controllers: [PatientsController],
  providers: [
    RegisterPatientUseCase,
    ListPatientsUseCase,
    GetPatientUseCase,
    DeactivatePatientUseCase,
    { provide: PATIENT_REPOSITORY, useClass: PrismaPatientRepository },
  ],
  exports: [PATIENT_REPOSITORY],
})
export class PatientsModule {}
