import { ReactNode } from "react";
import { RequireAuth } from "@/shared/auth/RequireAuth";
import { AppTopBar } from "@/shared/auth/AppTopBar";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <RequireAuth>
      <AppTopBar />
      {children}
    </RequireAuth>
  );
}
