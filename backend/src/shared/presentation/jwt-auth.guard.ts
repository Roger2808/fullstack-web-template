import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AuthenticatedRequest,
  AuthenticatedUser,
} from './authenticated-request';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = this.extractToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException(
        'Se requiere iniciar sesión para acceder a este recurso.',
      );
    }

    try {
      const payload = this.jwtService.verify<{
        sub: string;
        clinicId: string;
        role: string;
      }>(token);
      request.user = {
        userId: payload.sub,
        clinicId: payload.clinicId,
        role: payload.role,
      } satisfies AuthenticatedUser;
      return true;
    } catch {
      throw new UnauthorizedException(
        'La sesión expiró o el token no es válido.',
      );
    }
  }

  private extractToken(authorizationHeader?: string): string | undefined {
    if (!authorizationHeader) return undefined;
    const [scheme, token] = authorizationHeader.split(' ');
    return scheme === 'Bearer' ? token : undefined;
  }
}
