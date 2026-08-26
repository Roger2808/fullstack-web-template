import { UserRole } from './user.entity';

export const TOKEN_SERVICE = Symbol('TOKEN_SERVICE');

export interface AccessTokenPayload {
  userId: string;
  clinicId: string;
  role: UserRole;
}

export interface TokenService {
  sign(payload: AccessTokenPayload): string;
}
