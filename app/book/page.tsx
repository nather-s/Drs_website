import type { Metadata } from "next";
import Assistant from "@/components/site/assistant";
import BookingForm from "@/components/site/booking-form";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { clinic } from "@/lib/clinic";

export const metadata: Metadata = {
  title: "Book an appointment | Dr. Shilpa, Andheri West",
  description: "Request an appointment with Dr. Shilpa Bansal Agrawal, or contact Harleys Women's Clinic in Andheri West, Mumbai.",
  alternates: { canonical: "/book/" },
};

export default function Book() {
  return (
    <Shell current="/book/#contact">
      <PageIntro
        crumbs={[{ label: "Book an appointment" }]}
        lede="Send a request and the clinic will confirm a time with you. Same-day appointments are often available for urgent concerns. In a medical emergency, call 108 or go to the nearest hospital."
        title="Book an appointment"
      />
      <div className="wrap grid gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16">
        <div className="grid min-w-0 content-start gap-8">
          <BookingForm />
          <div className="grid gap-3">
            <p className="text-sm text-muted-ink">Prefer to book in a conversation? Ask the clinic assistant.</p>
            <Assistant />
          </div>
        </div>
        <aside aria-labelledby="contact-title" className="grid content-start gap-6" id="contact">
          <h2 className="text-[1.6rem]" id="contact-title">Contact the clinic</h2>
          <dl className="m-0 grid gap-5">
            <div className="grid gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Address</dt>
              <dd className="m-0">
                {clinic.name}
                {clinic.addressLines.map((l) => (
                  <span className="block" key={l}>{l}</span>
                ))}
                <a className="link mt-1 inline-block text-sm" href={clinic.mapsHref} rel="noopener" target="_blank">
                  Get directions
                </a>
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Phone</dt>
              <dd className="m-0"><a className="no-underline hover:text-accent" href={clinic.phoneHref}>{clinic.phoneDisplay}</a></dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">WhatsApp</dt>
              <dd className="m-0"><a className="no-underline hover:text-accent" href={clinic.whatsappHref} rel="noopener" target="_blank">Message the clinic</a></dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Email</dt>
              <dd className="m-0 break-words"><a className="no-underline hover:text-accent" href={`mailto:${clinic.email}`}>{clinic.email}</a></dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-plum">Consultation hours</dt>
              <dd className="m-0 text-muted-ink">To be confirmed by the clinic</dd>
            </div>
          </dl>
          <p className="rounded-lg bg-mist p-4 text-sm text-muted-ink">
            Convenient for patients from Lokhandwala, Oshiwara, Versova, Juhu and Vile Parle.
          </p>
        </aside>
      </div>
    </Shell>
  );
}
