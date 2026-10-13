"use client";

import { type FormEvent, useState } from "react";

const field =
  "w-full rounded-[10px] border border-line bg-paper px-3 py-2.5 text-ink focus:border-transparent focus:outline-2 focus:outline-accent";

export default function BookingForm() {
  const [msg, setMsg] = useState<string | null>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    if (!name || !phone) {
      setMsg("Please add your name and a phone number so the clinic can reach you.");
      return;
    }
    // Wired to the email API in a later checkpoint.
    setMsg(
      `Thanks, ${name.split(" ")[0]}. This is a design preview, so nothing was sent. On the live site this request emails the clinic and sends you a confirmation.`
    );
  };

  return (
    <div className="min-w-0 rounded-lg border border-line p-5 sm:p-8">
      <h2 className="mb-5 text-[1.6rem]">Your details</h2>
      <form className="grid gap-3.5" noValidate onSubmit={submit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold">
            Your name
            <input autoComplete="name" className={field} id="f-name" name="name" required />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Phone or WhatsApp
            <input autoComplete="tel" className={field} id="f-phone" inputMode="tel" name="phone" required type="tel" />
          </label>
        </div>
        <label className="grid gap-1.5 text-sm font-semibold">
          Email (for your confirmation)
          <input autoComplete="email" className={field} id="f-email" name="email" type="email" />
        </label>
        <label className="grid gap-1.5 text-sm font-semibold">
          Reason for visit
          <select className={field} id="f-reason" name="reason">
            <option>General check-up</option>
            <option>Pregnancy care</option>
            <option>PCOS / periods</option>
            <option>Fertility</option>
            <option>Menopause</option>
            <option>Cervical screening</option>
            <option>Cosmetic gynaecology</option>
            <option>Something else</option>
          </select>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm font-semibold">
            Preferred day
            <input className={field} id="f-day" name="day" type="date" />
          </label>
          <label className="grid gap-1.5 text-sm font-semibold">
            Preferred time
            <select className={field} id="f-time" name="time">
              <option>Morning</option>
              <option>Afternoon</option>
              <option>Evening</option>
            </select>
          </label>
        </div>
        <button className="btn btn-primary mt-1" type="submit">
          Request appointment
        </button>
        {msg && (
          <p aria-live="polite" className="rounded-[10px] bg-plum-soft px-3.5 py-3 text-sm">
            {msg}
          </p>
        )}
        <p className="text-xs text-muted-ink">
          Don't include medical details here. Dr. Shilpa will discuss them with you in person.
        </p>
      </form>
    </div>
  );
}
