import { InputHTMLAttributes } from "react";
import styles from "./ui.module.css";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, id, ...props }: FieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <input id={inputId} className={styles.input} {...props} />
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}
