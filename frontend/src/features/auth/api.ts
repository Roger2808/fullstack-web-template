import { apiFetch } from "@/shared/api/config";
import { AuthUser, LoginInput, LoginResponse } from "./types";

export const authApi = {
  login: (input: LoginInput) =>
    apiFetch<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
    }),

  me: () => apiFetch<AuthUser>("/auth/me"),
};
