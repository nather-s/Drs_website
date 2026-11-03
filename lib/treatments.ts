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
  /** Neutral browser-tab title for topics people may want to keep private. */
  metaTitle?: string;
  /** Neutral search/link-preview text for sensitive topics (tab titles and shared links). */
  metaDescription?: string;
  /** Sensitive topic: shows the "Exit this page" button and browsing-safety link. */
  sensitive?: boolean;
  /** Page is for male patients; hides the gynaecology "Coming to the clinic" note. */
  forMen?: boolean;
  /** Topic to search for in Dr. Shilpa's YouTube channel (defaults to the page title). */
  videoQuery?: string;
  /** Extra line for the page's WhatsApp booking message (never the medical reason). */
  bookingNote?: string;
  /** Guidelines and laws the page's content follows, listed at the end of the page. */
  references?: string[];
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
    videoQuery: "PCOS",
    references: ["International evidence-based guideline for the assessment and management of PCOS (2023)"],
    title: "PCOS & PCOD",
    category: "gynaecology",
    summary:
      "Diagnosis and long-term management of polycystic ovary syndrome, including irregular periods, acne, excess hair, weight and fertility.",
    intro: [
      "Polycystic ovary syndrome (PCOS), often called PCOD in India, is the most common hormonal condition affecting women of childbearing age. In PCOS the ovaries develop many small fluid-filled sacs along their outer edge.",
      "These sacs are often called cysts, but they are not painful or dangerous. They are follicles, each holding an immature egg, that do not grow and release an egg regularly.",
      "PCOS cannot be cured, but it can be managed well. Dr. Shilpa sees patients with PCOS at Harleys Women's Clinic, Andheri West, and plans treatment around your symptoms, your general health and whether you want to get pregnant.",
    ],
    sections: [
      {
        heading: "Causes of PCOS",
        body: [
          "Several factors are thought to play a part in PCOS. These include insulin resistance, low-grade inflammation, heredity and excess androgens (male-type hormones).",
          "Insulin resistance means the body does not respond to insulin properly, so blood sugar levels rise and the body makes more insulin. High insulin levels can make the ovaries produce more androgens.",
          "Women with PCOS also tend to have ongoing low-grade inflammation, which can show up in blood tests such as C-reactive protein (CRP) and white blood cell count.",
        ],
      },
      {
        heading: "How hormonal imbalance affects your cycle",
        body: [
          "The hormones involved in PCOS include androgens (such as testosterone and androstenedione), oestrogen, progesterone, follicle-stimulating hormone (FSH), luteinising hormone (LH) and insulin.",
          "In PCOS, testosterone, insulin and LH are often raised, and LH is often high compared with FSH. Because ovulation does not happen regularly, progesterone stays low for much of the cycle.",
          "This imbalance disrupts the normal menstrual cycle and stops the ovaries from releasing an egg regularly (ovulation). It can lead to irregular periods, difficulty getting pregnant, acne, excess hair, weight problems, skin tags, thinning or patchy hair loss on the scalp, darkening of the skin on the back of the neck or in skin folds (acanthosis nigricans), and effects on mental health.",
        ],
      },
      {
        heading: "Signs of PCOS",
        body: [
          "Signs often start around the time of the first period, but some women develop them later, after years of periods. Every woman is different, and symptoms vary.",
          "PCOS is usually diagnosed when at least two of the following are present and other causes have been ruled out:",
        ],
        points: [
          "Irregular periods: few or irregular periods, or periods that are shorter or longer than usual. Some women ovulate irregularly or not at all, which can make it harder to get pregnant.",
          "Excess androgens: high androgen levels can cause excess facial and body hair (hirsutism), severe acne, or thinning hair and pattern hair loss.",
          "Polycystic ovaries: the ultrasound shows larger ovaries or many small follicles around the edge of the ovary. A raised AMH blood test can be used instead of ultrasound in adults.",
        ],
        after:
          "In teenagers within eight years of their first period, ultrasound is not used to diagnose PCOS: both irregular cycles and raised androgens are needed. Women with PCOS may also notice rapid weight gain, skin tags and dark, thickened skin (acanthosis nigricans).",
      },
      {
        heading: "How PCOS is diagnosed",
        body: [
          "There is no single test for PCOS. Dr. Shilpa will first talk with you about your symptoms, your periods, any change in weight, the medicines you take and any other health conditions.",
          "A physical examination looks for signs of raised androgens or insulin resistance, such as excess hair, hair thinning, acne, skin tags or dark, thickened skin. Your weight is also checked. Tests may include:",
        ],
        points: [
          "Pelvic examination: to check the reproductive organs for any lumps, growths or other changes.",
          "Ultrasound scan: sound waves create images of the ovaries and the lining of the womb. The scan is done at the clinic, usually with a slim probe placed gently in the vagina. If you have never been sexually active, the scan is done over the tummy instead, not internally.",
          "Blood tests: to measure androgen and other hormone levels, thyroid function, fasting cholesterol and triglycerides, and blood sugar and insulin. A glucose tolerance test may be done to check for insulin resistance by measuring how your body handles sugar.",
        ],
      },
      {
        heading: "Treatment for PCOS",
        body: [
          "PCOS treatment focuses on the symptoms that concern you, such as irregular periods, excess hair, acne, weight or difficulty getting pregnant. It may involve lifestyle changes, medicines, or occasionally surgery.",
        ],
        points: [
          "Lifestyle changes: a healthy, balanced diet and regular moderate exercise to reach and keep a healthy weight. Losing 5–10% of body weight can be enough to bring periods back to a regular pattern. Weight loss can also make medicines work better and help fertility.",
          "Regulating periods: a progestogen tablet taken for 10–14 days every 1–2 months brings on a period and protects the lining of the womb against cancer. Combined hormonal contraception (the pill, a vaginal ring) or a hormonal intrauterine device can also regulate periods; the combined pill also helps acne and excess hair. These are suitable when you are not trying to get pregnant.",
          "Insulin resistance: an insulin-sensitising diabetes medicine (metformin) may be recommended.",
          "Excess hair and acne: anti-androgen medicines, laser hair removal, and tablets or creams for acne. Anti-androgen medicines must be taken with reliable contraception, as they can harm a developing baby.",
          "If you want to get pregnant: tablets that help you ovulate (letrozole, originally a breast cancer medicine, or clomiphene, an anti-oestrogen tablet), metformin, hormone injections (gonadotrophins), and IVF if needed.",
          "Laparoscopic ovarian drilling: keyhole surgery, rarely needed, for women who want to get pregnant and have not ovulated with medicines and lifestyle changes. Through small cuts in the tummy, a laser or heat probe makes a few tiny punctures in the surface of each ovary. This reduces androgen-producing tissue and can help ovulation return.",
        ],
        after:
          "Treatment controls the symptoms of PCOS rather than curing it, and your plan can change over time as your symptoms and goals change.",
      },
      {
        heading: "Long-term health",
        body: [
          "PCOS that is diagnosed early and managed, together with lifestyle changes, is usually not a serious threat to health. Without care, it can lead to long-term problems such as type 2 diabetes and heart disease.",
          "When periods are very infrequent, the lining of the womb can thicken, which needs treatment. Regular check-ups help catch these problems early, so yearly screening is recommended.",
        ],
      },
      {
        heading: "PCOS and related concerns",
        points: [
          "Acne: acne is one of the common hormone-related effects of PCOS.",
          "Hirsutism: excess growth of dark, coarse hair on the face or body.",
          "Fertility: irregular ovulation in PCOS is a common reason for difficulty getting pregnant.",
          "Weight: insulin resistance can cause weight gain or make it harder to lose weight.",
          "Mental health: PCOS, and worries about fertility, can affect mood and lead to anxiety or depression.",
          "Hair fall: raised androgens can cause thinning of scalp hair.",
          "Irregular periods: one of the most common signs of PCOS.",
        ],
      },
    ],
    faqs: [
      {
        q: "Can pregnancy cure PCOS?",
        a: "No. PCOS has no cure, but it can be managed well. Some women notice more regular cycles after a pregnancy, but the condition remains. PCOS can make it harder to conceive, but with the right treatment many women with PCOS get pregnant.",
      },
      {
        q: "If I have PCOS, am I at risk of other health problems?",
        a: "Yes. PCOS increases the long-term risk of sleep apnoea, impaired glucose tolerance and diabetes, endometrial (womb lining) cancer, high cholesterol, high blood pressure, heart disease such as heart attack, and depression. In pregnancy it raises the chance of gestational diabetes, high blood pressure, pre-eclampsia, preterm birth and caesarean delivery. Have yearly check-ups for these risks, and closer monitoring during pregnancy.",
      },
      {
        q: "What lifestyle changes can help my PCOS symptoms?",
        a: "Many symptoms improve with lifestyle and diet changes: exercise regularly and try relaxation techniques, get enough good-quality sleep, avoid too much alcohol or caffeine, and eat a healthy diet rich in lean protein, vitamins and minerals.",
      },
      {
        q: "How do doctors diagnose PCOS?",
        a: "PCOS is diagnosed when at least two of these three are present: missed or irregular periods (some women also have heavy bleeding); signs of raised androgens, such as acne or unwanted hair growth, or high androgen levels on a blood test; and many follicles or enlarged ovaries on ultrasound. Many women with PCOS do not have polycystic-looking ovaries, and other causes need to be ruled out first.",
      },
      {
        q: "At what age can I get PCOS?",
        a: "PCOS can start at any time after puberty, but it is most often diagnosed in women in their twenties and thirties. It is more likely if you are overweight or if a close relative has PCOS.",
      },
      {
        q: "Is PCOS a gynaecological or a hormonal (endocrine) disorder?",
        a: "Both. PCOS is a common hormonal disorder in women, and its main effects are on periods, fertility and other gynaecological health.",
      },
    ],
    related: ["pcos-acne", "pcos-hair-fall", "irregular-periods", "hirsutism", "fertility"],
  },
  {
    slug: "pcos-acne",
    videoQuery: "PCOS acne",
    title: "Hormonal acne",
    category: "gynaecology",
    summary: "Treating acne caused by hormone imbalance, often linked to PCOS, alongside the underlying cause.",
    intro: [
      "Acne and PCOS are closely linked. When acne is caused by a hormone imbalance, a gynaecologist can treat the cause as well as the skin.",
      "Because the cause is hormonal, improvement takes time, often three to six months.",
    ],
    sections: [
      {
        heading: "What is PCOS?",
        body: [
          "PCOS (polycystic ovary syndrome) is a common hormonal condition in women of childbearing age. The ovaries produce more androgens than usual. Androgens are often called male hormones, but women normally make them in small amounts.",
          "The name comes from the many small fluid-filled sacs seen in the ovaries. These are not true cysts but egg follicles that have not matured and released an egg, because ovulation is not happening regularly. Signs usually start around the first period, but can also appear later in life. PCOS affects about 1 in 10 women.",
        ],
      },
      {
        heading: "How PCOS causes acne",
        body: [
          "The main problem in PCOS is hormone imbalance, and raised androgens are one of its most common features. Androgens make the oil glands in the skin produce extra sebum, the skin's natural oil.",
          "Acne forms when pores and hair follicles are blocked by this extra oil, dead skin cells and dirt. Bacteria can become trapped inside, which causes inflammation. PCOS acne can appear on the face, neck, chest and upper back. High insulin and blood sugar levels, chronic inflammation and stress can all push androgen levels up and make acne worse.",
          "PCOS is only one cause of acne. Others include hormone changes during puberty, pregnancy or menopause, stress, some medicines such as corticosteroids, pore-clogging (comedogenic) skincare or make-up, and not washing the face regularly.",
        ],
      },
      {
        heading: "Signs and symptoms of PCOS",
        points: [
          "Irregular periods: periods more than 35 days apart, fewer than nine periods a year, or long gaps followed by heavy bleeding.",
          "Raised androgens: excess facial or body hair (hirsutism), acne and thinning scalp hair.",
          "Polycystic ovaries: on ultrasound the ovaries may look enlarged, with many small follicles.",
        ],
        after:
          "An ultrasound can be done at the clinic. If you have never been sexually active, the scan is done over the tummy, not internally. In teenagers within eight years of their first period, ultrasound is not used to diagnose PCOS: both irregular cycles and raised androgens are needed.",
      },
      {
        heading: "Signs of PCOS acne",
        points: [
          "Very oily skin from extra sebum",
          "Blocked pores that turn into pimples",
          "Redness and inflammation around the spots",
          "Pain, depending on how deep or severe the acne is",
          "Spots that fill with pus",
          "Breakouts along the jaw, chin and neck, flare-ups around your period, or acne that continues well past the teenage years",
        ],
      },
      {
        heading: "How PCOS acne is treated",
        body: [
          "Because the main cause is raised androgens, treating the hormone imbalance usually helps clear the skin. When PCOS is well controlled, acne usually improves a lot, but this can take several months.",
        ],
        points: [
          "Combined oral contraceptive pill: contains oestrogen and progestogen, and lowers androgen levels. It works for most women with PCOS but takes time, and should be taken as prescribed. It is not suitable for everyone, for example smokers over 35, or women with high blood pressure or a history of blood clots.",
          "Anti-androgen medicines: reduce androgen levels or their effect on the skin. Blood tests are usually done first to guide treatment. They can harm a developing baby, so they are only used with reliable contraception and stopped before trying to conceive.",
          "Retinoids: creams, gels or tablets that clear blocked pores, used only on prescription. They make the skin more sensitive to the sun, so use a broad-spectrum sunscreen of SPF 30 or above every day. Apply creams at night only. They can dry the skin at first, so start every other day and increase slowly. Neither creams nor tablets should be used in pregnancy or when trying to conceive, and tablets are prescribed only with reliable contraception.",
          "Skin treatments: products containing salicylic acid, benzoyl peroxide or sulphur can help mild acne, but are usually not enough on their own for PCOS acne.",
          "Antibiotics: may be prescribed for inflamed acne, for a set course and only as advised by your doctor, to avoid side effects.",
        ],
      },
      {
        heading: "Caring for your skin",
        points: [
          "Do not pick, scratch or squeeze spots. This can spread the contents and cause more breakouts.",
          "Wash your face with a gentle cleanser and lukewarm water every morning and night, and remove make-up before bed.",
          "Use a moisturiser and sunscreen every day, chosen for your skin type.",
          "Choose non-comedogenic (non-pore-clogging) make-up and skincare.",
          "Eat a balanced diet with plenty of fresh fruit and vegetables. Cut down on fried and fatty foods, sugar, refined flour and sugary drinks.",
          "Include anti-inflammatory foods such as walnuts, almonds, olive oil, avocado, broccoli, tomatoes, green leafy vegetables, lemon and turmeric. A dietitian can help you plan your meals.",
          "Drink enough water through the day.",
          "Manage stress with meditation, yoga or deep breathing.",
          "Exercise for about half an hour a day at moderate intensity, or less if the workout is vigorous. Regular exercise helps control weight and blood sugar.",
          "Get enough sleep every night.",
        ],
      },
    ],
    faqs: [
      {
        q: "Will my acne clear if my PCOS is treated?",
        a: "It usually improves a lot, but it takes a few months. Skin treatments can be used alongside hormonal treatment in the meantime.",
      },
      {
        q: "Should I see a dermatologist or a gynaecologist?",
        a: "A gynaecologist treats the hormonal cause. For severe acne, Dr. Shilpa may work with a dermatologist so both sides are treated together.",
      },
      {
        q: "Where can I be seen?",
        a: "Dr. Shilpa sees patients at Harleys Women's Clinic, Andheri West, where ultrasound is also available.",
      },
    ],
    related: ["pcos", "pcos-hair-fall", "hirsutism"],
    references: ["International evidence-based guideline for the assessment and management of PCOS (2023)"],
  },
  {
    slug: "pcos-hair-fall",
    videoQuery: "PCOS hair fall",
    title: "Hair fall in PCOS",
    category: "gynaecology",
    summary: "Slowing hair thinning caused by hormone imbalance and supporting regrowth.",
    intro: [
      "PCOS (polycystic ovary syndrome) is a common hormonal condition in women of reproductive age. Hair loss is one of its symptoms, and it can be distressing.",
      "Hair fall in PCOS is mainly caused by raised levels of male hormones called androgens. The good news is that it can be managed, and treating the hormone imbalance early gives the best chance of slowing it down.",
    ],
    sections: [
      {
        heading: "What is PCOS?",
        body: [
          "In PCOS, the ovaries often contain many small, partly developed follicles (sometimes called \"cysts\"), though not every woman with PCOS has these. The hormone imbalance can affect your periods, fertility and appearance.",
          "Some women grow excess hair on the face, chest and abdomen, while others lose hair from the scalp. Some have both.",
          "PCOS is diagnosed from your symptoms, blood tests and, if needed, an ultrasound scan, which is done at the clinic. If you have never been sexually active, the scan is done over the tummy, not internally. Under the 2023 international PCOS guideline, ultrasound is not used to diagnose PCOS within 8 years of the first period.",
        ],
      },
      {
        heading: "Why PCOS causes hair fall",
        body: [
          "Everyone sheds some hair every day. Hair grows in a natural cycle of growing, resting and shedding.",
          "In PCOS, the balance between female and male hormones is disturbed. Androgens such as testosterone, the same hormones that cause baldness in men, rise. They shorten the growth phase of the hair and make it shed sooner, so over time the hair becomes thinner and weaker.",
        ],
      },
      {
        heading: "Signs to look out for",
        body: [
          "The first sign is usually noticeable thinning of the scalp hair. It is often gradual and can worsen over time, though it sometimes starts quite suddenly.",
        ],
        points: [
          "More hair than usual on your pillow or in the shower drain",
          "A widening parting or thinning at the crown",
          "Hair that feels finer and breaks easily",
        ],
        after: "PCOS hair loss rarely causes round bald patches. If you notice these, tell your doctor, as they usually have a different cause.",
      },
      {
        heading: "How hair fall in PCOS is managed",
        body: [
          "The first step is to bring PCOS under control and manage your hormone levels. Your doctor may prescribe hormonal treatment to help slow further hair loss. Alongside this, the following can help.",
        ],
        points: [
          "Hormonal treatment: the combined contraceptive pill or anti-androgen medicines. Anti-androgens can harm a developing baby, so they are only used with reliable contraception and stopped before trying to conceive.",
          "Minoxidil: a lotion or foam applied to the scalp that can stimulate hair growth. Results take several months. It is not used in pregnancy or while breastfeeding.",
          "Checking other causes: low iron, low vitamin D and thyroid problems can also cause hair fall and are easy to test for.",
          "Supplements: biotin, vitamins and omega-3 fatty acids help only if you are low in them, so blood tests come first. Too much vitamin A can itself cause hair loss, and biotin can affect some blood test results, so tell your doctor if you take it.",
          "Lifestyle: if you are overweight, losing weight, eating a healthy diet and exercising regularly improve PCOS and lower androgen levels, which helps hair loss over time.",
          "Scalp massage: may help some women and is safe to try.",
          "Hairstyling: a hairstylist can suggest cuts and styles that add volume and cover thinning areas while treatment works.",
        ],
      },
      {
        heading: "When to see a doctor",
        body: [
          "Hair loss can be distressing, but there are effective ways to manage it. If you have hair loss or any other symptoms of PCOS, see your doctor for a prompt diagnosis and treatment. With the right treatment, hair loss can usually be slowed or stopped, and many women see some regrowth.",
          "Dr. Shilpa Bansal Agrawal sees patients at Harleys Women's Clinic, Andheri West.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does PCOS cause hair loss?",
        a: "Yes. Raised androgens in PCOS shorten the growth phase of scalp hair, so hair becomes thinner and sheds more.",
      },
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
    videoQuery: "irregular periods",
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
    videoQuery: "hirsutism",
    title: "Excess facial and body hair",
    category: "gynaecology",
    summary: "Assessment and treatment of hirsutism, the growth of coarse hair in a male-type pattern.",
    intro: [
      "Hirsutism is the growth of dark, coarse hair on the upper lip, chin, chest, abdomen or back. It affects most women with PCOS.",
      "It is caused by raised androgens or by hair follicles being more sensitive to them. Less often it is linked to adrenal conditions, Cushing's syndrome or certain medicines, which is why a proper assessment matters.",
      "See a doctor promptly if hair growth starts suddenly or worsens quickly, or comes with a deepening voice, increased muscle bulk or other changes in your body, as these need urgent investigation.",
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
          "Hormonal treatment: the combined pill and anti-androgen medicines, which must be used with reliable contraception. Results build gradually over six months or more.",
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
    videoQuery: "fibroids and cysts",
    title: "Fibroids, cysts & polyps",
    category: "gynaecology",
    summary: "Assessment and treatment of fibroids, ovarian cysts and polyps, including keyhole surgery.",
    intro: [
      "Fibroids are non-cancerous growths of the womb muscle. Ovarian cysts are fluid-filled sacs on an ovary, and polyps are small growths in the lining of the womb.",
      "Many cause no symptoms and only need monitoring. Others cause pain, heavy bleeding or difficulty conceiving, and can be treated with medicine or minimally invasive surgery.",
      "Told you need your womb removed? You are welcome to come for a second opinion. Bring your scan reports, and Dr. Shilpa will explain every option, including ones that avoid surgery.",
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
        after:
          "Sudden, severe pelvic pain, especially with vomiting or fainting, can mean a cyst has twisted or burst. Go to the nearest emergency department straight away.",
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
        a: "Not always. Surgery is usually recommended when a growth causes symptoms, is growing, affects fertility, or has features on the scan that need further investigation.",
      },
      {
        q: "I'm close to menopause. Do I still need surgery for fibroids?",
        a: "Often not. Fibroids usually shrink after menopause, when periods stop. If you are close to it, medicines to control the bleeding until then may be enough. Heavy bleeding at this age should still be checked, to rule out other causes.",
      },
    ],
    related: ["menopause", "irregular-periods", "fertility"],
  },
  {
    slug: "bartholin-cyst",
    videoQuery: "Bartholin cyst",
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
          "Marsupialisation: a minor procedure that reduces the chance of cysts coming back.",
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
    slug: "vaginal-infections",
    videoQuery: "vaginal infection",
    references: ["WHO guidelines for the management of symptomatic sexually transmitted infections (2021)"],
    title: "Discharge, itching & infections",
    metaTitle: "Discharge and itching",
    category: "gynaecology",
    summary: "Diagnosis and treatment of unusual discharge, itching, burning and common vaginal infections.",
    intro: [
      "Some vaginal discharge is normal and healthy. It is usually clear or milky white, changes through the menstrual cycle and keeps the vagina clean. A change in colour, smell, amount or texture, or itching and burning, usually means a common infection that is easy to treat.",
      "These infections are very common at every age, including in teenagers, and most have nothing to do with sex. Noticing the type, colour and smell of the discharge helps Dr. Shilpa find the cause.",
    ],
    sections: [
      {
        heading: "When to see a doctor",
        points: [
          "Itching, soreness or burning around the vagina",
          "Thick white discharge, like cottage cheese",
          "Grey, green or yellow discharge, or a fishy smell",
          "Burning when passing urine",
          "Symptoms that keep coming back after treatment from a chemist",
        ],
        after:
          "See a doctor quickly if you also have fever, pain low in the abdomen, bleeding between periods, or if you are pregnant.",
      },
      {
        heading: "Common causes",
        points: [
          "Thrush (yeast infection): an overgrowth of Candida, causing itching and thick white discharge. Common after antibiotics, in pregnancy and with diabetes.",
          "Bacterial vaginosis: thin grey discharge with a fishy smell. An imbalance of normal bacteria, not a sexually transmitted infection.",
          "Urine infection: burning and needing to pass urine often.",
          "Sexually transmitted infections such as trichomonas, chlamydia or gonorrhoea: tested for only when relevant, and always in confidence.",
          "Hormonal changes: discharge often increases in pregnancy and at other times when hormone levels change.",
          "Irritation from scented soaps, washes, pads, harsh detergents or tight synthetic clothing.",
        ],
      },
      {
        heading: "Diagnosis and treatment",
        body: [
          "Dr. Shilpa will ask about your symptoms, examine you and may take a quick swab, so that treatment matches the cause. For teenagers and women who have not been sexually active, a swab can usually be taken without an internal examination.",
          "Most infections clear within a few days with antifungal or antibacterial tablets, a cream or a pessary. Sometimes a partner needs treatment too, so the infection doesn't come back.",
        ],
      },
      {
        heading: "Preventing it coming back",
        points: [
          "Cotton underwear: breathable fabrics reduce irritation.",
          "Avoid irritants: skip scented products, intimate washes and harsh detergents.",
          "Diet: eating less sugar, and including probiotic foods such as curd, may help some women with repeated thrush. Keeping diabetes well controlled matters most.",
          "General health: managing stress and getting enough sleep support your overall and reproductive health.",
          "Regular check-ups: get any change in discharge checked early.",
        ],
      },
    ],
    faqs: [
      {
        q: "How can I tell normal from abnormal discharge?",
        a: "Normal discharge is usually clear or milky white with little smell. Discharge with an unusual colour, smell or texture, or with itching or burning, should be checked.",
      },
      {
        q: "Is more discharge in pregnancy normal?",
        a: "Yes. Hormonal changes in pregnancy often increase discharge. Mention any change in colour or smell, or itching, to your doctor, as infections in pregnancy should be treated.",
      },
      {
        q: "Can I just buy a cream from the chemist?",
        a: "For a first, typical episode of thrush that can work. If symptoms are different, come back, or you are pregnant, see a doctor, as the wrong treatment can make things worse.",
      },
      {
        q: "Do home remedies work?",
        a: "Some may ease symptoms for a while, but they do not treat the cause. A proper diagnosis means you get the right treatment.",
      },
      {
        q: "How long does treatment take?",
        a: "It depends on the cause. Most infections clear within a few days, and Dr. Shilpa will tell you what to expect at your visit.",
      },
      {
        q: "Should I use an intimate wash?",
        a: "No. Washing the outside with plain water is enough. Douches, scented washes and wipes upset the vagina's natural balance and make infections more likely.",
      },
    ],
    related: ["adolescent-health", "bartholin-cyst", "cervical-cancer-prevention"],
  },
  {
    slug: "cervical-cancer-prevention",
    videoQuery: "cervical cancer",
    references: ["WHO guideline for screening and treatment of cervical pre-cancer lesions (2021)"],
    title: "Cervical cancer prevention",
    category: "gynaecology",
    summary: "Pap smear and HPV screening, HPV vaccination, and follow-up of abnormal results.",
    intro: [
      "Cervical cancer starts in the cells of the cervix, the narrow lower part of the womb that opens into the vagina. Almost all cases are caused by long-term infection with high-risk types of human papillomavirus (HPV), so it is largely preventable.",
      "HPV vaccination helps prevent infection, and regular screening finds changes in the cervix years before they could turn into cancer. Screening matters even when you feel well, because early changes usually cause no symptoms.",
      "At Harleys Women's Clinic, Andheri West, Dr. Shilpa offers HPV vaccination, Pap smear and HPV testing, and explains your results and next steps.",
    ],
    sections: [
      {
        heading: "How cervical cancer develops",
        body: [
          "Cervical cancer usually develops slowly. First, some cells in the cervix change and become abnormal (dysplasia, also called cervical intraepithelial neoplasia or CIN). These are precancerous changes, not cancer.",
          "If abnormal cells are not removed or treated, over many years some can grow deeper into the cervix and become cancer. It can take a decade or more. Finding and treating changes at the precancerous stage is far easier than treating cancer once symptoms appear.",
          "HPV is a very common infection passed on through sexual contact. Most HPV infections cause no symptoms and clear within one to two years. Only infections with high-risk types that persist for years can lead to cancer, and only in some women.",
        ],
      },
      {
        heading: "Symptoms to get checked",
        body: ["Early cervical changes usually cause no symptoms, which is why screening is important. See a doctor, rather than waiting for a routine screening appointment, if you notice:"],
        points: [
          "Bleeding after sex, between periods or after the menopause",
          "Periods that are heavier or longer than usual",
          "Watery, bloodstained or strong-smelling vaginal discharge",
          "Pelvic pain or pain during sex",
        ],
        after:
          "In more advanced disease there may also be a dull backache, swelling of the legs, abdominal pain, tiredness, painful urination or blood in the urine, or pain or bleeding when opening the bowels. These symptoms often have other causes, but they should always be checked.",
      },
      {
        heading: "Screening tests",
        points: [
          "Pap smear (Pap test or cervical cytology): cells are gently collected from the cervix and checked under a microscope for abnormal or precancerous changes. It can also show inflammation, some infections and changes caused by HPV.",
          "HPV test: checks for high-risk types of HPV, often on the same sample. A negative result means no high-risk HPV was found. A positive result does not mean you have cancer; it means you need follow-up.",
          "Co-test: a Pap smear and HPV test done together.",
        ],
        after:
          "For both tests you lie on your back with your knees bent and feet supported. A speculum is gently inserted to see the cervix, and a soft brush or small spatula is used to collect cells. It takes a few minutes.",
      },
      {
        heading: "When to be screened",
        body: [
          "How often you need screening, and with which test, depends on your age, your previous results and your health history. Dr. Shilpa will advise how often you need screening based on your age and previous results. A common schedule is:",
        ],
        points: [
          "Age 21 to 29: a Pap smear every 3 years. From 25, an HPV test every 5 years is an alternative.",
          "Age 30 to 65: an HPV test every 5 years, a co-test every 5 years, or a Pap smear every 3 years.",
          "Over 65: you may be able to stop if you have been screened regularly and your recent results have all been normal. Screening continues if recent results were abnormal or you have not been screened regularly.",
        ],
        after:
          "Women who have had the HPV vaccine still need screening, because the vaccine does not cover every high-risk HPV type.",
      },
      {
        heading: "HPV vaccination",
        body: [
          "The HPV vaccine protects against the HPV types that cause most cervical cancers. It works best before sexual activity begins, ideally between 9 and 14 years of age.",
          "Young women who missed it can usually still be vaccinated, and Dr. Shilpa can advise whether it is worthwhile for you, depending on your age and vaccination history, and which schedule applies.",
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
          "Most abnormal results are not cancer. Depending on the result, you may be advised a repeat test, more frequent Pap smears and HPV tests, or a colposcopy, a closer look at the cervix, sometimes with a small biopsy.",
          "Any precancerous areas can be treated with simple outpatient procedures such as cryotherapy or LEEP.",
        ],
      },
    ],
    faqs: [
      {
        q: "Who should get the HPV vaccine?",
        a: "It works best when given before any exposure to HPV, ideally between 9 and 14 years of age. Whether it is recommended for you depends on your age and vaccination history, and Dr. Shilpa can advise on the right schedule.",
      },
      {
        q: "Can I get the HPV vaccine if I am already sexually active?",
        a: "Often, yes. Being sexually active does not rule it out. The benefit depends on your age, previous vaccination and the chance that you have already been exposed to the HPV types the vaccine covers.",
      },
      {
        q: "What is the difference between a Pap smear and an HPV test?",
        a: "A Pap smear looks at cervical cells for abnormal changes, while an HPV test looks for the high-risk virus types that can cause those changes. Both are used in screening, and they can be done on the same sample.",
      },
      {
        q: "If I've had the HPV vaccine, do I still need screening?",
        a: "Yes. The vaccine protects against the most common high-risk types, but not all of them.",
      },
      {
        q: "How often should I be screened?",
        a: "There is no single interval that suits everyone. It depends on your age, the test used and your previous results. Dr. Shilpa will tell you when your next test is due.",
      },
      {
        q: "What happens if my Pap smear or HPV test is abnormal?",
        a: "An abnormal Pap smear or a positive HPV test does not mean you have cancer. You may need a repeat test or a colposcopy. Bring your report and Dr. Shilpa will explain what it means for you.",
      },
      {
        q: "Is a Pap smear painful?",
        a: "Most women find it mildly uncomfortable rather than painful, and it is over in a few minutes.",
      },
      {
        q: "How much does a Pap smear cost?",
        a: "The cost depends on which tests you need, for example whether an HPV test is added. The clinic can tell you the current charges when you book.",
      },
    ],
    related: ["colposcopy", "adolescent-health"],
  },
  {
    slug: "colposcopy",
    videoQuery: "colposcopy",
    references: ["WHO guideline for screening and treatment of cervical pre-cancer lesions (2021)"],
    title: "Colposcopy and abnormal smear results",
    category: "gynaecology",
    summary: "A detailed examination of the cervix after an abnormal Pap smear or HPV test.",
    intro: [
      "A colposcopy is a close examination of the cervix, vagina and vulva using a colposcope, a magnifying instrument with a light. It stays outside the body, a few inches from the vaginal opening, and works rather like binoculars. It is usually recommended after an abnormal Pap smear or HPV test.",
      "If an area looks abnormal, a small sample (biopsy) can be taken during the same visit and sent to a laboratory. This shows exactly what the problem is and how to treat it. Finding precancerous changes or early cancer this way means they can be treated in time.",
      "Dr. Shilpa, who is trained in colposcopy, does the examination herself at the clinic.",
    ],
    sections: [
      {
        heading: "Understanding your result",
        body: [
          "Being told your result is abnormal is frightening, but it is very rarely cancer. Screening is designed to find small changes years before they could ever become cancer, so they can be watched or treated early.",
        ],
        points: [
          "HPV positive: you have a common virus that most sexually active people catch at some point. In most women the body clears it within one to two years. It needs follow-up, not alarm.",
          "ASC-US: borderline changes in a few cells, often caused by HPV or inflammation. Many return to normal on their own.",
          "LSIL (low-grade changes): mild changes that usually clear by themselves and are often just monitored.",
          "HSIL or ASC-H (high-grade changes): changes that are more likely to need treatment. They are still not cancer, and treatment is simple and very effective.",
        ],
        after:
          "Bring your lab report to the appointment. Dr. Shilpa will explain what it means for you. If tests ever show cancer, which is rare, she will refer you promptly to a gynaecological oncologist.",
      },
      {
        heading: "Why it is done",
        body: [
          "Colposcopy shows changes in blood vessels, colour, tissue and surface patterns that cannot be seen with the naked eye. It is recommended after an abnormal Pap smear or HPV test, or if something unusual is seen during a pelvic examination. It helps diagnose and plan treatment for:",
        ],
        points: [
          "Precancerous changes in the cervix, vagina or vulva",
          "Cervicitis (inflammation of the cervix)",
          "Genital warts, which are caused by HPV",
          "Polyps (non-cancerous growths) on the cervix, vagina or vulva",
          "Unexplained bleeding, for example after sex",
          "Exposure to diethylstilbestrol (DES) before birth, in women whose mothers took this medicine in pregnancy, as it raises the risk of some reproductive cancers",
        ],
      },
      {
        heading: "Preparing",
        points: [
          "Book for a day when you are not having your period",
          "Avoid sex, tampons and vaginal medicines or creams for one to two days beforehand",
          "Tell us if you might be pregnant",
          "Tell us about all your medicines and supplements, especially blood thinners. Do not stop a blood thinner unless your doctor advises it",
          "Tell us about any allergies, for example to medicines, local anaesthetic, latex, tape or iodine",
          "You can take a simple painkiller an hour before",
        ],
      },
      {
        heading: "What happens",
        body: [
          "The examination takes 10 to 20 minutes. You will be asked to empty your bladder and change into a gown, then lie on the examination couch with your legs supported, as for a Pap smear.",
          "A speculum is inserted to see the cervix, and the colposcope is positioned just outside the vagina. The cervix is gently cleaned of mucus, and a mild vinegar (acetic acid) solution is applied to highlight abnormal areas, which turn white. This may sting or burn briefly. An iodine solution may also be used (the Schiller test).",
          "If a biopsy is needed, it is taken under local anaesthetic. You may still feel a slight pinch or cramp, especially if cells are taken from inside the cervical canal. A paste or pressure is then applied to stop any bleeding.",
          "You can rest for a short while before going home. If a biopsy is done in hospital under sedation or anaesthesia, which is uncommon, you will be observed until you recover and someone else should take you home.",
        ],
      },
      {
        heading: "Afterwards",
        points: [
          "Use pads, not tampons, and avoid sex and douching for about a week if a biopsy was taken, or as long as advised",
          "Light spotting, mild cramps, or dark or black discharge (from the paste used to stop bleeding) for a few days is normal",
          "Avoid strenuous exercise and heavy lifting until you are advised it is fine",
          "Take the prescribed painkiller if you have cramps or soreness",
          "Come back for your follow-up visit. Your results decide whether you need treatment, and you will usually need further Pap smears afterwards",
        ],
        after:
          "Colposcopy is safe, and complications are rare. Contact the clinic if you have fever or chills, severe abdominal pain, or bleeding heavier than a period.",
      },
    ],
    faqs: [
      {
        q: "Does a colposcopy mean I have cancer?",
        a: "No. Most colposcopies find either no changes or early changes that are easily treated.",
      },
      {
        q: "I'm HPV positive. Does it mean my partner has been unfaithful?",
        a: "No. HPV can stay in the body unnoticed for many years, so a positive test cannot tell you when or from whom it was caught.",
      },
      {
        q: "How soon should I be seen?",
        a: "Within a few weeks is usually fine for borderline or low-grade results. For a high-grade result, or bleeding after sex, mention it when you book so you can be seen sooner.",
      },
      {
        q: "Does a colposcopy hurt?",
        a: "Most women feel only mild discomfort from the speculum and a brief sting from the solution. If a biopsy is taken, the area is numbed first, though you may feel a pinch or cramp.",
      },
    ],
    related: ["cervical-cancer-prevention", "vaginal-infections"],
  },

  // ─── Pregnancy ────────────────────────────────────────────────
  {
    slug: "pregnancy-care",
    videoQuery: "pregnancy",
    references: ["WHO recommendations on antenatal care for a positive pregnancy experience (2016)", "Pre-Conception and Pre-Natal Diagnostic Techniques (PCPNDT) Act, 1994"],
    title: "Pregnancy care",
    category: "pregnancy",
    summary: "Antenatal and postnatal care, from your first scan to the weeks after delivery.",
    intro: [
      "Good antenatal care keeps you and your baby healthy and helps you feel prepared. Dr. Shilpa sees you regularly through your pregnancy, explains each test and scan, and plans your delivery with you.",
      "She delivers at Surya Hospitals, Cloudnine Hospital and Criticare Asia, and her pregnancy patients can call her directly, day or night.",
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
      {
        heading: "When to seek help urgently",
        points: [
          "Vaginal bleeding or leaking fluid",
          "Your baby moving less than usual",
          "Severe headache, blurred vision or sudden swelling of the face or hands",
          "Severe or persistent abdominal pain",
          "Fever, or feeling very unwell",
        ],
        after:
          "If you are in Dr. Shilpa's care, call her directly on the number she gives you at your first visit, day or night. If you cannot reach her, go to the nearest hospital emergency department or call 108.",
      },
    ],
    faqs: [
      {
        q: "When should I book my first pregnancy appointment?",
        a: "As soon as you have a positive pregnancy test. If you are not already taking folic acid, start it straight away. Ideally it is started before trying to conceive and continued until 12 weeks.",
      },
      {
        q: "Where will I deliver?",
        a: "Dr. Shilpa delivers at Surya Hospitals, Cloudnine Hospital and Criticare Asia. She will help you choose the one that suits you, and plan the type of delivery with you during your pregnancy.",
      },
    ],
    related: ["high-risk-pregnancy", "epidural-pain-relief"],
    reviewId: "ruchi",
  },
  {
    slug: "high-risk-pregnancy",
    videoQuery: "high-risk pregnancy",
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
          "Repeated miscarriage, or a previous preterm birth or stillbirth",
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
        after:
          "If you notice bleeding, leaking fluid, reduced baby movements, a severe headache or blurred vision, seek care immediately at the nearest hospital or call 108.",
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
    slug: "epidural-pain-relief",
    videoQuery: "painless delivery",
    title: "Epidural pain relief in labour",
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
          "A longer pushing stage of labour, and a higher chance of needing forceps or vacuum to help the baby out",
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
    slug: "pregnancy-options",
    videoQuery: "abortion",
    references: ["Medical Termination of Pregnancy Act, 1971 (amended 2021) and MTP Rules, 2021", "World Health Organization, Abortion care guideline (2022)", "Protection of Children from Sexual Offences (POCSO) Act, 2012"],
    title: "Pregnancy options and abortion care",
    metaTitle: "Pregnancy options",
    metaDescription: "Confidential advice and care if you are pregnant and unsure what to do, with Dr. Shilpa Bansal Agrawal in Andheri West.",
    sensitive: true,
    category: "pregnancy",
    summary: "Confidential medical and surgical abortion care under the MTP Act.",
    intro: [
      "The clinic provides safe, legal and confidential abortion care under the Medical Termination of Pregnancy (MTP) Act, 1971, as amended in 2021. Your decision is respected without judgement.",
      "The clinic is a government-approved MTP centre, and the ultrasound is done here at the clinic.",
      "Abortion is legal for every woman in India, married or unmarried. If you are 18 or over, you do not need anyone else's consent: not a parent's, a partner's or a husband's. For anyone under 18, written consent from a guardian is required by law.",
    ],
    sections: [
      {
        heading: "Options",
        points: [
          "Medical abortion: tablets taken over two days, usually suitable up to about nine weeks of pregnancy.",
          "Surgical abortion: a short procedure (vacuum aspiration) under anaesthesia.",
          "Up to 20 weeks: allowed on the opinion of one registered doctor, for the reasons set out in the Act.",
          "20 to 24 weeks: allowed for specific categories of women set out in the Act, on the opinion of two registered doctors, at an approved facility.",
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
      {
        heading: "How many visits it usually takes",
        points: [
          "First visit: a consultation and ultrasound. For a medical abortion, the first tablet is usually taken at the clinic.",
          "The second set of tablets is usually taken at home a day or two later. Plan to rest that day.",
          "A follow-up visit about two weeks later checks that the abortion is complete.",
        ],
        after: "Most women go back to work within a day or two of a medical abortion.",
      },
      {
        heading: "Avoid unsafe options",
        body: [
          "Abortion pills bought online or from a chemist without a prescription are illegal to sell, and taking them without a scan is risky. A scan checks that the pregnancy is in the womb. A pregnancy outside the womb (ectopic pregnancy) cannot be ended with pills and can be life-threatening. Pills taken later than recommended are more likely to cause heavy bleeding or an incomplete abortion.",
          "Unregistered clinics may not be legal or safe. If you have already taken pills, come in anyway. You will be cared for, not judged. (For anyone under 18, the law requires the doctor to make a report; see the questions below.)",
        ],
      },
    ],
    faqs: [
      {
        q: "Will my family be told?",
        a: "No. If you are 18 or over, nobody is told without your permission. The clinic's WhatsApp messages don't mention why you came.",
      },
      {
        q: "Is it confidential?",
        a: "Yes. Your details are kept confidential, as the MTP Act requires. For anyone under 18, the law also requires a guardian's consent and a report under the POCSO Act, though the young person's identity can be kept out of that report.",
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
    videoQuery: "infertility",
    title: "Fertility treatment",
    category: "fertility",
    summary: "Step-by-step fertility assessment and treatment for couples, from ovulation tracking to IVF.",
    intro: [
      "Difficulty conceiving is common, and in most couples a cause can be found. Dr. Shilpa, who holds a fellowship in reproductive endocrinology and infertility, sees couples at Harleys Women's Clinic, Andheri West.",
      "She starts with a full assessment of both partners and explains each option before treatment begins. Seeing a fertility doctor does not mean you are starting IVF. The process usually begins with a conversation and a few simple tests.",
    ],
    sections: [
      {
        heading: "When to seek help",
        points: [
          "No pregnancy after 12 months of regular unprotected sex, or after 6 months if you are over 35",
          "Irregular or absent periods, which may mean you are not ovulating regularly",
          "Known PCOS or another hormonal problem, such as a thyroid disorder",
          "Two or more miscarriages",
          "Known problems such as endometriosis or blocked tubes",
          "Concerns about age: female fertility falls with age, especially after 35",
        ],
        after: "Age is not the only factor. Many younger couples also have difficulty conceiving, and it is worth seeking advice early.",
      },
      {
        heading: "Your first consultation",
        points: [
          "A review of your medical, menstrual and pregnancy history, and any earlier treatment",
          "Discussion of lifestyle factors such as stress, sleep, diet and weight",
          "A clear plan of the tests you need and what the next steps could be",
        ],
        after: "It helps to track your cycle before your visit, write down any symptoms, and bring your partner so you both understand the plan. Ask anything. Consultations are available in English, Hindi and Marathi.",
      },
      {
        heading: "Assessment",
        body: [
          "A male factor plays a part in many couples, so both partners are assessed from the start.",
        ],
        points: [
          "Hormone blood tests, including ovarian reserve (AMH)",
          "Pelvic ultrasound at the clinic, to check the womb and ovaries and track ovulation",
          "A check that the fallopian tubes are open",
          "Semen analysis for the male partner",
        ],
      },
      {
        heading: "Treatment options",
        body: [
          "Not everyone needs IVF. Some couples conceive after small changes or simple treatment, and the plan is matched to your situation.",
        ],
        points: [
          "Lifestyle changes: for women who are overweight, losing some weight can improve periods and ovulation.",
          "Ovulation induction: tablets or injections to help you ovulate, with scans to time intercourse.",
          "IUI (intrauterine insemination): prepared sperm placed in the womb at ovulation, often advised for mild male factor, ovulation problems or unexplained infertility. Dr. Shilpa does this herself.",
          "IVF and ICSI: eggs fertilised in the laboratory and an embryo transferred to the womb, at a registered ART centre nearby. ICSI, where a single sperm is injected into each egg, is used when sperm numbers are very low.",
          "Surgery: keyhole surgery or hysteroscopy for endometriosis, fibroids, polyps or blocked tubes.",
          "Egg freezing: for women who wish to delay pregnancy or before some medical treatments, at a registered ART centre nearby.",
          "Donor treatment: when appropriate, discussed with care and arranged through a registered ART centre.",
        ],
        after: "Fertility medicines are monitored with scans, because they can sometimes cause twins or over-stimulate the ovaries. You will never be pressured into any treatment, and every decision is made with your full consent.",
      },
      {
        heading: "PCOS and fertility",
        body: [
          "PCOS is a common hormonal condition and the most common reason women do not ovulate regularly. Without regular ovulation, periods become irregular and it can take longer to conceive.",
          "Many women with PCOS conceive naturally, and treatment improves the chances further. Weight loss, if you are overweight, can bring back regular ovulation.",
        ],
        points: [
          "Ovulation tablets: letrozole or clomiphene, which help an egg mature and be released.",
          "Metformin: a diabetes medicine that helps with insulin resistance, used for some women.",
          "Gonadotrophin injections: FSH and LH hormones that stimulate the ovaries, with close scan monitoring.",
          "Laparoscopic ovarian drilling: keyhole surgery that makes a few tiny punctures in the surface of the ovary to reduce androgen production, used when tablets have not worked.",
          "IVF: when other treatments have not worked.",
        ],
        after: "PCOS also raises the risk of some pregnancy problems, such as gestational diabetes, high blood pressure and pre-eclampsia, so pregnancies are monitored closely.",
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
      {
        q: "What is the difference between IVF and IUI?",
        a: "In IUI, prepared sperm are placed inside the womb around ovulation. In IVF, eggs are collected and fertilised in the laboratory, and an embryo is then transferred to the womb.",
      },
      {
        q: "Is fertility treatment painful or risky?",
        a: "Most tests and treatments cause only mild discomfort. IUI is a short procedure similar to a smear test. Medicines that stimulate the ovaries carry some risks, so you are monitored with scans and the risks are explained before you start.",
      },
      {
        q: "How long does fertility treatment take?",
        a: "It depends on the cause and the treatment. Some couples conceive within a few months, while others need several cycles. Dr. Shilpa will give you realistic expectations at the start.",
      },
      {
        q: "What will my chances of success be?",
        a: "Chances depend on your age, the cause and the treatment, so they differ for every couple. Dr. Shilpa will discuss your own situation honestly once your tests are back.",
      },
      {
        q: "How much does fertility treatment cost?",
        a: "Costs depend on the tests and treatment you need. Basic assessment and ovulation treatment cost much less than IVF. The clinic will tell you the charges before you start.",
      },
      {
        q: "Another doctor said I cannot conceive. Is it worth a second opinion?",
        a: "Yes. A second opinion and a fresh look at your tests can sometimes change the options available to you.",
      },
    ],
    related: ["male-infertility", "pcos", "fibroids-and-cysts"],
  },
  {
    slug: "male-infertility",
    videoQuery: "male infertility",
    forMen: true,
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
          "IUI, or IVF with ICSI when sperm numbers are very low, at a registered ART centre",
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
    videoQuery: "teenage health",
    bookingNote: "The appointment is for my daughter (age: __). A parent will come with her.",
    sensitive: true,
    metaTitle: "Teen health",
    metaDescription: "Respectful health care for teenagers, from first periods onwards, with Dr. Shilpa Bansal Agrawal in Andheri West.",
    title: "Adolescent health",
    category: "life-stages",
    summary: "Respectful, age-appropriate care for teenagers, from first periods to sexual health.",
    intro: [
      "The teenage years bring rapid physical and emotional change. Dr. Shilpa offers girls and young women a gentle, respectful place to ask questions, and many first visits are booked by a parent.",
    ],
    sections: [
      {
        heading: "For parents",
        points: [
          "Dr. Shilpa sees around 25 teenagers every week, for periods, PCOS, skin and other worries.",
          "You are welcome to stay in the room for the whole consultation.",
          "Most teenagers do not need an internal examination. If any examination is needed, it is explained first and done only with your daughter's agreement and yours, with a female staff member present.",
          "A parent or guardian's consent is needed for examination and treatment of anyone under 18.",
          "Older teenagers sometimes like a few minutes alone with the doctor. It is offered, never insisted on.",
        ],
      },
      {
        heading: "Common reasons to visit",
        points: [
          "Painful periods that mean missing school",
          "Heavy or irregular periods",
          "White discharge or itching",
          "Acne, weight changes or excess hair, which may point to PCOS",
          "Questions about sexual health and contraception",
          "HPV vaccination",
          "Eating concerns, body image or low mood",
        ],
      },
      {
        heading: "The first visit",
        body: [
          "A first visit is mostly a conversation about periods, symptoms and general health. Dr. Shilpa will explain anything she recommends before doing it, in words a teenager can follow.",
        ],
      },
    ],
    faqs: [
      {
        q: "When should a girl first see a gynaecologist?",
        a: "Any time she has concerns about her periods or health, and ideally for HPV vaccination between 9 and 14.",
      },
      {
        q: "Her period pain makes her miss school. Is that normal?",
        a: "Period pain is common, but pain that stops her going to school is worth seeing a doctor about. It can usually be eased with the right medicine, and occasionally it points to a condition such as endometriosis that is better found early.",
      },
      {
        q: "She has white discharge and itching. Is something wrong?",
        a: "Some clear or white discharge is normal once periods start. Itching, a bad smell or a change in colour usually means a simple infection such as thrush, which is easily treated. It does not mean she has been sexually active.",
      },
      {
        q: "Is what my daughter says kept private?",
        a: "Yes, with one exception the law sets. Under the POCSO Act, doctors must report any sexual activity or abuse involving someone under 18. Dr. Shilpa will explain this gently if it ever applies.",
      },
    ],
    related: ["irregular-periods", "vaginal-infections", "cervical-cancer-prevention"],
  },
  {
    slug: "contraception",
    videoQuery: "contraception",
    sensitive: true,
    metaTitle: "Family planning advice",
    metaDescription: "Help choosing the family planning method that suits you, with Dr. Shilpa Bansal Agrawal in Andheri West.",
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
        a: "No. Fertility returns soon after stopping most methods. After the contraceptive injection it can take up to a year to return.",
      },
    ],
    related: ["adolescent-health", "pregnancy-options"],
  },
  {
    slug: "menopause",
    videoQuery: "menopause",
    references: ["NICE guideline NG23: Menopause: identification and management (updated 2024)"],
    title: "Menopause & HRT",
    category: "life-stages",
    summary: "Managing menopause symptoms and deciding whether hormone replacement therapy is right for you.",
    intro: [
      "Menopause is when periods stop for good, usually between 45 and 55. It is a natural stage of life, but falling hormone levels in the years around it can affect sleep, mood, comfort, intimacy and long-term bone health.",
      "Some women have mild symptoms, while for others they affect daily life. Dr. Shilpa sees women at Harleys Women's Clinic, Andheri West, to talk through symptoms and treatment choices, whether you are approaching menopause or your periods have already stopped.",
    ],
    sections: [
      {
        heading: "Perimenopause and menopause",
        body: [
          "Perimenopause is the transition before menopause, when hormone levels change and periods often become irregular. Symptoms can start before periods stop completely.",
          "Menopause is reached after 12 months in a row without a period, when there is no other cause. The timing and symptoms vary from woman to woman.",
        ],
      },
      {
        heading: "Common symptoms",
        points: [
          "Hot flushes and night sweats",
          "Irregular periods in the years before menopause",
          "Poor sleep and tiredness",
          "Mood changes, irritability, anxiety or low mood",
          "Vaginal dryness, itching and pain during sex",
          "Lower sex drive",
          "Dry eyes, skin or mouth",
          "Joint aches and changes in skin and hair",
          "Needing to pass urine more often or more urgently",
        ],
        after: "Any bleeding after your periods have stopped for a year needs prompt assessment.",
      },
      {
        heading: "What to expect at your consultation",
        points: [
          "A discussion of your symptoms, periods, medical history and current medicines",
          "An examination or tests only where needed. Most women over 45 do not need hormone blood tests to confirm menopause.",
          "Advice on hormonal and non-hormonal treatment, and on bone health",
          "Regular follow-up to review how treatment is working",
        ],
      },
      {
        heading: "Hormone replacement therapy (HRT)",
        body: [
          "HRT replaces the hormones your body no longer makes. It is the most effective treatment for hot flushes and night sweats, and it protects bone strength. It can also help with sleep, mood, joint aches and vaginal dryness.",
        ],
        points: [
          "Combined HRT: oestrogen with a progestogen, for women who still have a womb. The progestogen protects the lining of the womb. It can be a tablet, such as micronised progesterone, or a hormone coil, which can also help with irregular periods in perimenopause.",
          "Oestrogen-only HRT: usually for women who have had a hysterectomy. It comes as tablets, patches, gel or spray.",
          "Vaginal oestrogen: a low-dose cream, tablet or ring for dryness, with very little absorbed into the body.",
        ],
        after: "Treatment usually starts at a low dose. It can take a few weeks to a few months to feel the full effect, and the type or dose can be changed if it does not suit you. HRT is not a contraceptive, so you may still need contraception in the years around menopause.",
      },
      {
        heading: "Is HRT safe for me?",
        body: [
          "For most women who start HRT before 60, or within ten years of menopause, the benefits outweigh the risks. The main risks are a small increase in breast cancer risk with combined HRT, which grows the longer it is taken, and a higher risk of blood clots and stroke with HRT tablets (patches and gels carry less). Oestrogen alone, without a progestogen, raises the risk of womb cancer in women who still have a womb.",
          "HRT may not be suitable if you have had breast, womb or ovarian cancer, blood clots, a stroke or heart disease, liver disease or unexplained bleeding, or if you are pregnant or breastfeeding. High blood pressure should be controlled first. After a blood clot, HRT through the skin may still be possible with specialist advice. Dr. Shilpa will go through your history and review your treatment regularly.",
          "If menopause happens before 40 (premature menopause), HRT is usually recommended until around the natural age of menopause.",
        ],
      },
      {
        heading: "Side effects of HRT",
        points: [
          "Breast tenderness",
          "Headaches",
          "Bloating, nausea or indigestion",
          "Mood changes",
          "Fluid retention",
          "Vaginal bleeding",
        ],
        after: "These often settle within the first few months. Tell Dr. Shilpa about any side effects, and about any bleeding that continues after the first months or starts later on.",
      },
      {
        heading: "Vaginal dryness",
        body: [
          "Vaginal dryness is common, especially after menopause, but it can happen at other times too. It can make sex painful and affect everyday comfort.",
        ],
        points: [
          "Vaginal moisturisers and lubricants",
          "Low-dose vaginal oestrogen",
          "HRT, if you also have other menopause symptoms",
          "Simple changes, such as avoiding perfumed soaps and washes",
        ],
      },
      {
        heading: "Other options",
        points: [
          "Non-hormonal medicines for hot flushes",
          "Lifestyle measures such as regular exercise, a healthy weight and limiting alcohol and caffeine",
          "Calcium, vitamin D and weight-bearing exercise for bone health, with a bone density scan when needed",
          "Talking therapies and support for low mood or anxiety",
        ],
      },
    ],
    faqs: [
      {
        q: "When should I see a doctor about menopause symptoms?",
        a: "See a doctor if hot flushes, night sweats, poor sleep, mood changes or vaginal discomfort are affecting your daily life. Any vaginal bleeding after menopause should be checked promptly.",
      },
      {
        q: "Is HRT suitable for every woman?",
        a: "No. The benefits and risks depend on your age, the time since menopause, your symptoms and your medical history. Dr. Shilpa will help you decide whether it is right for you.",
      },
      {
        q: "Can menopause symptoms be managed without hormones?",
        a: "Yes. Lifestyle changes, non-hormonal medicines and treatments for specific problems such as vaginal dryness can help. The best approach depends on your symptoms, history and preferences.",
      },
      {
        q: "How long does HRT take to work?",
        a: "Some women notice a difference within a few weeks, while for others it takes a few months.",
      },
      {
        q: "How long can I take HRT?",
        a: "There is no fixed limit. Treatment is reviewed every year and continued for as long as the benefits outweigh the risks for you.",
      },
    ],
    related: ["fibroids-and-cysts", "irregular-periods", "cervical-cancer-prevention"],
    reviewId: "manjusha",
  },

  // ─── Cosmetic ─────────────────────────────────────────────────
  {
    slug: "cosmetic-gynaecology",
    videoQuery: "cosmetic gynaecology",
    references: ["ACOG Committee Opinion 795: Elective Female Genital Cosmetic Surgery (2020)", "US FDA safety communication on energy-based devices for vaginal ‘rejuvenation’ (2018)"],
    sensitive: true,
    metaTitle: "Private consultation",
    metaDescription: "Private, confidential consultations with Dr. Shilpa Bansal Agrawal in Andheri West.",
    title: "Cosmetic gynaecology",
    category: "cosmetic",
    summary: "Surgical and non-surgical treatments for comfort, function and confidence.",
    intro: [
      "Cosmetic gynaecology covers elective treatments for the comfort, function and appearance of the intimate area, such as labiaplasty, vaginal rejuvenation and vaginal tightening. The right approach depends on your concerns, a medical assessment and your expectations.",
      "Every treatment starts with a private consultation at Harleys Women's Clinic, Andheri West, where Dr. Shilpa explains what is realistic, the risks and the recovery. These procedures are for adults only, and the consultation includes a conversation about your reasons and expectations.",
      "A consultation does not mean you need to have a procedure. Its purpose is to help you understand your concern and make an informed decision.",
    ],
    sections: [
      {
        heading: "What to expect at your consultation",
        points: [
          "Personal consultation: discuss your concerns, expectations and relevant medical history.",
          "Treatment options: learn about the surgical and non-surgical approaches relevant to you.",
          "Clear information: understand the proposed procedure, its possible benefits, limitations and risks.",
          "Recovery guidance: learn about aftercare, follow-up and any activity restrictions.",
          "Informed decisions: take time to understand your options before deciding how to proceed.",
        ],
      },
      {
        heading: "Treatments",
        points: [
          "Labiaplasty: a surgical procedure that changes the size or shape of the labia minora, the inner folds of skin around the vaginal opening. Some women consider it because of discomfort during exercise, intimacy or with certain clothing, or because of concerns about appearance.",
          "Vaginal rejuvenation: a broad term for different procedures aimed at concerns in the vaginal or surrounding area. The method, purpose and evidence vary from one treatment to another.",
          "Vaginoplasty and vaginal tightening: surgical or non-surgical approaches for vaginal laxity, for example after childbirth.",
          "Hymenoplasty: repair of the hymen.",
          "Non-surgical options: laser, radiofrequency and PRP. Evidence that these work is still limited, and medical bodies such as the US FDA and ACOG have not found them proven for vaginal laxity, dryness or bladder leakage.",
        ],
      },
      {
        heading: "When to consider a consultation",
        points: [
          "Physical discomfort: discomfort with particular activities or clothing, and whether an examination is needed.",
          "Concerns about intimate anatomy: understanding normal variation and talking through your concerns, without pressure to have a procedure.",
          "Questions about a specific procedure: what labiaplasty, vaginal rejuvenation or tightening involves, the risks, recovery, alternatives and the evidence behind it.",
          "Vaginal laxity: possible causes, and the treatment and non-procedural options for your situation.",
        ],
      },
      {
        heading: "Your consultation step by step",
        points: [
          "Book: contact the clinic to arrange a private appointment.",
          "Discuss your concerns: explain your concerns, expectations, symptoms and medical history.",
          "Assessment: Dr. Shilpa decides what examination is appropriate and discusses the options that fit your circumstances.",
          "Understand your options: the proposed procedure, possible benefits, limitations, risks, alternatives and recovery.",
          "Decide: if a treatment is suitable and you choose to go ahead, the clinic explains preparation, aftercare and follow-up.",
        ],
      },
      {
        heading: "Risks and recovery",
        body: [
          "Swelling, bruising and tenderness are common for a short time. Infection, scarring, asymmetry, pain during sex and changes in sensation can also occur, and good long-term data on these procedures is limited. Most people return to normal activities soon after non-surgical treatments. Surgery needs two to six weeks' recovery, with no strenuous activity or sex for about six weeks.",
        ],
      },
    ],
    faqs: [
      {
        q: "Are these treatments safe?",
        a: "Every procedure carries some risk. Dr. Shilpa will explain the specific risks of the treatment you are considering, and the alternatives, before you decide.",
      },
      {
        q: "How long does recovery after labiaplasty take?",
        a: "It depends on the extent of surgery and how you heal. Swelling, tenderness and some discomfort are common at first. Dr. Shilpa will give you individual instructions on wound care, returning to work, exercise and sex, and follow-up visits.",
      },
      {
        q: "What are the risks of vaginal rejuvenation treatments?",
        a: "They depend on the procedure or device. Possible problems include pain, bleeding, infection, scarring or changes in sensation. Some treatments marketed as vaginal rejuvenation have limited evidence, so ask about the evidence, alternatives and complications before deciding.",
      },
      {
        q: "Is vaginal rejuvenation surgical or non-surgical?",
        a: "It is a broad term, not one procedure. Some options are surgical and others use non-surgical devices, and their purpose, evidence, risks and recovery differ. Ask exactly which procedure is proposed and whether an alternative may suit your concern better.",
      },
      {
        q: "How do I know whether labiaplasty is right for me?",
        a: "An individual assessment helps clarify your concerns, expectations, risks and alternatives. Labia vary naturally in size and shape, and this variation alone does not mean surgery is medically needed.",
      },
      {
        q: "What is the difference between surgical and non-surgical vaginal tightening?",
        a: "They differ in method, who they suit, evidence, risks and recovery. Dr. Shilpa can examine you and explain the options and alternatives for your concern.",
      },
    ],
    related: ["vaginal-tightening", "hymenoplasty"],
  },
  {
    slug: "vaginal-tightening",
    videoQuery: "vaginal tightening",
    references: ["US FDA safety communication on energy-based devices for vaginal ‘rejuvenation’ (2018)", "NICE guideline NG123: urinary incontinence and pelvic organ prolapse in women (2019)", "ACOG Committee Opinion 795: Elective Female Genital Cosmetic Surgery (2020)"],
    sensitive: true,
    metaTitle: "Private consultation",
    metaDescription: "Private, confidential consultations with Dr. Shilpa Bansal Agrawal in Andheri West.",
    title: "Vaginal tightening",
    category: "cosmetic",
    summary: "Laser and surgical options for vaginal laxity after childbirth or with age.",
    intro: [
      "Childbirth and ageing can stretch the vaginal tissues. This can lead to reduced sensation, mild bladder leakage or dryness. Vaginal tightening aims to address this laxity, either without surgery (laser) or with surgery (vaginoplasty), depending on the degree of laxity.",
      "For bladder leakage, supervised pelvic floor exercises for at least three months are the recommended first step, and often help with laxity too.",
    ],
    sections: [
      {
        heading: "Who may consider it",
        points: [
          "Women with vaginal laxity after childbirth (at least three months after delivery) or with age",
          "Women with vaginal dryness, including after menopause",
          "Women with mild bladder leakage when laughing, jumping or running, once pelvic floor exercises have been tried",
          "Women in good health with realistic expectations of what treatment can and cannot do",
          "Non-smokers",
        ],
        after: "If you plan more children, tell Dr. Shilpa: a later vaginal birth can stretch the tissues again, so surgery is usually best left until your family is complete.",
      },
      {
        heading: "Laser tightening",
        body: [
          "Laser tightening is a non-surgical procedure. A laser probe gently heats the vaginal wall to stimulate new collagen and blood flow, with the aim of improving firmness, elasticity and moisture.",
        ],
        points: [
          "Before: Dr. Shilpa discusses your goals, expectations, risks and benefits, examines you and reviews your medical history. You may be asked to stop smoking and shave the area.",
          "During: you lie on your back with your legs supported. The area is cleaned, numbing cream is applied, and the probe is moved gently around the vaginal wall. It takes 15 to 30 minutes.",
          "After: mild discomfort or swelling can be eased with pain relief or an ice pack. Normal activities can continue the same day; avoid sex and tampons for three to five days.",
          "Follow-up: a check about 5 to 10 days later. Usually three or more sessions are needed.",
        ],
        after: "Evidence that laser tightening works is limited, and the US FDA has warned that these devices are not established as safe or effective for this use.",
      },
      {
        heading: "Surgical vaginoplasty",
        body: [
          "Vaginoplasty tightens the vaginal muscles and surrounding tissue that have stretched, often after childbirth. Through a cut inside the vagina, the muscles are repaired and stitched together, excess tissue is removed and the opening may be narrowed. The cut is closed with dissolvable stitches.",
        ],
        points: [
          "Tightens the muscles and removes excess tissue, with dissolvable stitches",
          "Done under anaesthesia; Dr. Shilpa will tell you how long your procedure takes",
          "Expect some discomfort, swelling and bruising at first; full recovery takes a few weeks or longer",
          "Light exercise after about three weeks; sex after about six weeks",
        ],
        after: "Some women find that comfort, bladder control and confidence improve after surgery, but results vary and no particular outcome can be promised.",
      },
      {
        heading: "Risks",
        points: [
          "Temporary redness, tingling, swelling, tenderness or mild cramping",
          "Pain or bleeding at the treated area, or spotting",
          "Pain during sex or a change in sexual sensation",
          "Infection",
          "Scarring",
        ],
      },
    ],
    faqs: [
      {
        q: "Which option is right for me?",
        a: "Pelvic floor exercises come first. Surgery gives a greater, longer-lasting change for marked laxity. Dr. Shilpa will discuss all the options, including their limits, after examining you.",
      },
      {
        q: "Will I need more than one laser session?",
        a: "Usually yes, three or more, depending on your concern. Surgical tightening is a single procedure.",
      },
      {
        q: "How much does vaginal tightening cost?",
        a: "It depends on the procedure and its extent, anaesthesia fees and follow-up visits. The clinic can give you an estimate once Dr. Shilpa has assessed your needs.",
      },
    ],
    related: ["cosmetic-gynaecology", "hymenoplasty"],
  },
  {
    slug: "hymenoplasty",
    videoQuery: "hymenoplasty",
    references: ["ACOG Committee Opinion 795: Elective Female Genital Cosmetic Surgery (2020)", "Protection of Children from Sexual Offences (POCSO) Act, 2012"],
    sensitive: true,
    metaTitle: "Private consultation",
    metaDescription: "Private, confidential consultations with Dr. Shilpa Bansal Agrawal in Andheri West.",
    title: "Hymenoplasty",
    category: "cosmetic",
    summary: "Private, judgement-free consultation and surgical repair of the hymen.",
    intro: [
      "The hymen is a thin membrane at the vaginal opening. It can stretch or tear through exercise, cycling, horse riding, swimming, tampon use or examination, as well as sex, and some women are born without one. A tear may cause a little pain or bleeding, or none at all. The hymen is not a reliable sign of virginity.",
      "Hymenoplasty repairs or reconstructs it. Adult women choose it for personal, cultural or emotional reasons, including after sexual assault. Every consultation is private and free of judgement. The procedure is offered only to women aged 18 and over.",
    ],
    sections: [
      {
        heading: "Who it may suit",
        points: [
          "Women aged 18 and over who are in good general health",
          "Women who want repair for personal, cultural or religious reasons",
          "Survivors of sexual abuse who feel it would help them emotionally",
          "Women with realistic expectations of what the surgery can offer",
          "Non-smokers",
        ],
        after: "Any vaginal infection or serious medical condition needs treatment first. A repaired hymen may or may not bleed later, so the procedure cannot guarantee any particular outcome.",
      },
      {
        heading: "Preparation",
        points: [
          "Plan the procedure at least eight weeks before any date that matters to you",
          "Tell Dr. Shilpa about any medicines and allergies, including the contraceptive pill and supplements, as some thin the blood",
          "Avoid smoking and alcohol beforehand",
          "Follow the anaesthetist's fasting instructions, usually no food for six hours and clear fluids up to two hours before",
          "Bring loose clothing and soft sanitary pads in case of spotting",
        ],
      },
      {
        heading: "The procedure and recovery",
        body: [
          "Under local or general anaesthetic, uneven edges of the torn hymen are trimmed and the edges are joined in layers with dissolvable stitches so they heal together. If there is little or no hymen, a small flap of nearby vaginal tissue may be used to rebuild it.",
        ],
        points: [
          "Takes 30 to 60 minutes under local or general anaesthetic",
          "Mild discomfort, numbness, swelling and bruising are common for a few days and are eased with prescribed pain relief",
          "Most women return to work in three to four days",
          "Swelling settles in about a week; full healing takes four to six weeks",
          "Avoid sex for six to eight weeks, and use pads rather than tampons",
        ],
      },
      {
        heading: "Aftercare",
        points: [
          "Rest for the first few days and finish any prescribed medicines",
          "Avoid heavy lifting, bending, jogging and other strain for two to three weeks",
          "Shower after two to three days, or as advised; wash the outside gently, pat dry and do not use a jet spray or clean inside the vagina",
          "A warm or cold compress can ease pain or swelling",
          "Avoid swimming pools and saunas for four to six weeks",
          "Avoid smoking and alcohol for three to four weeks and eat a balanced diet",
          "Keep your follow-up appointments",
        ],
        after: "Contact the clinic straight away if you have heavy bleeding, an unusual or foul-smelling discharge, fever or worsening pain.",
      },
    ],
    faqs: [
      {
        q: "Is the procedure confidential?",
        a: "Yes. Your consultation and treatment are kept confidential, within the limits the law requires.",
      },
      {
        q: "How long does the repair last?",
        a: "The repaired hymen remains until it is stretched or torn again, for example by sex or exercise.",
      },
    ],
    related: ["cosmetic-gynaecology", "vaginal-tightening"],
  },
];

export const getTreatment = (slug: string) => treatments.find((t) => t.slug === slug);
