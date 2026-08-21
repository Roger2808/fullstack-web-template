# Architecture

## Purpose

The application is designed as a reusable medical clinic management platform.

Different clinics may require different capabilities.

Therefore, the system must allow capabilities to evolve independently without turning the application into a monolithic collection of tightly coupled modules.

---

# Architectural Principles

The project follows:

- Hexagonal Architecture
- Domain-Driven Design
- SOLID
- Bounded Contexts
- Dependency Inversion
- Explicit interfaces
- Modular design

---

# Main Applications

```text
Frontend
    |
    | HTTP
    v
Backend
    |
    v
Application Layer
    |
    v
Domain
    ^
    |
Infrastructure
    |
    v
Database / External Systems
```

---

# Dependency Rule

Dependencies point inward.

Infrastructure may know about application/domain contracts.

Application may know about domain concepts.

Domain must not know about infrastructure.

The domain should remain testable independently from:

- NestJS
- Prisma
- HTTP
- PostgreSQL
- Next.js
- React

---

# Backend Layers

## Domain

Contains business knowledge.

Examples:

- Entities
- Value Objects
- Aggregates
- Domain Services
- Domain Events
- Business invariants

## Application

Contains system use cases.

Examples:

- RegisterPatient
- CreateAppointment
- CancelAppointment
- AssignDoctor

Application orchestrates the domain but should not contain infrastructure implementation details.

## Infrastructure

Contains technical adapters.

Examples:

- Prisma
- Email
- External APIs
- File storage
- Message queues

## Presentation

Contains interaction adapters.

Examples:

- REST controllers
- DTOs
- Authentication guards
- Request/response mapping

---

# Bounded Contexts

A Bounded Context owns its business model.

Examples:

```text
Identity
Clinics
Patients
Staff
Scheduling
MedicalRecords
Billing
Inventory
Notifications
Reporting
```

Actual contexts depend on project requirements.

Do not create unnecessary dependencies between contexts.

---

# Cross-Context Communication

Avoid importing another context's internal entities directly.

Preferred approaches:

- IDs
- Public interfaces
- Application services
- Events
- Explicit contracts

Example:

Scheduling may reference:

```text
PatientId
DoctorId
ClinicId
```

instead of manipulating the internal Patient or Doctor aggregate.

---

# Database

Prisma is an infrastructure concern.

Database models and domain models do not need to be identical.

Persistence decisions must not dictate the domain design.

---

# Frontend

Frontend features should roughly align with business capabilities.

Example:

```text
features/
    patients/
    appointments/
    clinics/
```

However, frontend presentation structure does not need to mirror backend folders exactly.

Frontend depends on backend contracts, not backend internal implementations.

---

# Architecture Stability

Architecture changes are deliberate decisions.

Feature implementation must not trigger architecture redesign.

If a feature does not perfectly fit an existing abstraction:

First attempt to extend the existing architecture cleanly.

Do not introduce a new architectural pattern without explicit approval.
