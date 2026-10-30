import express from "express";
import cors from "cors";
import helmet from "helmet";
import { sampleProducts } from "./products.js";
import { supabase } from "./supabase.js"; 

export function createApp() {
  const app = express();
  const allowedOrigin = process.env.CLIENT_ORIGIN ?? "http://localhost:5173";

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: allowedOrigin }));
  app.use(express.json({ limit: "32kb" }));

  app.get("/api/health", (_request, response) => {
    response.json({ data: { status: "ok", service: "poojasetu-api" }, error: null });
  });

  app.get("/api/products", async (_request, response) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching products:", error);
    response.status(500).json({
      data: null,
      error: {
        code: "INTERNAL_ERROR",
        message: "Failed to fetch products.",
      },
    });
    return;
  }

  response.json({ data, error: null, meta: { sampleData: false } });
});

  app.get("/api/categories", (_request, response) => {
    const categories = [...new Set(sampleProducts.map((product) => product.category))];
    response.json({ data: categories, error: null, meta: { sampleData: true } });
  });

  app.use((_request, response) => {
    response.status(404).json({
      data: null,
      error: { code: "NOT_FOUND", message: "The requested resource was not found." }
    });
  });

  app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    // Avoid logging request bodies or customer information. Replace with structured logging before production.
    console.error("Unhandled API error", error instanceof Error ? error.message : "unknown");
    response.status(500).json({
      data: null,
      error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." }
    });
  });

  return app;
}
