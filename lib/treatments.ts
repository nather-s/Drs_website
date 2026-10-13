// Treatment pages. Content is drafted from the clinic's existing website, cleaned up
// and corrected, and must be reviewed by Dr. Shilpa before launch.
// A point written as "Label: text" renders the label in bold.

export type Section = { heading: string; body?: string[]; points?: string[]; after?: string };
export type Faq = { q: string; a: string };
export type CategoryId = "gynaecology" | "pregnancy" | "fertility" | "life-stages" | "cosmetic";

export type Treatment = {
  slug: string;
  title: string;
  category: CategoryId;
  summary: string;
  intro: string[];
  sections: Section[];
  faqs: Faq[];
  related: string[];
  reviewId?: string;
};

export const categories: { id: CategoryId; title: string; intro: string }[] = [
  {
    id: "gynaecology",
    title: "Gynaecology",
    intro: "Diagnosis and treatment of hormonal, menstrual and gynaecological conditions.",
  },
  {
    id: "pregnancy",
    title: "Pregnancy & delivery",
    intro: "Care from early pregnancy through delivery, including high-risk pregnancies.",
  },
  {
    id: "fertility",
    title: "Fertility",
    intro: "Assessment and treatment for couples trying to conceive.",
  },
  {
    id: "life-stages",
    title: "Adolescence to menopause",
    intro: "Support through the teenage years, family planning and menopause.",
  },
  {
    id: "cosmetic",
    title: "Cosmetic gynaecology",
    intro: "Elective, discreet treatments for comfort and confidence.",
  },
];

