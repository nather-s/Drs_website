// Plain-language starting points, for people who know what they're feeling but not
// the medical name for it.
const entries = [
  { label: "My periods are irregular or have stopped", slug: "irregular-periods" },
  { label: "I'm pregnant", slug: "pregnancy-care" },
  { label: "We're trying for a baby", slug: "fertility" },
  { label: "I have acne, extra hair or weight gain", slug: "pcos" },
  { label: "Heavy periods or pelvic pain", slug: "fibroids-and-cysts" },
  { label: "Hot flushes or night sweats", slug: "menopause" },
  { label: "Discharge, itching or burning", slug: "vaginal-infections" },
  { label: "I'm due for a Pap smear", slug: "cervical-cancer-prevention" },
  { label: "My Pap or HPV result was abnormal", slug: "colposcopy" },
  { label: "Choosing contraception", slug: "contraception" },
  { label: "An unplanned pregnancy", slug: "pregnancy-options" },
  { label: "Booking for my teenage daughter", slug: "adolescent-health" },
];

export default function SymptomFinder({ heading = "What brings you here?" }: { heading?: string }) {
  return (
    <nav aria-labelledby="symptom-finder" className="grid gap-4">
      <h2 className="text-[1.5rem]" id="symptom-finder">{heading}</h2>
      <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((e) => (
          <li key={e.slug}>
            <a
              className="flex min-h-12 items-center justify-between gap-3 rounded-lg border border-line bg-paper px-4 py-3 no-underline transition-colors hover:border-accent"
              href={`/treatments/${e.slug}/`}
            >
              {e.label}
              <span aria-hidden className="text-accent">→</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
