import { Patient as PrismaPatient } from '@prisma/client';
import { Patient } from '../domain/patient.entity';
import { PatientName } from '../domain/value-objects/patient-name';
import { Email } from '../domain/value-objects/email';
import { UniqueEntityId } from '../../../shared/domain/entity';

export class PatientMapper {
  static toDomain(raw: PrismaPatient): Patient {
    return Patient.reconstitute(
      {
        clinicId: raw.clinicId,
        name: PatientName.create(raw.firstName, raw.lastName),
        email: raw.email ? Email.create(raw.email) : undefined,
        phone: raw.phone ?? undefined,
        dateOfBirth: raw.dateOfBirth,
        active: raw.active,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(patient: Patient) {
    return {
      id: patient.id.toString(),
      clinicId: patient.clinicId,
      firstName: patient.name.firstName,
      lastName: patient.name.lastName,
      email: patient.email?.value ?? null,
      phone: patient.phone ?? null,
      dateOfBirth: patient.dateOfBirth,
      active: patient.active,
      updatedAt: patient.updatedAt,
    };
  }
}
