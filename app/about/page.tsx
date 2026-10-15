import type { Metadata } from "next";
import BookingCard from "@/components/site/booking-card";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: `About ${clinic.doctor}, Gynaecologist`,
  description:
    "Qualifications, experience and areas of interest of Dr. Shilpa Bansal Agrawal, consultant obstetrician and gynaecologist in Mumbai.",
  alternates: { canonical: "/about/" },
};

const education = [
  { year: "2005", title: "MBBS, Kasturba Medical College, Manipal", note: "Gold medal in second year; distinction in all subjects" },
  { year: "2009", title: "MD Obstetrics & Gynaecology, King George's Medical University, Lucknow", note: "Gold medal" },
  { year: "2012", title: "DNB, National Board of Examinations, New Delhi", note: "" },
  { year: "2015", title: "Fellowship in Reproductive Endocrinology & Infertility, ICOG", note: "" },
  { year: "", title: "MRCOG, Royal College of Obstetricians & Gynaecologists, UK", note: "" },
  { year: "", title: "DHA Specialist licence, Dubai", note: "" },
];

const experience = [
  { years: "2009–2012", role: "Assistant Professor", place: "Grant Medical College & Sir JJ Group of Hospitals (Cama & Albless Hospital), Mumbai" },
  { years: "2012–2014", role: "Specialist Consultant and Unit Head", place: "ESI Hospital, Kandivali, Mumbai" },
  { years: "2012–2016", role: "Honorary Consultant and Unit Head", place: "Global Hospital and Research Centre, Mumbai" },
  { years: "2012–2022", role: "Consultant", place: "Cloudnine Hospital, Mumbai; visiting consultant at Surya, Criticare Asia and Belle Vue hospitals" },
  { years: "2012–present", role: "Founder and Lead Consultant", place: clinic.legalName },
];

const interests = [
  "Fertility assessment and treatment",
  "PCOS and hormonal disorders",
  "High-risk pregnancy and epidural pain relief in labour",
  "Cervical cancer screening and colposcopy",
  "Laparoscopic and hysteroscopic surgery",
  "Menopause care and HRT",
  "Adolescent health and contraception",
  "Cosmetic gynaecology",
];

export default function About() {
  return (
    <Shell current="/about/">
      <PageIntro
        crumbs={[{ label: "About Dr. Shilpa" }]}
        eyebrow={clinic.doctorRole}
        lede="Consultant obstetrician and gynaecologist with advanced training in fertility, and founder of Harleys Women's Clinic in Andheri West."
        title={clinic.doctor}
      />

      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="grid min-w-0 content-start gap-12">
          <section className="grid gap-4 text-[1.08rem]">
            <p className="max-w-[68ch]">
              Dr. Shilpa Bansal Agrawal cares for women at every stage of life, from adolescence and the reproductive
              years through pregnancy and menopause. Her practice covers routine gynaecology, pregnancy care, fertility,
              menstrual and hormonal conditions, and preventive women's health.
            </p>
            <p className="max-w-[68ch]">
              She believes every patient deserves time to be heard. She explains each option clearly, avoids
              unnecessary medication, and tailors treatment to the individual, so patients can make informed decisions
              about their health.
            </p>
            <p className="max-w-[68ch]">
              She has contributed to the textbook <i>Clinical Obstetrics &amp; Gynaecology</i> and wrote the chapter
              "Adolescent: Unmet Need for Contraception Education" in the FOGSI textbook. She is a member of the
              Federation of Obstetric and Gynaecological Societies of India (FOGSI).
            </p>
          </section>

          <section aria-labelledby="qualifications" className="grid gap-4">
            <h2 className="text-[1.6rem]" id="qualifications">Qualifications</h2>
            <ol className="m-0 list-none p-0">
              {education.map((e) => (
                <li className="grid grid-cols-[72px_1fr] gap-4 border-t border-line py-4 last:border-b" key={e.title}>
                  <span className="font-display text-lg tabular-nums text-plum">{e.year}</span>
                  <div>
                    <b className="block font-semibold">{e.title}</b>
                    {e.note && <span className="text-sm text-muted-ink">{e.note}</span>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="experience" className="grid gap-4">
            <h2 className="text-[1.6rem]" id="experience">Experience</h2>
            <ol className="m-0 list-none p-0">
              {experience.map((e) => (
                <li className="grid gap-1 border-t border-line py-4 last:border-b sm:grid-cols-[150px_1fr] sm:gap-4" key={e.years + e.role}>
                  <span className="text-sm font-semibold tabular-nums text-plum">{e.years}</span>
                  <div>
                    <b className="block font-semibold">{e.role}</b>
                    <span className="text-sm text-muted-ink">{e.place}</span>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="interests" className="grid gap-4">
            <h2 className="text-[1.6rem]" id="interests">Areas of special interest</h2>
            <ul className="m-0 grid list-none gap-x-8 gap-y-2.5 p-0 sm:grid-cols-2">
              {interests.map((i) => (
                <li className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent" key={i}>
                  {i}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start">
          <div
            aria-label="Portrait placeholder for Dr. Shilpa"
            className="grid aspect-[4/5] place-items-center rounded-lg bg-plum-soft"
            role="img"
          >
            <span className="font-display text-6xl text-plum/40">SB</span>
          </div>
          <div className="grid gap-2 rounded-lg border border-line p-6 text-sm">
            <b className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-plum">Hospital experience</b>
            <ul className="m-0 grid list-none gap-1 p-0">
              {clinic.hospitals.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <BookingCard />
        </aside>
      </div>
    </Shell>
  );
}
