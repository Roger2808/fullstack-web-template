import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import { PatientName } from './value-objects/patient-name';
import { Email } from './value-objects/email';
import { PatientRegisteredEvent, PatientDeactivatedEvent } from './events/patient-events';
import { InvalidDateOfBirthError, PatientAlreadyInactiveError } from './errors';

export interface PatientProps {
  clinicId: string;
  name: PatientName;
  email?: Email;
  phone?: string;
  dateOfBirth: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterPatientInput {
  clinicId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth: Date;
}

export class Patient extends AggregateRoot<PatientProps> {
  private constructor(props: PatientProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static register(input: RegisterPatientInput): Patient {
    if (input.dateOfBirth.getTime() > Date.now()) {
      throw new InvalidDateOfBirthError('La fecha de nacimiento no puede ser futura.');
    }

    const now = new Date();
    const patient = new Patient({
      clinicId: input.clinicId,
      name: PatientName.create(input.firstName, input.lastName),
      email: input.email ? Email.create(input.email) : undefined,
      phone: input.phone,
      dateOfBirth: input.dateOfBirth,
      active: true,
      createdAt: now,
      updatedAt: now,
    });

    patient.addDomainEvent(new PatientRegisteredEvent(patient.id));
    return patient;
  }

  static reconstitute(props: PatientProps, id: UniqueEntityId): Patient {
    return new Patient(props, id);
  }

  deactivate(): void {
    if (!this.props.active) {
      throw new PatientAlreadyInactiveError();
    }
    this.props.active = false;
    this.props.updatedAt = new Date();
    this.addDomainEvent(new PatientDeactivatedEvent(this.id));
  }

  get clinicId(): string {
    return this.props.clinicId;
  }

  get name(): PatientName {
    return this.props.name;
  }

  get email(): Email | undefined {
    return this.props.email;
  }

  get phone(): string | undefined {
    return this.props.phone;
  }

  get dateOfBirth(): Date {
    return this.props.dateOfBirth;
  }

  get active(): boolean {
    return this.props.active;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
