import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../domain/user.repository';
import type { UserRepository } from '../domain/user.repository';
import { PASSWORD_HASHER } from '../domain/password-hasher';
import type { PasswordHasher } from '../domain/password-hasher';
import { TOKEN_SERVICE } from '../domain/token-service';
import type { TokenService } from '../domain/token-service';
import { InvalidCredentialsError, UserInactiveError } from '../domain/errors';
import { User } from '../domain/user.entity';

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: User;
}

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER) private readonly passwordHasher: PasswordHasher,
    @Inject(TOKEN_SERVICE) private readonly tokenService: TokenService,
  ) {}

  async execute(input: LoginInput): Promise<LoginResult> {
    const user = await this.userRepository.findByEmail(
      input.email.trim().toLowerCase(),
    );
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await this.passwordHasher.compare(
      input.password,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    if (!user.active) {
      throw new UserInactiveError();
    }

    const accessToken = this.tokenService.sign({
      userId: user.id.toString(),
      clinicId: user.clinicId,
      role: user.role,
    });

    return { accessToken, user };
  }
}
