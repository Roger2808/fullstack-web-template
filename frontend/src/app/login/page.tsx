"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/shared/auth/AuthContext";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { LoginInput } from "@/features/auth/types";
import styles from "./login.module.css";

export default function LoginPage() {
  const { login, status } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/pacientes");
    }
  }, [status, router]);

  const handleSubmit = async (input: LoginInput) => {
    setSubmitting(true);
    const result = await login(input);
    setSubmitting(false);
    if (result.success) {
      router.replace("/pacientes");
    }
    return result;
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link href="/" className={styles.back}>
          ← Volver al inicio
        </Link>
        <div className={styles.header}>
          <h1>Acceso al sistema</h1>
          <p>Ingresa con tu cuenta para gestionar la información de la clínica.</p>
        </div>
        <LoginForm onSubmit={handleSubmit} submitting={submitting} />
      </div>
    </div>
  );
}
