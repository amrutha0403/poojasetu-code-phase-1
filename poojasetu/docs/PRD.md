# Product Requirements Document — PoojaSetu

**Status:** Documentation approved for staged implementation; storefront/API foundation in progress.  
**Last updated:** 2026-10-27

## 1. Product overview
- **Name:** PoojaSetu (working name; final brand/domain availability not verified).
- **One-line description:** A mobile-friendly online store for pooja samagri, fresh pooja items, ready-made kits, and customized hampers serving customers in Tirupati.
- **Product type:** Custom-coded e-commerce website with a staff/admin fulfilment dashboard.
- **Launch area:** Tirupati. Exact delivery radius and serviceable pincodes are open.
- **Hosting preference:** Hostinger; plan not purchased / unknown.
- **Payment provider:** Razorpay. Online payment only; no COD.

## 2. Problem and opportunity
Customers may need several pooja supplies from different shops and may want to buy a ready-made kit or a customized hamper in one place. PoojaSetu aims to make product discovery, price visibility, online payment, and fulfilment easier.

## 3. Goals
1. Let customers browse pooja items and kits on mobile and desktop.
2. Clearly show product prices, units/quantities, and price freshness where relevant.
3. Support fixed-price items and items whose displayed price changes daily (especially flowers/fruits).
4. Let customers build or request customized hampers, subject to the final scope decision.
5. Accept online payments through a verified Razorpay flow.
6. Give authorized staff a dashboard to manage catalog, daily prices, orders, and fulfilment statuses.
7. Make order status and customer communication understandable.
8. Keep the codebase and decisions documented according to THE VIBE CODING BLUEPRINT.

## 4. Target users
- **Customers:** people in the approved Tirupati service area buying everyday pooja essentials, pooja kits, flowers/fruits, or hampers.
- **Staff/fulfilment operators:** people who verify the order, pick and pack items, coordinate delivery, and update status.
- **Administrator:** trusted operator(s) who manage products, prices, availability, staff access, orders, and basic store settings.

## 5. User stories
- As a customer, I can browse/search products and understand price, unit, and availability.
- As a customer, I can add products and kits to a cart and see a clear subtotal and delivery-fee treatment before paying.
- As a customer, I can pay online using Razorpay and see an unambiguous success, pending, or failure state.
- As a customer, I can receive an order reference and know how to contact the store.
- As staff, I can see paid orders and pack them without changing the paid order's recorded price silently.
- As staff, I can mark order stages and flag unavailable items or exceptions.
- As an administrator, I can add/edit/deactivate products and update daily prices.
- As an administrator, I can view order/payment status and restrict access to authorized staff.
- As an administrator, I can audit key changes to prices, orders, and status.

## 6. Functional scope
### Current implementation phase
- Storefront prototype with sample product data, category filters, search, and an in-browser cart.
- Read-only API endpoints for health, products, and categories.
- No persistent database, live inventory, admin authentication, order creation, checkout, or payments in this phase.

### MVP candidate
- Responsive storefront: home, category/listing, product detail, cart, checkout, order confirmation, contact/help, policy pages.
- Product catalog with categories, images, descriptions, units, active/inactive state, and stock/availability representation.
- Fixed-price products and daily-price products with explicit displayed price and last-updated time/date.
- Pooja kits and a limited initial catalog.
- Cart and checkout with customer contact and delivery address details.
- Razorpay order creation on the server and server-side payment verification/webhook handling.
- Persisted order records with price/quantity snapshots at checkout.
- Admin/staff sign-in and role-based access.
- Order management and fulfilment statuses.
- Catalog, price, availability and basic order administration.
- Customer-visible order reference and contact route.
- Basic operational logs, error handling, tests and deployment checklist.

### Candidate later phase
- Guided hamper builder with configurable components.
- More advanced inventory management, delivery assignment, staff roles, customer accounts/order history, coupons, analytics, notifications, and festival landing pages.
- Exact phase allocation to be confirmed during review.

## 7. Business rules currently known
- Product prices may be fixed or updated daily.
- Target markup is 25%; **calculation basis is unresolved** (cost basis, tax, wastage, packaging and payment fees not specified).
- Delivery is paid separately from product price; **whether it is added to online checkout or collected through a separate mechanism is unresolved**.
- Online payment only; no COD.
- Customer pays the prices displayed at checkout; staff packs after payment. Staff must not silently alter the recorded paid amount.
- A desired 20–30 minute delivery target is an operational aspiration, not a customer-facing guarantee until tested.

## 8. Non-goals for initial release
- Nationwide delivery.
- Native iOS/Android apps.
- Multi-vendor marketplace.
- Cash on Delivery.
- Automated purchasing/procurement or AI price prediction.
- Claiming a guaranteed delivery time before operational capability is confirmed.

## 9. Success metrics (targets to set after baseline)
- Checkout completion rate.
- Payment success and payment/order reconciliation rate.
- Order fulfilment accuracy and cancellation/refund rate.
- Time from successful payment to staff acknowledgement and dispatch.
- Percentage of orders fulfilled within the eventual advertised service target.
- Catalog/price update freshness and number of price/availability disputes.
- Website error rate and mobile checkout completion.

Numeric targets are open; do not invent thresholds.

## 10. Constraints and dependencies
- Launch geography is Tirupati; delivery radius/pincodes are not yet set.
- Hostinger plan is not purchased/unknown; hosting architecture must be checked against the actual plan before final selection.
- Razorpay merchant onboarding, account approval, test/live keys, webhooks, refund configuration and policy compliance are dependencies.
- Fresh items can vary in availability and price. The immediate-payment model requires a clear rule for an item becoming unavailable after payment.
- Privacy, consumer policy, tax and business requirements need owner/accountant/legal confirmation as appropriate.

## 11. Open questions — blocking where marked
See `DECISIONS.md`. High-priority items include exact service radius, delivery-fee collection, post-payment unavailability handling, fresh-price freshness/expiry, cancellation/refund rules, customer identity/OTP needs, launch catalog, and Hostinger plan compatibility.

## 12. Definition of done
- Product owner has approved the documentation and relevant decisions.
- All critical customer and staff flows are defined.
- Architecture, schema, API contracts and security rules agree with each other.
- Payment flow uses server-created Razorpay orders, verified payment signatures and verified webhooks; client success alone never marks an order paid.
- Price, quantity and delivery-fee calculations are validated server-side and recorded as order snapshots.
- Tests, lint, type-check and production build pass.
- Critical flows are tested in Razorpay test mode and deployment smoke tests pass before live release.
- No secrets are committed or exposed to browser code.
- Docs are updated to match the final implementation.
