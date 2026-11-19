import type { ReactNode } from "react";
import ContactDock from "@/components/site/contact-dock";
import Footer from "@/components/site/footer";
import Header from "@/components/site/header";
import SmoothScroll from "@/components/motion/smooth-scroll";

export default function Shell({ current, children }: { current?: string; children: ReactNode }) {
  return (
    <>
      <SmoothScroll />
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
      <ContactDock />
    </>
  );
}
