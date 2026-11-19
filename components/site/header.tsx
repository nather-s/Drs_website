import MobileMenu from "@/components/site/mobile-menu";
import { clinic, nav } from "@/lib/clinic";
import { cn } from "@/lib/utils";
import Logo from "@/components/site/logo";

export default function Header({ current }: { current?: string }) {
  return (
    <>
      <a
        className="sr-only z-50 rounded-md bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        href="#main"
      >
        Skip to content
      </a>
      <div className="hidden bg-plum text-[0.82rem] tracking-[0.04em] text-white/85 md:block">
        <div className="wrap flex justify-between gap-6 py-2">
          <span>
            {clinic.name} &amp; {clinic.aesthetics.name} · {clinic.addressLines[0]}, Andheri West
          </span>
          <span className="flex gap-5">
            <a className="no-underline hover:text-white" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
            <a className="no-underline hover:text-white" href={`mailto:${clinic.email}`}>{clinic.email}</a>
          </span>
        </div>
      </div>
      <header className="sticky top-[env(safe-area-inset-top,0px)] z-20 border-b border-line bg-paper/95 backdrop-blur-md">
        <div className="wrap flex items-center justify-between gap-3 py-3 sm:gap-6">
          <a className="flex shrink-0 items-center gap-4 no-underline" href="/">
            <Logo />
            <span className="sr-only">Harleys Women's Clinic, home</span>
            <span className="hidden border-l border-line pl-4 leading-tight 2xl:block">
              <b className="block font-display text-[1.2rem] font-medium uppercase tracking-[0.12em] text-plum">Dr. Shilpa</b>
              <span className="text-[0.62rem] uppercase tracking-[0.2em] text-accent">Obstetrician &amp; Gynaecologist</span>
            </span>
          </a>
          <nav aria-label="Main" className="hidden items-center gap-5 whitespace-nowrap text-[0.7rem] font-medium uppercase tracking-[0.12em] xl:flex 2xl:gap-7">
            {nav.map((item) => (
              <a
                aria-current={current === item.href ? "page" : undefined}
                className={cn(
                  "no-underline transition-colors hover:text-accent",
                  current === item.href ? "text-accent" : "text-plum"
                )}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a className="btn btn-primary whitespace-nowrap px-4 py-2.5 text-[0.7rem] max-[419px]:hidden" href="/book/">
              Book appointment
            </a>
            <MobileMenu current={current} />
          </div>
        </div>
      </header>
    </>
  );
}
