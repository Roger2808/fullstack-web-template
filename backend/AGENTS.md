# Backend AGENTS.md

These rules apply to everything inside `/backend`.

Global rules from `/AGENTS.md` also apply.

---

# Technology

Backend stack:

- NestJS
- TypeScript
- Prisma
- REST API unless the existing implementation specifies otherwise
- Hexagonal Architecture
- Domain-Driven Design
- SOLID
- Bounded Contexts

---

# TypeScript Only

ALL backend source code must remain TypeScript.

Use:

- `.ts`

Do not create source files using:

- `.js`
- `.jsx`

Do not manually compile TypeScript files into JavaScript inside the source tree.

Do not create compiled copies of source files.

Compiled output, when produced by Nest tooling, belongs only in generated output directories such as `dist/`.

Never manually modify `dist/`.

Never commit generated JavaScript as application source code.

The source of truth is always TypeScript.

---

# Architecture

DO NOT modify the backend architecture.

DO NOT replace the existing architecture with another folder structure.

DO NOT reorganize modules unless explicitly requested.

New code must adapt to the existing architecture.

The preferred conceptual dependency direction is:

Infrastructure / Presentation
        ↓
Application
        ↓
Domain

The Domain must remain independent.

Domain code must not depend on:

- NestJS
- Prisma
- HTTP
- Controllers
- Database libraries
- External providers

---

# Bounded Context Structure

Follow the structure already present in the project.

Conceptually, a Bounded Context may contain:

domain/
application/
infrastructure/
presentation/

Do not create these directories blindly if the project already uses an equivalent structure.

Follow existing conventions first.

---

# Domain Layer

The domain contains business concepts and business rules.

Possible elements:

- Entities
- Value Objects
- Aggregates
- Domain Services
- Domain Events
- Repository contracts
- Domain errors

The domain must not know that Prisma exists.

---

# Application Layer

Application code coordinates use cases.

Examples:

- CreatePatient
- UpdatePatient
- FindPatient
- ScheduleAppointment
- CancelAppointment

Use cases should depend on abstractions.

Do not put HTTP-specific logic in use cases.

Do not expose Prisma models directly from application services.

---

# Infrastructure Layer

Infrastructure contains technical implementations.

Examples:

- Prisma repositories
- External APIs
- Email providers
- File storage
- Queue implementations
- Third-party integrations

Repository interfaces belong toward the domain/application boundary.

Prisma implementations belong in infrastructure.

---

# Presentation Layer

Nest controllers belong in the presentation/interface layer.

Controllers must remain thin.

Controllers should:

1. Receive the request.
2. Validate/transform input.
3. Call a use case.
4. Map the result to an HTTP response.

Controllers must NOT contain important business logic.

---

# Prisma

Prisma is the database ORM.

Use Prisma only in infrastructure/persistence-related code.

Do not use Prisma Client directly inside:

- Domain entities
- Value Objects
- Application use cases
- Controllers

unless the existing architecture explicitly establishes a different adapter boundary.

Prefer:

Domain/Application repository interface

→ Prisma repository implementation

---

# Prisma Schema

Before modifying `schema.prisma`:

1. Inspect existing models.
2. Reuse existing relations.
3. Avoid duplicated concepts.
4. Respect naming conventions.
5. Consider multi-clinic isolation.

After schema changes, mention the required migration command.

Typical development flow:

```bash
npx prisma generate
npx prisma migrate dev --name descriptive_migration_name
```

Do not automatically destroy or reset databases.

Never use destructive commands such as database resets unless explicitly requested.

---

# Multi-Clinic Design

This platform may serve multiple clinics.

Never assume globally unique clinic-owned data unless the domain requires it.

Always evaluate whether an entity belongs to:

- The global platform
- A clinic
- A user
- A medical professional
- Another aggregate

Clinic-specific information should normally have explicit clinic ownership.

Do not silently introduce cross-clinic data access.

---

# DTOs

DTOs are transport-layer objects.

DTOs are NOT domain entities.

Do not use DTOs as substitutes for domain models.

Validate incoming API requests using the validation mechanism already configured by the project.

Never trust client-provided identifiers related to ownership/security without server-side verification.

---

# Mappers

When persistence models and domain models differ, use explicit mapping.

Example:

Prisma model
→ Mapper
→ Domain entity

Domain entity
→ Mapper
→ Prisma persistence data

Do not contaminate the domain entity with Prisma-specific metadata.

---

# Error Handling

Use explicit errors.

Prefer meaningful domain/application errors such as:

- PatientNotFoundError
- ClinicNotFoundError
- AppointmentAlreadyCancelledError
- ScheduleConflictError

Map them to HTTP responses at the outer boundary.

Avoid throwing generic errors for known business conditions.

---

# Dependency Injection

Use dependency inversion.

Application services should depend on contracts rather than concrete infrastructure implementations.

NestJS dependency injection may wire those implementations together in modules.

---

# API Contracts

Keep API behavior explicit.

For each endpoint define:

- Input
- Output
- Validation
- Possible errors
- Authorization requirements

Avoid leaking internal database structures.

---

# Security

Medical information must be treated as sensitive.

Never log:

- Passwords
- Authentication tokens
- Full medical records
- Sensitive patient information unnecessarily

Do not expose cross-clinic information.

Authorization must be validated server-side.

Never rely exclusively on frontend restrictions.

---

# Running the Backend

Always inspect `package.json` first because project scripts are the source of truth.

Typical setup:

```bash
npm install
```

Configure environment variables:

```bash
cp .env.example .env
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run development migrations when necessary:

```bash
npx prisma migrate dev
```

Start NestJS in development mode:

```bash
npm run start:dev
```

If scripts differ, follow `package.json`.

Do not invent new scripts if equivalent scripts already exist.

---

# Before Completing Backend Work

Verify:

- No `.js` source files were created.
- Domain does not depend on Prisma.
- Controllers remain thin.
- Business rules are not inside controllers.
- Prisma access exists only in appropriate adapters.
- New functionality belongs to the correct Bounded Context.
- DTO validation exists.
- Authorization boundaries are preserved.
- Database migration instructions are documented when schema changes.
- Existing architecture was not reorganized.
