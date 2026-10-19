import { createServer } from "node:http";
import next from "next";

const port = Number.parseInt(process.env.PORT || "3000", 10);
const hostname = "0.0.0.0";
const app = next({ dev: false, hostname, port });
const handle = app.getRequestHandler();

try {
  await app.prepare();

  createServer((request, response) => handle(request, response)).listen(
    port,
    hostname,
    () => {
      console.log("SAN TECH frontend listening on " + hostname + ":" + port);
    },
  );
} catch (error) {
  console.error("Unable to start the SAN TECH frontend", error);
  process.exit(1);
}
