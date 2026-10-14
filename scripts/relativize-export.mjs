// Prepares the static export for hosting as a design preview at any sub-path:
// moves _next/ to assets/ (some hosts reserve names starting with "_"),
// makes asset paths and internal links relative to each page, and links
// straight to index.html files so no server-side directory index is needed.
import { readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = process.argv[2] ?? "out";
renameSync(join(root, "_next"), join(root, "assets"));
const nav = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "preview-nav.js"), "utf8");

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
      .replace(/(\\")\/favicon\.ico/g, `$1${prefix}favicon.ico`)
      .replace(/href="\/(?!\/)([^"]*)"/g, (_, path) => `href="${prefix}${toIndex(path)}"`)
      .replace("<head>", `<head><script>self.TURBOPACK_CHUNK_BASE_PATH="${prefix}assets/"</script><script>${nav}</script>`);
  } else if (file.endsWith(".js")) {
    out = src
      .replace('TURBOPACK_CHUNK_BASE_PATH:"/_next/"', 'TURBOPACK_CHUNK_BASE_PATH:"./assets/"')
      .replaceAll('"/_next/"', '"/assets/"')
      // Pages shown by preview-nav.js have no address of their own; give the router the real one.
      .replace(/window\.location\.href(?!\s*=[^=])/g, "(self.__drsPage||window.location.href)")
      .replace(/window\.location\.pathname(?!\s*=[^=])/g, "(self.__drsPage?new URL(self.__drsPage).pathname:window.location.pathname)")
      // Same character, written as an escape so the file is plain ASCII-safe.
      .replaceAll("�", "\\ufffd");
  }
  if (out !== src) writeFileSync(file, out);
}
