import type { Review } from "@/lib/clinic";

// Reviews scroll continuously; hovering or focusing pauses them.
// The list is rendered twice so the loop is seamless; the copy is hidden from screen readers.
export default function ReviewMarquee({ items }: { items: Review[] }) {
  const card = (r: Review, copy: boolean) => (
    <li
      aria-hidden={copy || undefined}
      className="flex w-[300px] shrink-0 flex-col gap-3 rounded-lg border border-line bg-paper p-5 sm:w-[360px]"
      key={(copy ? "copy-" : "") + r.id}
    >
      <div className="flex items-center justify-between gap-3">
        <span aria-label="5 out of 5 stars" className="tracking-[2px] text-star" role="img">★★★★★</span>
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-ink">{r.source}</span>
      </div>
      <blockquote className="m-0 text-[0.98rem] leading-relaxed">“{r.text}”</blockquote>
      <footer className="mt-auto flex justify-between gap-3 border-t border-line pt-3 text-sm">
        <b className="font-semibold">{r.name}</b>
        <span className="text-muted-ink">{r.topic}</span>
      </footer>
    </li>
  );

  return (
    <div
      className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      style={{ ["--marquee-duration" as string]: `${items.length * 14}s` }}
    >
      <ul aria-label="Patient reviews" className="marquee-track m-0 flex w-max list-none gap-5 p-0 py-1">
        {items.map((r) => card(r, false))}
        {items.map((r) => card(r, true))}
      </ul>
    </div>
  );
}
