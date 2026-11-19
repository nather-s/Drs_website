import { clinic } from "@/lib/clinic";

// Simple outline marks for the clinic's Instagram and YouTube (the icon set the site
// uses has no brand logos). Each link opens the profile in a new tab.
export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
      <rect height="18" rx="5" width="18" x="3" y="3" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" fill="currentColor" r="1" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
      <rect height="15" rx="4.5" width="21" x="1.5" y="4.5" />
      <path d="M10 9v6l5.2-3z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function SocialLinks({ className, size = "size-4" }: { className?: string; size?: string }) {
  const items = [
    { label: "Dr. Shilpa on Instagram", href: clinic.social.instagram, Icon: InstagramIcon },
    { label: "Dr. Shilpa on YouTube", href: clinic.social.youtube, Icon: YoutubeIcon },
  ];
  return (
    <span className={`flex items-center gap-1 ${className ?? ""}`}>
      {items.map(({ label, href, Icon }) => (
        <a
          aria-label={label}
          className="grid size-9 place-items-center rounded-full no-underline opacity-85 transition-opacity hover:opacity-100"
          href={href}
          key={href}
          rel="noopener"
          target="_blank"
          title={label}
        >
          <Icon className={size} />
        </a>
      ))}
    </span>
  );
}
