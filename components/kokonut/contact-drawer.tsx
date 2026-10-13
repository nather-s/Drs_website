"use client";

/**
 * Bottom contact bar with a "Contact" drawer for phones.
 * Adapted from Kokonut UI "Smooth Drawer" by @dorianbaffier (MIT, https://kokonutui.com).
 * Changes: pricing content replaced with clinic contact options and clinic palette.
 */

import { MessageCircle, Phone, Mail, CalendarDays } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { clinic } from "@/lib/clinic";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;
const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
} satisfies Variants;
const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE_OUT } },
} satisfies Variants;

const options = [
  { icon: Phone, label: "Call the clinic", detail: clinic.phoneDisplay, href: clinic.phoneHref },
  { icon: MessageCircle, label: "WhatsApp", detail: "Usually replies within the day", href: clinic.whatsappHref },
  { icon: Mail, label: "Email", detail: clinic.email, href: `mailto:${clinic.email}` },
  { icon: CalendarDays, label: "Book online", detail: "Pick a time or ask the assistant", href: "#book" },
];

export default function ContactDock() {
  const reduce = useReducedMotion();
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-surface px-3 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] md:hidden"
    >
      <a className="flex-1 rounded-[10px] border border-line py-2.5 text-center text-sm font-semibold" href={clinic.phoneHref}>
        Call
      </a>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="flex-1 rounded-[10px] border border-line py-2.5 text-sm font-semibold" type="button">
            Contact
          </button>
        </DrawerTrigger>
        <DrawerContent className="border-line bg-surface px-5 pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
          <motion.div
            animate="visible"
            className="mx-auto w-full max-w-[420px]"
            initial={reduce ? false : "hidden"}
            variants={listVariants}
          >
            <DrawerHeader className="px-0 text-left">
              <DrawerTitle className="font-display text-2xl font-normal">Get in touch</DrawerTitle>
              <DrawerDescription className="text-muted-ink">
                {clinic.name}, Andheri West
              </DrawerDescription>
            </DrawerHeader>
            <ul className="m-0 grid list-none gap-2 p-0">
              {options.map(({ icon: Icon, label, detail, href }) => (
                <motion.li key={label} variants={itemVariants}>
                  <DrawerClose asChild>
                    <a
                      className="flex items-center gap-3 rounded-xl border border-line bg-paper p-3.5 no-underline"
                      href={href}
                      rel={href.startsWith("http") ? "noopener" : undefined}
                      target={href.startsWith("http") ? "_blank" : undefined}
                    >
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sage-soft text-sage">
                        <Icon className="size-5" />
                      </span>
                      <span className="grid min-w-0">
                        <b className="font-semibold">{label}</b>
                        <span className="truncate text-sm text-muted-ink">{detail}</span>
                      </span>
                    </a>
                  </DrawerClose>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </DrawerContent>
      </Drawer>
      <a className="flex-1 rounded-[10px] border border-accent bg-accent py-2.5 text-center text-sm font-semibold text-accent-ink" href="#book">
        Book
      </a>
    </nav>
  );
}
