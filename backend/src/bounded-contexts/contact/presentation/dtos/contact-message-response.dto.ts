import { ContactMessage } from '../../domain/contact-message.entity';

export class ContactMessageResponseDto {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;

  static fromDomain(contactMessage: ContactMessage): ContactMessageResponseDto {
    const dto = new ContactMessageResponseDto();
    dto.id = contactMessage.id.toString();
    dto.name = contactMessage.name;
    dto.email = contactMessage.email.value;
    dto.subject = contactMessage.subject;
    dto.message = contactMessage.message;
    dto.createdAt = contactMessage.createdAt.toISOString();
    return dto;
  }
}
