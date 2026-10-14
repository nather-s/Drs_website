import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: `Privacy policy | ${clinic.name}`,
  description: "How Harleys Women's Clinic collects and uses the personal details you share through this website.",
  alternates: { canonical: "/privacy/" },
};

// Draft written to India's Digital Personal Data Protection Act, 2023. To be reviewed
// by the clinic (and its legal adviser) before launch.
const sections = [
  {
    heading: "Who we are",
    body: [
      `This website is run by ${clinic.doctor} and ${clinic.legalName}, ${clinic.addressLines.join(", ")}. We decide how the personal details you share with us are used.`,
    ],
  },
  {
    heading: "What we collect",
    body: [
      "When you request an appointment, we ask for your name, mobile number and, if you choose, your email address, the type of visit and your preferred day and time.",
      "This website does not use cookies, analytics or advertising trackers, and it does not store the details you type into the booking form. Your request reaches the clinic only when you send it to us, for example on WhatsApp.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "We use your details only to contact you about your appointment and to arrange your care. We do not sell your details or use them for marketing.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep appointment requests only as long as needed to arrange and provide your care, and as required by medical record-keeping rules.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask to see the details we hold about you, correct them, or have them deleted where the law allows. You can withdraw your consent at any time; this does not affect anything done before you withdrew it.",
      "For patients under 18, a parent or guardian gives consent on their behalf.",
    ],
  },
  {
    heading: "Contact and complaints",
    body: [
      `To use any of these rights, or if you have a concern about how your details are handled, email ${clinic.email} or call ${clinic.phoneDisplay}. If you are not satisfied with our response, you can complain to the Data Protection Board of India.`,
    ],
  },
];

export default function Privacy() {
  return (
    <Shell>
      <PageIntro
        crumbs={[{ label: "Privacy policy" }]}
        lede="How we collect and use the personal details you share through this website."
        title="Privacy policy"
      />
      <div className="wrap grid max-w-[820px] gap-10 py-12 md:py-16">
        {sections.map((s) => (
          <section className="grid gap-3" key={s.heading}>
            <h2 className="text-[1.5rem]">{s.heading}</h2>
            {s.body.map((p) => (
              <p className="max-w-[68ch]" key={p}>{p}</p>
            ))}
          </section>
        ))}
        <p className="text-sm text-muted-ink">Last updated: October 2026</p>
      </div>
    </Shell>
  );
}
