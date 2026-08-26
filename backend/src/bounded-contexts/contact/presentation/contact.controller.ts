import { Body, Controller, Post } from '@nestjs/common';
import { SubmitContactMessageUseCase } from '../application/submit-contact-message.use-case';
import { SubmitContactMessageDto } from './dtos/submit-contact-message.dto';
import { ContactMessageResponseDto } from './dtos/contact-message-response.dto';

@Controller('contact')
export class ContactController {
  constructor(
    private readonly submitContactMessage: SubmitContactMessageUseCase,
  ) {}

  @Post()
  async submit(
    @Body() dto: SubmitContactMessageDto,
  ): Promise<ContactMessageResponseDto> {
    const contactMessage = await this.submitContactMessage.execute(dto);
    return ContactMessageResponseDto.fromDomain(contactMessage);
  }
}
