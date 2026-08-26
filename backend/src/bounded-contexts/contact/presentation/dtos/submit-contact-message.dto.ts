import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SubmitContactMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  name!: string;

  @IsEmail({}, { message: 'Ingresa un correo electrónico válido.' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'El asunto es obligatorio.' })
  subject!: string;

  @IsString()
  @MinLength(10, { message: 'El mensaje debe tener al menos 10 caracteres.' })
  message!: string;
}
