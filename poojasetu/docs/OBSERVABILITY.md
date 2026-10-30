# Observability and Operations

**Status:** Proposed baseline; provider/tool choice remains open.

## 1. What to monitor
- HTTP/API error rates, latency and availability.
- Checkout attempts, payment verification failures, pending payments and webhook processing lag.
- Orders stuck in a state longer than the agreed operational threshold.
- Catalog/daily-price update failures.
- Database connectivity, capacity and backup completion.
- Admin login failures and suspicious rate patterns.

## 2. Logging
- Use structured logs with timestamp, severity, environment and correlation ID.
- Include internal order ID or non-sensitive reference where needed.
- Never log secrets, signatures, card/bank credentials, CVV/UPI PIN or unnecessary full addresses/phone numbers.
- Restrict log access and define retention before production.

## 3. Alerts and ownership
Alert thresholds, channels, on-call owner and response expectations are open. Do not invent a 24/7 support commitment. At minimum, define how the owner will learn about payment reconciliation failures, production outages and repeated security failures.

## 4. Operational review
Before release, run a controlled test payment and confirm order/payment reconciliation. Periodically verify backup success, restore readiness, webhook delivery and admin access. Record incidents and corrective actions in the change/decision log.
