"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { clinic } from "@/lib/clinic";

const embed = "https://www.google.com/maps?q=Jyoti+Tower,+DN+Nagar,+Andheri+West,+Mumbai+400053&output=embed";

// Google Maps loads only when the visitor asks for it, so the page doesn't send
// anything to Google until then. "Get directions" always works without it.
export default function ClinicMap() {
  const [show, setShow] = useState(false);
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden border border-line bg-mist sm:aspect-[16/10]">
      {show ? (
        <iframe
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={embed}
          title={`Map showing ${clinic.name}, Jyoti Tower, DN Nagar, Andheri West`}
        />
      ) : (
        <div className="absolute inset-0 grid place-content-center justify-items-center gap-3 p-6 text-center [background:repeating-linear-gradient(0deg,transparent_0_39px,#e2d3b4_39px_40px),repeating-linear-gradient(90deg,transparent_0_39px,#e2d3b4_39px_40px)]">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-white shadow-md">
            <MapPin aria-hidden className="size-7" />
          </span>
          <p className="m-0 bg-paper/90 px-3 py-1 font-display text-xl text-plum">Jyoti Tower, DN Nagar</p>
          <div className="flex flex-wrap justify-center gap-2">
            <a className="btn btn-primary" href={clinic.mapsHref} rel="noopener" target="_blank">
              Get directions
            </a>
            <button className="btn bg-paper" onClick={() => setShow(true)} type="button">
              Show map here
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
