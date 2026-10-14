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
      "You can contact the clinic by WhatsApp, phone or email. When you do, the clinic receives your number or email address and whatever you choose to tell us. The website's booking buttons write a WhatsApp message for you containing your preferred day and time and, if you add it, your name. We never ask for the reason for your visit online.",
      "WhatsApp messages are carried by WhatsApp (Meta), and WhatsApp may show the clinic your profile name and photo.",
      "This website does not use cookies, analytics or advertising trackers, and it does not store anything you type into it. Nothing reaches the clinic until you send a message, call or email.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "You choose to share these details so we can arrange your appointment and care, and we use them only for that. We do not sell your details or use them for marketing.",
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
