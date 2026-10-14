import { bookOnWhatsapp } from "@/lib/booking";
import { clinic } from "@/lib/clinic";

// Compact consultation card used in page sidebars. The main button books in one tap.
export default function BookingCard({ topic }: { topic?: string }) {
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
        href={bookOnWhatsapp()}
        rel="noopener"
        target="_blank"
      >
        Book on WhatsApp
      </a>
      <div className="grid gap-1.5 border-t border-line pt-4 text-sm">
        <a className="no-underline hover:text-accent" href={clinic.phoneHref}>Call {clinic.phoneDisplay}</a>
        <a className="no-underline hover:text-accent" href="/book/">Choose a day and time</a>
        <a className="text-xs text-muted-ink underline underline-offset-2" href="/privacy/">How we use your details</a>
      </div>
    </div>
  );
}
