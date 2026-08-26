import { UniqueEntityId } from './entity';

export interface DomainEvent {
  readonly occurredAt: Date;
  getAggregateId(): UniqueEntityId;
}

export abstract class AggregateRoot<Props> {
  protected readonly _id: UniqueEntityId;
  protected readonly props: Props;
  private _domainEvents: DomainEvent[] = [];

  protected constructor(props: Props, id?: UniqueEntityId) {
    this._id = id ?? new UniqueEntityId();
    this.props = props;
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearEvents(): void {
    this._domainEvents = [];
  }

  equals(other?: AggregateRoot<Props>): boolean {
    if (!other) return false;
    if (this === other) return true;
    return this._id.equals(other._id);
  }
}
