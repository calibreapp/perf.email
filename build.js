import { cpSync, mkdirSync } from "fs";

mkdirSync("dist", { recursive: true });

cpSync("index.html", "dist/index.html");
cpSync("style.css", "dist/style.css");
cpSync("node_modules/normalize.css/normalize.css", "dist/normalize.css");

const staticDirs = [
  "favicons",
  "social",
  "testimonials",
  "perf-email-preview-dark.webp",
  "perf-email-preview-light.webp",
  "perf-email-preview-light.png",
  "calibre-logo.svg",
  "aboriginal-flag.svg",
  "manifest.webmanifest"
];

staticDirs.forEach((item) => {
  try {
    cpSync(item, `dist/${item}`, { recursive: true });
  } catch (err) {
    console.log(`Skipping ${item} (not found)`);
  }
});

console.log("Static files copied to dist/");