"use client";

import dynamic from "next/dynamic";
import { bookOnWhatsapp } from "@/lib/booking";
import { clinic } from "@/lib/clinic";

// The assistant's code (and the animation library it uses) loads only after the page
// has rendered, keeping the first load small on slow mobile connections. The
// placeholder matches its height and offers direct contact if it never loads.
const Assistant = dynamic(() => import("@/components/site/assistant"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-[560px] content-center justify-items-center gap-3 rounded-lg border border-line bg-paper p-6 text-center sm:min-h-[460px]">
      <p className="text-muted-ink">The clinic assistant is loading.</p>
      <p className="text-sm text-muted-ink">
        You can also{" "}
        <a className="link" href={bookOnWhatsapp()} rel="noopener" target="_blank">book on WhatsApp</a> or call{" "}
        <a className="link" href={clinic.phoneHref}>{clinic.phoneDisplay}</a>.
      </p>
    </div>
  ),
});

export default Assistant;
