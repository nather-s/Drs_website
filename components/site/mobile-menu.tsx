"use client";

import { Menu } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { clinic, nav } from "@/lib/clinic";

// Site navigation for phones, using the same drawer as the contact bar.
export default function MobileMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-md border border-line lg:hidden"
          type="button"
        >
          <Menu className="size-5" />
        </button>
      </DrawerTrigger>
      <DrawerContent className="px-5 pb-[calc(24px+env(safe-area-inset-bottom,0px))]">
        <DrawerHeader className="px-0 text-left">
          <DrawerTitle className="font-display text-xl font-normal">Menu</DrawerTitle>
          <DrawerDescription>{clinic.name}, Andheri West</DrawerDescription>
        </DrawerHeader>
        <nav aria-label="Main" className="grid">
          <a className="border-b border-line py-3.5 text-lg no-underline" href="/">Home</a>
          {nav.map((item) => (
            <a className="border-b border-line py-3.5 text-lg no-underline" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
