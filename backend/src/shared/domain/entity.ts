import { randomUUID } from 'crypto';

export class UniqueEntityId {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  toString(): string {
    return this.value;
  }

  equals(other: UniqueEntityId): boolean {
    return other instanceof UniqueEntityId && other.value === this.value;
  }
}

export abstract class Entity<Props> {
  protected readonly _id: UniqueEntityId;
  protected readonly props: Props;

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId();
    this.props = props;
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  equals(other?: Entity<Props>): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this._id.equals(other._id);
  }
}
