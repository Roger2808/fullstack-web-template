import { ReactNode } from "react";
import styles from "./ui.module.css";

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className={styles.emptyState}>{children}</div>;
}
