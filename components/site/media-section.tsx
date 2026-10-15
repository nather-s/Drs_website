import { clinic } from "@/lib/clinic";
import { videos } from "@/lib/media";
import VideoCards from "./video-cards";

// Videos and Instagram on the home page.
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

        {videos.length > 0 && <VideoCards items={videos.slice(0, 6)} />}

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
