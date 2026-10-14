"use client";

import { useEffect, useState } from "react";
import { Gauge } from "@/components/bklit/gauge";
import { clinic } from "@/lib/clinic";

// bklit UI notch gauge showing the clinic's public rating out of 5.
// The gauge's animated number doesn't hydrate cleanly when rendered on the server, so
// it is drawn after the page loads into a box of fixed size (no layout shift). The
// rating itself is plain text in the caption, so it is always in the page HTML.
export default function RatingGauge() {
  const { value, count, source } = clinic.rating;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <figure className="m-0 grid justify-items-center gap-1 rounded-lg border border-line bg-paper px-5 pt-3 pb-4 shadow-[0_10px_30px_-14px_rgba(46,36,51,0.35)]">
      <div aria-hidden className="h-[145px] w-[190px]">
        {mounted && (
          <Gauge
            centerValue={value}
            defaultLabel="out of 5"
            formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
            height={145}
            totalNotches={30}
            useGradient
            value={(value / 5) * 100}
            width={190}
          />
        )}
      </div>
      <figcaption className="text-center text-xs text-muted-ink">
        <b className="block font-semibold text-ink">{`Rated ${value} out of 5`}</b>
        {`${count.toLocaleString("en-IN")} reviews on ${source}`}
      </figcaption>
    </figure>
  );
}
