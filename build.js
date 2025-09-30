import { cpSync, mkdirSync } from "fs";

mkdirSync("dist", { recursive: true });

cpSync("index.html", "dist/index.html");
cpSync("style.css", "dist/style.css");
cpSync("node_modules/normalize.css/normalize.css", "dist/normalize.css");
cpSync("public", "dist", { recursive: true });

console.log("Static files copied to dist/");