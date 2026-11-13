import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

const stylesheets = {
  "/normalize.css": "node_modules/normalize.css/normalize.css",
  "/style.css": "style.css",
};

let html = readFileSync("index.html", "utf8");

for (const [href, path] of Object.entries(stylesheets)) {
  const link = `<link rel="stylesheet" href="${href}" />`;
  if (!html.includes(link)) throw new Error(`Missing ${link} in index.html`);
  const css = readFileSync(path, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").trim();
  html = html.replace(link, () => `<style>${css}</style>`);
}

writeFileSync("dist/index.html", html);
cpSync("public", "dist", { recursive: true });

console.log("Built dist/ with inlined CSS");
