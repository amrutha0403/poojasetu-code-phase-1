# Architecture — PoojaSetu

**Status:** Approved direction for local storefront/API foundation; production topology remains conditional on Hostinger plan verification.

## 1. Architectural goals
- Keep payment secrets and business-critical calculations server-side.
- Ensure the displayed/paid amount is consistent with a server-validated order snapshot.
- Keep catalog, daily pricing, orders, payment reconciliation and staff permissions auditable.
- Prefer a small, maintainable MVP and avoid unnecessary services.
- Support deployment on the actual Hostinger plan chosen by the owner.

## 2. Proposed stack (not yet final)
- **Frontend:** React + TypeScript, responsive web app.
- **Backend:** Node.js + TypeScript with Express for the local API foundation. Production deployment compatibility must be verified against the chosen Hostinger plan.
- **Database/auth:** Supabase Postgres and Auth are a proposed option, not yet provisioned or approved.
- **Payments:** Razorpay Checkout plus server-created orders, server verification and webhooks.
- **Hosting:** Hostinger preference; exact product/plan and Node.js support are unconfirmed.
- **Testing:** unit/integration tests plus browser-based end-to-end tests; tool choice to be confirmed with scaffold.

## 3. Logical components
1. **Storefront UI** — catalog, search/category browsing, cart and checkout presentation.
2. **Backend API** — validates requests, calculates totals, checks serviceability and permissions, persists orders and communicates with Razorpay.
3. **Database** — products, categories, price history/current price, order snapshots, payment attempts/events, staff roles and audit events.
4. **Payment adapter** — creates provider orders, verifies signatures, consumes webhooks idempotently, reconciles payment state.
5. **Admin UI** — authorized catalog, pricing and order operations.
6. **Operational layer** — structured logs, alerts, backups, deployment and rollback procedure.

## 4. Current local data flow (implemented)
1. React/Vite requests `/api/products` and `/api/categories` from the Express API.
2. The API returns clearly labelled development fixture data; it does not persist mutations.
3. Cart state is held in the browser and is not an order.
4. Checkout, database persistence, authentication, and payment flows are not implemented.

## 5. Data flow: checkout/payment (future; not implemented)
1. Browser sends product identifiers, quantities, address/contact and an idempotency key; it does not send a trusted final amount.
2. API loads current catalog/prices, validates availability and quantities, applies approved delivery-fee rules and calculates total in integer paise.
3. API creates an order/checkout record and immutable line-item price snapshot.
4. API creates a Razorpay order for the computed amount and stores provider order ID.
5. Browser launches Razorpay checkout using the returned public checkout details.
6. Browser submits payment identifiers/signature to API; API verifies using server-side secret and validates provider order/amount/currency.
7. A verified webhook is processed with signature validation and idempotency. Reconciliation resolves cases where browser response/webhook is delayed.
8. Only verified provider evidence transitions payment to paid. Order fulfilment starts after that state is recorded.

## 6. Hosting decision gate
Before choosing server layout, confirm the Hostinger product and current plan capabilities: Node.js application support, runtime/version, process management, environment variables, HTTPS, webhook reachability, database network access, cron/background jobs, logs and backups. Do not assume shared hosting supports a persistent Node API. If plan limitations conflict with this architecture, document options and ask the owner before switching providers or architecture.

## 7. Trust boundaries
- Browser/client is untrusted: totals, role claims, product price, payment success and status updates must be validated server-side.
- Razorpay callbacks/webhooks are external inputs and must be signature-verified.
- Admin actions require server-side authorization.
- Database access policies must prevent anonymous clients from reading or mutating private order/customer data.
- Secrets exist only in server environment/secret manager; never in frontend bundle or public repository.

## 8. Reliability principles
- Use idempotency for checkout creation and webhook event handling.
- Persist payment attempts and provider references for reconciliation.
- Use explicit state transitions; do not overwrite order/payment history.
- Keep audit events for price changes, order exceptions, refunds and privileged actions.
- Use database constraints and transactions for critical mutations where supported.
- Provide safe pending states rather than assuming success after a timeout.

## 9. Project layout
```text
poojasetu/
├── docs/                 # reviewed source of truth
├── public/               # static public assets
├── src/                  # frontend application
├── server/               # API, payment adapter and server-only logic
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── scripts/
├── .env.example          # names/placeholders only; no secrets
├── README.md
└── package.json          # exact workspace layout depends on approved stack
```

## 10. Architecture decisions still open
- Hostinger plan and whether to deploy frontend/API together or separately.
- Supabase vs another database/auth approach.
- API framework and runtime version.
- Guest checkout vs accounts/OTP.
- Notification provider (if any).
- Delivery-fee calculation and serviceability source.
- Inventory reservation and fresh-item exception policy.
