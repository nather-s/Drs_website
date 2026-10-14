// Internal links rendered only in the browser (inside drawers) can't be rewritten by the
// preview export script. In the preview, that script sets TURBOPACK_CHUNK_BASE_PATH to
// the page's relative path back to the site root plus "assets/"; use it to build a
// relative link. On the real site the variable is absent and the path is returned as is.
export function siteHref(path: string): string {
  if (typeof window === "undefined") return path;
  const base = (window as { TURBOPACK_CHUNK_BASE_PATH?: string }).TURBOPACK_CHUNK_BASE_PATH;
  if (!base || base.startsWith("/") || !base.endsWith("assets/")) return path;
  const root = base.slice(0, -"assets/".length);
  const [page, hash] = path.replace(/^\//, "").split("#");
  const file = page === "" || page.endsWith("/") ? `${page}index.html` : page;
  return `${root}${file}${hash ? `#${hash}` : ""}`;
}

export function whatsappLink(phoneHref: string, text: string): string {
  return `${phoneHref}?text=${encodeURIComponent(text)}`;
}
