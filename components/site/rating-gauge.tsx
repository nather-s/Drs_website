"use client";

import { Gauge } from "@/components/bklit/gauge";
import { clinic } from "@/lib/clinic";

// bklit UI notch gauge showing the clinic's public rating out of 5.
export default function RatingGauge() {
  const { value, count, source } = clinic.rating;
  return (
    <figure className="m-0 grid justify-items-center gap-1 rounded-2xl border border-line bg-surface px-5 pb-4 pt-3 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.35)]">
      <div className="w-[190px]">
        <Gauge
          centerValue={value}
          defaultLabel="out of 5"
          formatOptions={{ minimumFractionDigits: 1, maximumFractionDigits: 1 }}
          minWidth={0}
          totalNotches={30}
          useGradient
          value={(value / 5) * 100}
        />
      </div>
      <figcaption className="text-center text-xs text-muted-ink">
        {count.toLocaleString("en-IN")} reviews · {source}
      </figcaption>
    </figure>
  );
}
