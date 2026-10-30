# Code Style and Repository Conventions

**Status:** Proposed conventions; apply after stack approval and scaffold creation.

## 1. General rules
- Use TypeScript for frontend and backend if the proposed stack is approved.
- Prefer small, named, single-purpose modules and functions.
- Keep business rules (price calculation, payment verification, state transitions) outside UI components.
- Avoid duplicated business logic across client and server; server remains authoritative.
- Reuse components/utilities where they fit; avoid unnecessary dependencies and unrelated rewrites.
- No fake buttons, mocked success in production paths, or placeholder functionality presented as complete.

## 2. Naming
- React components and types: `PascalCase`.
- Functions/variables: `camelCase`.
- Constants: `UPPER_SNAKE_CASE` only for true constants.
- Database tables/columns: consistent `snake_case`.
- API error codes: uppercase snake case.
- Use domain terms consistently: product, price snapshot, order, payment attempt, fulfilment status.

## 3. Organization
- Separate UI/presentation, domain logic, persistence and external-provider adapters.
- Keep server-only code and secrets out of browser-importable modules.
- Group tests by unit/integration/e2e purpose.
- Keep docs in `/docs`; update them when behavior or interfaces change.

## 4. Formatting and quality gates
- Select one formatter/linter after the framework scaffold is approved; commit configuration and lockfile.
- Require lint, type checking, tests and build before considering a change complete.
- Avoid suppressing type/lint errors without a documented reason.
- Prefer explicit types for API boundaries and database records.

## 5. Error handling and logging
- Return stable error codes and safe messages.
- Do not swallow errors or report success before the server/provider confirms it.
- Use structured logs with request/order correlation IDs where safe.
- Never log credentials, payment secrets, CVV/UPI PIN, full webhook secrets or unnecessary personal data.

## 6. Git and change management
- Use small, focused commits with descriptive messages.
- Do not commit `.env`, keys, customer exports or generated build artifacts unless deliberately required.
- Review the diff for unrelated changes before merge/deploy.
- Record meaningful product/architecture changes in relevant docs and `CHANGELOG.md`.
