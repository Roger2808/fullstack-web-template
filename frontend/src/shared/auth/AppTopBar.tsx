"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";
import { Button } from "@/shared/ui/Button";
import styles from "./AppTopBar.module.css";

const MODULES = [
  { title: "Pacientes", href: "/pacientes" },
  { title: "Citas", href: "/citas" },
  { title: "Historiales", href: "/historiales" },
  { title: "Facturación", href: "/facturacion" },
  { title: "Inventario", href: "/inventario" },
  { title: "Reportes", href: "/reportes" },
];

export function AppTopBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  return (
    <header className={styles.bar}>
      <div className={styles.top}>
        <Link href="/" className={styles.brand}>
          MediCore
        </Link>
        <div className={styles.right}>
          {user && <span className={styles.user}>{user.fullName}</span>}
          <Button variant="outline" size="sm" onClick={logout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
      <nav className={styles.nav}>
        {MODULES.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className={`${styles.navLink} ${pathname === module.href ? styles.navLinkActive : ""}`}
          >
            {module.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
