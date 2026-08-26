export interface AuthUser {
  id: string;
  clinicId: string;
  email: string;
  fullName: string;
  role: string;
  active: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: AuthUser;
}
