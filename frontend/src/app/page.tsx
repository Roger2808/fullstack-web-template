import Link from "next/link";
import { Card } from "@/shared/ui/Card";
import { ContactForm } from "@/features/contact/components/ContactForm";
import styles from "./page.module.css";

const services = [
  {
    title: "Pacientes",
    description:
      "Gestiona la información de tus pacientes de forma centralizada y segura.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
  },
  {
    title: "Citas",
    description:
      "Organiza la agenda médica y reduce inasistencias con recordatorios claros.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    ),
  },
  {
    title: "Historiales Médicos",
    description:
      "Consulta el historial clínico completo de cada paciente en un solo lugar.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 3v5h5M9 13h6M9 17h6" />
      </svg>
    ),
  },
  {
    title: "Facturación",
    description:
      "Genera y controla cobros, pagos y comprobantes de forma automática.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <path d="M2 10h20M6 15h4" />
      </svg>
    ),
  },
  {
    title: "Inventario",
    description:
      "Controla insumos y medicamentos con alertas de stock en tiempo real.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 8 12 3 3 8l9 5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8M12 13v8" />
      </svg>
    ),
  },
  {
    title: "Reportes",
    description:
      "Obtén métricas clave de tu clínica para tomar mejores decisiones.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
];

const team = [
  { name: "Dra. Lucía Fernández", specialty: "Medicina General", initials: "LF" },
  { name: "Dr. Andrés Morales", specialty: "Cardiología", initials: "AM" },
  { name: "Dra. Camila Torres", specialty: "Pediatría", initials: "CT" },
  { name: "Dr. Ricardo Peña", specialty: "Ginecología", initials: "RP" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </span>
          MediCore
        </div>
        <nav className={styles.nav}>
          <a href="#nosotros">Nosotros</a>
          <a href="#caracteristicas">Servicios</a>
          <a href="#equipo">Equipo</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <Link href="/login" className={styles.loginLink}>
          Iniciar sesión
        </Link>
      </header>

      <section className={styles.hero}>
        <span className={styles.badge}>Clínica médica MediCore</span>
        <h1>
          Cuidamos tu salud <span>con calidez</span> y profesionalismo
        </h1>
        <p>
          Desde 2010, MediCore acompaña a nuestros pacientes con atención médica integral,
          tecnología moderna y un equipo humano comprometido con tu bienestar.
        </p>
        <div className={styles.ctas}>
          <a className={styles.primary} href="#contacto">
            Agenda una consulta
          </a>
          <Link className={styles.secondary} href="/login">
            Acceder al sistema
          </Link>
        </div>
      </section>

      <section className={styles.about} id="nosotros">
        <div className={styles.aboutText}>
          <h2 className={styles.sectionTitle}>Sobre nosotros</h2>
          <p>
            MediCore es una clínica médica multidisciplinaria ubicada en el corazón de la
            ciudad. Contamos con más de 14 años de experiencia brindando atención primaria,
            especialidades médicas y servicios de diagnóstico con los más altos estándares
            de calidad y calidez humana.
          </p>
          <p>
            Nuestra misión es hacer que el cuidado de la salud sea simple, accesible y
            cercano para cada paciente y su familia.
          </p>
        </div>
        <div className={styles.aboutStats}>
          <div className={styles.stat}>
            <strong>14+</strong>
            <span>Años de experiencia</span>
          </div>
          <div className={styles.stat}>
            <strong>12</strong>
            <span>Especialidades médicas</span>
          </div>
          <div className={styles.stat}>
            <strong>20,000+</strong>
            <span>Pacientes atendidos</span>
          </div>
        </div>
      </section>

      <section className={styles.features} id="caracteristicas">
        <h2 className={styles.sectionTitle}>Todo lo que tu clínica necesita</h2>
        <p className={styles.sectionSubtitle}>
          Nuestro equipo administrativo utiliza una plataforma integral para cada área de la
          operación diaria. El acceso está reservado al personal autorizado.
        </p>
        <div className={styles.grid}>
          {services.map((service) => (
            <Card className={styles.serviceCard} key={service.title}>
              <span className={styles.cardIcon}>{service.icon}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.team} id="equipo">
        <h2 className={styles.sectionTitle}>Nuestro equipo médico</h2>
        <p className={styles.sectionSubtitle}>
          Profesionales certificados dedicados a tu cuidado.
        </p>
        <div className={styles.teamGrid}>
          {team.map((doctor) => (
            <Card className={styles.teamCard} key={doctor.name}>
              <span className={styles.avatar}>{doctor.initials}</span>
              <h3>{doctor.name}</h3>
              <p>{doctor.specialty}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className={styles.info} id="informacion">
        <Card className={styles.infoCard}>
          <h3>Horario de atención</h3>
          <ul>
            <li>Lunes a viernes: 8:00 – 18:00</li>
            <li>Sábados: 9:00 – 13:00</li>
            <li>Domingos: cerrado</li>
          </ul>
        </Card>
        <Card className={styles.infoCard}>
          <h3>Ubicación y contacto</h3>
          <ul>
            <li>Av. Siempre Viva 123, Ciudad de México</li>
            <li>Tel: +52 55 1234 5678</li>
            <li>contacto@medicore-demo.com</li>
          </ul>
        </Card>
      </section>

      <section className={styles.contact} id="contacto">
        <div className={styles.contactIntro}>
          <h2 className={styles.sectionTitle}>Contáctanos</h2>
          <p className={styles.sectionSubtitle}>
            ¿Tienes dudas o quieres agendar una consulta? Escríbenos y te responderemos a la
            brevedad.
          </p>
        </div>
        <Card className={styles.contactCard}>
          <ContactForm />
        </Card>
      </section>

      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} MediCore. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
