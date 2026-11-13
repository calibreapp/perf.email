// Local dev server — no dependencies.
// Serves index.html + style.css from the project root, assets from public/,
// and normalize.css from node_modules, mirroring what build.js copies to dist/.
// Reloads the browser automatically when any source file changes.
import { createServer } from "http";
import { readFile, stat } from "fs/promises";
import { watch } from "fs";
import { extname, join, normalize, resolve } from "path";

const PORT = Number(process.env.PORT) || 5173;
const HOST = process.env.HOST || "127.0.0.1";
const ROOT = resolve(".");

const roots = [ROOT, join(ROOT, "public")];
const aliases = {
  "/normalize.css": join(ROOT, "node_modules/normalize.css/normalize.css"),
};

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".webmanifest": "application/manifest+json",
  ".xml": "application/xml",
};

const reloadSnippet = `<script>new EventSource("/__reload").onmessage=()=>location.reload()</script>`;
const clients = new Set();

const findFile = async (urlPath) => {
  if (aliases[urlPath]) return aliases[urlPath];
  const rel = normalize(decodeURIComponent(urlPath)).replace(/^([/\\])+/, "");
  for (const base of roots) {
    let file = join(base, rel);
    if (!file.startsWith(base)) continue; // no path traversal
    try {
      if ((await stat(file)).isDirectory()) file = join(file, "index.html");
      await stat(file);
      return file;
    } catch {}
  }
  return null;
};

createServer(async (req, res) => {
  const { pathname } = new URL(req.url, `http://${req.headers.host}`);

  if (pathname === "/__reload") {
    res.writeHead(200, {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    res.write(": connected\n\n");
    clients.add(res);
    req.on("close", () => clients.delete(res));
    return;
  }

  if (pathname === "/rss") {
    res.writeHead(301, { Location: "https://buttondown.com/perfemail/rss" });
    res.end();
    return;
  }

  const file = await findFile(pathname);
  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Not found: ${pathname}`);
    return;
  }

  let body = await readFile(file);
  const ext = extname(file);
  if (ext === ".html") {
    body = body.toString().replace("</body>", `${reloadSnippet}</body>`);
  }
  res.writeHead(200, {
    "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  res.end(body);
}).listen(PORT, HOST, () => {
  console.log(`perf.email dev server → http://${HOST}:${PORT}/`);
});

let timer;
const notify = (_, filename) => {
  if (filename && /(^|[/\\])(\.|node_modules|dist)/.test(filename)) return;
  clearTimeout(timer);
  timer = setTimeout(() => {
    for (const c of clients) c.write("data: reload\n\n");
  }, 50);
};
watch("index.html", notify);
watch("style.css", notify);
watch("public", { recursive: true }, notify);
