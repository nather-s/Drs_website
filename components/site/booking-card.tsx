import { bookOnWhatsapp } from "@/lib/booking";
import { clinic } from "@/lib/clinic";

// Compact consultation card used in page sidebars. The main button books in one tap.
// `note` adds a line to the WhatsApp message (never the medical reason for the visit).
export default function BookingCard({ topic, note }: { topic?: string; note?: string }) {
  return (
    <div className="grid gap-4 rounded-lg border border-line bg-paper p-6">
      <div className="grid gap-1">
        <b className="font-display text-xl font-normal">Book a consultation</b>
        <p className="text-sm text-muted-ink">
          {topic ? `For ${topic}, with` : "With"} {clinic.doctor} at {clinic.name}, Andheri West.
        </p>
      </div>
      <a
        className="btn btn-primary min-h-12"
        href={bookOnWhatsapp(undefined, undefined, undefined, note)}
        rel="noopener"
        target="_blank"
      >
        Book on WhatsApp
      </a>
      <dl className="m-0 grid gap-1.5 text-sm">
        {clinic.fee && (
          <div className="flex justify-between gap-3">
            <dt className="text-muted-ink">Consultation</dt>
            <dd className="m-0 font-semibold">{clinic.fee}</dd>
          </div>
        )}
        {clinic.hours && (
          <div className="grid gap-0.5">
            <dt className="text-muted-ink">Hours</dt>
            <dd className="m-0">{clinic.hours}</dd>
          </div>
        )}
        <div className="grid gap-0.5">
          <dt className="text-muted-ink">Languages</dt>
          <dd className="m-0">{clinic.languages}</dd>
        </div>
      </dl>
      <div className="grid gap-1.5 border-t border-line pt-4 text-sm">
        <a className="no-underline hover:text-accent" href={clinic.phoneHref}>Call {clinic.phoneDisplay}</a>
        <a className="no-underline hover:text-accent" href="/book/">Choose a day and time</a>
        <a className="text-xs text-muted-ink underline underline-offset-2" href="/privacy/">How we use your details</a>
      </div>
    </div>
  );
}
