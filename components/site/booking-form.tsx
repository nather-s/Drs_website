"use client";

import { useState } from "react";
import { clinic } from "@/lib/clinic";
import { bookOnWhatsapp } from "@/lib/booking";
import { siteHref } from "@/lib/href";

const DAYS = ["Today", "Tomorrow", "This week", "Next week", "Any day"];
const TIMES = ["Morning", "Afternoon", "Evening", "Any time"];

// One tap to book: everything is optional and has a default, and the button is a plain
// link to the clinic's WhatsApp with the request written out. WhatsApp already shares
// the patient's number, so we don't ask for it. The message never includes the reason
// for the visit. Works without JavaScript (the link then uses the defaults).
export default function BookingForm() {
  const [day, setDay] = useState("Any day");
  const [time, setTime] = useState("Any time");
  const [name, setName] = useState("");
  const href = bookOnWhatsapp(day, time, name.trim());

  const choices = (label: string, options: string[], value: string, onChange: (v: string) => void, group: string) => (
    <fieldset className="m-0 grid gap-2 border-0 p-0">
      <legend className="mb-2 text-sm font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label className="relative" key={o}>
            <input
              checked={value === o}
              className="peer absolute inset-0 opacity-0"
              name={group}
              onChange={() => onChange(o)}
              type="radio"
              value={o}
            />
            <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-field px-4 text-[0.95rem] peer-checked:border-plum peer-checked:bg-plum peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
              {o}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );

  return (
    <div className="grid min-w-0 gap-6 rounded-lg border border-line p-5 sm:p-8">
      <div className="grid gap-1">
        <h2 className="text-[1.6rem]">Request an appointment</h2>
        <p className="text-muted-ink">
          Your appointment is with Dr. Shilpa, a woman gynaecologist. Choose when suits you and tap the button. You
          don't need to tell us why you're coming.
        </p>
      </div>
      {/* Without JavaScript the choices can't update the link, so they're hidden. */}
      <noscript>
        <style>{".js-only{display:none!important}"}</style>
      </noscript>
      <div className="js-only grid gap-6">
      {choices("Which day?", DAYS, day, setDay, "day")}
      {choices("What time?", TIMES, time, setTime, "time")}
      <label className="grid max-w-sm gap-1.5 text-sm font-semibold">
        Your name (optional)
        <input
          autoComplete="name"
          className="w-full rounded-[10px] border border-field bg-paper px-3 py-3 text-base font-normal text-ink focus:border-transparent focus:outline-2 focus:outline-accent"
          id="f-name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      </div>
      <div className="grid gap-3">
        <a className="btn btn-primary min-h-12 text-base" href={href} rel="noopener" target="_blank">
          Book on WhatsApp
        </a>
        <p className="text-sm text-muted-ink">
          WhatsApp opens with your request written for you; just tap Send. The clinic team will reply to confirm a
          time. Prefer to talk? Call{" "}
          <a className="font-semibold text-ink no-underline" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>.
        </p>
        <p className="text-xs text-muted-ink">
          By sending the message you agree that the clinic may contact you about your appointment. This website
          doesn't store anything you enter.{" "}
          <a className="underline underline-offset-2" href={siteHref("/privacy/")}>How we use your details</a>
        </p>
      </div>
    </div>
  );
}
