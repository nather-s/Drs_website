"use client";

import { type FormEvent, useEffect, useId, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";
import { siteHref, whatsappLink } from "@/lib/href";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-[10px] border border-field bg-paper px-3 py-3 text-ink focus:border-transparent focus:outline-2 focus:outline-accent aria-[invalid=true]:border-accent";

const DAYS = ["Today", "Tomorrow", "This week", "Next week", "Any day"];
const TIMES = ["Morning", "Afternoon", "Evening", "Any time"];

type Errors = Partial<Record<"name" | "phone" | "consent", string>>;

// A short form: name, mobile number and a rough time. Choice buttons are used instead
// of dropdowns and date pickers, which many older users find hard. Until the booking
// email service is connected, a valid request is handed to the clinic's WhatsApp. The
// message never includes the reason for the visit, so nothing sensitive shows up in
// chat previews on a shared phone. Nothing is stored on this site.
export default function BookingForm() {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLParagraphElement>(null);
  const [ready, setReady] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [request, setRequest] = useState<{ firstName: string; href: string } | null>(null);

  // The submit button stays disabled until the page is interactive, so a request can
  // never be sent as a plain form submission that puts personal details in the URL.
  useEffect(() => setReady(true), []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const name = get("name");
    const phone = get("phone");
    const next: Errors = {};
    if (!name) next.name = "Enter your name.";
    if (!/^(\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(phone)) next.phone = "Enter a 10-digit mobile number, for example 98200 12345.";
    if (data.get("consent") !== "yes") next.consent = "Please confirm that the clinic may contact you.";
    setErrors(next);

    const firstInvalid = (["name", "phone", "consent"] as const).find((k) => next[k]);
    if (firstInvalid) {
      setRequest(null);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const text = [
      `Hello, I'd like an appointment with ${clinic.doctor}.`,
      `Name: ${name}`,
      `Mobile: ${phone}`,
      `Preferred day: ${get("day") || "Any day"}`,
      `Preferred time: ${get("time") || "Any time"}`,
    ].join("\n");
    setRequest({ firstName: name.split(" ")[0], href: whatsappLink(clinic.whatsappHref, text) });
    requestAnimationFrame(() => status.current?.focus());
  };

  const describedBy = (k: keyof Errors) => (errors[k] ? `${id}-${k}-error` : undefined);
  const errorText = (k: keyof Errors) =>
    errors[k] ? (
      <span className="text-sm font-normal text-accent" id={`${id}-${k}-error`}>
        {errors[k]}
      </span>
    ) : null;

  const choices = (name: string, legend: string, options: string[], initial: string) => (
    <fieldset className="m-0 grid gap-2 border-0 p-0">
      <legend className="mb-2 text-sm font-semibold">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label className="relative" key={o}>
            <input className="peer absolute inset-0 opacity-0" defaultChecked={o === initial} name={name} type="radio" value={o} />
            <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-field px-4 text-[0.95rem] peer-checked:border-plum peer-checked:bg-plum peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="min-w-0 rounded-lg border border-line p-5 sm:p-8">
      <h2 className="mb-1 text-[1.6rem]">Request an appointment</h2>
      <p className="mb-6 text-muted-ink">
        Four quick questions. You don't need to tell us why you're coming; you can discuss that with Dr. Shilpa
        in private.
      </p>
      <noscript>
        <p className="mb-4 rounded-[10px] bg-plum-soft px-3.5 py-3">
          Online booking needs JavaScript. Please call {clinic.phoneDisplay} or message the clinic on WhatsApp.
        </p>
      </noscript>
      <form className="grid gap-6" method="post" noValidate onSubmit={submit} ref={formRef}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid content-start gap-1.5 text-sm font-semibold">
            Your name
            <input aria-describedby={describedBy("name")} aria-invalid={!!errors.name} aria-required autoComplete="name" className={field} id="f-name" name="name" />
            {errorText("name")}
          </label>
          <label className="grid content-start gap-1.5 text-sm font-semibold">
            Mobile number
            <input aria-describedby={describedBy("phone")} aria-invalid={!!errors.phone} aria-required autoComplete="tel" className={field} id="f-phone" inputMode="tel" name="phone" type="tel" />
            {errorText("phone")}
          </label>
        </div>
        {choices("day", "Which day suits you?", DAYS, "Any day")}
        {choices("time", "What time of day?", TIMES, "Any time")}
        <div className="grid gap-1.5">
          <label className="flex items-start gap-3">
            <input aria-describedby={describedBy("consent")} aria-invalid={!!errors.consent} className="mt-1 size-5 shrink-0 accent-accent" id="f-consent" name="consent" type="checkbox" value="yes" />
            <span>
              The clinic may use my name and number to contact me about this appointment. (
              <a className="link" href={siteHref("/privacy/")}>How we use your details</a>)
            </span>
          </label>
          {errorText("consent")}
        </div>
        <button className={cn("btn btn-primary min-h-12", !ready && "cursor-not-allowed opacity-60")} disabled={!ready} type="submit">
          Continue to WhatsApp
        </button>
        <div aria-live="polite">
          {request && (
            <div className="grid gap-3 rounded-[10px] bg-plum-soft px-4 py-4">
              <p className="outline-none" ref={status} tabIndex={-1}>
                Thanks, {request.firstName}. Tap the button below: WhatsApp will open with your request written for
                you, and you just need to tap Send.
              </p>
              <p className="text-sm text-muted-ink">
                This is a request, not a confirmed appointment yet. The clinic team will reply on WhatsApp during
                clinic hours to agree a time. If WhatsApp doesn't open, please call {clinic.phoneDisplay}.
              </p>
              <div className="flex flex-wrap gap-2">
                <a className="btn btn-primary min-h-11 py-2.5 text-sm" href={request.href} rel="noopener" target="_blank">
                  Open WhatsApp
                </a>
                <a className="btn min-h-11 py-2.5 text-sm" href={clinic.phoneHref}>Call {clinic.phoneDisplay}</a>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
