import type { Metadata } from "next";
import NotFoundDetails from "@/components/site/not-found-details";
import Shell from "@/components/site/shell";
import SymptomFinder from "@/components/site/symptom-finder";
import { bookOnWhatsapp } from "@/lib/booking";
import { clinic } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

// Only addresses and titles are sent to the browser, for the "Did you mean" suggestion.
const pages = [
  ...treatments.map((t) => ({ href: `/treatments/${t.slug}/`, title: t.metaTitle ?? t.title })),
  { href: "/about/", title: "About Dr. Shilpa" },
  { href: "/team/", title: "Our team" },
  { href: "/first-visit/", title: "Your first visit" },
  { href: "/book/", title: "Book an appointment" },
  { href: "/treatments/", title: "All treatments" },
  { href: "/privacy/", title: "Privacy policy" },
  { href: "/browsing-safely/", title: "Browsing safely" },
];

export const metadata: Metadata = {
  title: "Page not found",
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Shell>
      <div className="wrap grid max-w-[900px] gap-10 py-16 md:py-24">
        <div className="grid gap-4">
          <span className="eyebrow">Page not found</span>
          <h1 className="text-[clamp(2rem,4vw,2.8rem)]">We couldn't find the page you were looking for.</h1>
          <p className="max-w-[60ch] text-lg text-muted-ink">
            Nothing is wrong with your phone or connection. The page just isn't at this address.
          </p>
          <NotFoundDetails pages={pages} />
        </div>

        <SymptomFinder heading="Were you looking for one of these?" />

        <div className="grid gap-4">
          <h2 className="text-[1.5rem]">Other ways to find what you need</h2>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary" href="/">Home page</a>
            <a className="btn" href="/treatments/">All treatments</a>
            <a className="btn" href="/about/">About Dr. Shilpa</a>
            <a className="btn" href="/first-visit/">Your first visit</a>
          </div>
          <p className="text-muted-ink">
            Still stuck? The clinic can help:{" "}
            <a className="link" href={bookOnWhatsapp()} rel="noopener" target="_blank">message on WhatsApp</a> or call{" "}
            <a className="link" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>.
          </p>
        </div>
      </div>
    </Shell>
  );
}
