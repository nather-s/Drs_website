"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";
import { whatsappLink } from "@/lib/href";

type Msg = { id: number; from: "bot" | "me"; text: string };
type Action = { label: string; href: string; external?: boolean };
type Choice = { label: string; next: () => Step };
type Step = { say: string; choices: Choice[]; actions?: Action[] };

// Guided booking assistant. It collects the type of visit and preferred time, then
// hands the request to the clinic's WhatsApp. Connecting it to Dr. Shilpa's calendar
// is a later step.
const whatsapp: Action = { label: "Message on WhatsApp", href: clinic.whatsappHref, external: true };
const call: Action = { label: `Call ${clinic.phoneDisplay}`, href: clinic.phoneHref };

function request(visit: string, time: string): Step {
  const text = `Hello, I'd like to book an appointment with ${clinic.doctor}.\nType of visit: ${visit}\nPreferred time: ${time}`;
  return {
    say: `Thanks. Your request for a ${visit.toLowerCase()} visit in the ${time.toLowerCase()} is ready. Send it on WhatsApp and the clinic team will reply to confirm a time.`,
    choices: [],
    actions: [{ label: "Send on WhatsApp", href: whatsappLink(clinic.whatsappHref, text), external: true }, call],
  };
}

const time = (visit: string): Step => ({
  say: "What time of day suits you best?",
  choices: ["Morning", "Afternoon", "Evening"].map((t) => ({ label: t, next: () => request(visit, t) })),
});

const visit = (): Step => ({
  say: "What is the visit for? You can keep it general.",
  choices: ["General consultation", "Pregnancy", "Fertility", "Follow-up"].map((v) => ({
    label: v,
    next: () => time(v),
  })),
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
            className="rounded-md border border-field bg-paper px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            key={c.label}
            onClick={() => choose(c)}
            type="button"
          >
            {c.label}
          </button>
        ))}
        {step?.actions?.map((a) => (
          <a
            className="btn btn-primary px-3.5 py-2 text-sm [&:not(:first-of-type)]:border-ink/80 [&:not(:first-of-type)]:bg-paper [&:not(:first-of-type)]:text-ink"
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
            className="rounded-md px-3.5 py-2 text-sm font-medium text-muted-ink underline underline-offset-4 hover:text-accent"
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
