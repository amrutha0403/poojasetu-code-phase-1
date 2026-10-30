# PoojaSetu

PoojaSetu is a mobile-first pooja samagri storefront for the planned Tirupati launch area.

## Current scope

This first code phase includes:
- React + TypeScript + Vite storefront
- Node.js + Express + TypeScript API
- Product catalogue served by the backend
- Search, category filtering, and an in-browser cart
- API health endpoint
- Responsive styling and loading/error/empty states
- Existing project documentation in `docs/`

Not included yet: database persistence, real inventory, admin authentication/dashboard, order creation, delivery-fee rules, Razorpay/Stripe, or production hosting. Product data is clearly marked as sample data.

## Requirements

- Node.js 20 or newer (recommended)
- npm 10 or newer

## Run locally

1. Extract this project folder.
2. Open a terminal in the project root.
3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the API and frontend together:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173`.

The API runs on `http://localhost:4000`. Vite proxies `/api` requests to the API.

## Validation commands

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Project structure

```text
poojasetu/
├── client/                 # React storefront
├── server/                 # Express API
├── tests/                  # future end-to-end tests
├── docs/                   # project source of truth
├── .env.example
└── package.json
```

## Important implementation boundaries

- Current product data is sample data stored in the API source; it is not persisted.
- Cart state exists only in the current browser session and is not an order.
- Prices and totals shown in the cart are a prototype display only. There is no checkout or payment action.
- Do not enter real customer information or treat the sample catalogue as live inventory.
- No secret keys are required or expected in frontend code.
- Before adding a database, staff/admin access, delivery fees, or payments, update and review the relevant documentation.
- Hosting is intentionally deferred. Confirm the exact Hostinger plan and its runtime, HTTPS, environment variable, database, webhook, logging, and backup support before choosing the deployment topology.
- Razorpay/Stripe integration is intentionally deferred until after hosting and checkout requirements are reviewed. Do not add payment keys or enable real payments in this phase.

## Documentation workflow

Read `docs/AGENTS.md` and relevant documents before making changes. For non-trivial features, create a plan, review it, implement the smallest correct change, run validation, inspect the diff, and update documentation.
