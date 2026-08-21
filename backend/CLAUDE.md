# Backend CLAUDE.md

Read:

1. `/AGENTS.md`
2. `/backend/AGENTS.md`
3. `/docs/ARCHITECTURE.md`
4. `/docs/DOMAIN_RULES.md`
5. `/docs/DEVELOPMENT_WORKFLOW.md`

before implementing backend functionality.

---

# Primary Constraint

Do not redesign the backend.

The existing Hexagonal + DDD structure is intentional.

Extend it instead of replacing it.

---

# Implementation Order

When implementing backend functionality, prefer:

1. Identify Bounded Context.
2. Define/update domain model.
3. Define required repository/service contracts.
4. Implement application use case.
5. Implement Prisma adapter.
6. Add mapper if necessary.
7. Add DTO.
8. Add controller endpoint.
9. Register dependencies in the existing Nest module.
10. Connect frontend if the task is full-stack.

---

# Important Restrictions

Never:

- Create JavaScript source files.
- Modify compiled `dist` files.
- Access Prisma directly from domain entities.
- Put business logic inside controllers.
- Introduce a second ORM.
- Replace Prisma.
- Change architecture without explicit permission.
- Create unnecessary generic repositories.
- Create duplicate modules for existing capabilities.
- Reset the database automatically.

Use TypeScript only.
