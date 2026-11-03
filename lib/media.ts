// Dr. Shilpa's YouTube videos. Each video lists the treatment pages it belongs on, by the
// page's address name (the part after /treatments/, e.g. "pcos", "menopause"), and shows
// on those pages under "Watch Dr. Shilpa explain". The home page shows the first six.
//
// To add a video: copy the 11-character ID from its link (youtube.com/watch?v=ID or
// youtu.be/ID), give it a plain title, and list its topics. Example:
//   { id: "abcdEFGhijk", title: "What is PCOS?", topics: ["pcos", "irregular-periods"] },
export type Video = { id: string; title: string; topics: string[] };

export const videos: Video[] = [
  { id: "_WfODYyC3hE", title: "What is PCOS? Myths and facts", topics: ["pcos", "pcos-acne", "pcos-hair-fall", "irregular-periods", "hirsutism"] },
  { id: "DTUV8mUBWTA", title: "Cervical cancer: causes, signs, diagnosis and treatment", topics: ["cervical-cancer-prevention", "colposcopy"] },
  { id: "0NMxwucIDQI", title: "HRT for menopause: benefits and side effects", topics: ["menopause"] },
  { id: "szQCxpHddfc", title: "Myths about contraception", topics: ["contraception", "adolescent-health"] },
  { id: "zagR9kcD7UU", title: "Can you get pregnant on 'safe days'?", topics: ["contraception"] },
  { id: "SGaynS4V95g", title: "A patient's journey to motherhood", topics: ["fertility"] },
  { id: "Bqt9bxX59FA", title: "Blessed with twins: a patient's story", topics: ["fertility"] },
];

export const videosFor = (slug: string) => videos.filter((v) => v.topics.includes(slug));
