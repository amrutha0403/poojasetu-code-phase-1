import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./app.js";
import { sampleProducts } from "./products.js";

test("sample catalogue has unique ids and non-negative integer prices", () => {
  const ids = sampleProducts.map((product) => product.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const product of sampleProducts) {
    assert.ok(Number.isInteger(product.pricePaise));
    assert.ok(product.pricePaise >= 0);
    assert.ok(product.name.length > 0);
  }
});

test("sample catalogue includes both fixed and daily price examples", () => {
  assert.ok(sampleProducts.some((product) => product.priceType === "fixed"));
  assert.ok(sampleProducts.some((product) => product.priceType === "daily"));
});

test("app factory creates an Express app", () => {
  const app = createApp();
  assert.equal(typeof app, "function");
});
