# Database Design — PoojaSetu

**Status:** Proposed logical schema; not a migration or implementation. Validate against final flows and chosen database before coding.

## 1. Principles
- Use stable IDs, timestamps, explicit statuses and server-controlled monetary calculations.
- Store money as integer minor units (paise) plus currency, not floating-point values.
- Preserve price/quantity snapshots on orders so later catalog changes do not rewrite historical purchases.
- Keep customer data private; staff/admin access must be enforced by server-side authorization and database policies.
- Record important administrative mutations and payment events.

## 2. Proposed entities
### `categories`
- `id`, `name`, `slug`, `description` (optional), `sort_order`, `is_active`, `created_at`, `updated_at`.

### `products`
- `id`, `category_id`, `name`, `slug`, `description`, `image_refs`, `unit_label`, `price_mode` (`fixed` or `daily`), `current_price_paise`, `currency`, `is_active`, `availability_status`, `created_at`, `updated_at`.
- Exact stock quantity and unit model are open; do not assume every product has a simple integer stock count.

### `product_price_history`
- `id`, `product_id`, `price_paise`, `currency`, `effective_from`, `effective_until` (nullable), `changed_by`, `change_reason` (optional), `created_at`.
- Used to audit daily-price updates and support a defined freshness rule.

### `orders`
- `id`, `public_order_number`, `customer_name`, `customer_phone`, `customer_email` (optional), `delivery_address` (structured fields to be finalized), `delivery_notes` (optional), `currency`, `items_subtotal_paise`, `delivery_fee_paise`, `discount_paise` (if later supported), `grand_total_paise`, `payment_status`, `fulfilment_status`, `created_at`, `updated_at`, `paid_at` (nullable), `cancelled_at` (nullable).
- Data minimization: store only contact/address fields needed for fulfilment and lawful operations.

### `order_items`
- `id`, `order_id`, `product_id` (nullable if product later removed), `product_name_snapshot`, `unit_snapshot`, `quantity`, `unit_price_paise`, `line_total_paise`, `price_mode_snapshot`, `price_updated_at_snapshot` (nullable), `created_at`.
- If configurable kits/hampers are approved, their component snapshots need a separately designed structure.

### `payment_attempts`
- `id`, `order_id`, `provider` (Razorpay), `provider_order_id`, `provider_payment_id` (nullable), `amount_paise`, `currency`, `status`, `idempotency_key`, `created_at`, `updated_at`, `verified_at` (nullable), `failure_code` (safe normalized code, nullable).
- Never store card details, CVV, UPI PIN, banking credentials or raw secrets.

### `payment_events`
- `id`, `provider_event_id` (unique when available), `event_type`, `provider_order_id`, `provider_payment_id` (nullable), `signature_verified`, `processing_status`, `received_at`, `processed_at` (nullable), `safe_metadata` (allowlisted fields only).
- Avoid storing unrestricted raw webhook payloads containing unnecessary personal data.

### `staff_profiles` / role mapping
- Link to chosen authentication identity; store `display_name`, `role` (`admin`, `staff`), `is_active`, `created_at`, `updated_at`.
- Exact auth integration and role enforcement approach depend on chosen stack.

### `order_status_events`
- `id`, `order_id`, `from_status`, `to_status`, `actor_id` (nullable/system), `note` (limited and safe), `created_at`.

### `audit_events`
- `id`, `actor_id`, `action`, `entity_type`, `entity_id`, `safe_metadata`, `created_at`.
- Capture price changes, role changes, order exceptions, refund actions and other privileged changes without logging secrets.

## 3. Suggested status enums
- Payment: `pending`, `authorized` (only if applicable), `paid`, `failed`, `cancelled`, `refund_pending`, `partially_refunded`, `refunded`, `unknown`.
- Fulfilment proposal: `awaiting_payment`, `paid`, `accepted`, `packing`, `ready_for_dispatch`, `dispatched`, `delivered`, `exception`, `cancelled`.
- Final statuses and legal transitions need owner approval; payment and fulfilment status must remain separate.

## 4. Relationships and constraints
- Category has many products.
- Product has many price-history records.
- Order has many order items, payment attempts, status events.
- Unique public order number; unique idempotency key within its intended scope; unique provider event ID when supplied.
- Positive quantity and non-negative money checks; currency consistency; foreign keys where appropriate.
- Prevent client-side writes to payment state and price snapshots.

## 5. Data retention and privacy
Retention periods for orders, payment references, addresses, audit records and logs are open and must follow business/accounting/legal needs. Do not retain customer personal data indefinitely without a reason. Define deletion/anonymization handling before launch.

## 6. Open schema questions
- Exact delivery-address structure and serviceability model.
- Whether guest checkout, customer accounts or phone OTP are required.
- Stock tracking model for loose/fresh products.
- Whether kits are fixed bundles or configurable bundles.
- Refund and partial-refund representation.
- Chosen database, auth provider, row-level security policies and backup/restore approach.
