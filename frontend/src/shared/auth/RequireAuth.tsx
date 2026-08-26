"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Spinner } from "@/shared/ui/Spinner";
import styles from "./RequireAuth.module.css";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div className={styles.loadingScreen}>
        <Spinner />
      </div>
    );
  }

  return <>{children}</>;
}
