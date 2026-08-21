# AGENTS.md

## Project Overview

This repository contains a modular and scalable medical clinic management platform.

The system is designed to support multiple clinics with different requirements without forcing every clinic to use the same features.

The application consists of:

- Backend: NestJS
- Frontend: Next.js
- Language: TypeScript only
- ORM: Prisma
- Architecture: Hexagonal Architecture
- Domain modeling: Domain-Driven Design (DDD)
- Design principles: SOLID
- Domain separation: Bounded Contexts

The project must prioritize:

- Maintainability
- Modularity
- Scalability
- Clear domain boundaries
- Low coupling
- High cohesion
- Reusability
- Explicit contracts
- Easy customization for different clinics

---

# Core Rule

DO NOT redesign the architecture.

DO NOT introduce a new architectural pattern unless explicitly requested.

DO NOT reorganize existing folders simply because another structure appears cleaner.

DO NOT perform unrelated refactors.

Always work with the architecture that already exists.

Add only what is necessary to implement the requested functionality.

---

# Development Strategy

Features must be developed vertically.

A feature is NOT considered complete when only the backend or frontend exists.

Whenever a feature requires both backend and frontend, implement them together.

Expected flow:

1. Understand the domain requirement.
2. Identify the correct Bounded Context.
3. Implement or extend the backend domain.
4. Implement the application use case.
5. Implement required infrastructure.
6. Expose the API.
7. Implement the frontend feature.
8. Connect the frontend to the real backend endpoint.
9. Handle loading, success and error states.
10. Validate the complete flow.

Example:

Feature:
"Create medical specialties"

Expected implementation:

Backend:
Domain
→ Application
→ Infrastructure
→ Prisma
→ Controller/API

Frontend:
Types
→ API client
→ Feature components
→ Form/UI
→ Real API integration

Do not create disconnected mock implementations unless explicitly requested.

---

# Bounded Contexts

Every business capability must belong to a clear Bounded Context.

Examples may include:

- Identity
- Users
- Clinics
- Staff
- Patients
- Scheduling
- Medical Records
- Billing
- Inventory
- Notifications
- Reporting

These are examples only.

Do not create a new Bounded Context unless the business capability genuinely requires one.

Prefer extending an existing context when appropriate.

A Bounded Context must not directly manipulate internal domain objects from another context.

Communication between contexts should happen through explicit contracts, application services, events, IDs or defined interfaces.

---

# DDD Rules

Business rules belong in the domain.

Controllers, React components, Prisma models and database repositories must not contain important business logic.

Prefer domain concepts such as:

- Entities
- Value Objects
- Aggregates
- Domain Services
- Domain Events
- Repository interfaces

when they provide actual value.

Do not create unnecessary abstractions for trivial operations.

DDD must improve domain clarity, not increase complexity without benefit.

---

# SOLID

Code must follow SOLID principles where reasonable.

Especially:

- Domain logic should not depend on Prisma.
- Application use cases should not depend on HTTP.
- Controllers should remain thin.
- UI components should not contain API implementation details.
- Infrastructure implementations must depend on application/domain contracts.

---

# TypeScript

The entire project uses TypeScript.

Allowed:

- `.ts`
- `.tsx`

Do not create JavaScript source files.

Forbidden:

- `.js`
- `.jsx`

Generated framework files are excluded from this rule when generated automatically by tooling, but generated JavaScript must never be manually committed as project source code.

Never convert existing TypeScript code to JavaScript.

---

# Scope Discipline

When implementing a task:

DO:

- Modify only related files.
- Reuse existing abstractions.
- Follow existing naming conventions.
- Follow existing folder conventions.
- Keep changes small and intentional.

DO NOT:

- Rename unrelated files.
- Move unrelated folders.
- Change the architecture.
- Replace libraries without permission.
- Rewrite working modules.
- Introduce new frameworks unnecessarily.
- Create duplicate abstractions.
- Perform cosmetic refactors unrelated to the feature.

---

# Feature Completion

Before considering a feature finished, verify:

- Domain rules are represented correctly.
- Backend use case exists.
- Persistence is connected when required.
- API endpoint works.
- Input validation exists.
- Errors are handled.
- Frontend consumes the real API.
- Loading states exist.
- Error states exist.
- Responsive behavior works.
- TypeScript types are correct.
- No JavaScript source files were added.
- No architectural boundaries were violated.

---

# AI Behavior

Before modifying code:

1. Read the nearest AGENTS.md.
2. Read CLAUDE.md when available.
3. Inspect the existing implementation.
4. Determine the correct Bounded Context.
5. Reuse existing patterns.
6. Make the smallest correct change.

When unsure between creating a new abstraction and reusing an existing one, prefer reuse.

Do not speculate about requirements that were not requested.

If something is ambiguous but can safely follow an existing project pattern, follow the existing pattern.

Architecture consistency is more important than personal implementation preference.
