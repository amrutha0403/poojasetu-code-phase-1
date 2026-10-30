# PoojaSetu — Implementation Plan (For Owner Review)

**Status:** Proposed — awaiting owner approval  
**Date:** 2026-10-27  
**Implementation status:** Not started  
**Source of truth:** `docs/PRD.md`, `docs/UX_FLOWS.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`, `docs/DATABASE.md`, `docs/API.md`, `docs/SECURITY.md`, `docs/CODE_STYLE.md`, `docs/TESTING.md`, `docs/AGENTS.md`, and `docs/DECISIONS.md`.

## 1. Confirmed context

- New project; no existing application codebase.
- Working product name: PoojaSetu.
- Initial launch geography: Tirupati; exact serviceable pincodes/radius remain undecided.
- Hosting preference: Hostinger, plan not purchased or confirmed.
- Payment provider: Razorpay.
- Customers pay immediately using the current displayed prices; staff pack after verified payment.
- Online payments only; no Cash on Delivery.
- Product catalog should support fixed-price and daily-price products, including flowers and fruits, plus pooja kits.
- A 25% markup is a target, but its calculation basis remains undecided.
- Delivery charges are separate from product prices; how/when the charge is collected remains undecided.
- The 20–30 minute delivery target is not a promise until operationally validated.

## 2. Goals for the first release

1. Deliver a responsive storefront and product catalogue.
2. Let customers build a cart and review a transparent checkout total.
3. Prevent stale or client-tampered prices from being trusted.
4. Accept online payment only after a server-created Razorpay order and server-side verification.
5. Give authorized staff a way to view paid orders and manage fulfilment.
6. Give authorized administrators a way to manage products, prices, availability, and basic order exceptions.
7. Establish tests, security controls, logs, deployment checks, and maintainable documentation.

## 3. Proposed implementation sequence

### Phase 0 — Resolve blocking decisions and hosting constraints
- Resolve delivery-fee collection, serviceable areas, daily-price freshness, post-payment item unavailability, cancellation/refund policy, launch catalog, guest checkout, language, and staff roles.
- Before purchasing or selecting a Hostinger plan, verify the exact plan's current support for Node.js apps/runtime, environment variables, HTTPS, inbound Razorpay webhooks, logs, backups, process management, scheduled jobs if needed, and database connectivity.
- Confirm whether the selected plan can host the proposed API. If not, present compatible options and obtain owner approval before changing the architecture.
- Review Razorpay account onboarding and test/live credential requirements.

**Exit condition:** Blocking business rules are documented, and hosting constraints are known or explicitly accepted as a decision gate.

### Phase 1 — Repository and development foundation
- Create a clean project repository and retain the approved `docs/` folder as the source of truth.
- Confirm the exact frontend/backend workspace layout after stack approval.
- Add `.gitignore`, `.env.example` with placeholders only, README, formatting/lint/type-check/test scripts, and a minimal CI validation workflow if the chosen platform supports it.
- Scaffold the smallest runnable frontend and server/API shell; do not add payment or production data integrations yet.
- Add a health endpoint and basic error handling.
- Run install, lint, type check, tests, and build; record exact commands and results.

**Exit condition:** A clean local development setup works reproducibly and has no secrets in source control.

### Phase 2 — Storefront catalogue and cart
- Implement mobile-first layout using the approved design system.
- Build home/category/listing/product detail, cart, contact/help, and policy placeholders.
- Display price, unit, availability, and last-updated information for daily-price items.
- Add cart quantity changes, empty/loading/error states, and a clear price breakdown.
- Use development fixtures or seeded non-production catalogue data until the final launch catalogue is supplied.
- Test keyboard navigation, responsive layouts, cart totals, invalid quantities, and unavailable products.

**Exit condition:** Browsing and cart journeys work without real payments or production customer data.

### Phase 3 — Data layer and staff/admin access
- Implement the approved schema and migrations only after the database/auth choice is confirmed.
- Add server-side validation, authorization, least-privilege policies, and audit records.
- Implement protected product, price, availability, and order-management operations.
- Keep customer/order data inaccessible to anonymous users except for narrowly scoped public data.
- Test authorization boundaries and data constraints.

**Exit condition:** Admin/staff operations work in a controlled test environment and access-control tests pass.

### Phase 4 — Checkout and Razorpay test mode
- Recalculate item prices, quantities, delivery fees, taxes/other approved charges on the server.
- Create an immutable order snapshot and Razorpay order server-side; never trust an amount supplied by the browser.
- Integrate Razorpay Checkout in test mode.
- Verify payment signatures server-side and validate provider order, amount, currency, and order association.
- Verify webhook signatures and process webhook events idempotently.
- Handle pending/failed/duplicate callbacks and reconciliation without showing false success.
- Only mark an order paid after verified provider evidence.
- Do not enable live payments until test scenarios and owner-approved policies pass.

