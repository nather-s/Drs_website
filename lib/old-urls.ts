// Addresses from the clinic's previous website (drshilpagynaecologist.com) and the
// page that replaces each one. Used for permanent redirects on the live site and by
// the not-found page, so old links from Google, bookmarks and WhatsApp still work.
export const oldUrls: Record<string, string> = {
  "/gynaecologist-in-mumbai/": "/about/",
  "/about-doctor/": "/about/",
  "/about-clinic/": "/about/",
  "/services/": "/treatments/",
  "/pcos/": "/treatments/pcos/",
  "/pcos-treatment-in-mumbai/": "/treatments/pcos/",
  "/how-to-reduce-amh-levels-in-pcos/": "/treatments/pcos/",
  "/acne/": "/treatments/pcos-acne/",
  "/hairfall/": "/treatments/pcos-hair-fall/",
  "/fertility-issue/": "/treatments/fertility/",
  "/irregular-periods/": "/treatments/irregular-periods/",
  "/hirsutism/": "/treatments/hirsutism/",
  "/weight-issue/": "/treatments/pcos/",
  "/mental-health/": "/treatments/pcos/",
  "/menopause/": "/treatments/menopause/",
  "/role-of-hrt-for-menopause/": "/treatments/menopause/",
  "/adolescent-health/": "/treatments/adolescent-health/",
  "/sexual-health/": "/treatments/adolescent-health/",
  "/contraceptive-needs/": "/treatments/contraception/",
  "/fertility-clinic-in-mumbai/": "/treatments/fertility/",
  "/fertility-clinic-in-andheri-mumbai/": "/treatments/fertility/",
  "/fertility-treatment-in-mumbai/": "/treatments/fertility/",
  "/blog/couples-guide-to-male-infertility/": "/treatments/male-infertility/",
  "/cosmetic-gynecology/": "/treatments/cosmetic-gynaecology/",
  "/vaginal-tightening-in-mumbai/": "/treatments/vaginal-tightening/",
  "/hymenoplasty-in-mumbai/": "/treatments/hymenoplasty/",
  "/colposcopy/": "/treatments/colposcopy/",
  "/colposcopy-in-mumbai/": "/treatments/colposcopy/",
  "/high-risk-pregnancy-in-females/": "/treatments/high-risk-pregnancy/",
  "/high-risk-pregnancy-doctor-in-mumbai/": "/treatments/high-risk-pregnancy/",
  "/bartholin-cyst-treatment-in-mumbai/": "/treatments/bartholin-cyst/",
  "/early-safe-abortion-service/": "/treatments/pregnancy-options/",
  "/gynaecologist-in-andheri-legal-abortion/": "/treatments/pregnancy-options/",
  "/cervical-cancer-prevention/": "/treatments/cervical-cancer-prevention/",
  "/pap-smear-test-in-mumbai/": "/treatments/cervical-cancer-prevention/",
  "/pregnancy-care/": "/treatments/pregnancy-care/",
  "/health-care-for-pregnant-women-in-goregaon/": "/treatments/pregnancy-care/",
  "/best-maternity-doctor-in-andheri/": "/treatments/pregnancy-care/",
  "/painless-delivery-in-mumbai/": "/treatments/epidural-pain-relief/",
  "/women-care-hospitals-in-andheri/": "/",
  "/request-an-appointment/": "/book/",
  "/contact-us/": "/book/",
  "/written-testimonials/": "/#reviews",
  "/video-testimonials/": "/#reviews",
  "/clinic-gallery/": "/",
  "/videos/": "/",
};

// Normalise an address the way the site stores it: lower case, trailing slash.
export function findMovedPage(pathname: string): string | undefined {
  const path = pathname.toLowerCase().replace(/\/?$/, "/");
  return oldUrls[path];
}
