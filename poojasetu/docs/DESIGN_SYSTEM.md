# Design System — PoojaSetu

**Status:** Approved direction for the initial storefront prototype; final brand identity and production assets remain open.

## 1. Design principles
- Trustworthy, calm, devotional and practical; avoid clutter or over-ornamentation.
- Make prices, quantities, availability, delivery area and checkout totals easy to scan.
- Mobile-first because customers may shop on phones.
- Use culturally respectful imagery; do not imply endorsement by a temple or institution without permission.
- Accessibility and readability take priority over decorative effects.

## 2. Proposed visual direction
**Proposal:** warm, clean devotional storefront using an ivory/cream base, deep maroon or temple-red primary accents, muted saffron highlights, and dark charcoal text. Keep product photography bright and consistent. This palette is a proposal, not an established brand decision.

### Proposed tokens
- Background: warm ivory `#FFF9F0`
- Surface/card: white `#FFFFFF`
- Primary: deep maroon `#7A2430`
- Accent: saffron `#D99A24`
- Main text: charcoal `#292524`
- Muted text: warm grey `#6B625C`
- Border: pale sand `#E8DED2`
- Success: dark green; warning/error colors must maintain accessible contrast.

Validate contrast before implementation; do not rely on color alone to convey state.

## 3. Typography
- Proposed body typeface: a legible system sans-serif; consider Noto Sans for broad language support.
- Headings: same family with stronger weight, unless owner approves a compatible display face.
- Body text: target 16px minimum on mobile; line-height around 1.5.
- Avoid overly small uppercase labels and decorative script for prices or form fields.
- Telugu/English content requirements are open; font coverage must be verified if Telugu is in MVP.

## 4. Layout and spacing
- Use a consistent 4px base spacing scale (4, 8, 12, 16, 24, 32, 40, 48).
- Content max width proposal: 1200px; comfortable reading width for policy/help text.
- Product cards use consistent image ratio, clear title, unit, price, freshness/availability and add-to-cart action.
- Mobile navigation should expose search, categories/cart and contact without crowding.
- Keep checkout short; avoid unnecessary account creation if guest checkout is approved.

## 5. Component inventory
- Header/navigation, logo lockup, search, category navigation, footer.
- Product card, product image gallery, price display, unit selector, availability badge.
- Daily-price label with “updated at” metadata.
- Quantity control, cart line item, order summary, delivery fee row.
- Buttons: primary, secondary, text/destructive.
- Form field, address form, validation message, checkbox/radio/select.
- Alert/banner, toast/status message, skeleton/loading state, empty state, error/retry state.
- Order status timeline and admin data table.
- Dialog/drawer for mobile cart or confirmations, if usability testing supports it.

## 6. Interaction rules
- Never hide final price or delivery-fee treatment until after the customer commits to payment.
- Show a distinct loading state while payment/order status is being confirmed.
- Distinguish “payment pending”, “payment successful”, “payment failed”, and “order accepted/being packed”.
- Disable duplicate submission during active requests; server must still be idempotent.
- Confirm destructive admin actions and explain irreversible consequences.
- If a daily price is stale or no longer valid, follow an owner-approved rule; do not silently change a paid total.

## 7. Responsive behavior
- Mobile-first; test narrow phone, common phone, tablet and desktop widths.
- No horizontal overflow; controls have comfortable touch targets (approximately 44px minimum where practical).
- Cart summary and primary checkout action remain easy to find without covering content.
- Admin tables must adapt to small screens or provide a deliberate compact alternative.

## 8. Accessibility
- Semantic headings and landmarks, keyboard navigation, visible focus, labels for every input.
- Meaningful alt text for informative product images; empty alt for purely decorative images.
- Sufficient contrast, clear validation and error text, status announcements for async changes.
- Do not rely on color alone; honor reduced-motion preferences.

## 9. Content and imagery
- Use genuine product imagery or licensed/owner-supplied images. Do not imply a product includes items not listed.
- Show unit/quantity clearly (for example, per piece, pack, weight or bundle); actual catalog units remain to be decided.
- Avoid unsupported claims such as “authentic”, “blessed”, “temple-approved” or guaranteed delivery unless substantiated.

## 10. Open design decisions
- Final logo, wordmark, palette and brand voice.
- Telugu, English or bilingual UI at launch.
- Final product image style and source.
- Whether customers need a full hamper builder in MVP.
