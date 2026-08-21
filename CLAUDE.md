# CLAUDE.md

Read `AGENTS.md` before performing any development task.

The rules defined in AGENTS.md are mandatory.

Also read the relevant documentation inside `/docs` before implementing architectural changes or new features.

Relevant documents:

- `docs/ARCHITECTURE.md`
- `docs/DEVELOPMENT_WORKFLOW.md`
- `docs/DOMAIN_RULES.md`
- `docs/UI_SYSTEM.md`

When working inside `/backend`, also read:

- `backend/AGENTS.md`

When working inside `/frontend`, also read:

- `frontend/AGENTS.md`

---

# Working Method

Never start coding immediately after receiving a feature request.

First:

1. Inspect existing code.
2. Locate the correct Bounded Context.
3. Identify similar implementations.
4. Determine the minimum files that need modification.
5. Implement the feature following existing conventions.

Do not change architecture unless explicitly requested.

---

# Full-Stack Development Rule

Backend and frontend features must evolve together.

If a requested feature requires UI and backend support, implement both within the same task.

Do not leave:

- API without UI when UI is required.
- UI using fake data when a backend exists.
- Forms without endpoint integration.
- Backend DTOs disconnected from frontend types.
- Buttons without implemented actions.

Prefer complete vertical slices.

---

# Generated Code

Never create or commit compiled JavaScript versions of TypeScript source files.

Do not manually generate:

- `.js`
- `.js.map`

Do not modify generated directories such as:

- `dist`
- `.next`
- `node_modules`

Generated Prisma Client files must not be manually edited.

---

# Refactoring

Refactoring is allowed only when:

- Required to implement the requested functionality.
- Fixing a directly related architectural issue.
- Explicitly requested.

Avoid broad cleanup during feature development.

Do not modify unrelated code.

---

# Final Verification

Before finishing a task, review the diff and verify:

- Only necessary files changed.
- Architecture remains intact.
- TypeScript compiles/type-checks where applicable.
- No duplicated functionality was introduced.
- Backend and frontend contracts match.
- No hardcoded styling exists when a design token should be used.
- No generated JavaScript was added.
