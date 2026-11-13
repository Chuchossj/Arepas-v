import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, relative, isAbsolute } from "node:path";
import { execFileSync } from "node:child_process";

execFileSync(process.execPath, ["scripts/build.mjs"], { stdio: "inherit" });
const root = resolve("dist");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
  ".xml": "application/xml",
};
const port = Number(process.env.PORT || 4173);
createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname.endsWith("/")) pathname += "index.html";
    if (!extname(pathname)) pathname += ".html";
    const path = resolve(root, `.${pathname}`);
    const relativePath = relative(root, path);
    if (relativePath.startsWith("..") || isAbsolute(relativePath)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }
    if (req.method !== "GET" && req.method !== "HEAD") {
      res.writeHead(405);
      return res.end("Method not allowed");
    }
    await stat(path);
    res.writeHead(200, {
      "Content-Type": mime[extname(path)] || "application/octet-stream",
      "Cache-Control": "no-store",
    });
    res.end(req.method === "HEAD" ? undefined : await readFile(path));
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(resolve(root, "404.html")));
  }
}).listen(port, "127.0.0.1", () =>
  console.log(`Local: http://127.0.0.1:${port}`),
);
