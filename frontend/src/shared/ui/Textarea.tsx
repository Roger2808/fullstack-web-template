import { TextareaHTMLAttributes } from "react";
import styles from "./ui.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={inputId}>
        {label}
      </label>
      <textarea id={inputId} className={`${styles.input} ${styles.textarea}`} {...props} />
      {error && <span className={styles.fieldError}>{error}</span>}
    </div>
  );
}
