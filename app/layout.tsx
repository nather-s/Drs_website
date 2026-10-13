import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible_Next, Literata } from "next/font/google";
import "./globals.css";

// Literata: a book face with a warm italic, used for patients' words and headings.
const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

// Atkinson Hyperlegible Next: built for low-vision readers, easy to read at any age.
const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Dr. Shilpa Bansal Agrawal | Gynaecologist in Andheri West, Mumbai",
  description:
    "Gynaecology, pregnancy, fertility, PCOS and menopause care with Dr. Shilpa Bansal Agrawal at Harleys Women's Clinic, Andheri West, Mumbai.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${literata.variable} ${atkinson.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
