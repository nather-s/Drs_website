import type { ReactNode } from "react";

type Crumb = { label: string; href?: string };

// Title band at the top of every inner page, with breadcrumbs.
export default function PageIntro({
  crumbs,
  eyebrow,
  title,
  lede,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line bg-mist">
      <div className="wrap grid gap-4 py-10 md:py-14">
        <nav aria-label="Breadcrumb">
          <ol className="m-0 flex list-none flex-wrap gap-x-2 p-0 text-sm text-muted-ink">
            {[{ label: "Home", href: "/" }, ...crumbs].map((c, i, all) => (
              <li className="flex gap-2" key={c.label}>
                {c.href && i < all.length - 1 ? (
                  <a className="no-underline hover:text-accent" href={c.href}>{c.label}</a>
                ) : (
                  <span aria-current="page" className="text-ink">{c.label}</span>
                )}
                {i < all.length - 1 && <span aria-hidden>/</span>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1 className="max-w-[24ch] text-[clamp(2rem,4vw,3rem)]">{title}</h1>
        {lede && <p className="max-w-[62ch] text-lg text-muted-ink">{lede}</p>}
        {children}
      </div>
    </div>
  );
}
