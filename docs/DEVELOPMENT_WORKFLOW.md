# Development Workflow

## Vertical Slice Development

Features should be implemented vertically.

Do not develop the entire backend first and postpone the frontend indefinitely.

Work in functional increments.

---

# Example

Requested feature:

"Patients can register an emergency contact."

Implementation should proceed approximately as:

### Backend Domain

Add required domain concept.

### Backend Application

Create/update use case.

### Backend Infrastructure

Update repository and Prisma implementation.

### Database

Update Prisma schema if required.

### Backend API

Expose endpoint.

### Frontend Contract

Create/update frontend types.

### Frontend API

Connect service/client.

### Frontend UI

Create required form/components.

### Integration

Connect UI to endpoint.

### Verification

Verify complete workflow.

---

# Definition of Done

A full-stack feature is complete when:

Backend:

- Domain implementation exists.
- Use case exists.
- Repository integration exists.
- Endpoint exists.
- Validation exists.
- Errors are handled.

Frontend:

- UI exists.
- Backend endpoint is connected.
- Types match.
- Loading state exists.
- Error state exists.
- Success state exists.
- UI is responsive.

---

# Change Scope

Each development task should represent a coherent feature.

Avoid touching unrelated contexts.

If implementing appointment cancellation, do not refactor patient registration without a direct reason.

---

# Inspect Before Creating

Before creating any:

- Component
- Repository
- DTO
- Hook
- Service
- Utility
- Value Object
- API client

search the project for an existing equivalent.

Reuse first.

Extend second.

Create new only when necessary.

---

# Database Changes

When modifying Prisma schema:

1. Update schema.
2. Update mappings.
3. Update repository implementation.
4. Document required migration.
5. Update related backend types.
6. Update frontend types if contract changes.

Never reset production/development databases automatically.

---

# API Changes

When changing API contracts:

1. Update backend DTO.
2. Update use case.
3. Update response mapping.
4. Update frontend types.
5. Update API service.
6. Update consumers.

Do not leave frontend/backend contracts inconsistent.

---

# Completion Report

After implementing a feature, briefly report:

- What was implemented.
- Backend files changed.
- Frontend files changed.
- Database changes.
- Commands that must be executed.
- Environment variables added.
- Any pending limitation.

Do not provide an excessively long report.
