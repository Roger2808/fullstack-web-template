import { AggregateRoot } from '../../../shared/domain/domain-event';
import { UniqueEntityId } from '../../../shared/domain/entity';
import { Email } from './value-objects/email';
import { ContactMessageSubmittedEvent } from './events/contact-message-events';
import {
  InvalidContactMessageError,
  InvalidContactNameError,
  InvalidContactSubjectError,
} from './errors';

const MIN_MESSAGE_LENGTH = 10;

export interface ContactMessageProps {
  name: string;
  email: Email;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface SubmitContactMessageInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactMessage extends AggregateRoot<ContactMessageProps> {
  private constructor(props: ContactMessageProps, id?: UniqueEntityId) {
    super(props, id);
  }

  static submit(input: SubmitContactMessageInput): ContactMessage {
    const name = input.name?.trim();
    if (!name) {
      throw new InvalidContactNameError();
    }

    const subject = input.subject?.trim();
    if (!subject) {
      throw new InvalidContactSubjectError();
    }

    const message = input.message?.trim();
    if (!message || message.length < MIN_MESSAGE_LENGTH) {
      throw new InvalidContactMessageError();
    }

    const contactMessage = new ContactMessage({
      name,
      email: Email.create(input.email),
      subject,
      message,
      createdAt: new Date(),
    });

    contactMessage.addDomainEvent(
      new ContactMessageSubmittedEvent(contactMessage.id),
    );
    return contactMessage;
  }

  static reconstitute(
    props: ContactMessageProps,
    id: UniqueEntityId,
  ): ContactMessage {
    return new ContactMessage(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get subject(): string {
    return this.props.subject;
  }

  get message(): string {
    return this.props.message;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }
}
