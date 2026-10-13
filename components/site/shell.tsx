import type { ReactNode } from "react";
import ContactDock from "@/components/kokonut/contact-drawer";
import Footer from "@/components/site/footer";
import Header from "@/components/site/header";

export default function Shell({ current, children }: { current?: string; children: ReactNode }) {
  return (
    <>
      <Header current={current} />
      <main id="main">{children}</main>
      <Footer />
      <ContactDock />
    </>
  );
}
