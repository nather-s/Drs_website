// Prepares the static export for hosting as a design preview:
// moves _next/ to assets/ (some hosts reserve names starting with "_")
// and makes every asset path relative, so it works under any sub-path.
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.argv[2] ?? "out";
renameSync(join(root, "_next"), join(root, "assets"));

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

for (const file of walk(root)) {
  const src = readFileSync(file, "utf8");
  let out = src;
  if (file.endsWith(".html") || file.endsWith(".txt")) {
    out = src.replace(/(["'(]|\\")\/_next\//g, "$1./assets/");
  } else if (file.endsWith(".js")) {
    out = src
      .replace('TURBOPACK_CHUNK_BASE_PATH:"/_next/"', 'TURBOPACK_CHUNK_BASE_PATH:"./assets/"')
      .replaceAll('"/_next/"', '"/assets/"')
      // Same character, written as an escape so the file is plain ASCII-safe.
      .replaceAll("\uFFFD", "\\ufffd");
  }
  if (out !== src) writeFileSync(file, out);
}
