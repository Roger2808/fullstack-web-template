import { Inject, Injectable } from '@nestjs/common';
import { Patient } from '../domain/patient.entity';
import { PATIENT_REPOSITORY } from '../domain/patient.repository';
import type { PatientRepository } from '../domain/patient.repository';
import { PatientNotFoundError } from '../domain/errors';

@Injectable()
export class GetPatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepository: PatientRepository,
  ) {}

  async execute(id: string): Promise<Patient> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new PatientNotFoundError(id);
    }
    return patient;
  }
}
