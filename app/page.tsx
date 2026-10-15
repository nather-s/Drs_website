import PreviewSite from "@/components/preview/preview-site";
import Assistant from "@/components/site/assistant-lazy";
import MediaSection from "@/components/site/media-section";
import RatingGauge from "@/components/site/rating-gauge";
import ReviewMarquee from "@/components/site/review-marquee";
import Shell from "@/components/site/shell";
import SymptomFinder from "@/components/site/symptom-finder";
import { bookOnWhatsapp } from "@/lib/booking";
import { clinic, reviews } from "@/lib/clinic";
import { categories, treatments } from "@/lib/treatments";

const facts = [
  { label: "Gold medal", value: "MD Obstetrics & Gynaecology" },
  { label: "In practice since", value: "2009" },
  { label: "Membership", value: "MRCOG (UK)" },
  { label: "Fellowship", value: "Reproductive endocrinology & infertility" },
];

const faqs = [
  {
    q: "When should I see a gynaecologist?",
    a: "Book a visit if your periods change, if you notice unusual discharge or pelvic pain, or if you are having trouble conceiving. Regular check-ups and cervical screening are worthwhile even without symptoms; Dr. Shilpa will advise how often you need them.",
  },
  {
    q: "How should I prepare for my first appointment?",
    a: "Note your period dates and any symptoms, list your medicines and past surgeries, and bring previous reports.",
  },
  {
    q: "Is the clinic private and female-friendly?",
    a: "Yes. Most of the clinic's staff are women, and every consultation is confidential, within the limits the law requires.",
  },
  {
    q: "Can I come in just for a preventive check-up?",
    a: "Yes. Preventive visits, including Pap smears and HPV screening, help catch problems early. For urgent concerns, same-day appointments are often available.",
  },
];

export default function Home() {
  // The design preview carries every page inside this one; see PreviewSite.
  if (process.env.PREVIEW_EXPORT === "1") return <PreviewSite home={<HomePage />} />;
  return <HomePage />;
}

