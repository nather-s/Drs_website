// Clinic facts used across the site. Edit here, not in components.
export const clinic = {
  doctor: "Dr. Shilpa Bansal Agrawal",
  doctorRole: "Consultant Obstetrician & Gynaecologist",
  name: "Harleys Women's Clinic",
  legalName: "Harleys Cosmetic & Women's Clinic",
  phoneDisplay: "+91 93230 48601",
  phoneHref: "tel:+919323048601",
  whatsappHref: "https://wa.me/919323048601",
  email: "info@drshilpagynaecologist.com",
  addressLines: [
    "101–102 Jyoti Tower, DN Nagar",
    "Next to Nav Chaitanya, off Link Road",
    "Andheri West, Mumbai 400053",
  ],
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Jyoti+Tower+DN+Nagar+Andheri+West+Mumbai",
  rating: { value: 4.9, count: 1459, source: "Justdial" },
  credentials:
    "MBBS · MD Obstetrics & Gynaecology (Gold Medal) · DNB · ICOG Fellowship in Reproductive Endocrinology · DHA Specialist (Dubai)",
  hospitals: ["Surya Hospitals", "Cloudnine Hospital", "BSES MG Hospital", "Criticare Asia"],
  social: {
    youtube: "https://www.youtube.com/@Dr.ShilpaAgrawal",
    instagram: "https://www.instagram.com/harleys_womens_clinic",
    facebook: "https://www.facebook.com/share/1EsFxv6xAq/",
  },
} as const;

export const nav = [
  { label: "About Dr. Shilpa", href: "/about/" },
  { label: "Our team", href: "/team/" },
  { label: "Treatments", href: "/treatments/" },
  { label: "Patient reviews", href: "/#reviews" },
  { label: "Contact", href: "/book/#contact" },
] as const;

export type Review = {
  id: string;
  name: string;
  source: "Google" | "Practo";
  topic: string;
  text: string;
};

// Real patient reviews from the current site, lightly edited for spelling and grammar.
// Replaced by the live Google reviews feed once the Business Profile is connected.
export const reviews: Review[] = [
  {
    id: "ruchi",
    name: "Ruchi N.",
    source: "Google",
    topic: "Pregnancy",
    text: "During pregnancy I was worried about various things, but I trusted her completely. She understands the insecurities a pregnant woman has, and she handled me like family.",
  },
  {
    id: "manjusha",
    name: "Manjusha Kollara",
    source: "Practo",
    topic: "Menopause",
    text: "She explained my issue and the solution to me in detail, very thoroughly. Now I can look forward to a stress-free menopause.",
  },
  {
    id: "debanjali",
    name: "Debanjali Biswas",
    source: "Practo",
    topic: "Pregnancy",
    text: "She's really polite and listens to your problems before giving an effective solution. She also avoids unnecessary medication unless it's really required.",
  },
  {
    id: "ruchi-2",
    name: "Ruchi N.",
    source: "Google",
    topic: "Ovary issues",
    text: "Totally understands the concern and deals with it accordingly. The clinic staff are soft-spoken and helpful too.",
  },
];
