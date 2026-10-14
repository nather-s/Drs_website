import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Browsing safely",
  description: "How to keep your visits to this website private on a shared phone or computer.",
  alternates: { canonical: "/browsing-safely/" },
};

const sections = [
  {
    heading: "The Exit this page button",
    points: [
      "Some pages have an Exit this page button. Tapping it, or pressing the Shift key three times, takes you straight to a weather website.",
      "It does not delete this website from your browsing history. Follow the steps below to do that.",
    ],
  },
  {
    heading: "Use a private tab",
    points: [
      "In Chrome on Android, tap the three dots at the top right, then New Incognito tab. Pages you open there are not saved in your history.",
      "On an iPhone in Safari, tap the tabs button, then Private.",
    ],
  },
  {
    heading: "Clear your history",
    points: [
      "In Chrome, tap the three dots, then History, then Delete browsing data.",
      "If someone may notice that the whole history has gone, you can delete single pages from the History list instead.",
    ],
  },
  {
    heading: "WhatsApp and phone calls",
    points: [
      "Messages to the clinic stay in your WhatsApp chats. You can delete the chat after the clinic replies.",
      "To stop messages showing on your lock screen, open WhatsApp, go to Settings, then Notifications, and turn off message previews.",
      "Calls to the clinic appear in your call log, which you can delete.",
    ],
  },
  {
    heading: "If you are not safe",
    points: [
      `If you are in danger right now, call 112. The Women Helpline is 181.`,
      `You can also speak to Dr. Shilpa in confidence at the clinic. Call ${clinic.phoneDisplay} to book.`,
    ],
  },
];

export default function BrowsingSafely() {
  return (
    <Shell>
      <PageIntro
        crumbs={[{ label: "Browsing safely" }]}
        lede="If you share a phone or computer, these steps help keep your visits to this website private."
        title="Browsing safely"
      />
      <div className="wrap grid max-w-[820px] gap-10 py-12 md:py-16">
        {sections.map((s) => (
          <section className="grid gap-3" key={s.heading}>
            <h2 className="text-[1.5rem]">{s.heading}</h2>
            <ul className="m-0 grid list-none gap-2.5 p-0">
              {s.points.map((p) => (
                <li className="relative max-w-[68ch] pl-5 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-accent" key={p}>
                  {p}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Shell>
  );
}
