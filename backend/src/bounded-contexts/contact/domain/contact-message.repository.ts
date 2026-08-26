import { ContactMessage } from './contact-message.entity';

export const CONTACT_MESSAGE_REPOSITORY = Symbol('CONTACT_MESSAGE_REPOSITORY');

export interface ContactMessageRepository {
  save(contactMessage: ContactMessage): Promise<void>;
}
