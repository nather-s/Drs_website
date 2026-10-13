// Prepares the static export for hosting as a design preview at any sub-path:
// moves _next/ to assets/ (some hosts reserve names starting with "_"),
// makes asset paths and internal links relative to each page, and links
// straight to index.html files so no server-side directory index is needed.
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.argv[2] ?? "out";
renameSync(join(root, "_next"), join(root, "assets"));

const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const toIndex = (path) => {
  const [p, hash] = path.split("#");
  const file = p === "" || p.endsWith("/") ? `${p}index.html` : p;
  return hash ? `${file}#${hash}` : file;
};

for (const file of walk(root)) {
  const src = readFileSync(file, "utf8");
  let out = src;
  if (file.endsWith(".html")) {
    const depth = relative(root, file).split(sep).length - 1;
    const prefix = depth === 0 ? "./" : "../".repeat(depth);
    out = src
      .replace(/(["'(]|\\")\/_next\//g, `$1${prefix}assets/`)
      .replace(/href="\/(?!\/)([^"]*)"/g, (_, path) => `href="${prefix}${toIndex(path)}"`)
      .replace("<head>", `<head><script>self.TURBOPACK_CHUNK_BASE_PATH="${prefix}assets/"</script>`);
  } else if (file.endsWith(".js")) {
    out = src
      .replace('TURBOPACK_CHUNK_BASE_PATH:"/_next/"', 'TURBOPACK_CHUNK_BASE_PATH:"./assets/"')
      .replaceAll('"/_next/"', '"/assets/"')
      // Same character, written as an escape so the file is plain ASCII-safe.
      .replaceAll("�", "\\ufffd");
  }
  if (out !== src) writeFileSync(file, out);
}
