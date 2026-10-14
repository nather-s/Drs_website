"use client";

import { type ReactNode, useEffect, useState } from "react";

// The site's address for a link, or null when the link isn't to one of the site's pages.
// Handles both forms a link can take in the preview: "/about/" and "./about/index.html".
function pagePath(href: string): { path: string; hash: string } | null {
  if (/^([a-z]+:|\/\/|#)/i.test(href)) return null;
  const [page, hash = ""] = href.split("#");
  const rest = page.replace(/^(\.\/|\.\.\/)+|^\//g, "").replace(/(^|\/)index\.html$/, "$1");
  return { path: rest ? `/${rest.replace(/\/?$/, "/")}` : "/", hash };
}

// The design preview host only shows one page: following a link to another page shows
// its own "not found". So the preview carries every page and switches between them here,
// without leaving the first page. The real website doesn't use this.
export default function PreviewRouter({ pages }: { pages: Record<string, ReactNode> }) {
  const [at, setAt] = useState({ path: "/", hash: "", n: 0 });

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]");
      if (!a || a.getAttribute("target") === "_blank") return;
      const to = pagePath(a.getAttribute("href")!);
      if (!to || !(to.path in pages)) return;
      e.preventDefault();
      setAt((now) => ({ ...to, n: now.n + 1 }));
    };
    window.addEventListener("click", onClick, true);
    return () => window.removeEventListener("click", onClick, true);
  }, [pages]);

  useEffect(() => {
    if (at.n === 0) return;
    const target = at.hash ? document.getElementById(decodeURIComponent(at.hash)) : null;
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [at]);

  return <div key={at.path}>{pages[at.path] ?? pages["/"]}</div>;
}
