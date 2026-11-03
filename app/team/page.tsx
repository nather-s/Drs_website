import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { asset } from "@/lib/asset";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: `Our team | ${clinic.name}, Andheri West`,
  description: "Meet the doctors and staff at Harleys Women's Clinic in Andheri West, Mumbai.",
  alternates: { canonical: "/team/" },
};

type Member = { name: string; role: string; bio: string; initials: string; photo?: string; href?: string };

const doctors: Member[] = [
  {
    name: clinic.doctor,
    role: "Founder and Lead Consultant, Obstetrics & Gynaecology",
    bio: "MD (Gold Medal), DNB and MRCOG (UK), in practice since 2009, in teaching hospitals and private practice.",
    initials: "SB",
    photo: "images/dr-shilpa.jpg",
    href: "/about/",
  },
  {
    name: "Dr. Sumit Agrawal",
    role: "Plastic & Cosmetic Surgeon",
    // Qualifications as listed on Practo and Drlogy; confirm with the clinic.
    bio: "MS, MCh (Plastic Surgery), MRCS (Edinburgh). Leads the clinic's cosmetic and hair restoration services.",
    initials: "SA",
  },
];

function Card({ m, large }: { m: Member; large?: boolean }) {
  return (
    <article className="grid content-start gap-4 rounded-lg border border-line p-5">
      {m.photo ? (
        <img
          alt={m.name}
          className={`w-full rounded-md object-cover object-[50%_30%] ${large ? "aspect-[4/3]" : "aspect-square"}`}
          src={asset(m.photo)}
        />
      ) : (
        <div
          aria-label={`Photo placeholder for ${m.name}`}
          className={`grid place-items-center rounded-md bg-plum-soft ${large ? "aspect-[4/3]" : "aspect-square"}`}
          role="img"
        >
          <span className="font-display text-4xl text-plum/40">{m.initials || "Photo"}</span>
        </div>
      )}
      <div className="grid gap-1">
        <h3 className="text-xl">{m.name}</h3>
        <p className="text-sm font-semibold text-accent">{m.role}</p>
        <p className="text-sm text-muted-ink">{m.bio}</p>
        {m.href && (
          <a className="link mt-2 w-fit text-sm" href={m.href}>View full profile</a>
        )}
      </div>
    </article>
  );
}

export default function Team() {
  return (
    <Shell current="/team/">
      <PageIntro
        crumbs={[{ label: "Our team" }]}
        lede="The doctors and staff who will look after you at Harleys Women's Clinic."
        title="Meet the team"
      />
      <div className="wrap grid gap-14 py-12 md:py-16">
        <section aria-labelledby="doctors" className="grid gap-6">
          <h2 className="text-[1.6rem]" id="doctors">Doctors</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {doctors.map((m) => (
              <Card key={m.name} large m={m} />
            ))}
          </div>
        </section>
        <section aria-labelledby="staff" className="grid gap-3 rounded-lg bg-mist p-6 md:p-8">
          <h2 className="text-[1.5rem]" id="staff">Clinic staff</h2>
          <p className="max-w-[66ch]">
            Most of the clinic's staff are women. They will welcome you and help with your appointments and any
            questions before or after your visit.
          </p>
          <a className="link w-fit" href="/first-visit/">What happens at your first visit</a>
        </section>
      </div>
    </Shell>
  );
}
