"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";
import { siteHref, whatsappLink } from "@/lib/href";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-[10px] border border-field bg-paper px-3 py-2.5 text-ink focus:border-transparent focus:outline-2 focus:outline-accent aria-[invalid=true]:border-accent";

type Errors = Partial<Record<"name" | "phone" | "email" | "day" | "consent", string>>;

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

// Until the booking email service is connected, a valid request is handed to the
// clinic's WhatsApp so it actually reaches them. Nothing is stored on this site.
export default function BookingForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [ready, setReady] = useState(false);
  const [minDay, setMinDay] = useState<string>();
  const [errors, setErrors] = useState<Errors>({});
  const [request, setRequest] = useState<{ firstName: string; href: string } | null>(null);
  const status = useRef<HTMLParagraphElement>(null);

  // The submit button stays disabled until the page is interactive, so a request can
  // never be sent as a plain form submission that puts personal details in the URL.
  useEffect(() => {
    setReady(true);
    setMinDay(today());
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone");
    const email = get("email");
    const day = get("day");
    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(phone)) next.phone = "Enter a 10-digit mobile number, for example 98200 12345.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email address, or leave it blank.";
    if (day && day < today()) next.day = "Choose today or a later date.";
    if (data.get("consent") !== "yes") next.consent = "Please confirm that the clinic may contact you.";
    setErrors(next);

    const firstInvalid = (["name", "phone", "email", "day", "consent"] as const).find((k) => next[k]);
    if (firstInvalid) {
      setRequest(null);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const visit = get("reason");
    const lines = [
      `Hello, I'd like to book an appointment with ${clinic.doctor}.`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      email && `Email: ${email}`,
      visit && `Type of visit: ${visit}`,
      day && `Preferred day: ${day}`,
      `Preferred time: ${get("time")}`,
    ].filter(Boolean);
    setRequest({ firstName: name.split(" ")[0], href: whatsappLink(clinic.whatsappHref, lines.join("\n")) });
    requestAnimationFrame(() => status.current?.focus());
  };

  const describedBy = (k: keyof Errors) => (errors[k] ? `${id}-${k}-error` : undefined);
  const ErrorText = ({ k }: { k: keyof Errors }) =>
    errors[k] ? (
      <span className="text-sm font-normal text-accent" id={`${id}-${k}-error`}>
        {errors[k]}
      </span>
    ) : null;

  return (
    <div className="min-w-0 rounded-lg border border-line p-5 sm:p-8">
      <h2 className="mb-1 text-[1.6rem]">Your details</h2>
      <p className="mb-5 text-sm text-muted-ink">
        Fields marked <span aria-hidden className="text-accent">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>
      <noscript>
        <p className="mb-4 rounded-[10px] bg-plum-soft px-3.5 py-3 text-sm">
          Online booking needs JavaScript. Please call {clinic.phoneDisplay} or message the clinic on WhatsApp.
        </p>
      </noscript>
      <form className="grid gap-4" method="post" noValidate onSubmit={submit} ref={formRef}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid content-start gap-1.5 text-sm font-semibold">
            <span>Your name <span aria-hidden className="text-accent">*</span></span>
            <input aria-describedby={describedBy("name")} aria-invalid={!!errors.name} aria-required autoComplete="name" className={field} id="f-name" name="name" />
            <ErrorText k="name" />
          </label>
          <label className="grid content-start gap-1.5 text-sm font-semibold">
            <span>Mobile number <span aria-hidden className="text-accent">*</span></span>
            <input aria-describedby={describedBy("phone")} aria-invalid={!!errors.phone} aria-required autoComplete="tel" className={field} id="f-phone" inputMode="tel" name="phone" type="tel" />
            <ErrorText k="phone" />
          </label>
        </div>
        <label className="grid content-start gap-1.5 text-sm font-semibold">
          Email (optional)
          <input aria-describedby={describedBy("email")} aria-invalid={!!errors.email} autoComplete="email" className={field} id="f-email" name="email" type="email" />
          <ErrorText k="email" />
        </label>
        <label className="grid content-start gap-1.5 text-sm font-semibold">
          Type of visit (optional)
          <select className={field} defaultValue="" id="f-reason" name="reason">
            <option value="">Prefer to discuss in person</option>
            <option>General consultation</option>
            <option>Pregnancy</option>
            <option>Fertility</option>
            <option>Follow-up visit</option>
          </select>
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid content-start gap-1.5 text-sm font-semibold">
            Preferred day
            <input aria-describedby={describedBy("day")} aria-invalid={!!errors.day} className={field} id="f-day" min={minDay} name="day" type="date" />
            <ErrorText k="day" />
          </label>
          <label className="grid content-start gap-1.5 text-sm font-semibold">
            Preferred time
            <select className={field} id="f-time" name="time">
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>
        </div>
        <div className="grid gap-1.5">
          <label className="flex items-start gap-3 text-sm">
            <input aria-describedby={describedBy("consent")} aria-invalid={!!errors.consent} className="mt-1 size-4 shrink-0 accent-accent" id="f-consent" name="consent" type="checkbox" value="yes" />
            <span>
              I agree that {clinic.name} may use these details to contact me about my appointment, as described in
              the{" "}
              <a className="link" href={siteHref("/privacy/")}>privacy policy</a>.{" "}
              <span aria-hidden className="text-accent">*</span>
            </span>
          </label>
          <ErrorText k="consent" />
        </div>
        <button className={cn("btn btn-primary mt-1", !ready && "cursor-not-allowed opacity-60")} disabled={!ready} type="submit">
          Continue
        </button>
        <div aria-live="polite">
          {request && (
            <div className="grid gap-3 rounded-[10px] bg-plum-soft px-4 py-4 text-sm">
              <p className="outline-none" ref={status} tabIndex={-1}>
                Thanks, {request.firstName}. Your request is ready. Send it to the clinic on WhatsApp and the team will
                reply to confirm a time.
              </p>
              <div className="flex flex-wrap gap-2">
                <a className="btn btn-primary py-2.5 text-sm" href={request.href} rel="noopener" target="_blank">
                  Send on WhatsApp
                </a>
                <a className="btn py-2.5 text-sm" href={clinic.phoneHref}>Call {clinic.phoneDisplay}</a>
              </div>
            </div>
          )}
        </div>
        <p className="text-xs text-muted-ink">
          Please don't include medical details here. Dr. Shilpa will discuss them with you in person.
        </p>
      </form>
    </div>
  );
}
