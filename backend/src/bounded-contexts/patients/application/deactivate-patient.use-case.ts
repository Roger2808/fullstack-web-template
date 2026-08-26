import { Inject, Injectable } from '@nestjs/common';
import { PATIENT_REPOSITORY } from '../domain/patient.repository';
import type { PatientRepository } from '../domain/patient.repository';
import { PatientNotFoundError } from '../domain/errors';

@Injectable()
export class DeactivatePatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepository: PatientRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const patient = await this.patientRepository.findById(id);
    if (!patient) {
      throw new PatientNotFoundError(id);
    }
    patient.deactivate();
    await this.patientRepository.save(patient);
  }
}
