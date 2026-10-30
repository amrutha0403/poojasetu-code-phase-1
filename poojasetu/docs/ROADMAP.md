# Roadmap — PoojaSetu

**Status:** Proposed sequence only; dates and scope not committed.

## Phase 0 — Documentation and business decisions (current)
- Review PRD and confirm scope.
- Resolve blocking questions in `DECISIONS.md`.
- Approve visual direction and user flows.
- Confirm Hostinger plan and validate architecture compatibility.
- Approve database, API, security, testing and operational documents.

**Exit gate:** explicit owner approval of the documentation set. No implementation before this gate.

## Phase 1 — Foundation
- Repository/scaffold and environment setup after approval.
- Core layout, catalog model, database migrations, auth/role model.
- CI-quality gates and baseline tests.

## Phase 2 — Storefront and catalog
- Responsive categories/products/search, fixed/daily price display, cart.
- Admin catalog and daily-price management.
- Serviceability validation.

## Phase 3 — Checkout and payments
- Server-side price calculation and immutable order snapshots.
- Razorpay test-mode integration, verification, webhooks and reconciliation.
- Error/pending/retry states and payment-focused tests.

## Phase 4 — Fulfilment
- Staff order dashboard and approved state transitions.
- Exception, cancellation/refund and delivery workflow per owner-approved policies.

## Phase 5 — Launch readiness
- Security review, accessibility/responsive checks, load/basic resilience checks.
- Policies, domain, hosting, backups, observability and rollback.
- Staging smoke tests, explicit production approval and production smoke tests.

## Potential later work
- Configurable hamper builder, customer order history, notifications, promotions, analytics and expanded service area.

Priorities may change only through documented review; dates are intentionally omitted until constraints and resources are known.
