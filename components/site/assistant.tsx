"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { clinic } from "@/lib/clinic";
import { bookOnWhatsapp } from "@/lib/booking";
import { siteHref } from "@/lib/href";

type Msg = { id: number; from: "bot" | "me"; text: string; ai?: boolean };
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
    say: `Thanks. Tap "Open WhatsApp" and your request (${day.toLowerCase()}, ${time.toLowerCase()}) will be written for you; just tap Send. It's a request, not a confirmed appointment yet: the clinic team will reply on WhatsApp to agree a time.`,
    choices: [],
    actions: [{ label: "Open WhatsApp", href: bookOnWhatsapp(day, time), external: true }, call],
  };
}

const time = (day: string): Step => ({
  say: "What time of day suits you?",
  choices: ["Afternoon", "Evening", "Any time"].map((t) => ({ label: t, next: () => request(day, t) })),
});

// The reason for the visit is never asked here: it stays private until the consultation.
const visit = (): Step => ({
  say: "Which day would you like to come? You don't need to tell us why; you can discuss that with Dr. Shilpa in private.",
  choices: ["Today", "Tomorrow", "This week", "Next week", "Any day"].map((d) => ({ label: d, next: () => time(d) })),
});

const start = (): Step => ({
  say: "Hello, I'm the Harleys clinic assistant. I can help you request an appointment with Dr. Shilpa, find the clinic, or explain what happens at a first visit.",
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
      label: "What happens at my first visit?",
      next: () => ({
        say: "Dr. Shilpa will talk with you in a private room first. An examination is only done if it's needed, and only with your permission. You can bring someone with you and ask to stop at any time. Bring any previous reports and a list of your medicines.",
        choices: [{ label: "Book an appointment", next: visit }],
        actions: [{ label: "Read the full guide", href: siteHref("/first-visit/") }],
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
    // Hold focus on the conversation while the reply arrives, so it never drops to the page.
    listRef.current?.focus({ preventScroll: true });
    setStep(null);
    moveFocus.current = true;
    setTimeout(() => {
      setMsgs((m) => [...m, { id: m.length, from: "bot", text: next.say }]);
      setStep(next);
    }, reduce ? 0 : 400);
  };

  // Typed questions go to the AI assistant (see app/api/assistant). If it isn't available,
  // the visitor is pointed to the buttons, WhatsApp and phone instead.
  const [question, setQuestion] = useState("");
  const [thinking, setThinking] = useState(false);
  const ask = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = question.trim();
    if (!text || thinking) return;
    setQuestion("");
    const history = [...msgs.filter((m) => m.from === "me" || m.ai), { id: -1, from: "me" as const, text }];
    setMsgs((m) => [...m, { id: m.length, from: "me", text }]);
    setThinking(true);
    let reply = "I can't answer typed questions right now. Please use the options below, or message or call the clinic and the team will help you.";
    let ai = false;
    try {
      const res = await fetch("/api/assistant/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.from === "me" ? "user" : "assistant", content: m.text })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.reply) {
        reply = data.reply;
        ai = true;
      } else if (res.status === 429) {
        reply = "Lots of people are asking questions right now. Please try again in a few minutes, or message or call the clinic.";
      }
    } catch {}
    setThinking(false);
    setMsgs((m) => [...m, { id: m.length, from: "bot", text: reply, ai }]);
    setStep((s) => (s && s.choices.length ? s : { ...start(), say: "" }));
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
      <div aria-label="Conversation" aria-live="polite" tabIndex={-1} className="flex max-h-[380px] outline-none min-h-[240px] flex-col gap-2.5 overflow-y-auto p-1" ref={listRef}>
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
              {m.from === "bot" ? <Linked text={m.text} /> : m.text}
            </motion.p>
          ))}
        </AnimatePresence>
        {thinking && (
          <p className="max-w-[85%] self-start rounded-lg rounded-bl-sm bg-plum-soft px-3.5 py-2.5 text-[0.95rem] text-muted-ink">
            Thinking…
          </p>
        )}
      </div>
      <form className="mt-3 flex gap-2" onSubmit={ask}>
        <label className="sr-only" htmlFor="assistant-question">Type a question</label>
        <input
          autoComplete="off"
          className="min-h-11 min-w-0 flex-1 rounded-md border border-field bg-paper px-3 text-[0.95rem]"
          id="assistant-question"
          maxLength={500}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type a question, in English, हिंदी or मराठी"
          value={question}
        />
        <button className="btn btn-primary min-h-11 px-4" disabled={thinking || !question.trim()} type="submit">
          Ask
        </button>
      </form>
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
        medical emergency, call {clinic.emergency}. Typed questions are answered by an AI service, so please don't
        include your name, phone number or other personal details. Messages you send on WhatsApp go to the clinic; see{" "}
        <a className="underline underline-offset-2" href={siteHref("/privacy/")}>how we use your details</a>.
      </p>
    </div>
  );
}

// The site's own page addresses, as the assistant writes them (e.g. /treatments/pcos/).
const sitePage = /^\/(|about\/|team\/|first-visit\/|book\/|reviews\/|privacy\/|browsing-safely\/|treatments\/([a-z0-9-]+\/)?)$/;

// Shows a reply with any of the site's own page addresses as tappable links.
function Linked({ text }: { text: string }) {
  const parts = text.split(/(\/[a-z0-9\-/]*\/)/g);
  return (
    <>
      {parts.map((part, i) =>
        sitePage.test(part) ? (
          <a className="font-semibold underline underline-offset-2" href={siteHref(part)} key={i}>
            {part === "/" ? "home page" : part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
