"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";

type Msg = { id: number; from: "bot" | "me"; text: string };
type Choice = { label: string; next: Step };
type Step = { say: string; choices: Choice[] };

// Scripted preview of the booking assistant. Times are examples until the
// live version reads Dr. Shilpa's calendar.
const done = (when: string): Step => ({
  say: `Done. On the live site your slot on ${when} would be held and a confirmation emailed to you and the clinic.`,
  choices: [],
});
const slots = (kind: string): Step => ({
  say: `Here are the next openings for ${kind}. (Example times for this preview.)`,
  choices: [
    { label: "Tue 10:30 am", next: done("Tuesday at 10:30 am") },
    { label: "Wed 5:00 pm", next: done("Wednesday at 5:00 pm") },
    { label: "Sat 11:15 am", next: done("Saturday at 11:15 am") },
  ],
});
const reason: Step = {
  say: "What is the visit for? You can keep it general.",
  choices: [
    { label: "Pregnancy", next: slots("a pregnancy consultation") },
    { label: "PCOS / periods", next: slots("a PCOS consultation") },
    { label: "Routine check-up", next: slots("a routine check-up") },
  ],
};
const start: Step = {
  say: "Hello, I'm the Harleys clinic assistant. I can book a visit with Dr. Shilpa or answer questions about the clinic.",
  choices: [
    { label: "Book an appointment", next: reason },
    {
      label: "Where is the clinic?",
      next: {
        say: `The clinic is at ${clinic.addressLines.join(", ")}. Opening hours will appear here once the clinic confirms them.`,
        choices: [{ label: "Book an appointment", next: reason }],
      },
    },
    {
      label: "Talk to a person",
      next: {
        say: `Of course. Message the clinic on WhatsApp or call ${clinic.phoneDisplay} and the team will help you.`,
        choices: [],
      },
    },
  ],
};

export default function Assistant() {
  const reduce = useReducedMotion();
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: start.say }]);
  const [step, setStep] = useState<Step>(start);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view; scroll the chat box, not the page.
  useEffect(() => {
    const el = listRef.current;
    if (el && msgs.length > 1) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [msgs, reduce]);

  const choose = (c: Choice) => {
    setMsgs((m) => [...m, { id: m.length, from: "me", text: c.label }]);
    setStep({ say: "", choices: [] });
    setTimeout(() => {
      setMsgs((m) => [...m, { id: m.length, from: "bot", text: c.next.say }]);
      setStep(c.next);
    }, reduce ? 0 : 450);
  };
  const restart = () => {
    setMsgs([{ id: 0, from: "bot", text: start.say }]);
    setStep(start);
  };

  return (
    <div className="flex min-w-0 flex-col rounded-lg border border-line bg-paper p-5 sm:p-8">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-[1.6rem]">Clinic assistant</h2>
        <span className="rounded bg-rose-soft px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-accent">
          Preview
        </span>
      </div>
      <div aria-live="polite" ref={listRef} className="flex max-h-[380px] min-h-[260px] flex-col gap-2.5 overflow-y-auto p-1">
        <AnimatePresence initial={false}>
          {msgs.map((m) => (
            <motion.p
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={
                m.from === "bot"
                  ? "max-w-[85%] self-start rounded-lg rounded-bl-sm bg-plum-soft px-3.5 py-2.5 text-[0.93rem] leading-snug"
                  : "max-w-[85%] self-end rounded-lg rounded-br-sm bg-accent px-3.5 py-2.5 text-[0.93rem] leading-snug text-accent-ink"
              }
              initial={reduce ? false : { opacity: 0, y: 8, scale: 0.98 }}
              key={m.id}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            >
              {m.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
      <div className="mt-3 flex min-h-10 flex-wrap gap-2">
        {step.choices.map((c) => (
          <button
            className="rounded-full border border-line bg-paper px-3.5 py-2 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            key={c.label}
            onClick={() => choose(c)}
            type="button"
          >
            {c.label}
          </button>
        ))}
        {step.choices.length === 0 && msgs.length > 1 && step.say && (
          <button
            className="rounded-full border border-line bg-paper px-3.5 py-2 text-sm font-medium hover:border-accent hover:text-accent"
            onClick={restart}
            type="button"
          >
            Start again
          </button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted-ink">
        The assistant helps with bookings and clinic questions. It does not give medical advice.
      </p>
    </div>
  );
}
