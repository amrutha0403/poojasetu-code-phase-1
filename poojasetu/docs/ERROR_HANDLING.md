# Error Handling and Recovery

**Status:** Proposed behavior. Business-policy-dependent cases remain open.

## 1. Principles
- Fail clearly and safely; do not show false success.
- Give customers actionable, non-technical messages without exposing internals.
- Log diagnostic context using correlation IDs while minimizing personal data.
- Preserve payment/order history; do not erase uncertain states to make UI appear clean.

## 2. Customer-facing cases
- Invalid form/cart: explain field or item and allow correction.
- Product unavailable: prevent new checkout; if already paid, use the owner-approved exception policy.
- Price stale: stop before payment and show current amount/refresh choice; never silently alter a paid amount.
- Outside service area: clearly state delivery is unavailable and avoid collecting payment.
- Payment failed: explain payment was not confirmed and offer a safe retry/check-status path.
- Payment pending/timeout: explain status is being checked; avoid encouraging repeated charges.
- Order status unavailable: show reference and contact route; retry without creating a new order.

## 3. Server and provider failures
- Validate and normalize provider errors; never expose secret/config details.
- Use timeouts and bounded retries for transient provider calls.
- Retry only idempotent operations or use idempotency controls.
- Queue/reconcile uncertain payment states if supported by the approved architecture.
- Alert on repeated webhook verification failures, stuck pending payments, or database outages.

## 4. Admin cases
- Unauthorized/expired session: deny action and request sign-in.
- Invalid state transition: return conflict with current allowed state; log attempted privileged changes where appropriate.
- Price update failure: retain prior valid price and tell admin the update did not apply.
- Refund: distinguish requested, pending, succeeded and failed; never claim success before provider confirmation.

## 5. Business decisions required
- Item unavailable after payment: substitution, partial refund, full refund or cancellation.
- Price discrepancy discovered during packing.
- Customer cancellation window and perishable-goods policy.
- What staff can do without admin approval.
- Contact channel and response-time expectation.