**Exit condition:** Payment and order states reconcile correctly across success, failure, delayed response, duplicate webhook, and retry cases in test mode.

### Phase 5 — Fulfilment and exception handling
- Show verified paid orders to authorized staff.
- Implement agreed fulfilment states, for example: paid, accepted, packing, ready/dispatching, delivered, cancelled/refund-pending, refunded. Final state names must match the approved UX/API docs.
- Implement the agreed process for unavailable fresh items, substitutions, cancellations, and refunds.
- Prevent staff from silently changing the price or paid total on an existing order.
- Test audit trail and order-state transition rules.

**Exit condition:** Staff can process an order while preserving payment history and customer-approved outcomes.

### Phase 6 — Production readiness and deployment
- Select a hosting topology only after Hostinger plan capabilities are verified.
- Configure separate development/test/production environments and server-only secrets.
- Confirm HTTPS, domain/DNS, backups, monitoring/logging, webhook reachability, and rollback.
- Complete privacy, terms, cancellation/refund, delivery, and contact information with owner/qualified-advisor review where appropriate.
- Run tests, lint, type checking, production build, dependency/security checks, payment test suite, and deployment smoke tests.
- Use Razorpay test mode until explicit launch approval; enable live mode only after merchant onboarding and final checks.

**Exit condition:** All release checklist items pass and the owner explicitly approves production launch.

## 4. Architecture direction — conditional, not final

Candidate stack:
- Frontend: React + TypeScript.
- API: Node.js + TypeScript.
- Database/auth: Supabase Postgres and Auth as a candidate, pending approval.
- Payments: Razorpay Checkout, server-created orders, server-side verification, signed webhooks.
- Hosting: Hostinger preferred, exact product/plan and compatibility unconfirmed.

Do not lock the backend framework, workspace layout, database/auth provider, or deployment topology until hosting constraints and open decisions are resolved.

## 5. Files likely to be created or changed in Phase 1

- `README.md`
- `.gitignore`
- `.env.example`
- `package.json` and workspace configuration, after stack approval
- `src/` frontend scaffold
- `server/` API scaffold, if the approved architecture uses a separate server directory
- `tests/` starter tests
- lint, type-check, test, and build configuration
- `docs/ENVIRONMENT.md`, `docs/DEPLOYMENT.md`, `docs/DECISIONS.md` updated to reflect final choices

No application files have been created or changed as part of this plan.

## 6. Security and reliability requirements

- No secrets in client code, committed files, logs, screenshots, or public repositories.
- All prices and totals are calculated and validated on the server.
- Payment success is never inferred solely from a browser redirect/callback.
- Razorpay webhook signatures are verified and events are processed idempotently.
- Admin/staff authorization is enforced server-side.
- Order snapshots and payment records are preserved; important changes are auditable.
- Customer data is minimized and protected by database policies and API authorization.
- Safe pending/error states are used when payment status is uncertain.

## 7. Validation strategy

For each phase:
1. Run unit tests for business logic.
2. Run integration tests for API/database/payment interactions as applicable.
3. Run end-to-end tests for critical customer and staff journeys.
4. Run lint, type checking, and production build.
5. Review the diff for unrelated changes, security issues, and documentation drift.
6. Update the relevant docs before the next phase.

Critical journeys:
- Browse catalogue → add to cart → review totals.
- Checkout → Razorpay test payment → verified order confirmation.
- Failed/pending payment → safe retry/status handling.
- Admin updates a daily price → customer sees updated timestamp/price.
- Staff processes paid order → order history remains auditable.
- Unavailable item → agreed customer notification/substitution/refund flow.
- Unauthorized user attempts admin/order access → request denied.

## 8. Risks and unresolved decisions

Implementation of affected features must pause until these are resolved:
- Tirupati serviceable pincodes/radius.
- Delivery fee calculation and collection.
- Daily-price validity and refresh behavior.
- Unavailable item/substitution/refund behavior after payment.
- Cancellation and refund policy.
- Exact initial catalogue, units, kits, and prices.
- Markup calculation basis and tax/cost treatment.
- Guest checkout versus account/OTP.
- English/Telugu/bilingual launch.
- Customized hamper MVP behavior.
- Admin/staff identities and permissions.
- Hostinger plan and backend compatibility.
- Database/auth provider and notification/delivery process.

## 9. Approval gate

Please review this plan before any implementation begins.

Approval should confirm:
- The proposed phases and MVP scope are acceptable.
- The candidate stack is acceptable as a proposal, subject to Hostinger compatibility.
- The blocking business rules will be resolved before checkout/payment and fulfilment implementation.
- Work may begin on Phase 1 only after the owner explicitly approves this plan.

**Current status: Awaiting owner review. No implementation has started.**
