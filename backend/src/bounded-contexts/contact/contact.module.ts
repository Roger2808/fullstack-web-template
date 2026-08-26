import { Module } from '@nestjs/common';
import { ContactController } from './presentation/contact.controller';
import { SubmitContactMessageUseCase } from './application/submit-contact-message.use-case';
import { CONTACT_MESSAGE_REPOSITORY } from './domain/contact-message.repository';
import { PrismaContactMessageRepository } from './infrastructure/prisma-contact-message.repository';

@Module({
  controllers: [ContactController],
  providers: [
    SubmitContactMessageUseCase,
    {
      provide: CONTACT_MESSAGE_REPOSITORY,
      useClass: PrismaContactMessageRepository,
    },
  ],
})
export class ContactModule {}
