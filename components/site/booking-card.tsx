import { clinic } from "@/lib/clinic";

// Compact consultation card used in page sidebars.
export default function BookingCard({ topic }: { topic?: string }) {
  return (
    <div className="grid gap-4 rounded-lg border border-line bg-paper p-6">
      <div className="grid gap-1">
        <b className="font-display text-xl font-normal">
          Book a consultation
        </b>
        <p className="text-sm text-muted-ink">
          {topic ? `For ${topic}, with` : "With"} {clinic.doctor} at {clinic.name}, Andheri West.
        </p>
      </div>
      <a className="btn btn-primary" href="/book/">Book appointment</a>
      <div className="grid gap-1.5 border-t border-line pt-4 text-sm">
        <a className="no-underline hover:text-accent" href={clinic.phoneHref}>Call {clinic.phoneDisplay}</a>
        <a className="no-underline hover:text-accent" href={clinic.whatsappHref} rel="noopener" target="_blank">
          Message on WhatsApp
        </a>
      </div>
    </div>
  );
}
