import type { Metadata } from "next";
import BookingCard from "@/components/site/booking-card";
import PageIntro from "@/components/site/page-intro";
import RatingGauge from "@/components/site/rating-gauge";
import Shell from "@/components/site/shell";
import { clinic, reviews } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Patient reviews",
  description: `What patients say about ${clinic.doctor}, gynaecologist in Andheri West, Mumbai.`,
  alternates: { canonical: "/reviews/" },
};

export default function Reviews() {
  return (
    <Shell current="/reviews/">
      <PageIntro
        crumbs={[{ label: "Patient reviews" }]}
        eyebrow="Patient reviews"
        lede="Reviews patients have left on Google and Practo. The overall rating is from Justdial."
        title="What patients say"
      />

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="grid min-w-0 content-start gap-8">
          <ul aria-label="Patient reviews" className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
            {reviews.map((r) => (
              <li className="flex flex-col gap-3 rounded-lg border border-line bg-paper p-5" key={r.id}>
                <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-ink">{r.source} review</span>
                <blockquote className="m-0 leading-relaxed">“{r.text}”</blockquote>
                <footer className="mt-auto flex justify-between gap-3 border-t border-line pt-3 text-sm">
                  <b className="font-semibold">{r.name}</b>
                  <span className="text-muted-ink">{r.topic}</span>
                </footer>
              </li>
            ))}
          </ul>
          <div className="grid gap-3 rounded-lg bg-mist p-5">
            <b className="font-semibold">Read more reviews</b>
            <p className="m-0 text-sm text-muted-ink">
              Hundreds more patients have reviewed Dr. Shilpa on review sites. These open in a new tab.
            </p>
            <a className="link w-fit" href={clinic.practoHref} rel="noopener" target="_blank">
              Patient stories on Practo
            </a>
          </div>
        </div>
        <aside className="grid content-start gap-6">
          <RatingGauge />
          <BookingCard />
        </aside>
      </div>
    </Shell>
  );
}
