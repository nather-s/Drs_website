import type { Metadata } from "next";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: `Our team | ${clinic.name}, Andheri West`,
  description: "Meet the doctors and staff at Harleys Women's Clinic in Andheri West, Mumbai.",
  alternates: { canonical: "/team/" },
};

type Member = { name: string; role: string; bio: string; initials: string; href?: string; pending?: boolean };

const doctors: Member[] = [
  {
    name: clinic.doctor,
    role: "Founder and Lead Consultant, Obstetrics & Gynaecology",
    bio: "MD (Gold Medal), DNB and MRCOG (UK), with over 15 years of experience in teaching hospitals and private practice.",
    initials: "SB",
    href: "/about/",
  },
  {
    name: "Dr. Sumit Agrawal",
    role: "Cosmetic Surgeon",
    bio: "Profile to be added once the clinic confirms his details.",
    initials: "SA",
    pending: true,
  },
];

// Placeholders until the clinic shares names, roles and photos.
const staff: Member[] = [
  { name: "Name to be added", role: "Clinic manager", bio: "Coordinates appointments, records and follow-up.", initials: "", pending: true },
  { name: "Name to be added", role: "Nursing staff", bio: "Assists during examinations and procedures.", initials: "", pending: true },
  { name: "Name to be added", role: "Front desk", bio: "Welcomes patients and handles bookings and payments.", initials: "", pending: true },
];

function Card({ m, large }: { m: Member; large?: boolean }) {
  return (
    <article className="grid content-start gap-4 rounded-lg border border-line p-5">
      <div
        aria-label={`Photo placeholder for ${m.name}`}
        className={`grid place-items-center rounded-md bg-plum-soft ${large ? "aspect-[4/3]" : "aspect-square"}`}
        role="img"
      >
        <span className="font-display text-4xl text-plum/40">{m.initials || "Photo"}</span>
      </div>
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
        lede="Most of the clinic's staff are women, and every member of the team is trained to keep your care private and comfortable."
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
        <section aria-labelledby="staff" className="grid gap-6">
          <div className="grid gap-2">
            <h2 className="text-[1.6rem]" id="staff">Clinic staff</h2>
            <p className="text-sm text-muted-ink">Names and photos will be added once the clinic shares them.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {staff.map((m) => (
              <Card key={m.role} m={m} />
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
}
