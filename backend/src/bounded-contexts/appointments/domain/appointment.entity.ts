import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import {
  AppointmentScheduledEvent,
  AppointmentConfirmedEvent,
  AppointmentCancelledEvent,
  AppointmentCompletedEvent,
} from './events/appointment-events';
import { InvalidAppointmentTransitionError, InvalidScheduleError } from './errors';

export type AppointmentStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';

export interface AppointmentProps {
  clinicId: string;
  patientId: string;
  doctorName: string;
  scheduledAt: Date;
  status: AppointmentStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleAppointmentInput {
  clinicId: string;
  patientId: string;
  doctorName: string;
  scheduledAt: Date;
  notes?: string;
}

export class Appointment extends AggregateRoot<AppointmentProps> {
  private constructor(props: AppointmentProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static schedule(input: ScheduleAppointmentInput): Appointment {
    if (input.scheduledAt.getTime() <= Date.now()) {
      throw new InvalidScheduleError('La cita debe programarse en una fecha y hora futuras.');
    }
    if (!input.patientId?.trim()) {
      throw new InvalidScheduleError('La cita debe estar asociada a un paciente.');
    }
    if (!input.doctorName?.trim()) {
      throw new InvalidScheduleError('El nombre del doctor es obligatorio.');
    }

    const now = new Date();
    const appointment = new Appointment({
      clinicId: input.clinicId,
      patientId: input.patientId,
      doctorName: input.doctorName.trim(),
      scheduledAt: input.scheduledAt,
      status: 'PENDING',
      notes: input.notes,
      createdAt: now,
      updatedAt: now,
    });

    appointment.addDomainEvent(new AppointmentScheduledEvent(appointment.id));
    return appointment;
  }

  static reconstitute(props: AppointmentProps, id: UniqueEntityId): Appointment {
    return new Appointment(props, id);
  }

  confirm(): void {
    if (this.props.status !== 'PENDING') {
      throw new InvalidAppointmentTransitionError(
        'Solo una cita pendiente puede confirmarse.',
      );
    }
    this.props.status = 'CONFIRMED';
    this.props.updatedAt = new Date();
    this.addDomainEvent(new AppointmentConfirmedEvent(this.id));
  }

  cancel(): void {
    if (this.props.status === 'CANCELLED' || this.props.status === 'COMPLETED') {
      throw new InvalidAppointmentTransitionError(
        'La cita ya está cancelada o completada y no puede cancelarse de nuevo.',
      );
    }
    this.props.status = 'CANCELLED';
    this.props.updatedAt = new Date();
    this.addDomainEvent(new AppointmentCancelledEvent(this.id));
  }

  complete(): void {
    if (this.props.status !== 'CONFIRMED') {
      throw new InvalidAppointmentTransitionError(
        'Solo una cita confirmada puede marcarse como completada.',
      );
    }
    this.props.status = 'COMPLETED';
    this.props.updatedAt = new Date();
    this.addDomainEvent(new AppointmentCompletedEvent(this.id));
  }

  get clinicId(): string {
    return this.props.clinicId;
  }

  get patientId(): string {
    return this.props.patientId;
  }

  get doctorName(): string {
    return this.props.doctorName;
  }

  get scheduledAt(): Date {
    return this.props.scheduledAt;
  }

  get status(): AppointmentStatus {
    return this.props.status;
  }

  get notes(): string | undefined {
    return this.props.notes;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
