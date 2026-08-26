# Frontend AGENTS.md

These rules apply to everything inside `/frontend`.

Global rules from `/AGENTS.md` also apply.

---

# Technology

Frontend stack:

- Next.js
- React
- TypeScript
- TSX
- Responsive web design

Use the project's existing Next.js routing strategy.

Do not migrate between App Router and Pages Router unless explicitly requested.

---

# TypeScript Only

All frontend source code must use:

- `.ts`
- `.tsx`

Do not create:

- `.js`
- `.jsx`

Do not convert TypeScript files to JavaScript.

---

# Main UI Principle

The visual design must be globally configurable.

Changing fundamental properties such as:

- Primary color
- Secondary color
- Background color
- Text color
- Border radius
- Typography
- Spacing
- Button appearance
- Input appearance
- Card appearance

should NOT require editing dozens of components.

Centralize design decisions.

---

# Global Design System

Use centralized design tokens.

Prefer CSS variables for global visual values.

Example concept:

```css
:root {
  --color-primary: ...;
  --color-primary-hover: ...;
  --color-secondary: ...;
  --color-background: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-text-muted: ...;
  --color-border: ...;
  --radius-sm: ...;
  --radius-md: ...;
  --radius-lg: ...;
  --spacing-xs: ...;
  --spacing-sm: ...;
  --spacing-md: ...;
  --spacing-lg: ...;
  --font-family: ...;
}
```

Do not hardcode repeated design values across components when a token can represent them.

---

# Global Components

Common UI elements must be reusable.

Examples:

- Button
- Input
- Select
- Textarea
- Checkbox
- Modal
- Dialog
- Card
- Badge
- Table
- Pagination
- Spinner
- Alert
- FormField
- EmptyState

Do not recreate these styles inside every feature.

The shared Button should support semantic variants when appropriate:

- primary
- secondary
- outline
- ghost
- danger

and sizes such as:

- sm
- md
- lg

---

# Component Responsibilities

Keep components focused.

Avoid huge components containing:

- API requests
- validation
- business rules
- complex state
- presentation
- formatting

all in one file.

Separate responsibilities when complexity justifies it.

---

# Feature Modularity

Business UI should be organized by feature/domain.

Example conceptual organization:

```text
features/
  patients/
  appointments/
  clinics/
  staff/
```

Each feature may contain:

```text
components/
hooks/
services/
types/
schemas/
utils/
```

Do not force this exact structure when existing project conventions differ.

Follow existing project conventions first.

---

# Shared vs Feature-Specific

Put a component in shared UI only when it is truly reusable.

Examples:

Shared:

- Button
- Input
- Modal
- Card

Feature-specific:

- PatientSummaryCard
- AppointmentCalendar
- DoctorAvailabilityForm

Do not make everything globally shared.

---

# API Layer

React components must not contain duplicated raw fetch logic.

Centralize communication with the backend.

Prefer:

UI
→ feature hook/service
→ API client
→ backend

Avoid:

UI component
→ random fetch()
→ duplicated URL
→ duplicated error handling

---

# Backend Connection

Use the real backend endpoint whenever it exists.

Do not leave mock data after backend integration.

Frontend and backend contracts must match.

When backend response types change, update the corresponding frontend types.

Do not silently ignore backend validation/errors.

---

# API Base URL

Never hardcode backend URLs inside components.

Use environment configuration.

Example:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

The actual variable name must follow existing project conventions.

---

# Forms

Forms should have:

- Explicit types.
- Validation.
- Loading state.
- Error state.
- Disabled submission while appropriate.
- Server error handling.
- Accessible labels.
- Clear success behavior.

Frontend validation does NOT replace backend validation.

---

# Responsive Design

Everything must be responsive by default.

Every new screen must be usable on:

- Mobile
- Tablet
- Desktop

Avoid fixed widths that break smaller screens.

Use responsive layouts.

Tables must have a defined mobile strategy such as:

- Horizontal scrolling
- Responsive columns
- Card representation

depending on the feature.

Do not leave responsive implementation for a future task.

---

# Accessibility

Interactive elements must be accessible.

Use semantic HTML.

Buttons must use `<button>` when they perform actions.

Links must use proper navigation elements.

Inputs require labels or valid accessible alternatives.

Keyboard navigation must remain functional.

Do not use clickable `<div>` elements as buttons unless absolutely necessary.

---

# State

Prefer local state for local UI concerns.

Do not introduce global state management unless the feature genuinely requires shared application state.

Reuse the state-management solution already present in the project.

Do not introduce Redux, Zustand or another library solely because of personal preference.

---

# Loading and Error States

Every asynchronous UI must consider:

- Initial loading
- Empty state
- Error
- Success

Do not display blank pages while waiting for API responses.

---

# No Unnecessary Dependencies

Do not install a library when the existing stack can reasonably handle the requirement.

Before adding a dependency:

1. Check whether an equivalent dependency already exists.
2. Determine whether it provides enough value.
3. Avoid overlapping libraries.

---

# Final Frontend Verification

Before completing frontend work verify:

- No JavaScript source files were created.
- UI is responsive.
- Shared controls are reused.
- Global visual tokens are respected.
- API URLs are not hardcoded.
- Backend is actually connected.
- Loading state exists.
- Error state exists.
- Form validation exists when relevant.
- No major business logic exists inside presentation components.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
