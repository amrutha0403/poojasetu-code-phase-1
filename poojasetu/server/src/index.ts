
import dotenv from "dotenv";
import path from "node:path";
import { createApp } from "./app.js";

// Load the .env file from the project root.
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

const port = Number(process.env.PORT ?? 4000);
const app = createApp();

app.listen(port, "0.0.0.0", () => {
  console.log(`PoojaSetu API listening on port ${port}`);
});
