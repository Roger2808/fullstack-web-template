import { Inject, Injectable } from '@nestjs/common';
import { CONTACT_MESSAGE_REPOSITORY } from '../domain/contact-message.repository';
import type { ContactMessageRepository } from '../domain/contact-message.repository';
import { ContactMessage } from '../domain/contact-message.entity';
import type { SubmitContactMessageInput } from '../domain/contact-message.entity';

@Injectable()
export class SubmitContactMessageUseCase {
  constructor(
    @Inject(CONTACT_MESSAGE_REPOSITORY)
    private readonly contactMessageRepository: ContactMessageRepository,
  ) {}

  async execute(input: SubmitContactMessageInput): Promise<ContactMessage> {
    const contactMessage = ContactMessage.submit(input);
    await this.contactMessageRepository.save(contactMessage);
    return contactMessage;
  }
}
