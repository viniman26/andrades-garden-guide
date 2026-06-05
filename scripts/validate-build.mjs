import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "manifest.json",
  "service-worker.js",
  "src/app.js",
  "src/app.bundle.js",
  "src/styles.css",
  "src/services/db.js",
  "src/services/gemini.js",
  "assets/logo.png",
  "assets/wallpaper.png"
];

for (const file of requiredFiles) {
  await access(file);
}

const html = await readFile("index.html", "utf8");
if (!html.includes("app.bundle.js") || !html.includes("manifest.json")) {
  throw new Error("index.html is missing app bundle script or manifest link.");
}

console.log("Static PWA build validation passed.");
