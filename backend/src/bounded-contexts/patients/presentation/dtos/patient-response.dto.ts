import { Patient } from '../../domain/patient.entity';

export class PatientResponseDto {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  active: boolean;

  static fromDomain(patient: Patient): PatientResponseDto {
    const dto = new PatientResponseDto();
    dto.id = patient.id.toString();
    dto.firstName = patient.name.firstName;
    dto.lastName = patient.name.lastName;
    dto.email = patient.email?.value;
    dto.phone = patient.phone;
    dto.dateOfBirth = patient.dateOfBirth.toISOString();
    dto.active = patient.active;
    return dto;
  }
}
