import ClinicWalkthrough from "@/components/site/clinic-walkthrough";
import ContactDock from "@/components/kokonut/contact-drawer";
import ReviewStack from "@/components/kokonut/review-stack";
import TreatmentTabs, { type TreatmentGroup } from "@/components/kokonut/treatment-tabs";
import Assistant from "@/components/site/assistant";
import BookingForm from "@/components/site/booking-form";
import RatingGauge from "@/components/site/rating-gauge";
import Reveal from "@/components/site/reveal";
import Image from "next/image";
import { clinic, reviews } from "@/lib/clinic";
import logo from "@/public/harleys-logo.png";

// Treatment pages are linked to #book until each page is built.
const treatments: TreatmentGroup[] = [
  {
    id: "pregnancy",
    title: "Pregnancy",
    intro: "Care from planning a pregnancy through delivery and the weeks after.",
    review: { text: "She's really polite and listens to your problems before giving an effective solution.", name: "Debanjali Biswas", source: "Practo" },
    items: [
      { name: "Pregnancy care", blurb: "Antenatal and postnatal visits, scans and nutrition guidance.", href: "#book" },
      { name: "High-risk pregnancy", blurb: "Closer monitoring for diabetes, blood pressure, twins or past miscarriage.", href: "#book" },
      { name: "Painless delivery", blurb: "Epidural pain relief for labour, explained before the day.", href: "#book" },
      { name: "Safe, legal abortion", blurb: "Confidential care under the MTP Act, early and second trimester.", href: "#book" },
    ],
  },
  {
    id: "gynaecology",
    title: "Gynaecology",
    intro: "Diagnosis and treatment for everyday and complex gynaecological problems.",
    items: [
      { name: "PCOS & PCOD", blurb: "Irregular periods, acne, hair fall, weight and fertility, managed together.", href: "#book" },
      { name: "Fibroids & cysts", blurb: "Keyhole (laparoscopic and hysteroscopic) surgery with faster recovery.", href: "#book" },
      { name: "Cervical cancer prevention", blurb: "Pap smear, HPV testing, colposcopy and HPV vaccination.", href: "#book" },
      { name: "Bartholin cyst", blurb: "Drainage or minor surgery for painful or recurring cysts.", href: "#book" },
    ],
  },
  {
    id: "fertility",
    title: "Fertility",
    intro: "Step-by-step fertility care that looks at both partners from the start.",
    items: [
      { name: "Fertility evaluation", blurb: "Hormone tests, scans and semen analysis to find the cause.", href: "#book" },
      { name: "Ovulation induction & IUI", blurb: "Medicines and monitoring to time conception.", href: "#book" },
      { name: "IVF guidance", blurb: "When IVF makes sense, and support through each cycle.", href: "#book" },
      { name: "Male infertility", blurb: "Testing and treatment options for the male partner.", href: "#book" },
    ],
  },
  {
    id: "life-stages",
    title: "Life stages",
    intro: "Support as your body changes, from the teenage years to menopause.",
    review: { text: "Now I can look forward to a stress-free menopause.", name: "Manjusha Kollara", source: "Practo" },
    items: [
      { name: "Adolescent health", blurb: "First periods, skin, emotional health and sexual health for teenagers.", href: "#book" },
      { name: "Contraception", blurb: "Pills, IUDs and other options matched to your life.", href: "#book" },
      { name: "Menopause & HRT", blurb: "Hot flushes, sleep, bone health and whether hormone therapy suits you.", href: "#book" },
    ],
  },
  {
    id: "cosmetic",
    title: "Cosmetic",
    intro: "Discreet, elective treatments for comfort and confidence.",
    items: [
      { name: "Cosmetic gynaecology", blurb: "Surgical and non-surgical options, explained honestly.", href: "#book" },
      { name: "Vaginal tightening", blurb: "Laser or surgical treatment for laxity after childbirth or with age.", href: "#book" },
      { name: "Hymenoplasty", blurb: "Private, judgement-free consultation and repair.", href: "#book" },
      { name: "Labiaplasty", blurb: "For discomfort or personal reasons, after a full consultation.", href: "#book" },
    ],
  },
];

