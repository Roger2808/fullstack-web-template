import { ReactNode } from "react";
import styles from "./ui.module.css";

export function Alert({
  variant,
  children,
}: {
  variant: "error" | "success";
  children: ReactNode;
}) {
  const variantClass = variant === "error" ? styles.alertError : styles.alertSuccess;
  return <div className={`${styles.alert} ${variantClass}`}>{children}</div>;
}
