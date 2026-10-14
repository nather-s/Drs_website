import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/clinic";
import { treatments } from "@/lib/treatments";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about/", "/team/", "/treatments/", "/book/", "/privacy/"];
  return [
    ...pages.map((p) => ({ url: `${siteUrl}${p}` })),
    ...treatments.map((t) => ({ url: `${siteUrl}/treatments/${t.slug}/` })),
  ];
}
