import { ContactMessage as PrismaContactMessage } from '@prisma/client';
import { ContactMessage } from '../domain/contact-message.entity';
import { Email } from '../domain/value-objects/email';
import { UniqueEntityId } from '../../../shared/domain/entity';

export class ContactMessageMapper {
  static toDomain(raw: PrismaContactMessage): ContactMessage {
    return ContactMessage.reconstitute(
      {
        name: raw.name,
        email: Email.create(raw.email),
        subject: raw.subject,
        message: raw.message,
        createdAt: raw.createdAt,
      },
      new UniqueEntityId(raw.id),
    );
  }

  static toPersistence(contactMessage: ContactMessage) {
    return {
      id: contactMessage.id.toString(),
      name: contactMessage.name,
      email: contactMessage.email.value,
      subject: contactMessage.subject,
      message: contactMessage.message,
      createdAt: contactMessage.createdAt,
    };
  }
}
