# Testing Strategy — PoojaSetu

**Status:** Proposed test plan; exact tools/commands follow stack approval.

## 1. Goals
- Verify price calculation, cart totals and delivery-fee treatment.
- Verify secure Razorpay order creation, payment verification, webhook idempotency and reconciliation.
- Verify customer order flow and staff fulfilment flows.
- Verify access controls, privacy and responsive/accessibility basics.

## 2. Test layers
### Unit tests
- Price and subtotal calculations in paise.
- Daily-price freshness and availability rules once approved.
- Quantity validation and allowed order status transitions.
- Idempotency and event-deduplication logic.
- Input validation and safe error mapping.

### Integration tests
- API ↔ database transactions and constraints.
- Catalog and daily-price updates with history/audit events.
- Checkout creates an immutable order snapshot.
- Payment signature verification and amount/order matching using provider test fixtures.
- Verified webhook updates payment once; invalid signature and duplicate event are rejected/ignored safely.
- Staff/admin authorization and order isolation.

### End-to-end tests
- Browse product → cart → checkout → test payment success → confirmation.
- Payment failure/pending → safe status/retry path.
- Daily-price product and stale-price handling.
- Staff views paid order → updates allowed fulfilment statuses.
- Admin updates a daily price → storefront shows new value and timestamp.
- Out-of-service-area address blocks checkout clearly.
- Mobile checkout and keyboard navigation.

## 3. Payment test cases
- Valid success.
- User closes/cancels checkout.
- Payment fails.
- Browser callback succeeds but webhook is delayed.
- Webhook arrives before browser callback.
- Duplicate webhook event.
- Invalid signature.
- Wrong amount, currency or provider order ID.
- Network timeout during order creation/verification.
- Retry with same idempotency key.
- Refund pending/failure after refund policy is approved.

## 4. Test data and safety
- Use Razorpay test mode and synthetic customer data until production release is explicitly approved.
- Never test with real payment credentials or real customer addresses in automated suites.
- Do not make test success depend on a live external service; use controlled mocks for unit/integration tests and a separate sandbox smoke test.

## 5. Commands and tooling
Exact commands cannot be specified until the framework and package manager are approved. Once scaffolded, document reproducible commands for tests, lint, type check and production build in `README.md` and here.

## 6. Definition of done
- Tests, lint, type checking and build pass.
- Critical checkout and fulfilment journeys pass in a controlled environment.
- Security/payment negative tests pass.
- Responsive and accessibility checks have no blocking defects.
- Final diff is reviewed; docs reflect actual behavior.
- Any known limitation is documented and accepted before release.
