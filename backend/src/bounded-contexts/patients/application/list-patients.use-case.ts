import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../domain/patient.entity';
import { PATIENT_REPOSITORY } from '../domain/patient.repository';
import type { PatientRepository } from '../domain/patient.repository';

@Injectable()
export class ListPatientsUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepository: PatientRepository,
  ) {}

  async execute(clinicId: string): Promise<Patient[]> {
    return this.patientRepository.findAllByClinic(clinicId);
  }
}
