import styles from "./ui.module.css";

export function StatusBadge({ children }: { children: string }) {
  return <span className={styles.statusBadge}>{children}</span>;
}