const timeline = [
  { year: "2005", title: "MBBS, Kasturba Medical College, Manipal", note: "Gold medal in second year, distinction in all subjects" },
  { year: "2009", title: "MD Obstetrics & Gynaecology, KGMU Lucknow", note: "Gold medal" },
  { year: "2009", title: "Assistant Professor, Grant Medical College & Sir JJ Hospital", note: "Until 2012" },
  { year: "2012", title: "DNB, National Board of Examinations", note: "Began practice at Harleys the same year" },
  { year: "2015", title: "ICOG Fellowship in Reproductive Endocrinology & Infertility", note: "Advanced fertility training" },
  { year: "2021", title: "MRCOG, Royal College of Obstetricians & Gynaecologists (UK)", note: "To confirm", flag: true },
];

const faqs = [
  { q: "When should I see a gynaecologist?", a: "Come in if your periods change, if you notice unusual discharge or pelvic pain, or if you're having trouble conceiving. Even without symptoms, an annual check-up is recommended from age 25." },
  { q: "Why see a female gynaecologist?", a: "Many women find it easier to talk about personal health with a woman doctor. Dr. Shilpa and her mostly female team keep every consultation private and unhurried." },
  { q: "How should I prepare for my first appointment?", a: "Note your period dates and any symptoms, list your medicines and past surgeries, and bring previous reports. Think about any questions on contraception or family planning." },
  { q: "Is the clinic a certified abortion centre?", a: "Yes. The clinic provides safe, legal and confidential abortion services under the MTP Act and medical guidelines." },
  { q: "Can I come in just for a preventive check-up?", a: "Yes. Preventive visits, including Pap smears and HPV screening, help catch problems early." },
  { q: "How do I book an appointment?", a: `Use the form or the assistant on this page, message us on WhatsApp, or call ${clinic.phoneDisplay}. Same-day slots are often available for urgent concerns.` },
];

