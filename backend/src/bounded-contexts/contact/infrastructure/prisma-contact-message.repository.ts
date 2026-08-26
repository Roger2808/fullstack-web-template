import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma.service';
import { ContactMessageRepository } from '../domain/contact-message.repository';
import { ContactMessage } from '../domain/contact-message.entity';
import { ContactMessageMapper } from './contact-message.mapper';

@Injectable()
export class PrismaContactMessageRepository implements ContactMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(contactMessage: ContactMessage): Promise<void> {
    const data = ContactMessageMapper.toPersistence(contactMessage);
    await this.prisma.contactMessage.create({ data });
  }
}
