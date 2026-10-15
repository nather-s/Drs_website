// Dr. Shilpa's YouTube videos. Each video lists the treatment pages it belongs on, by the
// page's address name (the part after /treatments/, e.g. "pcos", "menopause"), and shows
// on those pages under "Watch Dr. Shilpa explain". The home page shows the first six.
//
// To add a video: copy the 11-character ID from its link (youtube.com/watch?v=ID or
// youtu.be/ID), give it a plain title, and list its topics. Example:
//   { id: "abcdEFGhijk", title: "What is PCOS?", topics: ["pcos", "irregular-periods"] },
export type Video = { id: string; title: string; topics: string[] };

export const videos: Video[] = [];

export const videosFor = (slug: string) => videos.filter((v) => v.topics.includes(slug));
