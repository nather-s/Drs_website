import type { Metadata, Viewport } from "next";
import { Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
    <html lang="en-IN" className={`${newsreader.variable} ${publicSans.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
