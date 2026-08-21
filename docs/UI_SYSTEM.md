# UI System

## Objective

The frontend must use a centralized visual system.

A clinic may eventually require:

- Different brand colors
- Different logo
- Different radius
- Different typography
- Different visual density

The application should allow these changes without rewriting individual components.

---

# Design Tokens

Global design decisions should use CSS variables.

Example:

```css
:root {
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-primary-foreground: #ffffff;

  --color-secondary: #64748b;
  --color-secondary-foreground: #ffffff;

  --color-background: #ffffff;
  --color-surface: #f8fafc;

  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;

  --color-border: #e2e8f0;

  --color-success: #16a34a;
  --color-warning: #d97706;
  --color-danger: #dc2626;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}
```

Values are examples.

Follow the actual visual design selected by the project.

---

# Component Hierarchy

Prefer:

```text
shared/ui
    Button
    Input
    Select
    Modal
    Card
    Badge
    Table
    Spinner

features
    patients
    appointments
    clinics
```

Shared UI represents generic visual primitives.

Features represent business functionality.

---

# Buttons

All standard buttons should ultimately depend on the same shared Button implementation.

Recommended variants:

```text
primary
secondary
outline
ghost
danger
```

Recommended sizes:

```text
sm
md
lg
```

Avoid custom button CSS unless the component truly represents a unique interaction.

---

# Forms

Common controls should share visual behavior:

- Input
- Select
- Textarea
- Checkbox
- Radio
- Date input
- Error message
- Field label

Common states:

- default
- hover
- focus
- disabled
- invalid

---

# Cards

Common cards should use global:

- Surface color
- Border
- Radius
- Spacing
- Shadow

Feature-specific cards may compose the shared Card.

---

# Responsive Strategy

The application should be mobile-first when practical.

Minimum scenarios:

### Mobile

Single-column layouts.

Navigation must remain usable.

Tables require mobile handling.

Forms must avoid horizontal overflow.

### Tablet

Flexible grid.

### Desktop

Take advantage of additional space without creating excessive content width.

---

# CSS Rules

Prefer centralized classes and tokens.

Avoid:

```tsx
<div style={{ color: "#2563eb", padding: "16px" }}>
```

Prefer:

```tsx
<div className={styles.container}>
```

with global tokens used by the corresponding stylesheet.

Inline style is acceptable only when the value is genuinely dynamic and cannot reasonably be represented through a CSS class or variable.

---

# Branding

Clinic branding should eventually be representable through configuration.

Do not hardcode clinic-specific branding throughout feature components.

Potential configurable properties:

- Logo
- Primary color
- Secondary color
- Clinic name
- Favicon
- Contact information

Keep generic functionality independent from a specific clinic's brand.