export default function Home() {
  return (
    <>
      <div className="hidden border-b border-line text-sm text-muted-ink sm:block">
        <div className="wrap flex flex-wrap justify-between gap-x-6 gap-y-1 py-2">
          <span>101–102 Jyoti Tower, DN Nagar, off Link Road, Andheri West</span>
          <span>
            <a className="no-underline" href={clinic.phoneHref}>{clinic.phoneDisplay}</a> ·{" "}
            <a className="no-underline" href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </span>
        </div>
      </div>

      <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="wrap flex items-center justify-between gap-4 py-3.5">
          <a className="flex items-center gap-3 no-underline" href="#top">
            {/* White chip keeps the logo's dark lettering readable in dark mode */}
            <span className="rounded-lg bg-white px-1.5 py-1">
              <Image alt="Harleys Clinic, Mumbai and Dubai" className="h-9 w-auto sm:h-11" priority src={logo} />
            </span>
            <span className="hidden border-l border-line pl-3 leading-tight xl:block">
              <b className="block font-display text-base font-medium">{clinic.doctor}</b>
              <span className="text-xs text-muted-ink">Gynaecologist &amp; obstetrician</span>
            </span>
          </a>
          <nav aria-label="Main" className="hidden gap-6 text-[0.92rem] text-muted-ink lg:flex">
            <a className="no-underline hover:text-ink" href="#clinic">The clinic</a>
            <a className="no-underline hover:text-ink" href="#treatments">Treatments</a>
            <a className="no-underline hover:text-ink" href="#doctor">About Dr. Shilpa</a>
            <a className="no-underline hover:text-ink" href="#reviews">Reviews</a>
            <a className="no-underline hover:text-ink" href="#faq">FAQs</a>
          </nav>
          <a className="btn btn-primary shrink-0 whitespace-nowrap px-4 py-2 text-sm" href="#book">Book a visit</a>
        </div>
      </header>

      <main id="top">
        {/* Hero: opens with a patient's own words, then who the doctor is */}
        <section className="pt-10 pb-14 md:pt-18 md:pb-22">
          <div className="wrap grid items-end gap-10 md:grid-cols-[1.35fr_0.85fr] md:gap-16">
            <div className="grid gap-7">
              <figure className="m-0 grid gap-4">
                <blockquote className="m-0 font-display text-[clamp(2.1rem,5vw,3.9rem)] font-light italic leading-[1.08] tracking-[-0.015em] text-balance">
                  <span aria-hidden className="text-accent">“</span>She handled me like family, and guided me with real
                  expertise.<span aria-hidden className="text-accent">”</span>
                </blockquote>
                <figcaption className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-ink">
                  <span aria-label="5 out of 5 stars" className="tracking-[2px] text-star" role="img">★★★★★</span>
                  <span>Ruchi N., on her pregnancy · Google review</span>
                </figcaption>
              </figure>

              <div className="grid gap-4 border-t border-line pt-7">
                <h1 className="text-[clamp(1.5rem,2.6vw,2rem)] font-medium">
                  Dr. Shilpa Bansal Agrawal
                  <span className="mt-1 block font-sans text-base font-normal text-muted-ink">
                    Gynaecologist, obstetrician and fertility specialist · Andheri West, Mumbai
                  </span>
                </h1>
                <p className="max-w-[60ch] text-[1.06rem] text-muted-ink">
                  Care for adolescent health, pregnancy, fertility, PCOS and menopause at Harleys Women's Clinic. She
                  takes time to listen, explains every option clearly and keeps your concerns confidential.
                </p>
                <p className="text-sm text-muted-ink">
                  MBBS · MD (Gold Medal) · DNB · ICOG Fellowship in Reproductive Endocrinology · DHA Specialist (Dubai)
                  · Member, FOGSI
                </p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <a className="btn btn-primary" href="#book">Book an appointment</a>
                  <a className="btn" href={clinic.whatsappHref} rel="noopener" target="_blank">Message on WhatsApp</a>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[300px] md:max-w-none">
              <div
                aria-label="Portrait placeholder for Dr. Shilpa"
                className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-t-[200px] rounded-b-2xl bg-gradient-to-br from-plum-soft to-rose-soft"
                role="img"
              >
                <span className="font-display text-[clamp(3.5rem,8vw,6rem)] text-plum opacity-50">SB</span>
                <span className="absolute inset-x-3.5 bottom-3.5 text-center text-xs text-muted-ink">
                  Portrait of Dr. Shilpa goes here
                </span>
              </div>
              <div className="absolute -left-4 bottom-10 max-md:-left-2 max-md:scale-90 max-md:origin-bottom-left">
                <RatingGauge />
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section border-y border-line bg-surface" id="reviews">
          <div className="wrap grid items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="grid gap-3">
              <span className="eyebrow">Patient reviews</span>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)]">What patients say after their visits.</h2>
              <p className="text-muted-ink">
                Real reviews from Google and Practo. Once the clinic's Google Business Profile is connected, the newest
                Google reviews will appear here automatically.
              </p>
              <p className="text-xs text-muted-ink">Opinions and results vary from person to person.</p>
            </Reveal>
            <ReviewStack items={reviews} />
          </div>
        </section>

        <ClinicWalkthrough />

        {/* Treatments */}
        <section className="section border-y border-line bg-surface" id="treatments">
          <div className="wrap grid gap-8">
            <Reveal className="grid gap-2">
              <span className="eyebrow">Treatments</span>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)]">Each condition has its own page, written in plain language.</h2>
              <p className="max-w-[62ch] text-muted-ink">
                Read what to expect, how it's diagnosed and the options available, before you come in.
              </p>
            </Reveal>
            <TreatmentTabs groups={treatments} />
          </div>
        </section>

        {/* Doctor */}
        <section className="section bg-plum-soft" id="doctor">
          <div className="wrap grid gap-10 md:grid-cols-2 md:gap-18">
            <Reveal className="grid content-start gap-4">
              <span className="eyebrow">About Dr. Shilpa</span>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)]">Trained in teaching hospitals. Practising in Andheri since 2012.</h2>
              <p>
                Dr. Shilpa Bansal Agrawal is a consultant obstetrician, gynaecologist and fertility specialist, and the
                founder of Harleys Women's Clinic. Before private practice she taught at Grant Medical College and led
                units at ESI Hospital and Global Hospital in Mumbai.
              </p>
              <p className="text-muted-ink">
                She has contributed to the textbook <i>Clinical Obstetrics &amp; Gynaecology</i> and wrote the FOGSI
                textbook chapter on adolescents' unmet need for contraception education.
              </p>
              <span className="eyebrow mt-2">Also consults at</span>
              <div className="flex flex-wrap gap-2">
                {["Surya Hospitals", "Cloudnine Hospital", "BSES MG Hospital", "Criticare Asia"].map((h) => (
                  <span className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm" key={h}>{h}</span>
                ))}
              </div>
            </Reveal>
            <ol className="m-0 list-none p-0">
              {timeline.map((t) => (
                <li className="grid grid-cols-[64px_1fr] gap-4 border-t border-plum/30 py-3.5" key={t.title}>
                  <time className="font-display text-lg text-plum tabular-nums">{t.year}</time>
                  <div>
                    <b className="block font-semibold">{t.title}</b>
                    {t.flag ? (
                      <span className="mt-1 inline-block rounded border border-star px-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-star">
                        {t.note}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-ink">{t.note}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Booking */}
        <section className="section" id="book">
          <div className="wrap">
            <Reveal className="grid gap-2">
              <span className="eyebrow">Book a visit</span>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)]">Book a visit with Dr. Shilpa.</h2>
            </Reveal>
            <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
              <Assistant />
              <BookingForm />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section border-t border-line bg-surface" id="faq">
          <div className="wrap grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal className="grid content-start gap-3">
              <span className="eyebrow">Common questions</span>
              <h2 className="text-[clamp(1.8rem,3.6vw,2.7rem)]">Before your first visit.</h2>
              <p className="text-muted-ink">Can't find your question? Ask the clinic assistant or message us on WhatsApp.</p>
            </Reveal>
            <div>
              {faqs.map((f) => (
                <details className="group border-t border-line py-4.5 last:border-b" key={f.q}>
                  <summary className="flex cursor-pointer list-none justify-between gap-4 font-display text-lg [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden className="font-sans text-2xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 max-w-[62ch] text-muted-ink">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section bg-ink text-paper" id="contact">
          <div className="wrap">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] opacity-70">Visit the clinic</span>
            <h2 className="mt-2 text-[clamp(1.8rem,3.6vw,2.7rem)]">{clinic.name}, Andheri West</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              <div className="grid min-w-0 content-start gap-1.5">
                <small className="text-xs uppercase tracking-[0.12em] opacity-65">Address</small>
                <p className="font-display text-lg leading-snug">{clinic.address}</p>
                <a className="text-sm underline underline-offset-4" href={clinic.mapsHref} rel="noopener" target="_blank">Open in Maps</a>
              </div>
              <div className="grid min-w-0 content-start gap-1.5">
                <small className="text-xs uppercase tracking-[0.12em] opacity-65">Phone</small>
                <a className="font-display text-lg no-underline" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
              </div>
              <div className="grid min-w-0 content-start gap-1.5">
                <small className="text-xs uppercase tracking-[0.12em] opacity-65">WhatsApp</small>
                <a className="font-display text-lg no-underline" href={clinic.whatsappHref} rel="noopener" target="_blank">Chat on WhatsApp</a>
              </div>
              <div className="grid min-w-0 content-start gap-1.5">
                <small className="text-xs uppercase tracking-[0.12em] opacity-65">Email</small>
                <a className="break-words font-display text-lg no-underline" href={`mailto:${clinic.email}`}>{clinic.email}</a>
              </div>
            </div>
            <p className="mt-7 text-sm opacity-70">Convenient for Lokhandwala, Oshiwara, Versova, Juhu and Vile Parle.</p>
          </div>
        </section>
      </main>

      <footer className="pt-8 pb-28 text-sm text-muted-ink md:pb-10">
        <div className="wrap grid gap-3">
          <p>
            The information on this website is for general awareness and is not medical advice. Results vary from
            person to person. Please book a consultation to discuss your health.
          </p>
          <p>© 2026 {clinic.doctor} · Harleys Cosmetic & Women's Clinic</p>
        </div>
      </footer>

      <ContactDock />
    </>
  );
}
