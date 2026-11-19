import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about/", "/team/", "/first-visit/", "/treatments/", "/book/", "/reviews/", "/privacy/", "/browsing-safely/"];
  // Date of the last content update; change it when pages are edited.
  const lastModified = new Date("2026-11-19");
  return [
    ...pages.map((p) => ({
      url: `${siteUrl}${p}`,
      lastModified,
      priority: p === "/" ? 1 : ["/privacy/", "/browsing-safely/"].includes(p) ? 0.3 : 0.7,
    })),
    ...treatments.map((t) => ({ url: `${siteUrl}/treatments/${t.slug}/`, lastModified, priority: 0.8 })),
  ];
}
