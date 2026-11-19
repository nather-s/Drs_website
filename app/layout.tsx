import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Jost } from "next/font/google";
import { clinic, siteUrl } from "@/lib/clinic";
import { site } from "@/lib/seo";
import { treatments } from "@/lib/treatments";
import "./globals.css";

// Cormorant Garamond for headings, Jost for text, Allura for script accents.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Allura: a script face, used only for short decorative accent lines.
const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: "%s" },
  description: site.description,
  // Share-card defaults; each page adds its own title, description and address.
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: clinic.name,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Dr. Shilpa Bansal Agrawal, gynaecologist in Andheri West, Mumbai" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.jpg"] },
  keywords: [
    "gynaecologist in Andheri West",
    "gynecologist in Andheri",
    "lady gynaecologist Andheri West",
    "obstetrician Andheri West",
    "PCOS treatment Andheri",
    "pregnancy doctor Andheri West",
    "fertility treatment Mumbai",
    "IUI Andheri",
    "cosmetic gynaecology Mumbai",
    "DN Nagar gynaecologist",
  ],
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
      "@type": ["MedicalClinic", "MedicalBusiness"],
      "@id": `${siteUrl}/#clinic`,
      name: clinic.name,
      alternateName: [clinic.legalName, clinic.aesthetics.name],
      url: siteUrl,
      image: `${siteUrl}/og.jpg`,
      logo: `${siteUrl}/og.jpg`,
      telephone: clinic.phoneHref.replace("tel:", ""),
      email: clinic.email,
      priceRange: "₹₹",
      currenciesAccepted: "INR",
      address: {
        "@type": "PostalAddress",
        streetAddress: "101–102 Jyoti Tower, DN Nagar, next to Nav Chaitanya, off Link Road",
        addressLocality: "Andheri West, Mumbai",
        addressRegion: "Maharashtra",
        postalCode: "400053",
        addressCountry: "IN",
      },
      hasMap: clinic.mapsHref,
      areaServed: ["Andheri West", "Lokhandwala", "Versova", "Juhu", "Jogeshwari", "Vile Parle", "Malad", "Mumbai"].map((name) => ({
        "@type": "Place",
        name,
      })),
      openingHoursSpecification: [
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "12:00", closes: "14:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "17:30", closes: "19:30" },
        { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "12:00", closes: "17:00" },
      ],
      medicalSpecialty: ["Gynecologic", "Obstetric", "PlasticSurgery"],
      availableService: treatments.map((t) => ({
        "@type": "MedicalProcedure",
        name: t.title,
        url: `${siteUrl}/treatments/${t.slug}/`,
      })),
      sameAs: [clinic.social.instagram, clinic.social.youtube, clinic.social.facebook, clinic.practoHref],
      employee: [{ "@id": `${siteUrl}/#doctor` }],
    },
    {
      "@type": "Physician",
      "@id": `${siteUrl}/#doctor`,
      name: clinic.doctor,
      url: `${siteUrl}/about/`,
      image: `${siteUrl}/images/dr-shilpa-portrait.jpg`,
      jobTitle: clinic.doctorRole,
      description: `${clinic.doctorRole} in Andheri West, Mumbai. ${clinic.credentials}.`,
      medicalSpecialty: ["Gynecologic", "Obstetric"],
      knowsLanguage: ["en", "hi", "mr"],
      alumniOf: [
        { "@type": "CollegeOrUniversity", name: "Kasturba Medical College, Manipal" },
        { "@type": "CollegeOrUniversity", name: "King George's Medical University, Lucknow" },
      ],
      memberOf: { "@type": "Organization", name: "Royal College of Obstetricians and Gynaecologists" },
      telephone: clinic.phoneHref.replace("tel:", ""),
      address: { "@type": "PostalAddress", addressLocality: "Andheri West, Mumbai", postalCode: "400053", addressCountry: "IN" },
      worksFor: { "@id": `${siteUrl}/#clinic` },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: clinic.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${siteUrl}/#clinic` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${jost.variable} ${allura.variable}`}>
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
