import type { ReactNode } from "react";
import About from "@/app/about/page";
import Book from "@/app/book/page";
import BrowsingSafely from "@/app/browsing-safely/page";
import FirstVisit from "@/app/first-visit/page";
import Privacy from "@/app/privacy/page";
import Team from "@/app/team/page";
import TreatmentPage from "@/app/treatments/[slug]/page";
import TreatmentsIndex from "@/app/treatments/page";
import { treatments } from "@/lib/treatments";
import PreviewRouter from "./preview-router";

// Every page of the site, for the single-page design preview (see PreviewRouter).
export default function PreviewSite({ home }: { home: ReactNode }) {
  const pages: Record<string, ReactNode> = {
    "/": home,
    "/about/": <About />,
    "/team/": <Team />,
    "/treatments/": <TreatmentsIndex />,
    "/first-visit/": <FirstVisit />,
    "/book/": <Book />,
    "/privacy/": <Privacy />,
    "/browsing-safely/": <BrowsingSafely />,
  };
  for (const t of treatments) {
    const params = Promise.resolve({ slug: t.slug }) as PageProps<"/treatments/[slug]">["params"];
    const props = { params, searchParams: Promise.resolve({}) } as PageProps<"/treatments/[slug]">;
    pages[`/treatments/${t.slug}/`] = <TreatmentPage {...props} />;
  }
  return <PreviewRouter pages={pages} />;
}
