// Clinic facts used across the site. Edit here, not in components.
export const siteUrl = "https://drshilpagynaecologist.com";

export const clinic = {
  doctor: "Dr. Shilpa Bansal Agrawal",
  doctorRole: "Consultant Obstetrician & Gynaecologist",
  name: "Harleys Women's Clinic",
  legalName: "Harleys Cosmetic & Women's Clinic",
  /** The clinic's front-desk number, for calls and WhatsApp bookings. (+91 93230 48601 is Dr. Shilpa's own number and is not published.) */
  phoneDisplay: "+91 93200 48601",
  phoneHref: "tel:+919320048601",
  whatsappHref: "https://wa.me/919320048601",
  email: "info@drshilpagynaecologist.com",
  addressLines: [
    "101–102 Jyoti Tower, DN Nagar",
    "Next to Nav Chaitanya, off Link Road",
    "Andheri West, Mumbai 400053",
  ],
  /** The clinic's previous address; older listings online may still show it. */
  previousAddress: "Saidas Platinum Heights, Lokhandwala",
  mapsHref:
    "https://www.google.com/maps/search/?api=1&query=Jyoti+Tower+DN+Nagar+Andheri+West+Mumbai",
  // Justdial listing as indexed in October 2026. Screenshot the live page before launch.
  rating: { value: 4.9, count: "1,400+", source: "Justdial", asOf: "October 2026" },
  practoHref: "https://www.practo.com/mumbai/doctor/dr-shilpa-bansal-gynecologist-obstetrician-1",
  emergency: "108",
  // Dr. Shilpa's consultation hours and fee as listed on Practo (October 2026); the clinic
  // itself is open longer. Confirm with the clinic before launch.
  hours: "Mon–Fri 12–2:30 pm and 5:30–7:30 pm · Sat 12–5 pm · Closed Sunday" as string | undefined,
  fee: "₹1,500" as string | undefined,
  languages: "English, Hindi and Marathi",
  credentials:
    "MBBS · MD Obstetrics & Gynaecology (Gold Medal) · DNB · MRCOG (UK) · ICOG Fellowship in Reproductive Endocrinology · DHA Specialist (Dubai)",
  hospitals: ["Belle Vue Hospital", "Surya Hospitals", "Cloudnine Hospital", "BSES MG Hospital", "Criticare Asia"],
  social: {
    youtube: "https://www.youtube.com/channel/UCctp3zI4hHDdt6BY3zK1hog",
    instagram: "https://www.instagram.com/harleys_womens_clinic",
    facebook: "https://www.facebook.com/share/1EsFxv6xAq/",
  },
} as const;

export const nav = [
  { label: "About Dr. Shilpa", href: "/about/" },
  { label: "Our team", href: "/team/" },
  { label: "Treatments", href: "/treatments/" },
  { label: "Your first visit", href: "/first-visit/" },
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
// Names are shortened to first name and initial. Topics come from each review's own text.
// Replaced by the live Google reviews feed once the Business Profile is connected.
export const reviews: Review[] = [
  {
    id: "ruchi",
    name: "Ruchi N.",
    source: "Google",
    topic: "Pregnancy",
    text: "During pregnancy I was worried about various things, but I trusted her completely. She understands the insecurities a pregnant woman has, and she handled me like family. The clinic staff are soft-spoken and helpful too.",
  },
  {
    id: "manjusha",
    name: "Manjusha K.",
    source: "Practo",
    topic: "Menopause",
    text: "She explained my issue and the solution to me in detail, very thoroughly. Now I can look forward to a stress-free menopause.",
  },
  {
    id: "debanjali",
    name: "Debanjali B.",
    source: "Practo",
    topic: "Pregnancy",
    text: "She's really polite and listens to your problems before giving an effective solution. She also tries to avoid unnecessary medication unless it's really required.",
  },
];
