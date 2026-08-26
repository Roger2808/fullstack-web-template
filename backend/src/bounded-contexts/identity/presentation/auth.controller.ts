import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginUseCase } from '../application/login.use-case';
import { GetCurrentUserUseCase } from '../application/get-current-user.use-case';
import { LoginDto } from './dtos/login.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { JwtAuthGuard } from '../../../shared/presentation/jwt-auth.guard';
import { CurrentUser } from '../../../shared/presentation/current-user.decorator';
import type { AuthenticatedUser } from '../../../shared/presentation/authenticated-request';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: LoginUseCase,
    private readonly getCurrentUser: GetCurrentUserUseCase,
  ) {}

  @Post('login')
  async signIn(@Body() dto: LoginDto): Promise<LoginResponseDto> {
    const { accessToken, user } = await this.login.execute(dto);
    return { accessToken, user: UserResponseDto.fromDomain(user) };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async me(
    @CurrentUser() currentUser: AuthenticatedUser,
  ): Promise<UserResponseDto> {
    const user = await this.getCurrentUser.execute(currentUser.userId);
    return UserResponseDto.fromDomain(user);
  }
}
