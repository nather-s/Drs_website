import { Play } from "lucide-react";
import ReviewStack from "@/components/kokonut/review-stack";
import {
  DriftRow,
  HeroContent,
  HeroPhoto,
  Parallax,
  ParallaxBand,
  Reveal,
  RevealImage,
  RevealLines,
  ScrollProgress,
  ScrollWords,
} from "@/components/motion/scroll";
import PreviewSite from "@/components/preview/preview-site";
import Assistant from "@/components/site/assistant-lazy";
import BookingForm from "@/components/site/booking-form";
import ClinicMap from "@/components/site/clinic-map";
import RatingGauge from "@/components/site/rating-gauge";
import Shell from "@/components/site/shell";
import SymptomFinder from "@/components/site/symptom-finder";
import { asset } from "@/lib/asset";
import { bookOnWhatsapp } from "@/lib/booking";
import { clinic, reviews } from "@/lib/clinic";
import { videos } from "@/lib/media";
import { getTreatment } from "@/lib/treatments";
import { seoMeta, site } from "@/lib/seo";

export const metadata = seoMeta("/", site);

// The home page reads as one story: what you're feeling, how it can be helped, who
// will help you, what other women say, and how to come in. Each life-stage chapter
// carries the one video of Dr. Shilpa's that belongs to it.
const chapters = [
  {
    id: "periods",
    title: "Periods & hormones",
    script: "listening to your body",
    text: "Irregular or painful periods, PCOS, acne and unwanted hair, discharge, fibroids and cysts. Dr. Shilpa looks for the cause first and explains every option in plain words, with the team's dietician for food and weight plans.",
    image: { src: "images/woman-periods.jpg", w: 900, h: 1000, alt: "A woman resting at home with a glass of water" },
    slugs: ["irregular-periods", "pcos", "pcos-acne", "hirsutism", "fibroids-and-cysts", "vaginal-infections"],
    video: "_WfODYyC3hE",
    more: "/treatments/#gynaecology",
  },
  {
    id: "fertility",
    title: "Trying for a baby",
    script: "when you're ready",
    text: "Tests for both partners, ovulation tracking, and IUI at the clinic, done by Dr. Shilpa herself. If IVF is the right step, she refers you to a registered centre nearby.",
    image: { src: "images/consult-fertility.jpg", w: 1000, h: 1000, alt: "A woman talking with her doctor beside an ultrasound screen" },
    slugs: ["fertility", "male-infertility", "pcos"],
    video: "Bqt9bxX59FA",
    more: "/treatments/fertility/",
  },
  {
    id: "pregnancy",
    title: "Pregnancy & birth",
    script: "from first scan to first cry",
    text: "Check-ups and scans at the clinic, care for high-risk pregnancies, and delivery with Dr. Shilpa at Surya Hospitals, Cloudnine or Criticare Asia. Her pregnancy patients can call her directly, day or night, and the team's paediatrician looks after your newborn.",
    image: { src: "images/woman-pregnancy.jpg", w: 512, h: 1024, alt: "A pregnant woman in soft cream clothes, hands on her bump" },
    slugs: ["pregnancy-care", "high-risk-pregnancy", "epidural-pain-relief", "pregnancy-options"],
    video: "SGaynS4V95g",
    more: "/treatments/pregnancy-care/",
  },
  {
    id: "life-stages",
    title: "Every age after",
    script: "teens to menopause",
    text: "A first visit for teenagers, with a parent if they wish. Contraception that suits your life, Pap and HPV screening, and support through perimenopause and menopause, including HRT when it's right for you.",
    image: { src: "images/woman-wellbeing.jpg", w: 819, h: 1024, alt: "A woman meditating calmly at home" },
    slugs: ["adolescent-health", "contraception", "cervical-cancer-prevention", "menopause"],
    video: "0NMxwucIDQI",
    more: "/treatments/#life-stages",
  },
] as const;

const credentials = [
  { k: "MD, Gold Medal", v: "Obstetrics & Gynaecology" },
  { k: "MRCOG", v: "Royal College of Obstetricians & Gynaecologists, UK" },
  { k: "Fellowship", v: "Reproductive endocrinology & infertility (ICOG)" },
  { k: "Formerly", v: "Assistant Professor, Grant Medical College & Sir JJ Hospitals" },
];

