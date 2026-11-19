import PreviewSite from "@/components/preview/preview-site";
import Assistant from "@/components/site/assistant-lazy";
import BookingForm from "@/components/site/booking-form";
import ClinicMap from "@/components/site/clinic-map";
import MediaSection from "@/components/site/media-section";
import RatingGauge from "@/components/site/rating-gauge";
import ReviewMarquee from "@/components/site/review-marquee";
import Shell from "@/components/site/shell";
import SymptomFinder from "@/components/site/symptom-finder";
import { asset } from "@/lib/asset";
import { bookOnWhatsapp } from "@/lib/booking";
import { clinic, reviews } from "@/lib/clinic";
import { categories, treatments } from "@/lib/treatments";

// Specific, checkable reasons rather than general claims.
const reasons = [
  "MD in Obstetrics & Gynaecology with a gold medal, DNB, and MRCOG from the Royal College in the UK",
  "ICOG fellowship in reproductive endocrinology and infertility; IUI done by Dr. Shilpa herself",
  "Former Assistant Professor at Grant Medical College and Sir JJ Group of Hospitals, Mumbai",
  "Delivers at Surya Hospitals, Cloudnine and Criticare Asia, and her pregnancy patients can reach her directly",
  "Ultrasound and colposcopy at the clinic, so most visits need no trip elsewhere",
  "A female staff member is present during every examination",
  "Consultations in English, Hindi and Marathi",
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
  const delivers = new Set<string>(clinic.deliversAt);
  return (
    <Shell>
      {/* Hero: name, what she treats and the two ways to book, in the first phone screen */}
      <section className="bg-[linear-gradient(135deg,#f8efdc_0%,#efdfbd_100%)]">
        <div className="wrap grid gap-10 py-8 md:grid-cols-[1.1fr_0.9fr] md:items-center md:gap-16 md:py-20">
          <div className="grid content-center gap-5">
            <span className="eyebrow">Woman gynaecologist · DN Nagar, Andheri West</span>
            <div className="flex items-center gap-4">
              <img
                alt=""
                className="size-[72px] shrink-0 rounded-full border-2 border-gold/60 object-cover md:hidden"
                height={72}
                src={asset("images/dr-shilpa-face.jpg")}
                width={72}
              />
              <h1 className="text-[clamp(2.5rem,6vw,4.4rem)] leading-[1.02]">
                Dr. Shilpa <em>Bansal Agrawal</em>
              </h1>
            </div>
            <p className="font-display text-[clamp(1.25rem,2vw,1.5rem)] text-accent">
              Obstetrician &amp; gynaecologist · MD (Gold Medal) · MRCOG (UK)
            </p>
            <p className="text-lg">Pregnancy, fertility, PCOS, periods, abnormal smears and menopause.</p>
            <p className="max-w-[52ch] border-l border-gold pl-4 text-[0.95rem] text-muted-ink">
              Private and confidential. You won't be judged, whatever your age or whether you're married, and nothing
              is examined without your agreement.{" "}
              <a className="link" href="/first-visit/">What happens at your first visit</a>
            </p>
            <div className="grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap">
              <a className="btn btn-primary whitespace-nowrap px-4" href={bookOnWhatsapp()} rel="noopener" target="_blank">
                Book on WhatsApp
              </a>
              <a className="btn whitespace-nowrap px-4" href={clinic.phoneHref}>
                Call {clinic.phoneDisplay.replace("+91 ", "")}
              </a>
            </div>
            <p className="text-sm text-muted-ink">
              {clinic.addressLines[0]}, Andheri West ·{" "}
              <a className="link" href={clinic.mapsHref} rel="noopener" target="_blank">Get directions</a>
            </p>
          </div>
          <figure className="photo-frame m-0 hidden justify-self-end md:block">
            <img
              alt="Dr. Shilpa Bansal Agrawal in her clinic"
              className="relative block w-full max-w-[440px] object-cover shadow-[0_30px_60px_-30px_rgba(59,42,20,0.45)]"
              height={760}
              src={asset("images/dr-shilpa.jpg")}
              width={570}
            />
            <figcaption className="absolute -bottom-6 -left-8 bg-paper px-6 py-4 shadow-lg">
              <span className="block text-[0.65rem] font-medium uppercase tracking-[0.22em] text-accent">{clinic.doctorRole}</span>
              <span className="font-display text-xl text-plum">{clinic.doctor}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Gold band: the facts skimmers look for */}
      <section aria-label="At a glance" className="bg-gold text-white">
        <dl className="wrap my-0 grid grid-cols-2 gap-x-6 gap-y-4 py-6 lg:grid-cols-4">
          <div className="grid gap-0.5">
            <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-white/85">Rating</dt>
            <dd className="m-0">
              <a className="font-display text-2xl text-white no-underline hover:underline" href="/reviews/">
                ★ {clinic.rating.value} / 5
              </a>
              <span className="block text-sm text-white/90">{clinic.rating.count} on {clinic.rating.source}</span>
            </dd>
          </div>
          {clinic.fee && (
            <div className="grid gap-0.5">
              <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-white/85">Consultation</dt>
              <dd className="m-0">
                <span className="font-display text-2xl">{clinic.fee}</span>
                <span className="block text-sm text-white/90">Tests extra, told first</span>
              </dd>
            </div>
          )}
          <div className="grid gap-0.5">
            <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-white/85">Open</dt>
            <dd className="m-0">
              <span className="font-display text-2xl">Mon–Sat</span>
              <span className="block text-sm text-white/90">Weekdays till 7:30 pm · Sat 12–5</span>
            </dd>
          </div>
          <div className="grid gap-0.5">
            <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-white/85">Languages</dt>
            <dd className="m-0">
              <span className="font-display text-2xl" lang="hi">हिंदी · मराठी</span>
              <span className="block text-sm text-white/90">and English</span>
            </dd>
          </div>
        </dl>
      </section>

      {/* Plain-language starting points */}
      <section aria-label="Find the right page" className="py-12 md:py-16">
        <div className="wrap">
          <SymptomFinder />
        </div>
      </section>

      {/* Why Dr. Shilpa */}
      <section aria-labelledby="why-title" className="section border-t border-line">
        <div className="wrap grid items-center gap-14 md:grid-cols-2 md:gap-16">
          <div className="relative mx-auto w-full max-w-[460px] pr-10 pb-12">
            <div className="photo-frame">
              <img
                alt="Consultation room at Harleys Women's Clinic, Andheri West"
                className="relative block aspect-[4/5] w-full object-cover"
                height={950}
                loading="lazy"
                src={asset("images/clinic-room.jpg")}
                width={760}
              />
            </div>
            <img
              alt="Treatment room at Harleys Women's Clinic"
              className="absolute right-0 bottom-0 w-[48%] border-[6px] border-paper object-cover shadow-xl"
              height={507}
              loading="lazy"
              src={asset("images/clinic-room-detail.jpg")}
              width={380}
            />
          </div>
          <div className="grid content-start gap-5">
            <span className="eyebrow">Why patients choose Dr. Shilpa</span>
            <h2 className="h-section" id="why-title">
              Experienced, <em>unhurried</em> care for women
            </h2>
            <ul className="m-0 grid list-none p-0">
              {reasons.map((r) => (
                <li className="flex gap-4 border-b border-line py-3" key={r}>
                  <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-gold" />
                  {r}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a className="btn btn-primary" href="/book/">Book appointment</a>
              <a className="btn" href="/about/">About Dr. Shilpa</a>
            </div>
          </div>
        </div>
      </section>

      {/* Treatments, as a numbered list */}
      <section aria-labelledby="treatments-title" className="section bg-mist">
        <div className="wrap grid gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid gap-3">
              <span className="eyebrow">Treatments</span>
              <h2 className="h-section" id="treatments-title">Areas of <em>care</em></h2>
              <p className="max-w-[54ch] text-muted-ink">
                Not sure where to start? Book a general consultation and Dr. Shilpa will guide you.
              </p>
            </div>
            <a className="link" href="/treatments/">All treatments</a>
          </div>
          <ol className="m-0 list-none border-t border-gold/40 p-0">
            {categories.map((c, i) => (
              <li className="grid gap-3 border-b border-gold/40 py-7 md:grid-cols-[3.5rem_1fr_1.3fr] md:gap-8" key={c.id}>
                <span className="font-display text-xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.75rem]">
                  <a className="no-underline hover:text-accent" href={`/treatments/#${c.id}`}>{c.title}</a>
                </h3>
                <div className="grid gap-3">
                  <p className="text-muted-ink">{c.intro}</p>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {treatments
                      .filter((t) => t.category === c.id)
                      // Elective cosmetic procedures are listed on their own page, not on the home page.
                      .slice(0, c.id === "cosmetic" ? 1 : 5)
                      .map((t) => (
                        <li key={t.slug}>
                          <a
                            className="inline-flex min-h-10 items-center border border-gold/60 px-3 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-plum no-underline transition-colors hover:bg-gold hover:text-white"
                            href={`/treatments/${t.slug}/`}
                          >
                            {t.title}
                          </a>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="grid gap-3 py-7 md:grid-cols-[3.5rem_1fr_1.3fr] md:gap-8">
              <span className="font-display text-xl italic text-gold">{String(categories.length + 1).padStart(2, "0")}</span>
              <h3 className="text-[1.75rem]">Not sure where to start?</h3>
              <div className="grid justify-items-start gap-3">
                <p className="text-muted-ink">Book a general consultation and Dr. Shilpa will guide you.</p>
                <a className="btn btn-primary" href="/book/">Book an appointment</a>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* Reviews */}
      <section aria-labelledby="reviews-title" className="section" id="reviews">
        <div className="wrap mb-10 grid items-end gap-8 md:grid-cols-[1fr_auto]">
          <div className="grid gap-3">
            <span className="eyebrow">Patient reviews</span>
            <h2 className="h-section" id="reviews-title">What patients say about <em>their care</em></h2>
            <p className="max-w-[60ch] text-muted-ink">
              Patient reviews from Google and Practo. The overall rating shown is from Justdial.
            </p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a className="btn" href="/reviews/">All reviews</a>
              <a className="btn" href={clinic.practoHref} rel="noopener" target="_blank">Read more on Practo</a>
            </div>
          </div>
          <RatingGauge />
        </div>
        <ReviewMarquee items={reviews} />
      </section>

      {/* Location */}
      <section aria-labelledby="location-title" className="section border-t border-line bg-mist" id="location">
        <div className="wrap grid gap-10">
          <div className="grid gap-3">
            <span className="eyebrow">Clinic location</span>
            <h2 className="h-section" id="location-title">Harleys <em>Women's Clinic</em></h2>
          </div>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div className="grid content-start gap-6">
              <ClinicMap />
              <dl className="m-0 grid gap-5 sm:grid-cols-2">
                <div className="grid gap-1">
                  <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Address</dt>
                  <dd className="m-0">
                    {clinic.addressLines.map((l) => (
                      <span className="block" key={l}>{l}</span>
                    ))}
                    <a className="link mt-1 inline-block" href={clinic.mapsHref} rel="noopener" target="_blank">
                      Get directions →
                    </a>
                  </dd>
                </div>
                <div className="grid content-start gap-4">
                  {clinic.hours && (
                    <div className="grid gap-1">
                      <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Consultation hours</dt>
                      <dd className="m-0">
                        Mon–Fri 12–2:30 pm and 5:30–7:30 pm
                        <span className="block">Sat 12–5 pm · Closed Sunday</span>
                      </dd>
                    </div>
                  )}
                  <div className="grid gap-1">
                    <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Telephone &amp; WhatsApp</dt>
                    <dd className="m-0">
                      <a className="no-underline hover:text-accent" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
                    </dd>
                  </div>
                  <div className="grid gap-1">
                    <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Email</dt>
                    <dd className="m-0 break-words">
                      <a className="no-underline hover:text-accent" href={`mailto:${clinic.email}`}>{clinic.email}</a>
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
            <div className="grid content-start gap-4">
              <h3 className="border-t border-gold/60 pt-5 text-[1.75rem]">Hospital affiliations</h3>
              <ul className="m-0 grid list-none p-0">
                {clinic.hospitals.map((h) => (
                  <li className="flex items-baseline justify-between gap-4 border-b border-line py-3.5" key={h}>
                    <span className="font-display text-xl text-plum">{h}</span>
                    <span className="text-right text-[0.66rem] font-medium uppercase tracking-[0.18em] text-accent">
                      Consults{delivers.has(h) ? " · Deliveries" : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-ink">
                Dr. Shilpa's pregnancy patients deliver with her at Surya Hospitals, Cloudnine or Criticare Asia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MediaSection />

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section">
        <div className="wrap grid max-w-[880px] gap-8">
          <div className="grid justify-items-center gap-3 text-center">
            <span className="eyebrow">Before your visit</span>
            <h2 className="h-section" id="faq-title">Common <em>questions</em></h2>
          </div>
          <div>
            {faqs.map((f) => (
              <details className="group border-t border-line py-5 last:border-b" key={f.q}>
                <summary className="flex cursor-pointer list-none justify-between gap-4 font-display text-[1.4rem] text-plum [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-gold transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 max-w-[62ch] text-muted-ink">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Assistant */}
      <section aria-labelledby="assistant-title" className="section border-t border-line bg-mist">
        <div className="wrap grid items-start gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="grid content-start gap-4">
            <span className="eyebrow">Clinic assistant</span>
            <h2 className="h-section" id="assistant-title">Questions <em>before you book?</em></h2>
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

      {/* Book */}
      <section aria-labelledby="book-title" className="section bg-[linear-gradient(135deg,#f8efdc_0%,#efdfbd_100%)]" id="book">
        <div className="wrap grid items-start gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="grid content-start gap-5">
            <span className="eyebrow">Book a consultation</span>
            <h2 className="h-section" id="book-title">Book a consultation <em>with Dr. Shilpa</em></h2>
            <dl className="m-0 grid gap-4">
              <div className="grid gap-1">
                <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Clinic</dt>
                <dd className="m-0">
                  {clinic.name}, {clinic.addressLines.join(", ")}
                  <a className="link ml-1" href={clinic.mapsHref} rel="noopener" target="_blank">Get directions →</a>
                </dd>
              </div>
              <div className="grid gap-1">
                <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Telephone</dt>
                <dd className="m-0">
                  <a className="no-underline hover:text-accent" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
                </dd>
              </div>
              {clinic.hours && (
                <div className="grid gap-1">
                  <dt className="text-[0.66rem] font-medium uppercase tracking-[0.22em] text-accent">Hours</dt>
                  <dd className="m-0">{clinic.hours}</dd>
                </div>
              )}
            </dl>
            <p className="text-sm text-muted-ink">
              In a medical emergency, call {clinic.emergency} or go to the nearest hospital emergency department.
            </p>
          </div>
          <div className="bg-paper/80 shadow-[0_30px_60px_-40px_rgba(59,42,20,0.5)]">
            <BookingForm />
          </div>
        </div>
      </section>
    </Shell>
  );
}
