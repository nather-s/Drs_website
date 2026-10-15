import { clinic } from "@/lib/clinic";
import { whatsappLink } from "@/lib/href";

// The WhatsApp request a patient sends to book. It never includes the reason for the
// visit, so nothing sensitive appears in chat previews on a shared phone.
export function bookingMessage(day = "Any day", time = "Any time", name = "", note = "") {
  return [
    `Hello, I'd like an appointment with ${clinic.doctor}.`,
    note,
    name && `Name: ${name}`,
    `Preferred day: ${day}`,
    `Preferred time: ${time}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export const bookOnWhatsapp = (day?: string, time?: string, name?: string, note?: string) =>
  whatsappLink(clinic.whatsappHref, bookingMessage(day, time, name, note));
