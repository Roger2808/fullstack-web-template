# Frontend CLAUDE.md

Before modifying frontend code read:

1. `/AGENTS.md`
2. `/frontend/AGENTS.md`
3. `/docs/UI_SYSTEM.md`
4. `/docs/DEVELOPMENT_WORKFLOW.md`
5. `/docs/ARCHITECTURE.md`

---

# Main Objective

Build a modular frontend whose visual system can be changed globally.

Do not scatter visual constants throughout components.

Use centralized tokens and reusable components.

---

# Feature Implementation

For each feature:

1. Identify the corresponding domain capability.
2. Inspect the backend contract.
3. Create/update frontend types.
4. Create/update API service.
5. Create hooks/state when useful.
6. Create feature-specific components.
7. Reuse shared UI.
8. Implement responsive layouts.
9. Connect to the real backend.
10. Handle loading/error/empty/success states.

---

# Restrictions

Never:

- Create `.js` or `.jsx`.
- Hardcode API URLs in components.
- Duplicate shared button/input/card styles.
- Use mock data when the corresponding API has already been implemented.
- Put significant business logic inside JSX.
- Introduce a new UI framework without explicit approval.
- Change routing architecture without explicit approval.
- Ignore mobile layouts.

Use `.ts` and `.tsx` only.
