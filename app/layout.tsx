import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Literata } from "next/font/google";
import { clinic, siteUrl } from "@/lib/clinic";
import "./globals.css";

// Literata: a book face, used for headings. Only the upright style is loaded.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
});

// Atkinson Hyperlegible Next: built for low-vision readers, easy to read at any age.
// Next.js has no fallback metrics for it, so the fallback is matched by hand in globals.css.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${clinic.doctor} | Gynaecologist in Andheri West, Mumbai`,
    template: "%s",
  },
  description:
    "Gynaecology, pregnancy, fertility, PCOS and menopause care with Dr. Shilpa Bansal Agrawal at Harleys Women's Clinic, Andheri West, Mumbai.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: clinic.name,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Structured data so search engines can show the clinic's details in local results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalClinic",
      "@id": `${siteUrl}/#clinic`,
      name: clinic.legalName,
      url: siteUrl,
      telephone: "+91-9323048601",
      email: clinic.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "101–102 Jyoti Tower, DN Nagar, next to Nav Chaitanya, off Link Road",
        addressLocality: "Andheri West, Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400053",
        addressCountry: "IN",
      },
      medicalSpecialty: ["Gynecologic", "Obstetric"],
    },
    {
      "@type": "Physician",
      "@id": `${siteUrl}/#doctor`,
      name: clinic.doctor,
      url: `${siteUrl}/about/`,
      medicalSpecialty: ["Gynecologic", "Obstetric"],
      worksFor: { "@id": `${siteUrl}/#clinic` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${literata.variable} ${atkinson.variable}`}>
      <body className="min-h-full">
        <script
          // Static, trusted object; escaping "<" keeps it from closing the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          type="application/ld+json"
        />
        {children}
      </body>
    </html>
  );
}
