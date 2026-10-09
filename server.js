// server.js — cPanel Node.js App entry point for Next.js
// cPanel looks for this file as the Application startup file.
// Next.js standalone mode produces .next/standalone/server.js — we proxy to it.

import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.chdir(__dirname);

// Set the port cPanel assigns (via PORT env var) or default to 3000
process.env.PORT = process.env.PORT || "3000";
process.env.HOSTNAME = "0.0.0.0";

// Boot the standalone Next.js server. The generated server is also ESM because
// this project declares "type": "module". Keep this import free of top-level
// await because LiteSpeed's lsnode loader uses synchronous require().
import("./.next/standalone/server.js").catch((error) => {
  console.error("Failed to start the Next.js standalone server", error);
  process.exitCode = 1;
});
