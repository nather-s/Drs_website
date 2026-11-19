import type { Metadata } from "next";
import { Reveal } from "@/components/motion/scroll";
import PageIntro from "@/components/site/page-intro";
import Shell from "@/components/site/shell";
import { InstagramIcon, YoutubeIcon } from "@/components/site/social-icons";
import VideoCards from "@/components/site/video-cards";
import { clinic } from "@/lib/clinic";
import { videos } from "@/lib/media";
import { pageSeo, seoMeta } from "@/lib/seo";
import { categories, treatments } from "@/lib/treatments";

export const metadata: Metadata = seoMeta("/blog/", pageSeo.blog);

// The clinic's reading and watching in one place: Dr. Shilpa's videos, the health
// guides on this site (one per condition), and her Instagram.
export default function Blog() {
  return (
    <Shell current="/blog/">
      <PageIntro
        crumbs={[{ label: "Blog & videos" }]}
        eyebrow="Blog & videos"
        lede="Plain-language guides and short videos from Dr. Shilpa on periods, PCOS, pregnancy, fertility, menopause and more."
        title="Women's health, explained"
      />

      <div className="wrap grid gap-20 py-14 md:py-20">
        {/* Follow */}
        <section aria-label="Follow Dr. Shilpa" className="grid gap-4 sm:grid-cols-2">
          {[
            {
              href: clinic.social.youtube,
              Icon: YoutubeIcon,
              name: "YouTube",
              text: "Dr. Shilpa explains common concerns, myths and treatments in short videos.",
              cta: "Watch on YouTube",
            },
            {
              href: clinic.social.instagram,
              Icon: InstagramIcon,
              name: "Instagram",
              text: "Health tips, clinic news and answers to questions patients often ask.",
              cta: "Follow on Instagram",
            },
          ].map(({ href, Icon, name, text, cta }) => (
            <a
              className="group grid grid-cols-[auto_1fr] items-start gap-5 border border-line bg-paper p-6 no-underline transition-colors hover:border-plum sm:p-8"
              href={href}
              key={name}
              rel="noopener"
              target="_blank"
            >
              <span className="grid size-14 place-items-center rounded-full bg-plum text-paper">
                <Icon className="size-6" />
              </span>
              <span className="grid gap-1.5">
                <span className="title-caps text-[1.6rem]">{name}</span>
                <span className="text-muted-ink">{text}</span>
                <span className="link mt-1 w-fit text-sm">{cta} →</span>
              </span>
            </a>
          ))}
        </section>

        {/* Videos */}
        <section aria-labelledby="videos-title" className="grid gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="grid gap-2">
              <p className="script">watch &amp; learn</p>
              <h2 className="title-caps text-[clamp(1.8rem,3.4vw,2.6rem)]" id="videos-title">Videos</h2>
            </div>
            <a className="btn" href={clinic.social.youtube} rel="noopener" target="_blank">All videos on YouTube</a>
          </div>
          <VideoCards items={videos} />
        </section>

        {/* Guides */}
        <section aria-labelledby="guides-title" className="grid gap-10">
          <div className="grid gap-2">
            <p className="script">read at your own pace</p>
            <h2 className="title-caps text-[clamp(1.8rem,3.4vw,2.6rem)]" id="guides-title">Health guides</h2>
            <p className="max-w-[60ch] text-muted-ink">
              Each guide explains a condition or treatment: what it is, the signs, how it is diagnosed and treated, and
              answers to common questions.
            </p>
          </div>
          {categories.map((c) => (
            <Reveal className="grid gap-4" key={c.id}>
              <h3 className="border-b border-gold/50 pb-3 text-[1.6rem]">{c.title}</h3>
              <ul className="m-0 grid list-none gap-x-10 p-0 md:grid-cols-2">
                {treatments
                  .filter((t) => t.category === c.id)
                  .map((t) => (
                    <li className="border-b border-line" key={t.slug}>
                      <a className="group grid gap-1 py-4 no-underline" href={`/treatments/${t.slug}/`}>
                        <span className="font-display text-xl text-plum group-hover:underline">{t.title}</span>
                        <span className="text-[0.95rem] text-muted-ink">{t.summary}</span>
                      </a>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </section>
      </div>
    </Shell>
  );
}
