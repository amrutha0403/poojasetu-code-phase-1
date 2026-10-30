# Security Requirements — PoojaSetu

**Status:** Required design constraints. Implementation details depend on approved stack.

## 1. Assets to protect
- Razorpay API secrets and webhook secret.
- Staff/admin accounts and privileges.
- Customer names, phone/email, delivery addresses and order history.
- Order totals, price history, refunds and fulfilment records.
- Database credentials, auth keys, backups and operational logs.

## 2. Authentication and authorization
- Admin/staff functions require authentication.
- Authorization is enforced server-side for every protected operation.
- Use least-privilege roles; staff cannot grant roles or change sensitive configuration unless explicitly authorized.
- Disable staff access promptly when no longer needed; use MFA for admin accounts if supported by the chosen provider.
- Public customers must not be able to enumerate other customers' orders.

## 3. Payment security
- Create Razorpay orders server-side only.
- Store secrets in server environment variables or a supported secret manager; never commit them.
- Verify payment signatures on the server and validate provider order ID, payment ID, amount, currency and order association.
- Verify webhook signatures; use the raw body as required by provider documentation.
- Deduplicate webhook events and make updates idempotent.
- Browser redirect/callback is not proof of payment.
- Never collect/store card numbers, CVV, UPI PIN, bank login or other payment credentials.
- Refunds must be server-side, permission-protected, audited and reconciled with provider status.

## 4. Input and application security
- Validate all fields on server; use parameterized database access.
- Encode output and protect against XSS, injection, CSRF where relevant, SSRF and insecure direct-object references.
- Enforce request size limits, rate limiting and safe file/image upload rules if uploads are enabled.
- Do not trust browser-provided product prices, discount values, delivery fees, role names or payment status.
- Keep dependencies updated and review dependency changes.

## 5. Data protection
- Collect only required personal data.
- Use HTTPS in all deployed environments.
- Apply database access policies/RLS as appropriate; deny public access to orders and customer data by default.
- Keep logs free of secrets and minimize personal data.
- Define retention, deletion/anonymization, backups and restore access before launch.
- Limit production data access to authorized people and avoid using real customer data in tests.

## 6. Admin and operational controls
- Log privileged actions such as price changes, role changes, refunds and order overrides.
- Use secure cookies/session settings if applicable; protect against brute force.
- Maintain separate development/test/live credentials and payment modes.
- Restrict production database and dashboard access.
- Establish incident response, key rotation and restore procedures before public launch.

## 7. Security acceptance checklist
- [ ] No secret appears in source, Git history, frontend build or public logs.
- [ ] Unauthorized user cannot read/update admin or order data.
- [ ] Price and amount tampering is rejected server-side.
- [ ] Forged payment callback and webhook are rejected.
- [ ] Duplicate webhook and checkout retries do not duplicate state or charges.
- [ ] Customer cannot access another order by changing an ID.
- [ ] Inputs are validated and errors are safe.
- [ ] Dependency/build checks and a focused security review are completed.
