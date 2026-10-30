# UX Flows — PoojaSetu

**Status:** Draft flows; exception policies marked open must be resolved before the affected feature is implemented.

## 1. Customer: discover and add items
1. Customer opens storefront.
2. Site shows service area information and categories.
3. Customer searches or browses products/kits.
4. Product card/detail shows name, image, unit, displayed price, availability and (for daily-price items) last-updated metadata.
5. Customer selects quantity/options and adds item to cart.
6. Cart shows item lines, quantities, item subtotals and any known charges.

**Success:** Cart reflects selected quantities and current displayed prices.  
**Failure/empty:** Search no-results and empty-cart states offer a useful next step.

## 2. Customer: checkout and immediate online payment
1. Customer reviews cart.
2. Site collects required contact and delivery details; guest checkout vs account/OTP is open.
3. Site validates delivery serviceability for the approved Tirupati area.
4. Server validates product IDs, quantities, active status, current price rules, delivery fee rule and total. Browser-provided totals are never trusted.
5. Server creates a pending order/checkout record with a price snapshot and an idempotency strategy.
6. Server creates a Razorpay order using the server-calculated amount.
7. Customer completes Razorpay checkout.
8. Browser returns to the site, but the order is not marked paid solely because the browser says payment succeeded.
9. Server verifies the signature and/or reconciles a verified webhook; duplicate callbacks are safe.
10. Site shows paid/confirmed status only after server verification; otherwise shows pending and gives a safe retry/check-status path.
11. Customer sees order reference and contact/help details.

**Open exception:** Fresh item becomes unavailable, or its displayed price is no longer valid, after payment but before packing. Owner must decide substitution, partial cancellation/refund, full cancellation/refund, and customer approval rules before implementation.

## 3. Staff: fulfil a paid order
1. Authorized staff signs in.
2. Staff views orders filtered by payment and fulfilment status.
3. Staff opens a paid order and checks items/quantities and price snapshot.
4. Staff marks order as accepted/packing using allowed transitions.
5. Staff picks and packs available items.
6. If any item is missing/damaged or the order cannot be fulfilled, staff flags an exception; no silent price edits.
7. Staff records dispatch/delivery state only if those stages are operationally supported.
8. Customer can see the latest approved status or receive an approved notification.

**Open:** exact statuses, delivery partner/process, and whether staff can cancel/refund directly.

## 4. Admin: maintain catalog and daily prices
1. Admin signs in with an authorized role.
2. Admin creates/edits a product, category, unit, image, price mode, availability and active status.
3. For daily-price products, admin updates price and effective timestamp/date.
4. System validates inputs and records who changed the price and when.
5. Storefront displays the updated price and its freshness metadata.

**Failure:** invalid price or unauthorized user is rejected; prior valid catalog state remains intact.

## 5. Admin: manage orders
1. Admin opens order list and filters by date/status/order reference.
2. Admin reviews payment status from verified server-side records.
3. Admin can view order price snapshot and fulfilment events.
4. Sensitive actions (refund/cancel/status override) require explicit permissions and an audit record.

## 6. Payment failure or pending payment
- A failed payment does not become a paid order.
- A pending/unknown payment is reconciled with the provider before offering another charge or cancelling the order.
- Repeated button clicks and duplicate webhooks must not create duplicate paid orders.
- Customer sees a clear message and an order/reference identifier where possible.

## 7. Refund/cancellation flow — not yet specified
This flow cannot be finalized until the owner decides cancellation cut-off, perishable-item policy, customer-initiated cancellation, staff cancellation, full/partial refunds, and communication channel. Do not imply that a refund has completed until provider status confirms it.

## 8. Empty, loading, error and success states
- Empty category/search/cart/order history.
- Product unavailable or service area unsupported.
- Price expired/stale before payment.
- Network timeout during order creation or payment verification.
- Payment failed, pending, successful, or verification unavailable.
- Admin session expired/permission denied.
- Image failed to load; retryable API failure; order status temporarily unavailable.

## 9. Proposed MVP screens
1. Home/storefront.
2. Category/product listing and product details.
3. Cart.
4. Checkout/address.
5. Payment result/order confirmation.
6. Contact/help and policy pages.
7. Admin sign-in.
8. Admin catalog/prices.
9. Admin order list/detail.

Guest checkout, language, notification channel and hamper-builder inclusion remain open decisions.
