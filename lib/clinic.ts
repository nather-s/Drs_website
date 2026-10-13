// Clinic facts used across the site. Edit here, not in components.
export const clinic = {
  doctor: "Dr. Shilpa Bansal Agrawal",
  name: "Harleys Women's Clinic",
  phoneDisplay: "+91 93230 48601",
  phoneHref: "tel:+919323048601",
  whatsappHref: "https://wa.me/919323048601",
  email: "info@drshilpagynaecologist.com",
  address:
    "101–102 Jyoti Tower, DN Nagar, next to Nav Chaitanya, off Link Road, Andheri West, Mumbai 400053",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Jyoti+Tower+DN+Nagar+Andheri+West+Mumbai",
  rating: { value: 4.9, count: 1459, source: "Justdial" },
} as const;

export type Review = {
  id: string;
  name: string;
  source: "Google" | "Practo";
  topic: string;
  text: string;
};

// Real patient reviews from the current site, lightly cleaned for spelling.
export const reviews: Review[] = [
  {
    id: "ruchi",
    name: "Ruchi N.",
    source: "Google",
    topic: "Pregnancy",
    text: "During pregnancy I was worried about various things, but I trusted her completely. She understands the insecurities a pregnant woman has, and she looked after me like family. Consulting her felt like a happy session where I could let go of all my worries.",
  },
  {
    id: "manjusha",
    name: "Manjusha Kollara",
    source: "Practo",
    topic: "Menopause",
    text: "She explained my issue and the solution to me in detail, very thoroughly. She has given me quality of life, and now I can look forward to a stress-free menopause.",
  },
  {
    id: "debanjali",
    name: "Debanjali Biswas",
    source: "Practo",
    topic: "Pregnancy",
    text: "She's really polite and listens to your problems before giving an effective solution. She also avoids unnecessary medication unless it's really required.",
  },
];
