# Environment and Configuration

**Status:** Draft operational plan. No environment has been created.

## 1. Environments
- **Local development:** synthetic data and local/test services.
- **Staging/test:** separate database and Razorpay test-mode credentials; never use production customer data.
- **Production:** only after owner approval, merchant onboarding, security review and smoke-test plan.

## 2. Configuration categories (names illustrative, not final)
- `DATABASE_URL` or provider-specific database configuration.
- Auth provider public configuration and server-only secret configuration as required by the chosen provider.
- `RAZORPAY_KEY_ID` (may be public checkout identifier when used correctly) and `RAZORPAY_KEY_SECRET` (server-only).
- `RAZORPAY_WEBHOOK_SECRET` (server-only).
- `APP_BASE_URL`, approved CORS origins, log level and environment name.
- Any notification provider credentials only if that feature is approved.

Do not paste actual values into docs, source code, screenshots or chat. `.env.example` contains names and placeholders only; `.env` is ignored by Git.

## 3. Hosting gate
Hostinger plan is not yet purchased/known. Before finalizing environment/runtime, verify supported Node.js runtime, process lifetime, build/deploy method, environment variable support, HTTPS, webhook route reachability, database connectivity, logs, backups and background/cron capability. Record evidence and plan name in this document after owner confirmation.

## 4. Secret handling
- Use separate credentials for local/test/staging/production.
- Restrict access to production credentials.
- Rotate compromised credentials promptly.
- Never put server secrets in frontend-prefixed variables or client bundles.
- Avoid sending secrets in logs or error responses.

## 5. Data separation and migration
- Never point local/test code at production data by default.
- Use reviewed, version-controlled migrations.
- Back up production before risky schema changes and document rollback limits.
- Test restore procedure before launch.
