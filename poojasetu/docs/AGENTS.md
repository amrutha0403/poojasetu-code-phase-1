# AI Coding Agent Instructions — PoojaSetu

## 1. Project context
PoojaSetu is a proposed online pooja-samagri store for Tirupati, with a customer storefront, immediate online payment through Razorpay, and a staff/admin fulfilment dashboard.

## 2. Current stage and hard stop
**Current stage: documentation review. Application implementation is NOT approved.**
Do not generate app code, scaffold the project, create cloud resources, configure real credentials, initiate paid services, or deploy until the product owner explicitly approves the documentation and asks to begin implementation.

## 3. Source of truth
Read relevant files in `/docs` before any future implementation. Core documents are PRD, DESIGN_SYSTEM, UX_FLOWS, ARCHITECTURE, DATABASE, API, SECURITY, CODE_STYLE, TESTING and this file. The operational docs define release and environment controls.

## 4. Do not guess
- Treat decisions as confirmed only when labelled Confirmed.
- Proposed choices are not approved decisions.
- If a blocking question or conflict exists, identify it and ask the owner.
- Never invent product prices, delivery fees, stock, policy terms, service radius, delivery promises, API fields or database columns.
- Never silently change a customer's recorded paid total.

## 5. Planning before coding
For each non-trivial feature, before editing:
1. Summarize relevant requirements and existing behavior.
2. Identify affected files/components/APIs/database tables.
3. Explain security and privacy impact.
4. List edge cases and tests.
5. Present a focused implementation plan and wait for approval when requested.

## 6. Implementation rules after approval
- Implement the smallest correct change.
- Follow the approved stack, design system, architecture, schema and API contracts.
- Reuse established patterns; avoid unnecessary dependencies and unrelated rewrites.
- Keep secrets server-side; never commit secrets.
- Server validates prices, totals, roles, and payment status.
- Payment success requires verified provider evidence, not a browser redirect alone.
- Do not claim a feature or test passed unless it was actually run and verified.

## 7. Validation and documentation
After changes, run tests, lint, type check, build and diff review. Report what changed, files touched, tests actually run, results, risks and remaining issues. Update docs whenever requirements, UX, architecture, database, API, security, conventions, testing or operations change.

## 8. Conflict handling
If docs conflict with each other, or code conflicts with docs, stop and report the conflict before changing behavior. Ask for clarification when a business decision is required.
