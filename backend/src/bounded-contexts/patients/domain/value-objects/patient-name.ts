import { ValueObject } from '../../../../shared/domain/value-object';
import { InvalidPatientNameError } from '../errors';

interface PatientNameProps {
  firstName: string;
  lastName: string;
}

export class PatientName extends ValueObject<PatientNameProps> {
  private constructor(props: PatientNameProps) {
    super(props);
  }

  static create(firstName: string, lastName: string): PatientName {
    if (!firstName?.trim() || !lastName?.trim()) {
      throw new InvalidPatientNameError('El nombre y el apellido del paciente son obligatorios.');
    }
    return new PatientName({ firstName: firstName.trim(), lastName: lastName.trim() });
  }

  get firstName(): string {
    return this.props.firstName;
  }

  get lastName(): string {
    return this.props.lastName;
  }

  get fullName(): string {
    return `${this.props.firstName} ${this.props.lastName}`;
  }
}
