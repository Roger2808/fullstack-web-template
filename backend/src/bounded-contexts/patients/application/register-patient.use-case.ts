import { Inject, Injectable } from '@nestjs/common';
import { Patient, RegisterPatientInput } from '../domain/patient.entity';
import { PATIENT_REPOSITORY } from '../domain/patient.repository';
import type { PatientRepository } from '../domain/patient.repository';

@Injectable()
export class RegisterPatientUseCase {
  constructor(
    @Inject(PATIENT_REPOSITORY) private readonly patientRepository: PatientRepository,
  ) {}

  async execute(input: RegisterPatientInput): Promise<Patient> {
    const patient = Patient.register(input);
    await this.patientRepository.save(patient);
    return patient;
  }
}
