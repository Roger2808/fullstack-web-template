import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { LoginUseCase } from './application/login.use-case';
import { GetCurrentUserUseCase } from './application/get-current-user.use-case';
import { USER_REPOSITORY } from './domain/user.repository';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { PASSWORD_HASHER } from './domain/password-hasher';
import { BcryptPasswordHasher } from './infrastructure/bcrypt-password-hasher';
import { TOKEN_SERVICE } from './domain/token-service';
import { JwtTokenService } from './infrastructure/jwt-token.service';

@Module({
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    GetCurrentUserUseCase,
    { provide: USER_REPOSITORY, useClass: PrismaUserRepository },
    { provide: PASSWORD_HASHER, useClass: BcryptPasswordHasher },
    { provide: TOKEN_SERVICE, useClass: JwtTokenService },
  ],
})
export class IdentityModule {}