export const treatments: Treatment[] = [
  // ─── Gynaecology ──────────────────────────────────────────────
  {
    slug: "pcos",
    title: "PCOS & PCOD",
    category: "gynaecology",
    summary:
      "Diagnosis and long-term management of polycystic ovary syndrome, including irregular periods, acne, excess hair, weight and fertility.",
    intro: [
      "Polycystic ovary syndrome (PCOS) is one of the most common hormonal conditions in women of reproductive age. Raised androgens (male-type hormones) and insulin resistance disturb ovulation, which affects the menstrual cycle, skin, hair, weight and fertility.",
      "PCOS cannot be cured, but it can be managed well. Treatment depends on your symptoms, your general health and whether you are planning a pregnancy.",
    ],
    sections: [
      {
        heading: "Common signs",
        points: [
          "Irregular, infrequent or absent periods",
          "Acne or oily skin",
          "Excess facial or body hair (hirsutism)",
          "Thinning scalp hair",
          "Weight gain around the waist, or difficulty losing weight",
          "Dark, thickened skin on the neck or in skin folds (acanthosis nigricans)",
          "Difficulty getting pregnant",
          "Low mood, anxiety or poor sleep",
        ],
      },
      {
        heading: "How PCOS is diagnosed",
        body: [
          "There is no single test for PCOS. It is usually diagnosed when at least two of the following are present and other causes have been ruled out:",
        ],
        points: [
          "Irregular or absent ovulation",
          "Signs of raised androgens, on examination or in blood tests",
          "Polycystic-appearing ovaries on ultrasound",
        ],
        after:
          "Your assessment will usually include a pelvic examination, a pelvic ultrasound, and blood tests for hormones, thyroid function, blood sugar and cholesterol.",
      },
      {
        heading: "Treatment options",
        points: [
          "Lifestyle changes: a balanced diet, regular exercise and good sleep. Losing 5–10% of body weight can be enough to bring periods back to a regular pattern.",
          "Regulating periods: the combined oral contraceptive pill or a cyclical progestogen, which also protect the lining of the womb.",
          "Acne and excess hair: hormonal treatment, anti-androgen medicines, and skin or laser treatment.",
          "Insulin resistance: insulin-sensitising medicine such as metformin.",
          "If you want to conceive: ovulation induction with tablets such as letrozole or clomiphene, hormone injections, and IVF if needed.",
          "Laparoscopic ovarian drilling: keyhole surgery occasionally used when ovulation medicines have not worked.",
        ],
      },
      {
        heading: "Long-term health",
        body: [
          "PCOS increases the risk of type 2 diabetes, high blood pressure, raised cholesterol and sleep apnoea. When periods are very infrequent, the lining of the womb can thicken, which needs treatment. In pregnancy, PCOS raises the chance of gestational diabetes and pre-eclampsia.",
          "Regular check-ups help catch these problems early, so annual screening is recommended.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can PCOS be cured?",
        a: "No, but its symptoms can be controlled well. With the right treatment, many women have regular cycles and healthy pregnancies.",
      },
      {
        q: "Can I get pregnant if I have PCOS?",
        a: "Yes. Many women with PCOS conceive naturally or with help to ovulate. Dr. Shilpa will plan treatment around your goals.",
      },
      {
        q: "At what age does PCOS start?",
        a: "Signs often appear around the first periods, but PCOS can show up later. It is most often diagnosed in the twenties and thirties, and is more likely if a close relative has it.",
      },
      {
        q: "Does pregnancy cure PCOS?",
        a: "No. Some women notice more regular cycles after pregnancy, but the underlying condition remains.",
      },
    ],
    related: ["pcos-acne", "pcos-hair-fall", "irregular-periods", "hirsutism", "fertility"],
  },
  {
    slug: "pcos-acne",
    title: "Hormonal acne",
    category: "gynaecology",
    summary: "Treating acne caused by hormone imbalance, often linked to PCOS, alongside the underlying cause.",
    intro: [
      "Raised androgens make the skin's oil glands produce more sebum. Together with dead skin cells and bacteria, this blocks pores and causes acne, often along the jawline and chin, and on the chest and upper back.",
      "Because the cause is hormonal, treating the hormone imbalance is usually part of clearing the skin. Improvement takes time, often three to six months.",
    ],
    sections: [
      {
        heading: "Signs that acne may be hormonal",
        points: [
          "Persistent breakouts on the jaw, chin and neck",
          "Deep, painful or cystic spots",
          "Flare-ups around your period",
          "Acne that continues well past the teenage years",
          "Other signs of PCOS, such as irregular periods or excess hair",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "Combined oral contraceptive pill: lowers androgen levels. It is not suitable for everyone, for example smokers over 35 or women with a history of blood clots.",
          "Anti-androgen medicines: reduce the effect of androgens on the skin, prescribed after blood tests.",
          "Retinoids: creams or tablets that clear pores. They make skin sensitive to the sun, so daily sunscreen is essential, and tablets must not be taken in pregnancy.",
          "Topical treatments: benzoyl peroxide or salicylic acid help mild acne but are rarely enough on their own.",
          "Antibiotics: short courses for inflamed acne, only as prescribed.",
        ],
      },
      {
        heading: "Caring for your skin",
        points: [
          "Avoid picking or squeezing spots",
          "Wash your face twice a day with a gentle cleanser, and remove make-up before bed",
          "Use non-comedogenic (non-pore-clogging) moisturiser, sunscreen and make-up",
          "Eat plenty of vegetables and limit sugary and refined foods",
          "Manage stress and sleep well",
        ],
      },
    ],
    faqs: [
      {
        q: "Will my acne clear if my PCOS is treated?",
        a: "It usually improves significantly, but it takes a few months. Skin treatments can be used alongside hormonal treatment in the meantime.",
      },
      {
        q: "Should I see a dermatologist or a gynaecologist?",
        a: "A gynaecologist treats the hormonal cause. For severe acne, Dr. Shilpa may work with a dermatologist so both sides are treated together.",
      },
    ],
    related: ["pcos", "pcos-hair-fall", "hirsutism"],
  },
  {
    slug: "pcos-hair-fall",
    title: "Hair fall in PCOS",
    category: "gynaecology",
    summary: "Slowing hair thinning caused by hormone imbalance and supporting regrowth.",
    intro: [
      "Raised androgens in PCOS can shorten the growth phase of scalp hair, so hair becomes finer and sheds more. It usually shows as thinning on the crown or a widening parting rather than bald patches.",
      "Treating the hormone imbalance early gives the best chance of slowing hair loss.",
    ],
    sections: [
      {
        heading: "Signs to look out for",
        points: [
          "More hair than usual on your pillow or in the shower drain",
          "A widening parting or thinning at the crown",
          "Hair that feels finer and breaks easily",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "Hormonal treatment: the combined pill or anti-androgen medicines to slow further loss.",
          "Minoxidil: applied to the scalp to stimulate regrowth. Results take several months.",
          "Checking other causes: iron, vitamin D and thyroid levels can also affect hair and are easy to test.",
          "Lifestyle: weight loss and exercise improve insulin resistance and lower androgen levels.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will my hair grow back?",
        a: "Treatment can slow hair loss, and many women see some regrowth over six to twelve months. Starting early helps.",
      },
      {
        q: "Should I take hair supplements?",
        a: "Supplements help only if you are deficient. Blood tests first show whether you need them.",
      },
    ],
    related: ["pcos", "pcos-acne", "hirsutism"],
  },
  {
    slug: "irregular-periods",
    title: "Irregular periods",
    category: "gynaecology",
    summary: "Finding the cause of irregular, missed or heavy periods and treating it.",
    intro: [
      "A typical cycle lasts 21 to 35 days. Periods that come further apart or closer together, or that vary a lot from month to month, are one of the most common reasons to see a gynaecologist.",
      "PCOS is a frequent cause, but thyroid problems, raised prolactin, stress, weight change and approaching menopause can all affect your cycle.",
    ],
    sections: [
      {
        heading: "When to book an appointment",
        points: [
          "Cycles shorter than 21 days or longer than 35 days",
          "Fewer than nine periods a year",
          "Bleeding that lasts more than seven days, or soaks a pad every hour",
          "Bleeding between periods or after sex",
          "No period for three months or more, when you are not pregnant",
        ],
      },
      {
        heading: "Finding the cause",
        points: [
          "Your history and a record of your cycle",
          "A pregnancy test where relevant",
          "Blood tests for thyroid, prolactin and other hormones",
          "A pelvic ultrasound",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "Lifestyle: a balanced, low-GI diet and regular exercise, especially with PCOS.",
          "Hormonal treatment: the pill or a progestogen to regulate bleeding.",
          "Treating the cause: for example thyroid or prolactin problems.",
          "If you are trying to conceive: treatment to help you ovulate.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can stress make my periods irregular?",
        a: "Yes. Stress can delay ovulation and change your cycle, but other causes such as PCOS or thyroid problems should be ruled out first.",
      },
      {
        q: "Should I track my periods?",
        a: "Yes. A period app or diary with dates, flow and symptoms is very helpful to bring to your appointment.",
      },
    ],
    related: ["pcos", "fertility", "adolescent-health"],
  },
  {
    slug: "hirsutism",
    title: "Excess facial and body hair",
    category: "gynaecology",
    summary: "Assessment and treatment of hirsutism, the growth of coarse hair in a male-type pattern.",
    intro: [
      "Hirsutism is the growth of dark, coarse hair on the upper lip, chin, chest, abdomen or back. It affects most women with PCOS.",
      "It is caused by raised androgens or by hair follicles being more sensitive to them. Less often it is linked to adrenal conditions, Cushing's syndrome or certain medicines, which is why a proper assessment matters.",
    ],
    sections: [
      {
        heading: "Assessment",
        points: [
          "Examination to assess the pattern and amount of hair growth",
          "Blood tests for androgens and other hormones",
          "A pelvic ultrasound if PCOS is suspected",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "Hormonal treatment: the combined pill and anti-androgen medicines. Results build gradually over six months or more.",
          "Temporary hair removal: shaving, waxing, threading or creams.",
          "Longer-lasting removal: laser hair removal, or electrolysis for small areas.",
          "Eflornithine cream: slows the growth of facial hair.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does shaving make hair grow back thicker?",
        a: "No. Shaving cuts hair at the surface and does not change how thick it grows back.",
      },
    ],
    related: ["pcos", "pcos-acne", "pcos-hair-fall"],
  },
  {
    slug: "fibroids-and-cysts",
    title: "Fibroids, cysts & polyps",
    category: "gynaecology",
    summary: "Assessment and treatment of fibroids, ovarian cysts and polyps, including keyhole surgery.",
    intro: [
      "Fibroids are non-cancerous growths of the womb muscle. Ovarian cysts are fluid-filled sacs on an ovary, and polyps are small growths in the lining of the womb.",
      "Many cause no symptoms and only need monitoring. Others cause pain, heavy bleeding or difficulty conceiving, and can be treated with medicine or minimally invasive surgery.",
    ],
    sections: [
      {
        heading: "Symptoms",
        points: [
          "Heavy or prolonged periods",
          "Pelvic pain or a feeling of pressure",
          "Bloating",
          "Needing to pass urine often",
          "Pain during sex",
          "Difficulty conceiving or repeated miscarriage",
        ],
      },
      {
        heading: "Diagnosis",
        points: [
          "Pelvic examination",
          "Pelvic ultrasound",
          "Blood tests where needed",
          "Sometimes an MRI scan or hysteroscopy",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "Monitoring: many small ovarian cysts go away on their own within a few cycles.",
          "Medicines: to control bleeding and pain.",
          "Hysteroscopy: a thin camera passed through the cervix to remove polyps and some fibroids, with no cuts on the abdomen.",
          "Laparoscopic (keyhole) surgery: removing a cyst while keeping the ovary (cystectomy), or removing fibroids while keeping the womb (myomectomy).",
          "Hysterectomy: removal of the womb, considered only when other treatments are not suitable.",
        ],
        after:
          "Keyhole and hysteroscopic procedures usually mean a shorter hospital stay and a quicker return to normal activity than open surgery.",
      },
    ],
    faqs: [
      {
        q: "Do fibroids affect pregnancy?",
        a: "It depends on their size and position. Some fibroids have no effect, while others can make it harder to conceive. Dr. Shilpa will explain what your scan shows.",
      },
      {
        q: "Will I need surgery?",
        a: "Not always. Surgery is recommended only when a growth causes symptoms, is growing, or affects fertility.",
      },
    ],
    related: ["irregular-periods", "fertility", "bartholin-cyst"],
  },
  {
    slug: "bartholin-cyst",
    title: "Bartholin cyst",
    category: "gynaecology",
    summary: "Treatment for swelling of the Bartholin glands, from simple care to minor surgery.",
    intro: [
      "The Bartholin glands sit on either side of the vaginal opening. If a gland's duct becomes blocked, fluid builds up and forms a cyst. Most are painless and harmless, but an infected cyst can become a painful abscess.",
      "They are most common in women in their twenties.",
    ],
    sections: [
      {
        heading: "Symptoms",
        points: [
          "A small, painless lump near the vaginal opening",
          "Discomfort when walking, sitting or during sex, if the cyst is larger",
          "If infected: a red, hot, painful swelling, sometimes with fever and discharge",
        ],
      },
      {
        heading: "Diagnosis",
        body: [
          "A cyst is usually diagnosed on examination. A swab may be taken to check for infection. For women over 40, a small tissue sample (biopsy) may be recommended to rule out rarer causes.",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "No treatment: small, painless cysts in women under 40 often need none.",
          "Warm sitz baths and antibiotics: for mild infection.",
          "Drainage with a small catheter: allows the cyst to drain and heal.",
          "Marsupialisation: a minor procedure to stop cysts from coming back.",
          "Gland removal: rarely needed, for cysts that keep returning.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is a Bartholin cyst cancer?",
        a: "Almost never. Bartholin gland cancer is very rare and mostly affects older women, which is why a biopsy may be suggested after 40.",
      },
    ],
    related: ["cervical-cancer-prevention", "fibroids-and-cysts"],
  },
  {
    slug: "cervical-cancer-prevention",
    title: "Cervical cancer prevention",
    category: "gynaecology",
    summary: "Pap smear and HPV screening, HPV vaccination, and follow-up of abnormal results.",
    intro: [
      "Cervical cancer is largely preventable. Almost all cases are caused by long-term infection with high-risk types of human papillomavirus (HPV).",
      "Vaccination prevents infection, and regular screening finds changes in the cervix years before they could turn into cancer.",
    ],
    sections: [
      {
        heading: "Screening tests",
        points: [
          "Pap smear: cells are gently collected from the cervix and checked under a microscope.",
          "HPV test: checks for high-risk types of HPV, often on the same sample.",
        ],
        after: "Dr. Shilpa will advise how often you need screening based on your age and previous results.",
      },
      {
        heading: "HPV vaccination",
        body: [
          "The HPV vaccine works best before sexual activity begins, ideally between 9 and 14 years of age. Young women who missed it can usually still be vaccinated, and Dr. Shilpa can advise whether it is worthwhile for you.",
        ],
      },
      {
        heading: "Preparing for a Pap smear",
        points: [
          "Book for a day when you are not having your period",
          "Avoid sex, vaginal creams and douching for 48 hours beforehand",
          "The test takes a few minutes and is usually only mildly uncomfortable",
        ],
      },
      {
        heading: "If your result is abnormal",
        body: [
          "Most abnormal results are not cancer. You may be offered a colposcopy, a closer look at the cervix. Any precancerous areas can be treated with simple outpatient procedures such as cryotherapy or LEEP.",
        ],
      },
    ],
    faqs: [
      {
        q: "If I've had the HPV vaccine, do I still need screening?",
        a: "Yes. The vaccine protects against the most common high-risk types, but not all of them.",
      },
      {
        q: "Is a Pap smear painful?",
        a: "Most women find it mildly uncomfortable rather than painful, and it is over in a few minutes.",
      },
    ],
    related: ["colposcopy", "adolescent-health"],
  },
  {
    slug: "colposcopy",
    title: "Colposcopy",
    category: "gynaecology",
    summary: "A detailed examination of the cervix after an abnormal Pap smear or HPV test.",
    intro: [
      "A colposcopy is a close examination of the cervix, vagina and vulva using a magnifying instrument with a light. It is usually recommended after an abnormal Pap smear or HPV test.",
      "If an area looks abnormal, a small sample (biopsy) can be taken during the same visit.",
    ],
    sections: [
      {
        heading: "Why it is done",
        points: [
          "An abnormal Pap smear or a positive high-risk HPV test",
          "Unexplained bleeding, for example after sex",
          "Checking warts, polyps or inflammation of the cervix",
        ],
      },
      {
        heading: "Preparing",
        points: [
          "Book for a day when you are not having your period",
          "Avoid sex, tampons and vaginal medicines for one to two days beforehand",
          "Tell us if you might be pregnant, take blood thinners or have allergies",
          "You can take a simple painkiller an hour before",
        ],
      },
      {
        heading: "What happens",
        body: [
          "The examination takes 10 to 20 minutes. A speculum is inserted, as for a Pap smear, and a mild solution is applied to the cervix to highlight abnormal areas, which may sting briefly. If a biopsy is needed, it is taken under local anaesthetic.",
        ],
      },
      {
        heading: "Afterwards",
        points: [
          "Use pads, not tampons, and avoid sex for about a week if a biopsy was taken",
          "Light spotting or dark discharge for a few days is normal",
          "Contact the clinic if you have fever, severe pain or bleeding heavier than a period",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a colposcopy mean I have cancer?",
        a: "No. Most colposcopies find either no changes or early changes that are easily treated.",
      },
    ],
    related: ["cervical-cancer-prevention"],
  },

  // ─── Pregnancy ────────────────────────────────────────────────
  {
    slug: "pregnancy-care",
    title: "Pregnancy care",
    category: "pregnancy",
    summary: "Antenatal and postnatal care, from your first scan to the weeks after delivery.",
    intro: [
      "Good antenatal care keeps you and your baby healthy and helps you feel prepared. Dr. Shilpa sees you regularly through your pregnancy, explains each test and scan, and plans your delivery with you.",
    ],
    sections: [
      {
        heading: "What antenatal care includes",
        points: [
          "Confirming the pregnancy and the due date",
          "Routine blood tests and screening for conditions such as diabetes and anaemia",
          "Scheduled ultrasound scans to check the baby's growth and development",
          "Blood pressure and weight checks at every visit",
          "Advice on diet, supplements, safe exercise and pelvic floor (Kegel) exercises",
          "Planning your delivery and pain relief options",
        ],
      },
      {
        heading: "After your baby is born",
        points: [
          "A check of your recovery after delivery",
          "Support with breastfeeding and nutrition",
          "Advice on contraception and spacing pregnancies",
          "Attention to your emotional wellbeing, including postnatal depression",
        ],
      },
    ],
    faqs: [
      {
        q: "When should I book my first pregnancy appointment?",
        a: "As soon as you have a positive pregnancy test. Early visits allow folic acid to be started and the due date to be confirmed.",
      },
      {
        q: "Where will I deliver?",
        a: "Dr. Shilpa will discuss the hospital and type of delivery that suit you during your pregnancy.",
      },
    ],
    related: ["high-risk-pregnancy", "painless-delivery"],
    reviewId: "ruchi",
  },
  {
    slug: "high-risk-pregnancy",
    title: "High-risk pregnancy",
    category: "pregnancy",
    summary: "Closer monitoring for pregnancies with medical conditions, twins or past complications.",
    intro: [
      "A pregnancy is called high-risk when the mother or baby needs closer monitoring. It does not mean problems are expected. It means extra care is planned from the start.",
    ],
    sections: [
      {
        heading: "Conditions we care for",
        points: [
          "Gestational diabetes or pre-existing diabetes",
          "High blood pressure or pre-eclampsia",
          "PCOS and thyroid disorders",
          "Twins or multiple pregnancy",
          "Previous miscarriage, preterm birth or stillbirth",
          "Previous caesarean section",
          "Pregnancy after fertility treatment, or over the age of 35",
        ],
      },
      {
        heading: "How care is managed",
        points: [
          "More frequent visits and scans, planned around your situation",
          "Close control of conditions such as diabetes or blood pressure",
          "Coordination with specialists where needed",
          "A clear plan for the timing and type of delivery",
          "Follow-up after birth",
        ],
      },
    ],
    faqs: [
      {
        q: "Does a high-risk pregnancy mean I will need a caesarean?",
        a: "No. Many women with high-risk pregnancies have a normal delivery. The plan depends on your health and the baby's.",
      },
      {
        q: "I have had a miscarriage before. Is my next pregnancy high-risk?",
        a: "One miscarriage does not usually make a pregnancy high-risk. After repeated miscarriages, tests and closer care are recommended.",
      },
    ],
    related: ["pregnancy-care", "pcos", "fertility"],
  },
  {
    slug: "painless-delivery",
    title: "Painless delivery (epidural)",
    category: "pregnancy",
    summary: "Epidural pain relief during labour, explained before the day.",
    intro: [
      "An epidural is the most effective form of pain relief during labour. Local anaesthetic is given through a fine tube placed in the lower back, numbing the lower body while you stay awake and alert.",
    ],
    sections: [
      {
        heading: "What to expect",
        points: [
          "The epidural is placed by an anaesthetist, usually once labour is established",
          "Pain eases within 15 to 20 minutes",
          "You can still feel pressure and push when the time comes",
          "Your baby's heart rate and your blood pressure are monitored throughout",
        ],
      },
      {
        heading: "Possible side effects",
        points: [
          "A drop in blood pressure, which is monitored and treated",
          "Itching or shivering",
          "A longer pushing stage of labour",
          "Rarely, a headache afterwards",
        ],
        after: "An epidural is not suitable for everyone, for example with some blood-clotting problems. Dr. Shilpa will discuss this with you well before your due date.",
      },
    ],
    faqs: [
      {
        q: "Does an epidural harm the baby?",
        a: "Epidurals are widely used and considered safe for babies. Very little of the medicine reaches the baby.",
      },
    ],
    related: ["pregnancy-care", "high-risk-pregnancy"],
  },
  {
    slug: "abortion",
    title: "Safe, legal abortion",
    category: "pregnancy",
    summary: "Confidential medical and surgical abortion care under the MTP Act.",
    intro: [
      "The clinic provides safe, legal and confidential abortion care under the Medical Termination of Pregnancy (MTP) Act. Your decision is respected without judgement, and an adult woman does not need anyone else's consent.",
    ],
    sections: [
      {
        heading: "Options",
        points: [
          "Medical abortion: tablets taken over two days, usually suitable up to about nine weeks of pregnancy.",
          "Surgical abortion: a short procedure (vacuum aspiration) under anaesthesia.",
          "Later abortion: allowed up to 20 weeks, and up to 24 weeks in specific circumstances set out in the MTP Act.",
        ],
      },
      {
        heading: "Before and after",
        points: [
          "An ultrasound confirms how far along the pregnancy is and that it is in the womb",
          "Bleeding and cramping after a medical abortion are expected and usually settle within two weeks",
          "A follow-up visit confirms the abortion is complete",
          "Contraception can be started straight away",
        ],
        after: "Seek care urgently if you have very heavy bleeding, severe pain or fever.",
      },
    ],
    faqs: [
      {
        q: "Is it confidential?",
        a: "Yes. Your details are kept strictly confidential, as required by the MTP Act.",
      },
      {
        q: "Will it affect my fertility?",
        a: "A safe abortion done by a qualified doctor does not usually affect future fertility.",
      },
    ],
    related: ["contraception", "pregnancy-care"],
  },

  // ─── Fertility ────────────────────────────────────────────────
  {
    slug: "fertility",
    title: "Fertility treatment",
    category: "fertility",
    summary: "Step-by-step fertility assessment and treatment for couples, from ovulation tracking to IVF.",
    intro: [
      "Difficulty conceiving is common, and in most couples a cause can be found. Dr. Shilpa, who holds a fellowship in reproductive endocrinology and infertility, starts with a full assessment of both partners and explains each option before treatment begins.",
    ],
    sections: [
      {
        heading: "When to seek help",
        points: [
          "No pregnancy after 12 months of trying, or after 6 months if you are over 35",
          "Irregular or absent periods, or known PCOS",
          "Two or more miscarriages",
          "Known problems such as endometriosis or blocked tubes",
        ],
      },
      {
        heading: "Assessment",
        points: [
          "Hormone blood tests, including ovarian reserve (AMH)",
          "Pelvic ultrasound and tracking of ovulation",
          "A check that the fallopian tubes are open",
          "Semen analysis for the male partner",
        ],
      },
      {
        heading: "Treatment options",
        points: [
          "Ovulation induction: tablets or injections to help you ovulate, with scans to time intercourse.",
          "IUI (intrauterine insemination): prepared sperm placed in the womb at ovulation.",
          "IVF and ICSI: eggs fertilised in the laboratory and an embryo transferred to the womb.",
          "Surgery: keyhole surgery or hysteroscopy for endometriosis, fibroids, polyps or blocked tubes.",
          "Egg freezing: for women who wish to delay pregnancy.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does fertility treatment always mean IVF?",
        a: "No. Many couples conceive with simpler treatment such as ovulation induction or IUI.",
      },
      {
        q: "Should my partner be tested too?",
        a: "Yes. A male factor plays a part in a large share of couples, so both partners are assessed from the start.",
      },
    ],
    related: ["male-infertility", "pcos", "fibroids-and-cysts"],
  },
  {
    slug: "male-infertility",
    title: "Male infertility",
    category: "fertility",
    summary: "Testing and treatment for the male partner, as part of a couple's fertility care.",
    intro: [
      "A male factor contributes to roughly 40–50% of couples' fertility problems, but men are often tested late. Assessing both partners together saves time and avoids unnecessary treatment.",
    ],
    sections: [
      {
        heading: "Possible signs",
        points: [
          "Most men have no symptoms",
          "Low libido or erection problems",
          "Pain or swelling in the testicles",
          "Past surgery, injury or infections in the groin",
        ],
      },
      {
        heading: "Common causes",
        points: [
          "Varicocele (enlarged veins in the scrotum)",
          "Hormonal or genetic conditions",
          "Smoking, alcohol, obesity, heat exposure and anabolic steroids",
        ],
      },
      {
        heading: "Tests and treatment",
        points: [
          "Semen analysis, hormone tests and scrotal ultrasound",
          "Lifestyle changes, which can improve sperm quality within about three months",
          "Medicines or surgery for treatable causes, with referral to a urologist when needed",
          "IUI, or IVF with ICSI when sperm numbers are very low",
        ],
      },
    ],
    faqs: [
      {
        q: "Can a healthy man be infertile?",
        a: "Yes. Many men with low sperm counts feel completely well, which is why semen analysis is part of every fertility assessment.",
      },
    ],
    related: ["fertility"],
  },

  // ─── Life stages ──────────────────────────────────────────────
  {
    slug: "adolescent-health",
    title: "Adolescent health",
    category: "life-stages",
    summary: "Confidential, age-appropriate care for teenagers, from first periods to sexual health.",
    intro: [
      "The teenage years bring rapid physical and emotional change. Dr. Shilpa offers young women a safe, private place to ask questions, with parents involved as the young person prefers.",
      "She has written on adolescents' unmet need for contraception education in the FOGSI textbook.",
    ],
    sections: [
      {
        heading: "Common reasons to visit",
        points: [
          "Painful, heavy or irregular periods",
          "Acne, weight changes or excess hair, which may point to PCOS",
          "Questions about sexual health and contraception",
          "HPV vaccination",
          "Eating concerns, body image or low mood",
        ],
      },
      {
        heading: "The first visit",
        body: [
          "A first visit is mostly a conversation. Most teenagers do not need an internal examination. Dr. Shilpa will explain anything she recommends before doing it.",
        ],
      },
    ],
    faqs: [
      {
        q: "When should a girl first see a gynaecologist?",
        a: "Any time she has concerns about her periods or health, and ideally for HPV vaccination between 9 and 14.",
      },
    ],
    related: ["irregular-periods", "contraception", "cervical-cancer-prevention"],
  },
  {
    slug: "contraception",
    title: "Contraception",
    category: "life-stages",
    summary: "Help choosing the contraception that suits your health, plans and lifestyle.",
    intro: [
      "There is no single best method of contraception. The right choice depends on your health, whether you plan to have children and when, and what you are comfortable with.",
    ],
    sections: [
      {
        heading: "Methods available",
        points: [
          "Condoms: the only method that also protects against sexually transmitted infections.",
          "The pill: taken daily, and can also help with heavy or painful periods.",
          "Hormonal IUD (such as Mirena): lasts several years and makes periods lighter.",
          "Copper IUD: hormone-free and lasts up to ten years.",
          "Injections and implants: long-acting hormonal options.",
          "Emergency contraception: tablets or a copper IUD after unprotected sex, the sooner the better.",
          "Sterilisation: tubal ligation for women who are sure their family is complete.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will contraception affect my fertility later?",
        a: "No. Fertility returns after stopping most methods. After the injection it can take a few months longer.",
      },
    ],
    related: ["adolescent-health", "abortion"],
  },
  {
    slug: "menopause",
    title: "Menopause & HRT",
    category: "life-stages",
    summary: "Managing menopause symptoms and deciding whether hormone replacement therapy is right for you.",
    intro: [
      "Menopause is when periods stop for good, usually between 45 and 55. Falling hormone levels in the years around it can cause symptoms that affect sleep, mood, comfort and long-term bone health.",
    ],
    sections: [
      {
        heading: "Common symptoms",
        points: [
          "Hot flushes and night sweats",
          "Poor sleep and tiredness",
          "Mood changes, anxiety or low mood",
          "Vaginal dryness and pain during sex",
          "Lower sex drive",
          "Joint aches and changes in skin and hair",
          "Needing to pass urine more often",
        ],
      },
      {
        heading: "Hormone replacement therapy (HRT)",
        body: [
          "HRT replaces the hormones your body no longer makes. It is the most effective treatment for hot flushes and night sweats, and it protects bone strength.",
        ],
        points: [
          "Combined HRT: oestrogen with a progestogen, for women who still have a womb.",
          "Oestrogen-only HRT: usually for women who have had a hysterectomy.",
          "Vaginal oestrogen: a low-dose cream or tablet for dryness, with very little absorbed into the body.",
        ],
      },
      {
        heading: "Is HRT safe for me?",
        body: [
          "For most women who start HRT before 60, or within ten years of menopause, the benefits outweigh the risks. HRT may not be suitable if you have had certain cancers, blood clots, a stroke, liver disease or unexplained bleeding. Dr. Shilpa will go through your history and review your treatment regularly.",
        ],
      },
      {
        heading: "Other options",
        points: [
          "Non-hormonal medicines for hot flushes",
          "Calcium, vitamin D and weight-bearing exercise for bone health",
          "Vaginal moisturisers and lubricants",
        ],
      },
    ],
    faqs: [
      {
        q: "How long can I take HRT?",
        a: "There is no fixed limit. Treatment is reviewed every year and continued for as long as the benefits outweigh the risks for you.",
      },
    ],
    related: ["irregular-periods", "cervical-cancer-prevention"],
    reviewId: "manjusha",
  },

  // ─── Cosmetic ─────────────────────────────────────────────────
  {
    slug: "cosmetic-gynaecology",
    title: "Cosmetic gynaecology",
    category: "cosmetic",
    summary: "Surgical and non-surgical treatments for comfort, function and confidence.",
    intro: [
      "Cosmetic gynaecology covers elective treatments for the comfort, function and appearance of the intimate area, for example after childbirth or with age.",
      "Every treatment starts with a private consultation, where Dr. Shilpa explains what is realistic, the risks and the recovery.",
    ],
    sections: [
      {
        heading: "Treatments",
        points: [
          "Labiaplasty: reshaping the labia, often for discomfort during exercise or intimacy.",
          "Vaginoplasty and vaginal tightening: for laxity after childbirth.",
          "Hymenoplasty: repair of the hymen.",
          "Non-surgical options: laser rejuvenation, radiofrequency and PRP for dryness and mild laxity.",
        ],
      },
      {
        heading: "Risks and recovery",
        body: [
          "Swelling, bruising and tenderness are common for a short time. Infection, scarring, asymmetry or changes in sensation are uncommon. Non-surgical treatments usually need one to two days' recovery. Surgery needs two to six weeks, with no strenuous activity or sex for about six weeks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these treatments safe?",
        a: "When done by a trained gynaecologist after a full assessment, complications are uncommon. Dr. Shilpa will explain the specific risks of the treatment you are considering.",
      },
    ],
    related: ["vaginal-tightening", "hymenoplasty"],
  },
  {
    slug: "vaginal-tightening",
    title: "Vaginal tightening",
    category: "cosmetic",
    summary: "Laser and surgical options for vaginal laxity after childbirth or with age.",
    intro: [
      "Childbirth and ageing can stretch the vaginal tissues. This can lead to reduced sensation, mild bladder leakage or dryness. Treatment can be non-surgical or surgical, depending on the degree of laxity.",
    ],
    sections: [
      {
        heading: "Laser tightening",
        points: [
          "Gentle heat stimulates new collagen in the vaginal wall",
          "Takes 15 to 30 minutes with numbing cream",
          "Normal activities can continue the same day; avoid sex and tampons for three to five days",
          "Usually needs three or more sessions",
        ],
      },
      {
        heading: "Surgical vaginoplasty",
        points: [
          "Tightens the muscles and removes excess tissue, with dissolvable stitches",
          "Done under anaesthesia and takes about two to three hours",
          "Light exercise after about three weeks; sex after about six weeks",
        ],
      },
    ],
    faqs: [
      {
        q: "Which option is right for me?",
        a: "Laser suits mild laxity and dryness. Surgery gives a greater, longer-lasting change. Dr. Shilpa will recommend an option after examining you.",
      },
    ],
    related: ["cosmetic-gynaecology", "hymenoplasty"],
  },
  {
    slug: "hymenoplasty",
    title: "Hymenoplasty",
    category: "cosmetic",
    summary: "Private, judgement-free consultation and surgical repair of the hymen.",
    intro: [
      "The hymen is a thin membrane at the vaginal opening. It can stretch or tear through exercise, cycling, tampon use or examination, as well as sex, and is not a reliable sign of virginity.",
      "Hymenoplasty repairs it. Women choose it for personal, cultural or emotional reasons, including after sexual assault. Every consultation is private and free of judgement.",
    ],
    sections: [
      {
        heading: "Preparation",
        points: [
          "Plan the procedure at least six weeks before any date that matters to you",
          "Tell Dr. Shilpa about any medicines and allergies",
          "Avoid smoking and alcohol beforehand",
          "Fast for four to six hours if anaesthesia is planned",
        ],
      },
      {
        heading: "The procedure and recovery",
        points: [
          "Takes 30 to 60 minutes under local or general anaesthetic",
          "Most women return to work in three to four days",
          "Swelling settles in about a week; full healing takes four to six weeks",
          "Avoid sex for six to eight weeks, and use pads rather than tampons",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the procedure confidential?",
        a: "Yes. Your consultation and treatment are completely confidential.",
      },
    ],
    related: ["cosmetic-gynaecology", "vaginal-tightening"],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
