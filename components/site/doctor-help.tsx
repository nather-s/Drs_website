import { bookOnWhatsapp } from "@/lib/booking";
import { asset } from "@/lib/asset";
import { clinic } from "@/lib/clinic";

// Where a treatment page turns from information to the doctor: after reading about the
// problem and how it is treated, the patient meets Dr. Shilpa and can book in one tap.
export default function DoctorHelp({ topic, note, forMen }: { topic: string; note?: string; forMen?: boolean }) {
  const subject = /^[A-Z]{2}/.test(topic) ? topic : topic.charAt(0).toLowerCase() + topic.slice(1);
  return (
    <section aria-labelledby="doctor-help" className="grid gap-5 rounded-lg border border-line bg-rose-soft p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <img
          alt={`${clinic.doctor}`}
          className="size-20 shrink-0 rounded-full border-2 border-paper object-cover shadow"
          height={80}
          loading="lazy"
          src={asset("images/dr-shilpa-face.jpg")}
          width={80}
        />
        <div className="grid gap-1">
          <h2 className="text-[1.5rem] leading-tight" id="doctor-help">Dr. Shilpa can help with {subject}</h2>
          <p className="m-0 text-sm text-muted-ink">{clinic.doctorRole} · MD (Gold Medal) · MRCOG (UK)</p>
        </div>
      </div>
      <p className="m-0 max-w-[62ch]">
        {forMen
          ? "She sees couples together, so both partners are assessed and you plan the next steps as a team."
          : "She will listen, explain what is going on and plan treatment with you. Your consultation is private, and an examination is only done if it's needed, with your permission."}{" "}
        Consultations in {clinic.languages}.
      </p>
      <div className="flex flex-wrap gap-3">
        <a className="btn btn-primary" href={bookOnWhatsapp(undefined, undefined, undefined, note)} rel="noopener" target="_blank">
          Book on WhatsApp
        </a>
        <a className="btn bg-paper" href={clinic.phoneHref}>Call {clinic.phoneDisplay.replace("+91 ", "")}</a>
      </div>
      <p className="m-0 text-sm text-muted-ink">
        {clinic.fee && <>Consultation {clinic.fee} · </>}
        {clinic.hours}
        {!forMen && (
          <>
            {" · "}
            <a className="link" href="/first-visit/">What happens at your first visit</a>
          </>
        )}
      </p>
    </section>
  );
}

// A one-line pointer near the top of a treatment page, for visitors who skim: it says
// Dr. Shilpa treats this and jumps to the full "can help" section.
export function DoctorHelpTeaser({ topic }: { topic: string }) {
  const subject = /^[A-Z]{2}/.test(topic) ? topic : topic.charAt(0).toLowerCase() + topic.slice(1);
  return (
    <a
      className="flex items-center gap-3 rounded-lg border border-line bg-paper p-3 no-underline hover:border-accent"
      href="#doctor-help"
    >
      <img
        alt=""
        className="size-12 shrink-0 rounded-full object-cover"
        height={48}
        src={asset("images/dr-shilpa-face.jpg")}
        width={48}
      />
      <span className="grid">
        <b className="font-semibold">Dr. Shilpa treats {subject}</b>
        <span className="text-sm text-muted-ink">See how she can help, or book a consultation →</span>
      </span>
    </a>
  );
}
