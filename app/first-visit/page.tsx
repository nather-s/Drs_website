import type { Metadata } from "next";
import BookingCard from "@/components/site/booking-card";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Your first visit | Dr. Shilpa, Andheri West",
  description:
    "What happens at your first appointment with Dr. Shilpa Bansal Agrawal: what to bring, the consultation, examinations and privacy.",
  alternates: { canonical: "/first-visit/" },
};

// Steps in the order they happen, so the numbering is real information.
const steps = [
  {
    title: "Before you come",
    points: [
      "Bring any previous reports, scans and prescriptions, and a list of medicines you take.",
      "Note the date your last period started, and any symptoms you want to mention. It's fine to write them down and read from your notes.",
      "You can usually still come if you have your period. A Pap smear or colposcopy needs to be booked for a day when you are not bleeding.",
    ],
  },
  {
    title: "When you arrive",
    points: [
      "The front desk will welcome you and check your details. Most of the clinic's staff are women.",
      "You are welcome to bring your partner, a family member or a friend.",
    ],
  },
  {
    title: "Talking with Dr. Shilpa",
    points: [
      "The consultation happens in a private room. Dr. Shilpa will ask about your health and what brought you in, and you can share as much or as little as you are comfortable with.",
      "You will not be judged, whatever your age, whether or not you are married, and whatever your question.",
      "She will explain what she thinks is going on and the options, and you decide together what happens next.",
    ],
  },
  {
    title: "If an examination is needed",
    points: [
      "An examination is only done if it is needed. Many first visits don't need an internal examination at all.",
      "Dr. Shilpa will explain what the examination involves and why, and ask your permission before starting.",
      "You can have the person you came with in the room, and you can ask to pause or stop at any time.",
    ],
  },
  {
    title: "After your visit",
    points: [
      "You'll leave with a plan, which may include tests, a prescription or a follow-up visit.",
      "If you think of a question later, message the clinic on WhatsApp.",
    ],
  },
];

const faqs = [
  {
    q: "Is what I say kept private?",
    a: "Yes. Your consultation and records are confidential. The only exception is where the law requires the clinic to act, for example the duty to report sexual activity involving someone under 18.",
  },
  {
    q: "Can I see Dr. Shilpa on my own if I come with someone?",
    a: "Yes. You can ask for part or all of the consultation to be just you and the doctor.",
  },
  {
    q: "How much does a consultation cost?",
    a: clinic.fee
      ? `A consultation with Dr. Shilpa is ${clinic.fee}. Any tests or scans are extra, and the clinic will tell you their cost before they are done.`
      : "Ask about the consultation fee when you message or call to book, and the clinic team will tell you before your visit.",
  },
  {
    q: "What if I feel nervous or embarrassed?",
    a: "Many women do, especially at a first visit. Tell Dr. Shilpa, and she will go at your pace and explain each step.",
  },
];

export default function FirstVisit() {
  return (
    <Shell current="/first-visit/">
      <PageIntro
        crumbs={[{ label: "Your first visit" }]}
        lede="Knowing what will happen can make a first appointment easier. Here is what to expect, step by step."
        title="Your first visit"
      />
      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16">
        <div className="grid min-w-0 content-start gap-12">
          <ol className="m-0 grid list-none gap-10 p-0" role="list">
            {steps.map((s, i) => (
              <li className="grid grid-cols-[44px_1fr] gap-4" key={s.title}>
                <span aria-hidden className="grid size-11 place-items-center rounded-full bg-plum-soft font-display text-lg text-plum">
                  {i + 1}
                </span>
                <div className="grid gap-3">
                  <h2 className="text-[1.5rem]">{s.title}</h2>
                  <ul className="m-0 grid list-none gap-2.5 p-0">
                    {s.points.map((p) => (
                      <li className="relative max-w-[66ch] pl-5 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent" key={p}>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          <section aria-labelledby="first-visit-questions" className="grid gap-2">
            <h2 className="mb-2 text-[1.5rem]" id="first-visit-questions">Questions about your visit</h2>
            {faqs.map((f) => (
              <details className="group border-t border-line py-4 last:border-b" key={f.q}>
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-xl leading-none text-accent transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2 max-w-[66ch] text-muted-ink">{f.a}</p>
              </details>
            ))}
          </section>
        </div>
        <aside className="grid content-start gap-6 lg:sticky lg:top-28 lg:self-start">
          <BookingCard />
          <p className="rounded-lg bg-mist p-5 text-sm text-muted-ink">
            In a medical emergency, call {clinic.emergency} or go to the nearest hospital emergency department.
          </p>
        </aside>
      </div>
    </Shell>
  );
}
