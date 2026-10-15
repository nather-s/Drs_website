import { categories, treatments } from "@/lib/treatments";
import { clinic } from "@/lib/clinic";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-mist pb-28 text-[0.92rem] md:pb-0">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.1fr_1fr]">
        <div className="grid content-start gap-3">
          <b className="font-display text-lg font-medium">{clinic.name}</b>
          <address className="not-italic text-muted-ink">
            {clinic.addressLines.map((l) => (
              <span className="block" key={l}>{l}</span>
            ))}
          </address>
          {clinic.hours && <p className="m-0 text-muted-ink">{clinic.hours}</p>}
          <p className="grid gap-1">
            <a className="no-underline hover:text-accent" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
            <a className="break-words no-underline hover:text-accent" href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </p>
          <p className="flex gap-4 text-muted-ink">
            <a className="no-underline hover:text-accent" href={clinic.social.youtube} rel="noopener" target="_blank">YouTube</a>
            <a className="no-underline hover:text-accent" href={clinic.social.instagram} rel="noopener" target="_blank">Instagram</a>
            <a className="no-underline hover:text-accent" href={clinic.social.facebook} rel="noopener" target="_blank">Facebook</a>
          </p>
        </div>
        <FooterList
          links={categories.map((c) => ({ label: c.title, href: `/treatments/#${c.id}` }))}
          title="Treatments"
        />
        <FooterList
          links={["pcos", "pregnancy-care", "fertility", "menopause", "cervical-cancer-prevention", "fibroids-and-cysts"].map(
            (slug) => {
              const t = treatments.find((x) => x.slug === slug)!;
              return { label: t.title, href: `/treatments/${t.slug}/` };
            }
          )}
          title="Common conditions"
        />
        <FooterList
          links={[
            { label: "About Dr. Shilpa", href: "/about/" },
            { label: "Our team", href: "/team/" },
            { label: "Your first visit", href: "/first-visit/" },
            { label: "All treatments", href: "/treatments/" },
            { label: "Book an appointment", href: "/book/" },
            { label: "Contact and directions", href: "/book/#contact" },
          ]}
          title="Patients"
        />
      </div>
      <div className="border-t border-line">
        <div className="wrap grid gap-2 py-6 text-[0.8rem] text-muted-ink">
          <p className="font-semibold text-ink">
            In a medical emergency, call {clinic.emergency} or go to the nearest hospital emergency department.
          </p>
          <p>
            The information on this website is for general awareness and is not medical advice. Results vary from
            person to person. Please book a consultation to discuss your health.
          </p>
          <p>
            © 2026 {clinic.doctor} · {clinic.legalName} ·{" "}
            <a className="underline underline-offset-2 hover:text-accent" href="/privacy/">Privacy policy</a> ·{" "}
            <a className="underline underline-offset-2 hover:text-accent" href="/browsing-safely/">Browsing safely</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="grid content-start gap-3">
      <b className="text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-plum">{title}</b>
      <ul className="m-0 grid list-none gap-2 p-0">
        {links.map((l) => (
          <li key={l.href}>
            <a className="text-muted-ink no-underline hover:text-accent" href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
