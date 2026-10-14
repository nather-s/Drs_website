"use client";

import { useEffect, useState } from "react";
import { siteHref } from "@/lib/href";
import { findMovedPage } from "@/lib/old-urls";

export type Page = { href: string; title: string };

type State =
  | { kind: "loading" }
  | { kind: "moved"; path: string; to: string }
  | { kind: "old-article"; path: string }
  | { kind: "unknown"; path: string; guess?: Page };

// Edit distance between two short strings, for spotting typing mistakes.
function distance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
      prev = tmp;
    }
  }
  return row[b.length];
}

// The page whose address is closest to what was typed, if it's close enough to be a typo.
function closestPage(path: string, pages: Page[]): Page | undefined {
  const last = path.toLowerCase().split("/").filter(Boolean).pop() ?? "";
  if (!last) return undefined;
  let best: { page: Page; score: number } | undefined;
  for (const page of pages) {
    const slug = page.href.split("/").filter(Boolean).pop() ?? "";
    const score = slug.startsWith(last) || last.startsWith(slug) ? 0 : distance(last, slug);
    if (!best || score < best.score) best = { page, score };
  }
  return best && best.score <= Math.max(2, Math.floor(last.length / 3)) ? best.page : undefined;
}

// Explains why the page wasn't found, using the address the visitor actually tried.
// On the live site old addresses are redirected before this page is reached; this also
// covers static hosting, where redirects aren't available.
export default function NotFoundDetails({ pages }: { pages: Page[] }) {
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    const path = decodeURIComponent(window.location.pathname);
    const to = findMovedPage(path);
    if (to) setState({ kind: "moved", path, to });
    else if (/^\/blog(\/|$)/i.test(path)) setState({ kind: "old-article", path });
    else setState({ kind: "unknown", path, guess: closestPage(path, pages) });
  }, [pages]);

  if (state.kind === "loading") return null;

  return (
    <div className="grid gap-4 rounded-lg border border-line bg-mist p-5 sm:p-6">
      <p className="text-sm text-muted-ink">
        You tried to open: <code className="break-all rounded bg-paper px-1.5 py-0.5 text-ink">{state.path}</code>
      </p>
      {state.kind === "moved" && (
        <div className="grid gap-3">
          <p className="font-semibold">This page is from our old website and has moved.</p>
          <a className="btn btn-primary w-fit" href={siteHref(state.to)}>
            Go to the new page
          </a>
        </div>
      )}
      {state.kind === "old-article" && (
        <p>
          This looks like an article from our old website. The articles haven't been moved to the new website yet.
          You may find the same topic in our treatment pages below.
        </p>
      )}
      {state.kind === "unknown" && state.guess && (
        <div className="grid gap-3">
          <p className="font-semibold">Did you mean {state.guess.title}?</p>
          <a className="btn btn-primary w-fit" href={siteHref(state.guess.href)}>
            Go to {state.guess.title}
          </a>
        </div>
      )}
      {state.kind === "unknown" && (
        <div className="grid gap-2">
          <p className="font-semibold">This usually happens because:</p>
          <ul className="m-0 grid list-disc gap-1 pl-5">
            <li>the address has a small typing mistake</li>
            <li>you followed an old link, from before the website was redesigned</li>
            <li>the page has been removed</li>
          </ul>
        </div>
      )}
    </div>
  );
}
