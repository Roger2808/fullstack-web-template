import styles from "./ui.module.css";

export function Spinner() {
  return <div className={styles.spinner} role="status" aria-label="Cargando" />;
}
