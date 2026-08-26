import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, TokenService } from '../domain/token-service';

@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: AccessTokenPayload): string {
    return this.jwtService.sign({
      sub: payload.userId,
      clinicId: payload.clinicId,
      role: payload.role,
    });
  }
}
