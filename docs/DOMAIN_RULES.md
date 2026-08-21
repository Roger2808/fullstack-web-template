# Domain Rules

## Purpose

This document contains high-level rules for modeling the medical platform.

Specific domain rules should be added here as the system evolves.

---

# Multi-Clinic Awareness

Always determine ownership of business data.

Possible ownership scopes:

- Platform
- Clinic
- User
- Patient
- Medical professional

Clinic-owned entities should normally include explicit clinic association.

Never assume that a record visible to one clinic should be visible to another.

---

# Identity vs Domain Entities

Authentication identity and business identity are different concepts.

For example:

A system User may represent login credentials.

A Doctor may represent a medical professional.

An Employee may represent staff information.

These concepts should not automatically become the same aggregate solely because they share information.

---

# IDs

Prefer explicit identifiers across Bounded Context boundaries.

Examples:

- ClinicId
- PatientId
- DoctorId
- AppointmentId

Avoid passing complete foreign aggregates between contexts when an identifier or explicit contract is sufficient.

---

# Medical Data

Medical data must be treated as sensitive information.

The domain and application layers should expose only information required by the corresponding use case.

Avoid accidental exposure of complete patient records through generic responses.

---

# Authorization

Authorization is a backend concern.

Frontend authorization is useful for UX but cannot be trusted as the security boundary.

Every sensitive operation must be authorized server-side.

---

# Auditability

Important medical or administrative changes may eventually require auditing.

When implementing operations such as:

- Medical record modifications
- Appointment changes
- Permission changes
- Billing changes
- Patient status changes

consider whether the domain requires an audit trail.

Do not automatically implement auditing for every operation unless required.

---

# Soft Delete

Do not automatically implement hard deletion for medical or business records.

Before implementing delete operations determine whether the business requires:

- Hard delete
- Soft delete
- Deactivation
- Archival

Medical information may have regulatory or auditing implications.

---

# Extensibility

Do not model clinic-specific optional functionality as mandatory global behavior.

Features that only certain clinics require should remain isolated whenever possible.

Prefer:

Core capability

+

Optional module/capability

instead of adding clinic-specific conditional logic throughout unrelated code.

BAD:

```ts
if (clinic.name === 'Clinic A') {
   ...
}
```

GOOD:

Explicit configuration, policy, strategy or enabled capability.

---

# Domain Evolution

When a new requirement appears:

1. Determine the affected business capability.
2. Determine the owning Bounded Context.
3. Determine whether the rule is global or clinic-specific.
4. Extend the domain model.
5. Avoid leaking exceptions across unrelated modules.

The goal is to allow new clinic requirements without destabilizing existing clinics.
