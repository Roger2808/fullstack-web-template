import { Request } from 'express';

export interface AuthenticatedUser {
  userId: string;
  clinicId: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedUser;
}
