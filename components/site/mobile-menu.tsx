"use client";

import { Menu, X } from "lucide-react";
import { useRef } from "react";
import { clinic, nav } from "@/lib/clinic";
import { siteHref } from "@/lib/href";

const links = [{ label: "Home", href: "/" }, ...nav];

// Site navigation for phones, as a bottom sheet built on the browser's own <dialog>:
// it traps focus, closes with Escape and returns focus to the button, with no extra
// JavaScript library (a drawer library here cost ~36 KB on every page).
export default function MobileMenu({ current }: { current?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        aria-haspopup="dialog"
        aria-label="Open menu"
        className="grid size-11 shrink-0 place-items-center rounded-md border border-line lg:hidden"
        onClick={() => dialog.current?.showModal()}
        type="button"
      >
        <Menu aria-hidden className="size-5" />
      </button>
      <dialog
        aria-labelledby="mobile-menu-title"
        className="mobile-menu m-0 mt-auto w-full max-w-none rounded-t-xl border-t border-line bg-paper p-0 text-ink backdrop:bg-black/50 lg:hidden"
        onClick={(e) => {
          // A tap on the dimmed backdrop (outside the sheet) closes the menu.
          if (e.target === dialog.current) close();
        }}
        ref={dialog}
      >
        <div className="grid gap-2 px-5 pt-4 pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl" id="mobile-menu-title">Menu</h2>
              <p className="text-sm text-muted-ink">{clinic.name}, Andheri West</p>
            </div>
            <button
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-md border border-line"
              onClick={close}
              type="button"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <nav aria-label="Main" className="grid">
            {links.map((item) => (
              <a
                aria-current={current === item.href ? "page" : undefined}
                className={`border-b border-line py-3.5 text-lg no-underline ${current === item.href ? "font-semibold text-accent" : ""}`}
                href={siteHref(item.href)}
                key={item.href}
                onClick={close}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </dialog>
    </>
  );
}
