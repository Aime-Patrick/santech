// server.js — cPanel Node.js App entry point for Next.js
// cPanel looks for this file as the Application startup file.
// Next.js standalone mode produces .next/standalone/server.js — we proxy to it.

"use strict";
process.chdir(__dirname);

// Set the port cPanel assigns (via PORT env var) or default to 3000
process.env.PORT = process.env.PORT || "3000";
process.env.HOSTNAME = "0.0.0.0";

// Boot the standalone Next.js server
require("./.next/standalone/server.js");
