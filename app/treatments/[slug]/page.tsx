import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookingCard from "@/components/site/booking-card";
import PageIntro from "@/components/site/page-intro";
import RichPoint from "@/components/site/rich-point";
import Shell from "@/components/site/shell";
import { clinic, reviews } from "@/lib/clinic";
import { categories, getTreatment, treatments } from "@/lib/treatments";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return {
    title: `${t.title} in Andheri West, Mumbai | ${clinic.doctor}`,
    description: t.summary,
  };
}

const anchor = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function TreatmentPage({ params }: PageProps<"/treatments/[slug]">) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();
  const category = categories.find((c) => c.id === t.category)!;
  const related = t.related.map(getTreatment).filter((r) => r !== undefined);
  const review = t.reviewId ? reviews.find((r) => r.id === t.reviewId) : undefined;
  const contents = [...t.sections.map((s) => s.heading), ...(t.faqs.length ? ["Questions patients ask"] : [])];

  return (
    <Shell current="/treatments/">
      <PageIntro
        crumbs={[{ label: "Treatments", href: "/treatments/" }, { label: t.title }]}
        eyebrow={category.title}
        lede={t.summary}
        title={t.title}
      />

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <article className="grid min-w-0 content-start gap-10">
          <div className="grid gap-4 text-[1.08rem]">
            {t.intro.map((p) => (
              <p className="max-w-[68ch]" key={p}>{p}</p>
            ))}
          </div>

          {t.sections.map((s) => (
            <section aria-labelledby={anchor(s.heading)} className="grid gap-4" key={s.heading}>
              <h2 className="text-[1.6rem]" id={anchor(s.heading)}>{s.heading}</h2>
              {s.body?.map((p) => (
                <p className="max-w-[68ch]" key={p}>{p}</p>
              ))}
              {s.points && (
                <ul className="m-0 grid max-w-[68ch] list-none gap-2.5 p-0">
                  {s.points.map((p) => (
                    <li className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent" key={p}>
                      <RichPoint text={p} />
                    </li>
                  ))}
                </ul>
              )}
              {s.after && <p className="max-w-[68ch] text-muted-ink">{s.after}</p>}
            </section>
          ))}

          {review && (
            <figure className="m-0 grid gap-3 rounded-lg bg-rose-soft p-6">
              <span aria-label="5 out of 5 stars" className="tracking-[2px] text-star" role="img">★★★★★</span>
              <blockquote className="m-0 font-display text-xl leading-snug">“{review.text}”</blockquote>
              <figcaption className="text-sm text-muted-ink">
                {review.name} · {review.source} review
              </figcaption>
            </figure>
          )}

          {t.faqs.length > 0 && (
            <section aria-labelledby="questions-patients-ask" className="grid gap-2">
              <h2 className="mb-2 text-[1.6rem]" id="questions-patients-ask">Questions patients ask</h2>
              {t.faqs.map((f) => (
                <details className="group border-t border-line py-4 last:border-b" key={f.q}>
                  <summary className="flex cursor-pointer list-none justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="text-xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2 max-w-[68ch] text-muted-ink">{f.a}</p>
                </details>
              ))}
            </section>
          )}

          <p className="text-sm text-muted-ink">
            This page is general information and not a substitute for a consultation. Treatment is always tailored to
            the individual.
          </p>
        </article>

        <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="On this page" className="hidden rounded-lg border border-line p-6 lg:block">
            <b className="mb-3 block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-plum">On this page</b>
            <ul className="m-0 grid list-none gap-2 p-0 text-[0.95rem]">
              {contents.map((h) => (
                <li key={h}>
                  <a className="text-muted-ink no-underline hover:text-accent" href={`#${anchor(h)}`}>{h}</a>
                </li>
              ))}
            </ul>
          </nav>
          <BookingCard topic={t.title} />
        </aside>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line bg-mist">
          <div className="wrap grid gap-6 py-12 md:py-16">
            <h2 className="text-[1.6rem]" id="related">Related treatments</h2>
            <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <a
                    className="grid h-full gap-1.5 rounded-lg border border-line bg-paper p-5 no-underline transition-colors hover:border-accent"
                    href={`/treatments/${r.slug}/`}
                  >
                    <b className="font-display text-lg font-normal">{r.title}</b>
                    <span className="text-sm text-muted-ink">{r.summary}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </Shell>
  );
}
