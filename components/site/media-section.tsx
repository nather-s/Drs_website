import { Play } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { videos } from "@/lib/media";

// Videos and Instagram. Videos open on YouTube (the app on phones) rather than playing
// in the page, so nothing from YouTube loads until a visitor chooses to watch.
export default function MediaSection() {
  return (
    <section aria-labelledby="videos-title" className="section bg-mist" id="videos">
      <div className="wrap grid gap-8">
        <div className="grid max-w-[62ch] gap-3">
          <span className="eyebrow">Videos and updates</span>
          <h2 className="h-section" id="videos-title">Watch Dr. Shilpa explain common concerns</h2>
          <p className="text-muted-ink">
            Short videos on periods, PCOS, pregnancy, fertility and menopause, and clinic updates on Instagram.
          </p>
        </div>

        {videos.length > 0 && (
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
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
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            className="grid gap-1 rounded-lg border border-line bg-paper p-5 no-underline hover:border-accent"
            href={clinic.social.youtube}
            rel="noopener"
            target="_blank"
          >
            <b className="font-semibold">YouTube</b>
            <span className="text-sm text-muted-ink">All of Dr. Shilpa's videos, on her channel</span>
            <span className="link mt-1 w-fit text-sm">Watch on YouTube</span>
          </a>
          <a
            className="grid gap-1 rounded-lg border border-line bg-paper p-5 no-underline hover:border-accent"
            href={clinic.social.instagram}
            rel="noopener"
            target="_blank"
          >
            <b className="font-semibold">Instagram</b>
            <span className="text-sm text-muted-ink">@harleys_womens_clinic: health tips and clinic news</span>
            <span className="link mt-1 w-fit text-sm">Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
