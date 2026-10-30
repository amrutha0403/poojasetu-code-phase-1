# Decision Log and Open Questions — PoojaSetu

**Status:** Living decision register. Resolve blocking items before implementation of affected features.

## 1. Confirmed decisions
| ID | Decision | Status |
|---|---|---|
| D-001 | Working name is PoojaSetu; final brand/domain availability not checked. | Confirmed as working name |
| D-002 | Launch area is Tirupati. | Confirmed; service radius open |
| D-003 | Hosting preference is Hostinger; plan not purchased/unknown. | Confirmed |
| D-004 | Razorpay is the intended payment provider. | Confirmed |
| D-005 | No Cash on Delivery; online payment only. | Confirmed |
| D-006 | Customer pays immediately using current displayed prices; staff packs afterward. | Confirmed |
| D-007 | Catalog includes individual pooja items, fixed-price and daily-price items (including flowers/fruits), special kits and customized hampers as a business goal. | Confirmed goal; MVP scope open |
| D-008 | Target markup is 25%. | Confirmed target; calculation basis open |
| D-009 | Delivery is paid separately from product prices. | Confirmed; collection/display mechanics open |
| D-010 | Admin dashboard and staff-assisted fulfilment are desired. | Confirmed |
| D-011 | 20–30 minute delivery is an aspiration where feasible, not a guarantee. | Confirmed qualifier |

## 2. Blocking questions
| ID | Question | Why it matters | Suggested decision owner |
|---|---|---|---|
| B-001 | Which Tirupati areas/pincodes are serviceable at launch? | Checkout validation, delivery fee and promises. | Product owner |
| B-002 | How is delivery fee charged: included in online checkout total or collected separately after product payment? If separately, how is it collected? | Payment total and order reconciliation. | Product owner |
| B-003 | What happens if a flower/fruit item is unavailable after the customer has paid? Substitution, partial refund, full refund or cancellation? Is customer approval required? | Critical to immediate-payment model and perishable goods. | Product owner |
| B-004 | How long is a daily price considered valid, and should it be refreshed before payment? | Avoid stale-price disputes. | Product owner |
| B-005 | If price/availability changes between payment and packing, what is the approved rule? Staff cannot silently change paid totals. | Customer trust, refund/substitution handling. | Product owner |
| B-006 | Cancellation, refund and perishable-goods policies? | Checkout disclosures and refund APIs. | Product owner; seek qualified advice where needed |
| B-007 | What Hostinger product/plan will be purchased? | Runtime/API support and deployment design. | Product owner |
| B-008 | What are the launch products, exact units, prices, categories and initial kits? | Catalog, unit display, testing. | Product owner |
| B-009 | What is the 25% markup formula and what costs/taxes/packaging/wastage/payment fees are included? | Pricing consistency and margin. | Product owner/accountant |
| B-010 | Is delivery fee fixed, distance-based, area-based, or threshold-based? Any minimum order? | Server calculation and checkout display. | Product owner |
| B-011 | Is guest checkout allowed, or are account/phone OTP and order history required? | Authentication, UX and privacy design. | Product owner |
| B-012 | Launch language: English, Telugu or bilingual? | Design, content and fonts. | Product owner |
| B-013 | Are customized hampers in MVP? If yes, customer configures items or submits a request for staff follow-up? | Data model, pricing and UX. | Product owner |
| B-014 | Which delivery/notification channel and process are available (staff delivery, courier, WhatsApp/SMS/email)? | Status flow, integrations and promises. | Product owner |
| B-015 | Who are the admin/staff users and what permissions should each have? | Role/access model. | Product owner |
| B-016 | Legal business details, tax treatment, privacy contact, terms and policy text? | Production readiness. | Product owner / qualified advisor |

## 3. Proposed technical choices awaiting approval
- React + TypeScript frontend; Node.js + TypeScript API.
- Supabase Postgres/Auth as a candidate database/auth platform.
- Responsive mobile-first design with a calm, warm devotional visual style.
- Server-created Razorpay orders, server-side verification and verified webhooks.
- Guest checkout as a possible simplification, but not assumed until B-011 is answered.
- Separate development/test/production environments.

## 4. Decision records
Use this format when a decision is made:
- **ID / Date:**
- **Decision:**
- **Status:** proposed / accepted / superseded
- **Reason:**
- **Alternatives considered:**
- **Consequences/docs affected:**


## Implementation sequencing update — 2026-10-27

- **Accepted:** Build the local frontend and backend foundation first, then evaluate and deploy to Hostinger, then integrate a payment provider.
- **Current provider status:** Razorpay is the stated preference; Stripe is an alternative the owner mentioned. Do not implement either until the hosting step and payment-provider decision are reviewed.
- **Current code:** React + TypeScript + Vite frontend and Node.js + TypeScript + Express API are used for the local foundation. This does not establish that the selected Hostinger plan can run the API.
- **Deferred:** Database/auth provider, persistent catalogue, order model, delivery charge policy, production hosting topology, and payment provider implementation.
- **Safety boundary:** Current prices and cart totals are prototype-only. No checkout or real payments are available.
