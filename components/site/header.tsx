import Image from "next/image";
import MobileMenu from "@/components/site/mobile-menu";
import { clinic, nav } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import logo from "@/public/harleys-logo.png";

export default function Header({ current }: { current?: string }) {
  return (
    <>
      <a
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        href="#main"
      >
        Skip to content
      </a>
      <div className="hidden bg-plum text-[0.85rem] text-white/85 md:block">
        <div className="wrap flex justify-between gap-6 py-2">
          <span>{clinic.addressLines.join(", ")}</span>
          <span className="flex gap-5">
            <a className="no-underline hover:text-white" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
            <a className="no-underline hover:text-white" href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </span>
        </div>
      </div>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="wrap flex items-center justify-between gap-3 py-3 sm:gap-6">
          <a className="flex shrink-0 items-center gap-4 no-underline" href="/">
            <Image alt="Harleys Clinic, Mumbai and Dubai" className="h-9 w-auto min-[360px]:h-10 md:h-12" preload src={logo} />
            <span className="hidden border-l border-line pl-4 leading-tight 2xl:block">
              <b className="block font-display text-[1.05rem] font-medium">{clinic.doctor}</b>
              <span className="text-[0.8rem] text-muted-ink">{clinic.doctorRole}</span>
            </span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-6 whitespace-nowrap text-[0.95rem] lg:flex">
            {nav.map((item) => (
              <a
                aria-current={current === item.href ? "page" : undefined}
                className={cn(
                  "no-underline transition-colors hover:text-accent",
                  current === item.href ? "font-semibold text-accent" : "text-ink"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a className="btn btn-primary whitespace-nowrap px-4 py-2.5 text-sm max-[379px]:hidden" href="/book/">
              Book appointment
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>
    </>
  );
}
