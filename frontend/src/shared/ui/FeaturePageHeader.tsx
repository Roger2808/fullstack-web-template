import Link from "next/link";
import styles from "./FeaturePageHeader.module.css";

export function FeaturePageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.back}>
        ← Volver al inicio
      </Link>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );
}
