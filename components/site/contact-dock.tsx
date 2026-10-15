import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { bookOnWhatsapp } from "@/lib/booking";
import { clinic } from "@/lib/clinic";

// Bottom contact bar for phones. Every button acts in one tap: call, WhatsApp the clinic
// with a ready-written request, or choose a day and time on the booking page.
export default function ContactDock() {
  const item = "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-[10px] py-2 text-[0.8rem] font-semibold no-underline min-h-12";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-paper px-3 pt-2 pb-[calc(8px+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <a className={`${item} border border-line`} href={clinic.phoneHref}>
        <Phone aria-hidden className="size-4" />
        Call
      </a>
      <a
        className={`${item} border border-line`}
        href={bookOnWhatsapp()}
        rel="noopener"
        target="_blank"
      >
        <MessageCircle aria-hidden className="size-4" />
        WhatsApp
      </a>
      <a className={`${item} border border-accent bg-accent text-accent-ink`} href="/book/">
        <CalendarDays aria-hidden className="size-4" />
        Book
      </a>
    </nav>
  );
}
