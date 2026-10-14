import type { Metadata } from "next";
import Shell from "@/components/site/shell";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Shell>
      <div className="wrap grid max-w-[720px] gap-5 py-20 md:py-28">
        <span className="eyebrow">Page not found</span>
        <h1 className="text-[clamp(2rem,4vw,2.8rem)]">We couldn't find that page.</h1>
        <p className="text-lg text-muted-ink">
          The link may be out of date. You can browse treatments, read about Dr. Shilpa, or book an appointment.
        </p>
        <div className="flex flex-wrap gap-3">
          <a className="btn btn-primary" href="/">Go to the home page</a>
          <a className="btn" href="/treatments/">View treatments</a>
        </div>
      </div>
    </Shell>
  );
}
