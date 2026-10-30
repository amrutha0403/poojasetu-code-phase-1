# API Contract — PoojaSetu

**Status:** Proposed endpoint contract, not implemented. Routes, framework and exact schemas require approval.

## 1. Conventions
- JSON over HTTPS for application APIs.
- Server validates every input; client-supplied totals, roles, payment state and prices are never trusted.
- Monetary values are integer paise and include currency.
- Use stable machine-readable error codes and safe user-facing messages.
- Authentication/authorization is required for admin/staff endpoints.
- Add rate limits to checkout, login, OTP and other abuse-prone endpoints.

## 2. Response envelope proposal
Success:
```json
{"data": {}, "error": null}
```
Failure:
```json
{"data": null, "error": {"code": "INVALID_REQUEST", "message": "Please check the submitted information."}}
```
Do not expose stack traces, provider secrets, SQL details or sensitive provider payloads.

## 3. Public catalog endpoints (proposed)
- `GET /api/categories` — active categories.
- `GET /api/products` — paginated active products; filters by category/search/availability.
- `GET /api/products/:slug` — product detail and displayed price metadata.
- `GET /api/store/serviceability?postalCode=...` — serviceability result once the owner selects a serviceability rule.

Public responses must omit internal supplier costs, admin notes, customer data and privileged metadata.

## 4. Checkout and payment endpoints (proposed)
- `POST /api/checkout` — accepts item IDs/quantities and required delivery/contact details; server recalculates prices and fees, creates a pending order snapshot, and returns order reference plus Razorpay checkout order details.
- `POST /api/payments/verify` — accepts provider order/payment identifiers and signature; server verifies authenticity and amount/currency before changing payment status.
- `POST /api/webhooks/razorpay` — verifies the provider webhook signature using the raw request body as required by the provider, deduplicates events and updates payment state safely.
- `GET /api/orders/:publicOrderNumber/status` — customer-safe status lookup. Access protection (signed link, OTP or authenticated account) is an open decision; do not expose order details based only on a guessable ID.

Checkout should use an idempotency key. Duplicate requests must not create duplicate charges/orders. If payment status is uncertain, return `pending` and reconcile rather than claiming success.

## 5. Staff/admin endpoints (proposed)
- `POST /api/admin/session` or provider-managed auth flow — exact method depends on chosen auth provider.
- `GET /api/admin/orders` and `GET /api/admin/orders/:id`.
- `PATCH /api/admin/orders/:id/fulfilment` — only allowed transitions; actor and event recorded.
- `POST /api/admin/products`, `PATCH /api/admin/products/:id`, `POST /api/admin/products/:id/prices`.
- `POST /api/admin/orders/:id/refunds` — only after refund policy and provider flow are approved; admin-only and audited.

## 6. Validation and error codes
Proposed codes include `INVALID_REQUEST`, `PRODUCT_UNAVAILABLE`, `PRICE_EXPIRED`, `OUT_OF_SERVICE_AREA`, `CHECKOUT_CONFLICT`, `PAYMENT_PENDING`, `PAYMENT_VERIFICATION_FAILED`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `RATE_LIMITED`, and `INTERNAL_ERROR`.

Exact error behavior for a stale price or unavailable fresh item is blocking and must be decided before checkout implementation.

## 7. Security requirements
- Validate type, size, range, enum and allowed fields for all requests.
- Use CSRF protections if cookie-based sessions are selected.
- Use secure session/token handling; never accept role claims from the browser as authority.
- Verify webhook signatures and provider amount/currency/order relationships.
- Keep Razorpay secret key on server only; never expose it in public configuration or frontend bundles.
- Restrict CORS to approved origins and use TLS.
- Avoid logging personal address/contact details or full payment payloads.
