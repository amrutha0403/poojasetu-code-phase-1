# Deployment and Rollback

**Status:** Planning checklist only. No hosting plan or deployment target is configured.

## 1. Preconditions
- Owner has approved all documentation and blocking decisions.
- Hostinger product/plan has been purchased/confirmed and capabilities verified.
- Razorpay merchant account is ready; test mode passes; live credentials are secured.
- Domain and DNS decision is complete.
- Production privacy, terms, cancellation/refund and delivery information are approved.
- Database backups, migrations, access policies and restore approach are tested.

## 2. Release process
1. Review approved implementation plan and change diff.
2. Run unit/integration/e2e tests, lint, type checking and production build.
3. Review dependencies, secrets, authorization and payment changes.
4. Apply reviewed database migrations with backup/rollback plan.
5. Deploy to staging/test environment.
6. Run smoke tests: storefront, catalog, serviceability, test payment, verified webhook, order creation, staff dashboard and status update.
7. Obtain explicit production release approval.
8. Configure production environment variables securely and deploy.
9. Run production smoke tests that do not create unintended charges or real customer orders.
10. Monitor errors, payment reconciliation and order fulfilment after release.

## 3. Rollback
- Define rollback mechanism specific to the selected Hostinger plan and database.
- Keep previous known-good build/release reference.
- Avoid rolling back schema changes without a tested migration rollback or forward-fix plan.
- If payment integrity or unauthorized access is suspected, prioritize disabling affected checkout/admin operations, preserving evidence and reconciling provider/database records.
- Document who is authorized to decide and execute rollback.

## 4. Production checklist
- [ ] Approved docs and decisions.
- [ ] Build, lint, type check and tests pass.
- [ ] HTTPS and domain verified.
- [ ] Correct production database and access policies verified.
- [ ] Live Razorpay keys/webhook configured server-side and verified.
- [ ] No test-mode/placeholder settings remain unintentionally.
- [ ] Backup and restore path verified.
- [ ] Logs/alerts and owner contact defined.
- [ ] Terms, privacy, delivery and cancellation/refund policies published.
- [ ] Smoke tests and rollback owner confirmed.
