// Plain-language starting points, for people who know what they're feeling but not
// the medical name for it.
const entries = [
  { label: "I'm pregnant", slug: "pregnancy-care" },
  { label: "We're trying for a baby", slug: "fertility" },
  { label: "My periods are irregular or have stopped", slug: "irregular-periods" },
  { label: "I have acne, extra hair or weight gain (PCOS)", slug: "pcos" },
  { label: "Heavy periods, or a second opinion on surgery", slug: "fibroids-and-cysts" },
  { label: "An unplanned pregnancy", slug: "pregnancy-options" },
  { label: "Booking for my teenage daughter", slug: "adolescent-health" },
  { label: "My Pap or HPV result was abnormal", slug: "colposcopy" },
  { label: "Discharge, itching or burning", slug: "vaginal-infections" },
  { label: "Hot flushes or night sweats", slug: "menopause" },
  { label: "I'm due for a Pap smear", slug: "cervical-cancer-prevention" },
  { label: "Choosing contraception", slug: "contraception" },
];

export default function SymptomFinder({
  heading = "What brings you here?",
  hideHeading = false,
}: {
  heading?: string;
  hideHeading?: boolean;
}) {
  return (
    <nav aria-labelledby="symptom-finder" className="grid gap-4">
      <h2 className={hideHeading ? "sr-only" : "text-[clamp(1.8rem,3vw,2.3rem)]"} id="symptom-finder">
        {heading}
      </h2>
      <ul className="m-0 grid list-none border-t border-line p-0 sm:grid-cols-2 sm:gap-x-12">
        {entries.map((e) => (
          <li className="border-b border-line" key={e.slug}>
            <a
              className="group flex min-h-14 items-center justify-between gap-4 py-3.5 text-[1.02rem] no-underline transition-colors hover:text-accent"
              href={`/treatments/${e.slug}/`}
            >
              <span className="transition-transform duration-300 group-hover:translate-x-1">{e.label}</span>
              <span
                aria-hidden
                className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-sm text-gold transition-colors duration-300 group-hover:border-plum group-hover:bg-plum group-hover:text-paper"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