function HomePage() {
  return (
    <Shell>
      {/* Hero */}
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-10 py-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:py-20">
          <div className="grid gap-6">
            <span className="eyebrow">{clinic.doctorRole} · Andheri West, Mumbai</span>
            <h1 className="text-[clamp(2.3rem,4.6vw,3.6rem)]">
              Women's health care, from adolescence to menopause.
            </h1>
            <p className="max-w-[58ch] text-lg text-muted-ink">
              Consult {clinic.doctor}, a woman gynaecologist, for gynaecology, pregnancy, fertility and menopause care
              at {clinic.name}.
              Every consultation is private and confidential.
            </p>
            <div className="flex flex-wrap gap-3">
              <a className="btn btn-primary" href="/book/">Book an appointment</a>
              <a className="btn" href={bookOnWhatsapp()} rel="noopener" target="_blank">Book on WhatsApp</a>
            </div>
            <a className="link w-fit" href="/first-visit/">What happens at your first visit</a>
            <p className="border-t border-line pt-5 text-sm text-muted-ink">{clinic.credentials}</p>
          </div>
          <div className="relative mx-auto w-full max-w-[320px] md:max-w-none">
            <div
              aria-label="Portrait placeholder for Dr. Shilpa"
              className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-lg bg-plum-soft"
              role="img"
            >
              {/* Replace with Dr. Shilpa's photo when the clinic provides one. */}
              <span className="font-display text-[clamp(3.5rem,8vw,5.5rem)] text-plum/40">SB</span>
            </div>
            <div className="absolute -bottom-6 left-1/2 w-max -translate-x-1/2 rounded-lg border border-line bg-paper px-5 py-3 text-center shadow-[0_12px_30px_-18px_rgba(46,36,51,0.5)]">
              <b className="block font-display text-lg font-medium">{clinic.doctor}</b>
              <span className="text-sm text-muted-ink">{clinic.doctorRole}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plain-language starting points */}
      <section aria-label="Find the right page" className="border-b border-line py-12 md:py-16">
        <div className="wrap">
          <SymptomFinder />
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews-title" className="section bg-mist" id="reviews">
        <div className="wrap mb-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div className="grid gap-3">
            <span className="eyebrow">Patient reviews</span>
            <h2 className="h-section" id="reviews-title">What patients say about their care</h2>
            <p className="max-w-[60ch] text-muted-ink">
              Patient reviews from Google and Practo. The overall rating shown is from Justdial.
            </p>
            <a className="link w-fit" href={clinic.practoHref} rel="noopener" target="_blank">
              Read more patient stories on Practo
            </a>
          </div>
          <RatingGauge />
        </div>
        <ReviewMarquee items={reviews} />
      </section>

      {/* Treatments */}
      <section aria-labelledby="treatments-title" className="section">
        <div className="wrap grid gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid gap-3">
              <span className="eyebrow">Treatments</span>
              <h2 className="h-section" id="treatments-title">Areas of care</h2>
            </div>
            <a className="link" href="/treatments/">All treatments</a>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <div className="grid content-start gap-3 bg-paper p-6" key={c.id}>
                <h3 className="text-xl">{c.title}</h3>
                <p className="text-sm text-muted-ink">{c.intro}</p>
                <ul className="m-0 grid list-none gap-1.5 p-0 text-[0.95rem]">
                  {treatments
                    .filter((t) => t.category === c.id)
                    // Elective cosmetic procedures are listed on their own page, not on the home page.
                    .slice(0, c.id === "cosmetic" ? 1 : 4)
                    .map((t) => (
                      <li key={t.slug}>
                        <a className="no-underline hover:text-accent" href={`/treatments/${t.slug}/`}>
                          <span aria-hidden className="mr-2 text-accent">›</span>
                          {t.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
            <a
              className="grid content-center gap-2 bg-plum p-6 text-white no-underline transition-colors hover:bg-ink"
              href="/book/"
            >
              <b className="font-display text-xl font-normal">Not sure where to start?</b>
              <span className="text-sm text-white/80">Book a general consultation and Dr. Shilpa will guide you.</span>
              <span className="mt-2 text-sm font-semibold">Book an appointment →</span>
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section aria-labelledby="about-title" className="section border-y border-line bg-mist">
        <div className="wrap grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="grid content-start gap-5">
            <span className="eyebrow">About the doctor</span>
            <h2 className="h-section" id="about-title">{clinic.doctor}</h2>
            <p>
              Dr. Shilpa is a consultant obstetrician and gynaecologist with advanced training in fertility, and the founder of{" "}
              {clinic.name}. She trained at Kasturba Medical College, Manipal and King George's Medical University,
              Lucknow, with a gold medal in her MD, and holds the MRCOG from the Royal College of Obstetricians and
              Gynaecologists, UK.
            </p>
            <p className="text-muted-ink">
              She was an Assistant Professor at Grant Medical College and Sir JJ Group of Hospitals, Mumbai, and has
              led units at ESI Hospital and Global Hospital alongside her practice.
            </p>
            <a className="link w-fit" href="/about/">Read Dr. Shilpa's full profile</a>
          </div>
          <dl className="m-0 grid content-start gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {facts.map((f) => (
              <div className="grid gap-1 bg-paper p-5" key={f.label}>
                <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">{f.label}</dt>
                <dd className="m-0 font-display text-lg">{f.value}</dd>
              </div>
            ))}
            <div className="grid gap-2 bg-paper p-5 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Hospital experience</dt>
              <dd className="m-0">{clinic.hospitals.join(" · ")}</dd>
            </div>
            <div className="grid gap-2 bg-paper p-5 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Languages</dt>
              <dd className="m-0">Consultations in {clinic.languages}</dd>
            </div>
          </dl>
        </div>
      </section>

      <MediaSection />

      {/* Assistant */}
      <section aria-labelledby="assistant-title" className="section">
        <div className="wrap grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="grid content-start gap-4">
            <span className="eyebrow">Clinic assistant</span>
            <h2 className="h-section" id="assistant-title">Questions before you book?</h2>
            <p className="text-muted-ink">
              The clinic assistant can help you request an appointment with Dr. Shilpa and answer practical questions about
              the clinic, such as where it is and what happens at your first visit.
            </p>
            <p className="text-sm text-muted-ink">
              It does not give medical advice. For anything about your health, please book a consultation.
            </p>
          </div>
          <Assistant />
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section border-t border-line">
        <div className="wrap grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="grid content-start gap-3">
            <span className="eyebrow">Before your visit</span>
            <h2 className="h-section" id="faq-title">Common questions</h2>
          </div>
          <div>
            {faqs.map((f) => (
              <details className="group border-t border-line py-4 last:border-b" key={f.q}>
                <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 max-w-[62ch] text-muted-ink">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-plum text-white">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-12">
          <div className="grid gap-1">
            <h2 className="text-[clamp(1.5rem,2.6vw,2rem)]">Book a consultation with Dr. Shilpa</h2>
            <p className="text-white/80">{clinic.addressLines.join(", ")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="btn border-white bg-white text-plum hover:border-white hover:bg-rose-soft hover:text-plum" href="/book/">
              Book appointment
            </a>
            <a className="btn border-white/60 text-white hover:bg-white hover:text-plum" href={clinic.phoneHref}>
              Call {clinic.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
