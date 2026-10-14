import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import SymptomFinder from "@/components/site/symptom-finder";
import { categories, treatments } from "@/lib/treatments";

export const metadata: Metadata = {
  title: "Treatments | Dr. Shilpa, Andheri West",
  description:
    "Gynaecology, pregnancy, fertility, menopause and cosmetic gynaecology treatments offered by Dr. Shilpa Bansal Agrawal in Andheri West, Mumbai.",
  alternates: { canonical: "/treatments/" },
};

export default function TreatmentsIndex() {
  return (
    <Shell current="/treatments/">
      <PageIntro
        crumbs={[{ label: "Treatments" }]}
        lede="Each page explains the condition, how it is diagnosed and the treatment options, so you know what to expect before your visit."
        title="Treatments and services"
      />
      <div className="wrap grid gap-14 py-12 md:py-16">
        <SymptomFinder heading="Not sure which page you need?" />
        {categories.map((c) => (
          <section aria-labelledby={c.id} className="grid gap-5 lg:grid-cols-[280px_1fr] lg:gap-12" key={c.id}>
            <div className="grid content-start gap-2">
              <h2 className="text-[1.6rem]" id={c.id}>{c.title}</h2>
              <p className="text-muted-ink">{c.intro}</p>
            </div>
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
              {treatments
                .filter((t) => t.category === c.id)
                .map((t) => (
                  <li key={t.slug}>
                    <a
                      className="group grid h-full gap-1.5 rounded-lg border border-line p-5 no-underline transition-colors hover:border-accent"
                      href={`/treatments/${t.slug}/`}
                    >
                      <b className="flex justify-between gap-3 font-display text-lg font-normal">
                        {t.title}
                        <span aria-hidden className="font-sans text-accent transition-transform group-hover:translate-x-1">→</span>
                      </b>
                      <span className="text-sm text-muted-ink">{t.summary}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}
