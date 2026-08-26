import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import { Email } from './value-objects/email';

export type UserRole = 'ADMIN' | 'STAFF';

export interface UserProps {
  clinicId: string;
  email: Email;
  passwordHash: string;
  fullName: string;
  role: UserRole;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static reconstitute(props: UserProps, id: UniqueEntityId): User {
    return new User(props, id);
  }

  get clinicId(): string {
    return this.props.clinicId;
  }

  get email(): Email {
    return this.props.email;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get fullName(): string {
    return this.props.fullName;
  }

  get role(): UserRole {
    return this.props.role;
  }

  get active(): boolean {
    return this.props.active;
  }
}
