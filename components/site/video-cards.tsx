import { Play } from "lucide-react";
import type { Video } from "@/lib/media";

// Video links that open on YouTube (the app on phones) rather than playing in the page,
// so nothing from YouTube loads until a visitor chooses to watch.
export default function VideoCards({ items }: { items: Video[] }) {
  return (
    <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((v) => (
        <li key={v.id}>
          <a
            className="group grid h-full gap-3 rounded-lg border border-line bg-paper p-3 no-underline hover:border-accent"
            href={`https://www.youtube.com/watch?v=${v.id}`}
            rel="noopener"
            target="_blank"
          >
            <span className="relative grid aspect-video max-w-full place-items-center overflow-hidden rounded-md bg-plum-soft">
              <img
                alt=""
                className="absolute inset-0 size-full object-cover"
                height={180}
                loading="lazy"
                src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                width={320}
              />
              <span className="relative grid size-12 place-items-center rounded-full bg-paper/90 text-accent shadow">
                <Play aria-hidden className="size-5 translate-x-px" />
              </span>
            </span>
            <span className="px-1 pb-1 font-semibold group-hover:text-accent">{v.title}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