const gallery = [
  { src: "images/clinic-reception-wide.jpg", alt: "Reception at Harleys Women's Clinic" },
  { src: "images/woman-pregnancy-hero.jpg", alt: "" },
  { src: "images/clinic-room.jpg", alt: "Consultation room" },
  { src: "images/woman-contraception.jpg", alt: "" },
  { src: "images/clinic-corridor.jpg", alt: "The clinic's waiting area" },
  { src: "images/consult-pregnancy.jpg", alt: "" },
  { src: "images/clinic-room-detail.jpg", alt: "Treatment room" },
];

const thumb = (id: string) => `${process.env.PREVIEW_EXPORT === "1" ? "./" : "/"}videos/${id}.jpg`;

export default function Home() {
  // The design preview carries every page inside this one; see PreviewSite.
  if (process.env.PREVIEW_EXPORT === "1") return <PreviewSite home={<HomePage />} />;
  return <HomePage />;
}

function HomePage() {
  return (
    <Shell>
      <ScrollProgress />

      {/* 1 · Hero */}
      <section className="relative isolate overflow-hidden bg-paper md:min-h-[min(88vh,820px)]">
        <div className="relative h-[26vh] min-h-[180px] md:absolute md:inset-0 md:h-auto">
          <HeroPhoto alt="A pregnant woman in white holding her ultrasound picture" src={asset("images/woman-pregnancy-hero.jpg")} />
          {/* Fades the photo into the page: downward on phones, sideways on wider screens */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,var(--paper))] md:bg-[linear-gradient(to_right,var(--paper)_8%,rgba(248,245,240,0.85)_38%,transparent_70%)]" />
        </div>
        <HeroContent className="wrap relative grid gap-4 pb-10 md:gap-5 md:min-h-[min(88vh,820px)] md:content-center md:py-24">
          <h1 className="rise eyebrow font-sans" style={{ ["--i" as string]: 0 }}>Gynaecologist &amp; obstetrician in Andheri West, Mumbai</h1>
          <p className="rise title-caps max-w-[15ch] text-[clamp(2.1rem,5.4vw,4.2rem)]" style={{ ["--i" as string]: 1 }}>
            Women's health, <span className="block">every stage of life</span>
          </p>
          <p className="rise script -mt-1" style={{ ["--i" as string]: 2 }}>with Dr. Shilpa Bansal Agrawal</p>
          <p className="rise max-w-[46ch] text-[1.05rem] text-muted-ink md:text-lg" style={{ ["--i" as string]: 3 }}>
            Periods, PCOS, fertility, pregnancy and menopause. Private, unhurried care with no judgement, whatever your
            age or whether you're married. MD (Gold Medal) · MRCOG (UK).
          </p>
          <div className="rise grid gap-3 min-[400px]:grid-cols-2 sm:flex sm:flex-wrap" style={{ ["--i" as string]: 4 }}>
            <a className="btn btn-primary whitespace-nowrap px-5" href={bookOnWhatsapp()} rel="noopener" target="_blank">
              Book on WhatsApp
            </a>
            <a className="btn whitespace-nowrap bg-paper/60 px-5" href={clinic.phoneHref}>
              Call {clinic.phoneDisplay.replace("+91 ", "")}
            </a>
          </div>
          <dl
            className="rise m-0 mt-2 grid max-w-[620px] grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-5 text-sm sm:grid-cols-4"
            style={{ ["--i" as string]: 5 }}
          >
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Rated</dt>
              <dd className="m-0">
                <a className="no-underline hover:text-accent" href="/reviews/">
                  <b className="font-display text-xl font-medium">★ {clinic.rating.value}</b> · {clinic.rating.count} on {clinic.rating.source}
                </a>
              </dd>
            </div>
            {clinic.fee && (
              <div>
                <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Consultation</dt>
                <dd className="m-0"><b className="font-display text-xl font-medium">{clinic.fee}</b></dd>
              </div>
            )}
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Open</dt>
              <dd className="m-0">Mon–Sat · weekdays till 7:30</dd>
            </div>
            <div>
              <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Languages</dt>
              <dd className="m-0" lang="hi">हिंदी · मराठी · English</dd>
            </div>
          </dl>
        </HeroContent>
      </section>

      {/* 2 · Your concern first */}
      <section aria-labelledby="concern-title" className="section bg-paper">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="grid content-start gap-4 lg:sticky lg:top-32">
            <Reveal><p className="script">care the way it should be</p></Reveal>
            <RevealLines className="title-caps" id="concern-title" lines={["Tell us what's", "on your mind"]} />
            <Reveal delay={0.1}>
              <p className="max-w-[40ch] text-muted-ink">
                Choose what's closest to how you feel. Each page explains it in plain words, what can be done, and how
                Dr. Shilpa can help. You don't need to know the medical name.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <SymptomFinder hideHeading />
          </Reveal>
        </div>
      </section>

      {/* 3 · Life-stage chapters, alternating photo and text */}
      <section aria-label="Care at every stage" className="bg-mist py-16 md:py-28">
        <div className="wrap grid gap-20 md:gap-32">
          {chapters.map((c, i) => {
            const video = videos.find((v) => v.id === c.video);
            const flip = i % 2 === 1;
            return (
              <article
                aria-labelledby={`ch-${c.id}`}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-16 lg:gap-24"
                key={c.id}
              >
                <RevealImage
                  alt={c.image.alt}
                  className={`aspect-[4/5] w-full ${flip ? "md:order-2" : ""}`}
                  height={c.image.h}
                  src={asset(c.image.src)}
                  width={c.image.w}
                />
                <div className="relative grid content-center gap-5">
                  <Parallax
                    className="pointer-events-none absolute -top-24 right-0 select-none font-display text-[clamp(7rem,14vw,12rem)] italic leading-none text-gold/15"
                    distance={70}
                  >
                    <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                  </Parallax>
                  <Reveal>
                    <span className="font-display text-lg italic text-gold">{String(i + 1).padStart(2, "0")} —</span>
                  </Reveal>
                  <div className="grid gap-1">
                    <RevealLines as="h2" className="title-caps text-[clamp(1.9rem,3.6vw,3rem)]" id={`ch-${c.id}`} lines={[c.title]} />
                    <Reveal delay={0.1}><p className="script">{c.script}</p></Reveal>
                  </div>
                  <Reveal delay={0.15}><p className="max-w-[46ch] text-muted-ink">{c.text}</p></Reveal>
                  <Reveal delay={0.2}>
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {c.slugs.map((slug) => {
                        const t = getTreatment(slug)!;
                        return (
                          <li key={slug}>
                            <a
                              className="inline-flex min-h-10 items-center rounded-full border border-plum/25 bg-paper/70 px-4 text-[0.9rem] no-underline transition-colors duration-300 hover:border-plum hover:bg-plum hover:text-paper"
                              href={`/treatments/${slug}/`}
                            >
                              {t.title}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </Reveal>
                  {video && (
                    <Reveal delay={0.25}>
                      <a
                        className="group flex max-w-[440px] items-center gap-4 border-t border-line pt-5 no-underline"
                        href={`https://www.youtube.com/watch?v=${video.id}`}
                        rel="noopener"
                        target="_blank"
                      >
                        <span className="relative grid aspect-video w-32 shrink-0 place-items-center overflow-hidden bg-plum-soft">
                          <img
                            alt=""
                            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                            height={72}
                            loading="lazy"
                            src={thumb(video.id)}
                            width={128}
                          />
                          <span className="relative grid size-8 place-items-center rounded-full bg-paper/90 text-plum">
                            <Play aria-hidden className="size-3.5 translate-x-px" />
                          </span>
                        </span>
                        <span className="grid gap-0.5">
                          <span className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Dr. Shilpa explains</span>
                          <span className="font-display text-lg leading-snug text-plum group-hover:underline">{video.title}</span>
                        </span>
                      </a>
                    </Reveal>
                  )}
                </div>
              </article>
            );
          })}
          <Reveal className="text-center">
            <p className="text-muted-ink">
              Looking for something else?{" "}
              <a className="link" href="/treatments/">See all treatments</a>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3b · Cosmetic gynaecology, a featured service with Harleys Cosmetic Clinic */}
      <section aria-labelledby="cosmetic-title" className="relative overflow-hidden bg-plum text-paper" id="cosmetic">
        <div className="wrap grid items-center gap-12 py-20 md:grid-cols-[1.05fr_0.95fr] md:gap-20 md:py-32">
          <div className="grid content-start gap-5">
            <Reveal>
              <p className="eyebrow text-gold-light before:bg-gold-light">
                {clinic.name} × {clinic.aesthetics.name}
              </p>
            </Reveal>
            <div className="grid gap-1">
              <RevealLines className="title-caps text-paper" id="cosmetic-title" lines={["Cosmetic", "gynaecology"]} />
              <Reveal delay={0.1}><p className="script text-gold-light">comfort &amp; confidence</p></Reveal>
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-[46ch] text-paper/90">
                Elective treatments for the comfort, function and appearance of the intimate area, such as vaginal
                tightening, labiaplasty and hymenoplasty. Offered by {clinic.name} together with {clinic.aesthetics.name}, led by
                {" "}{clinic.aesthetics.role.toLowerCase()} {clinic.aesthetics.doctor}.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="m-0 grid list-none gap-0 border-t border-paper/15 p-0">
                {[
                  "A private consultation first, with honest advice on what is realistic",
                  "The risks, recovery and alternatives explained before you decide",
                  "For adults only, with no pressure to go ahead",
                ].map((x) => (
                  <li className="flex gap-4 border-b border-paper/15 py-3 text-paper/95" key={x}>
                    <span aria-hidden className="mt-[0.8em] h-px w-3 shrink-0 bg-gold-light" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.25}>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {["cosmetic-gynaecology", "vaginal-tightening", "hymenoplasty"].map((slug) => (
                  <li key={slug}>
                    <a
                      className="inline-flex min-h-10 items-center rounded-full border border-paper/30 px-4 text-[0.9rem] text-paper no-underline transition-colors duration-300 hover:bg-paper hover:text-plum"
                      href={`/treatments/${slug}/`}
                    >
                      {getTreatment(slug)!.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3 pt-2" delay={0.3}>
              <a
                className="btn border-paper bg-paper text-plum hover:border-gold-light hover:bg-gold-light hover:text-plum"
                href={bookOnWhatsapp(undefined, undefined, undefined, "This is for a private cosmetic gynaecology consultation.")}
                rel="noopener"
                target="_blank"
              >
                Book a private consultation
              </a>
              <a className="btn border-paper/50 text-paper hover:bg-paper hover:text-plum" href="/treatments/cosmetic-gynaecology/">
                Learn more
              </a>
            </Reveal>
          </div>
          <div className="relative mx-auto w-full max-w-[480px] pb-14 pl-10">
            <RevealImage
              alt="Treatment room at Harleys Women's Clinic"
              className="aspect-[4/5] w-full"
              height={950}
              src={asset("images/clinic-room.jpg")}
              width={760}
            />
            <Parallax className="absolute bottom-0 left-0 w-[46%]" distance={40}>
              <div className="border-[6px] border-plum">
                <img
                  alt=""
                  className="block aspect-[3/4] w-full object-cover"
                  height={1024}
                  loading="lazy"
                  src={asset("images/clinic-corridor.jpg")}
                  width={1024}
                />
              </div>
            </Parallax>
          </div>
        </div>
      </section>

      {/* 4 · Then Dr. Shilpa comes in */}
      <ParallaxBand className="text-white" src={asset("images/clinic-reception-wide.jpg")}>
        <div className="bg-[rgba(40,36,31,0.52)]">
          <div className="wrap grid min-h-[70vh] content-center justify-items-center gap-3 py-28 text-center">
            <Reveal><p className="font-script text-[clamp(2rem,4vw,3rem)] text-gold-light">whatever brought you here</p></Reveal>
            <RevealLines className="title-caps text-white" lines={["Dr. Shilpa can", "help with that"]} />
            <ScrollWords
              className="mt-3 max-w-[30ch] font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug text-white"
              text="One doctor who knows your story, in a calm, private clinic, with a female staff member present at every examination."
            />
          </div>
        </div>
      </ParallaxBand>

      <section aria-labelledby="doctor-title" className="section bg-paper">
        <div className="wrap grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <RevealImage
            alt="Dr. Shilpa Bansal Agrawal"
            className="aspect-[4/5] w-full max-w-[480px] justify-self-center"
            height={800}
            imgClassName="object-[50%_20%]"
            src={asset("images/dr-shilpa-portrait.jpg")}
            width={800}
          />
          <div className="grid content-start gap-5">
            <Reveal><p className="script">meet your doctor</p></Reveal>
            <RevealLines className="title-caps" id="doctor-title" lines={["Dr. Shilpa", "Bansal Agrawal"]} />
            <Reveal delay={0.1}>
              <p>
                A consultant obstetrician and gynaecologist and the founder of {clinic.name}. She believes every woman
                deserves time to be heard: she explains each option clearly, avoids unnecessary medication, and plans
                treatment around you.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="m-0 grid gap-px border-y border-line sm:grid-cols-2">
                {credentials.map((c) => (
                  <div className="grid gap-0.5 py-4 sm:pr-6" key={c.k}>
                    <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">{c.k}</dt>
                    <dd className="m-0 font-display text-lg leading-snug text-plum">{c.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-muted-ink">
                Her team includes {clinic.specialists.map((x) => `a ${x.role.toLowerCase()}`).join(", ").replace(/, ([^,]*)$/, " and $1")}, and{" "}
                {clinic.aesthetics.role.toLowerCase()} {clinic.aesthetics.doctor}.{" "}
                <a className="link" href="/team/">Meet the team</a>
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="text-sm text-muted-ink">
                Consults at {clinic.hospitals.join(", ")}. Consultations in {clinic.languages}.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3" delay={0.25}>
              <a className="btn btn-primary" href="/book/">Book with Dr. Shilpa</a>
              <a className="btn" href="/about/">Her full story</a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 · What other women say */}
      <section aria-labelledby="reviews-title" className="section overflow-hidden bg-mist" id="reviews">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="grid content-start gap-5">
            <Reveal><p className="script">in their words</p></Reveal>
            <RevealLines className="title-caps" id="reviews-title" lines={["What patients", "say"]} />
            <Reveal delay={0.1}>
              <p className="max-w-[40ch] text-muted-ink">
                Reviews from Google and Practo. The overall rating is from {clinic.rating.source}.
              </p>
            </Reveal>
            <Reveal className="w-fit" delay={0.15}>
              <RatingGauge />
            </Reveal>
            <Reveal className="flex flex-wrap gap-3" delay={0.2}>
              <a className="btn" href="/reviews/">All reviews</a>
              <a className="btn" href={clinic.practoHref} rel="noopener" target="_blank">On Practo</a>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <ReviewStack items={reviews} />
          </Reveal>
        </div>
      </section>

      {/* 6 · Plan your visit: where, when, what it costs, then book or ask */}
      <section aria-labelledby="visit-title" className="section bg-paper" id="book">
        <div className="wrap grid gap-14">
          <div className="grid justify-items-center gap-3 text-center">
            <Reveal><p className="script">we're here for you</p></Reveal>
            <RevealLines className="title-caps" id="visit-title" lines={["Plan your visit"]} />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <Reveal className="grid content-start gap-6">
              <ClinicMap />
              <dl className="m-0 grid gap-6 sm:grid-cols-2">
                <div className="grid content-start gap-1 sm:col-span-2">
                  <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Where</dt>
                  <dd className="m-0">
                    {clinic.name}, {clinic.addressLines.join(", ")}
                    <span className="mt-1 block text-sm text-muted-ink">
                      Easy to reach from Lokhandwala, Versova, Juhu, Jogeshwari, Vile Parle and Malad.
                    </span>
                    <a className="link mt-1 block" href={clinic.mapsHref} rel="noopener" target="_blank">Get directions →</a>
                  </dd>
                </div>
                <div className="grid content-start gap-1">
                  <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">When</dt>
                  <dd className="m-0">
                    Mon–Fri 12–2:30 pm &amp; 5:30–7:30 pm
                    <span className="block">Sat 12–5 pm · Closed Sunday</span>
                  </dd>
                </div>
                <div className="grid content-start gap-1">
                  <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-muted-ink">Your first visit</dt>
                  <dd className="m-0">
                    {clinic.fee ? `${clinic.fee} consultation; any tests are explained and priced first.` : "Any tests are explained first."}
                    <a className="link mt-1 block" href="/first-visit/">What to expect →</a>
                  </dd>
                </div>
              </dl>
            </Reveal>
            <Reveal className="shadow-[0_30px_60px_-40px_rgba(47,44,40,0.5)]" delay={0.1}>
              <BookingForm />
            </Reveal>
          </div>

          <div className="grid items-start gap-8 border-t border-line pt-14 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <Reveal className="grid content-start gap-3">
              <h2 className="title-caps text-[clamp(1.6rem,2.6vw,2.2rem)]" id="assistant-title">Still have a question?</h2>
              <p className="text-muted-ink">
                The clinic assistant answers practical questions about the clinic and helps you request an appointment.
                It does not give medical advice. In an emergency, call {clinic.emergency}.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Assistant />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7 · A glimpse of the clinic */}
      <section aria-label="Inside the clinic" className="bg-paper pb-16">
        <DriftRow>
          {gallery.map((g) => (
            <img
              alt={g.alt}
              className="h-[200px] w-auto object-cover sm:h-[280px]"
              height={280}
              key={g.src}
              loading="lazy"
              src={asset(g.src)}
              width={360}
            />
          ))}
        </DriftRow>
        <div className="wrap mt-6 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.22em] text-muted-ink">
          <span>{clinic.name} · Jyoti Tower, DN Nagar</span>
          <a className="no-underline hover:text-accent" href={clinic.social.instagram} rel="noopener" target="_blank">
            Follow on Instagram →
          </a>
        </div>
      </section>
    </Shell>
  );
}
