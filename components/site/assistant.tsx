"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";
import { bookOnWhatsapp } from "@/lib/booking";

type Msg = { id: number; from: "bot" | "me"; text: string };
type Action = { label: string; href: string; external?: boolean };
type Choice = { label: string; next: () => Step };
type Step = { say: string; choices: Choice[]; actions?: Action[] };

// Guided booking assistant. It collects a preferred day and time, then
// hands the request to the clinic's WhatsApp. Connecting it to Dr. Shilpa's calendar
// is a later step.
const whatsapp: Action = { label: "Message on WhatsApp", href: clinic.whatsappHref, external: true };
const call: Action = { label: `Call ${clinic.phoneDisplay}`, href: clinic.phoneHref };

function request(day: string, time: string): Step {
  return {
    say: `Thanks. Tap "Open WhatsApp" and your request (${day.toLowerCase()}, ${time.toLowerCase()}) will be written for you; just tap Send. It's a request, not a confirmed appointment yet: the clinic team will reply during clinic hours to agree a time.`,
    choices: [],
    actions: [{ label: "Open WhatsApp", href: bookOnWhatsapp(day, time), external: true }, call],
  };
}

const time = (day: string): Step => ({
  say: "What time of day suits you?",
  choices: ["Morning", "Afternoon", "Evening", "Any time"].map((t) => ({ label: t, next: () => request(day, t) })),
});

// The reason for the visit is never asked here: it stays private until the consultation.
const visit = (): Step => ({
  say: "Which day would you like to come? You don't need to tell us why; you can discuss that with Dr. Shilpa in private.",
  choices: ["Today", "Tomorrow", "This week", "Next week"].map((d) => ({ label: d, next: () => time(d) })),
});

const start = (): Step => ({
  say: "Hello, I'm the Harleys clinic assistant. I can help you request an appointment with Dr. Shilpa or answer questions about the clinic.",
  choices: [
    { label: "Book an appointment", next: visit },
    {
      label: "Where is the clinic?",
      next: () => ({
        say: `The clinic is at ${clinic.addressLines.join(", ")}. It is convenient for Lokhandwala, Oshiwara, Versova, Juhu and Vile Parle.`,
        choices: [{ label: "Book an appointment", next: visit }],
        actions: [{ label: "Get directions", href: clinic.mapsHref, external: true }],
      }),
    },
    {
      label: "Talk to a person",
      next: () => ({
        say: "Of course. Message or call the clinic and the team will help you.",
        choices: [],
        actions: [whatsapp, call],
      }),
    },
  ],
});

export default function Assistant() {
  const reduce = useReducedMotion();
  const first = useRef(start());
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: first.current.say }]);
  const [step, setStep] = useState<Step | null>(first.current);
  const listRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);

  // Keep the newest message in view; scroll the chat box, not the page.
  useEffect(() => {
    const el = listRef.current;
    if (el && msgs.length > 1) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, reduce]);

  // After the user picks an option, move focus to the next set of options so keyboard
  // and screen-reader users don't lose their place.
  useEffect(() => {
    if (step && moveFocus.current) {
      controlsRef.current?.querySelector<HTMLElement>("button, a")?.focus();
      moveFocus.current = false;
    }
  }, [step]);

  const choose = (c: Choice) => {
    const next = c.next();
    setMsgs((m) => [...m, { id: m.length, from: "me", text: c.label }]);
    setStep(null);
    moveFocus.current = true;
    setTimeout(() => {
      setMsgs((m) => [...m, { id: m.length, from: "bot", text: next.say }]);
      setStep(next);
    }, reduce ? 0 : 400);
  };

  const restart = () => {
    const s = start();
    moveFocus.current = true;
    setMsgs([{ id: 0, from: "bot", text: s.say }]);
    setStep(s);
  };

  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-line bg-paper p-5 sm:p-8">
      <h2 className="mb-4 text-[1.6rem]">Clinic assistant</h2>
      <div aria-live="polite" className="flex max-h-[380px] min-h-[240px] flex-col gap-2.5 overflow-y-auto p-1" ref={listRef}>
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className={
                m.from === "bot"
                  ? "max-w-[85%] self-start rounded-lg rounded-bl-sm bg-plum-soft px-3.5 py-2.5 text-[0.95rem] leading-snug"
                  : "max-w-[85%] self-end rounded-lg rounded-br-sm bg-accent px-3.5 py-2.5 text-[0.95rem] leading-snug text-accent-ink"
              }
              initial={reduce ? false : { opacity: 0, y: 8 }}
              key={m.id}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              {m.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex min-h-10 flex-wrap gap-2" ref={controlsRef}>
        {step?.choices.map((c) => (
          <button
            className="min-h-11 rounded-md border border-field bg-paper px-4 py-2 text-[0.95rem] font-medium transition-colors hover:border-accent hover:text-accent"
            key={c.label}
            onClick={() => choose(c)}
            type="button"
          >
            {c.label}
          </button>
        ))}
        {step?.actions?.map((a) => (
          <a
            className="btn btn-primary min-h-11 px-4 py-2 text-[0.95rem] [&:not(:first-of-type)]:border-ink/80 [&:not(:first-of-type)]:bg-paper [&:not(:first-of-type)]:text-ink"
            href={a.href}
            key={a.label}
            rel={a.external ? "noopener" : undefined}
            target={a.external ? "_blank" : undefined}
          >
            {a.label}
          </a>
        ))}
        {step && msgs.length > 1 && (
          <button
            className="min-h-11 rounded-md px-3.5 py-2 text-[0.95rem] font-medium text-muted-ink underline underline-offset-4 hover:text-accent"
            onClick={restart}
            type="button"
          >
            Start again
          </button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-ink">
        The assistant helps with appointments and questions about the clinic. It does not give medical advice. In a
        medical emergency, call {clinic.emergency}.
      </p>
    </div>
  );
}
