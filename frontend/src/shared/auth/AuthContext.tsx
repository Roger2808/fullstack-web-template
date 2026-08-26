"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AUTH_TOKEN_STORAGE_KEY } from "@/shared/api/config";
import { authApi } from "@/features/auth/api";
import { AuthUser, LoginInput } from "@/features/auth/types";
import { ApiError } from "@/shared/api/config";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  login: (input: LoginInput) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  useEffect(() => {
    const token = window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    authApi
      .me()
      .then((currentUser) => {
        setUser(currentUser);
        setStatus("authenticated");
      })
      .catch(() => {
        window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        setStatus("unauthenticated");
      });
  }, []);

  const login = async (input: LoginInput) => {
    try {
      const response = await authApi.login(input);
      window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, response.accessToken);
      setUser(response.user);
      setStatus("authenticated");
      return { success: true };
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "No se pudo iniciar sesión. Intenta de nuevo.";
      return { success: false, error: message };
    }
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
    setUser(null);
    setStatus("unauthenticated");
  };

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider.");
  }
  return context;
}
