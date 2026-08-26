import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import { Diagnosis } from './value-objects/diagnosis';
import { MedicalRecordCreatedEvent } from './events/medical-record-events';
import { InvalidVisitDateError } from './errors';

export interface MedicalRecordProps {
  clinicId: string;
  patientId: string;
  visitDate: Date;
  diagnosis: Diagnosis;
  treatment?: string;
  notes?: string;
  createdAt: Date;
}

export interface CreateMedicalRecordInput {
  clinicId: string;
  patientId: string;
  visitDate: Date;
  diagnosis: string;
  treatment?: string;
  notes?: string;
}

export class MedicalRecord extends AggregateRoot<MedicalRecordProps> {
  private constructor(props: MedicalRecordProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static create(input: CreateMedicalRecordInput): MedicalRecord {
    if (input.visitDate.getTime() > Date.now()) {
      throw new InvalidVisitDateError('La fecha de la visita no puede ser futura.');
    }

    const record = new MedicalRecord({
      clinicId: input.clinicId,
      patientId: input.patientId,
      visitDate: input.visitDate,
      diagnosis: Diagnosis.create(input.diagnosis),
      treatment: input.treatment,
      notes: input.notes,
      createdAt: new Date(),
    });

    record.addDomainEvent(new MedicalRecordCreatedEvent(record.id));
    return record;
  }

  static reconstitute(props: MedicalRecordProps, id: UniqueEntityId): MedicalRecord {
    return new MedicalRecord(props, id);
  }

  get clinicId(): string {
    return this.props.clinicId;
  }

  get patientId(): string {
    return this.props.patientId;
  }

  get visitDate(): Date {
    return this.props.visitDate;
  }

  get diagnosis(): Diagnosis {
    return this.props.diagnosis;
  }

  get treatment(): string | undefined {
    return this.props.treatment;
  }

  get notes(): string | undefined {
    return this.props.notes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
