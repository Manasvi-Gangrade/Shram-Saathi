export type RiskBand = "low" | "mid" | "high";

export type ClauseFinding = {
  id: string;
  code: "Wages" | "OSH" | "Social Security" | "Industrial Relations";
  section: string;
  title: string;
  severity: "critical" | "major" | "minor" | "compliant";
  observation: string;
  observationHi: string;
  penalty: string;
  resolve: string;
  resolveHi: string;
  weight: number;
};

export type Establishment = {
  lin: string;
  name: string;
  sector: string;
  district: string;
  cluster: string;
  workers: number;
  score: number;
  band: RiskBand;
  lastInspection: string;
  registers: number;
  findings: ClauseFinding[];
  benchmark: { metric: string; establishment: number; sectorNorm: number }[];
  trend: { month: string; score: number }[];
};

const wageFinding: ClauseFinding = {
  id: "w-6-1",
  code: "Wages",
  section: "Section 6(1), Code on Wages, 2019",
  title: "Minimum wage rate below notified floor",
  severity: "critical",
  observation:
    "Wage register shows ₹380/day for skilled tailoring labour. Notified Zone B skilled minimum wage is ₹440/day - a shortfall of ₹60/day across 112 workers.",
  observationHi:
    "वेतन रजिस्टर में कुशल श्रमिकों को ₹380 प्रतिदिन दिया गया है, जबकि ज़ोन बी की अधिसूचित न्यूनतम मजदूरी ₹440 प्रतिदिन है - 112 श्रमिकों पर ₹60 प्रतिदिन की कमी।",
  penalty: "Up to ₹50,000; ₹1,00,000 with imprisonment on repeat within 5 years",
  resolve:
    "Revise the wage sheet to ₹440/day, pay arrears of ₹2,01,600 for the last 30 days, and re-upload the corrected register within 15 days.",
  resolveHi:
    "मजदूरी ₹440 प्रतिदिन करें, पिछले 30 दिनों का ₹2,01,600 बकाया भुगतान करें और 15 दिनों में सुधरा रजिस्टर अपलोड करें।",
  weight: 26,
};

const otFinding: ClauseFinding = {
  id: "w-13",
  code: "Wages",
  section: "Section 13, Code on Wages, 2019",
  title: "Overtime paid below twice ordinary rate",
  severity: "major",
  observation:
    "428 overtime hours logged in Feb 2026 were paid at 1.25x. Statute mandates not less than twice the ordinary rate of wages.",
  observationHi:
    "फरवरी 2026 में 428 ओवरटाइम घंटों का भुगतान 1.25 गुना दर पर हुआ, जबकि कानून के अनुसार सामान्य दर का दोगुना अनिवार्य है।",
  penalty: "Up to ₹20,000 per contravention",
  resolve: "Recompute OT at 2x (₹110/hour), release differential of ₹42,800 and update the OT muster.",
  resolveHi: "ओवरटाइम 2 गुना (₹110/घंटा) पर गिनें, ₹42,800 का अंतर दें और ओटी मस्टर अद्यतन करें।",
  weight: 16,
};

const oshFinding: ClauseFinding = {
  id: "osh-23",
  code: "OSH",
  section: "Section 23, OSH & Working Conditions Code, 2020",
  title: "Safety equipment certification lapsed",
  severity: "critical",
  observation:
    "Pressure vessel test certificate expired on 11 Jan 2026; 9 of 34 workers in the hot-work zone lack issued PPE records.",
  observationHi:
    "दबाव पात्र का परीक्षण प्रमाणपत्र 11 जनवरी 2026 को समाप्त हो गया; हॉट-वर्क क्षेत्र के 34 में से 9 श्रमिकों के पीपीई रिकॉर्ड नहीं हैं।",
  penalty: "Up to ₹5,00,000 where contravention causes bodily injury",
  resolve:
    "Book a competent-person re-test within 7 days, issue PPE against signed acknowledgement, and upload the fresh Form 2 certificate.",
  resolveHi:
    "7 दिनों में सक्षम व्यक्ति से पुनः परीक्षण कराएँ, हस्ताक्षर सहित पीपीई दें और नया फॉर्म 2 प्रमाणपत्र अपलोड करें।",
  weight: 22,
};

const ssFinding: ClauseFinding = {
  id: "ss-17",
  code: "Social Security",
  section: "Section 17, Code on Social Security, 2020",
  title: "EPF contribution remitted late",
  severity: "major",
  observation:
    "ECR for Dec 2025 and Jan 2026 was filed on the 24th, beyond the 15th-of-month statutory deadline. Damages accrue under Section 128.",
  observationHi:
    "दिसंबर 2025 और जनवरी 2026 का ईसीआर 24 तारीख को दाखिल हुआ, जो 15 तारीख की वैधानिक समय-सीमा के बाद है।",
  penalty: "Damages up to 25% p.a. plus interest at 12% p.a.",
  resolve: "Remit ₹31,450 arrear with interest, enable auto-debit mandate before the 10th of each month.",
  resolveHi: "₹31,450 बकाया ब्याज सहित जमा करें, हर माह 10 तारीख से पहले ऑटो-डेबिट सक्षम करें।",
  weight: 14,
};

const irFinding: ClauseFinding = {
  id: "ir-29",
  code: "Industrial Relations",
  section: "Section 29, Industrial Relations Code, 2020",
  title: "Standing orders not certified",
  severity: "minor",
  observation:
    "Establishment employs 312 workers but has not obtained certification of standing orders within the six-month window.",
  observationHi:
    "प्रतिष्ठान में 312 श्रमिक हैं परंतु छह माह की अवधि में स्थायी आदेशों का प्रमाणन नहीं कराया गया।",
  penalty: "Up to ₹1,00,000",
  resolve: "Submit draft standing orders to the certifying officer with the recognised union's comments.",
  resolveHi: "मान्यता प्राप्त संघ की टिप्पणियों सहित मसौदा स्थायी आदेश प्रमाणन अधिकारी को भेजें।",
  weight: 8,
};

const compliantWage: ClauseFinding = {
  id: "ok-w-3",
  code: "Wages",
  section: "Section 3, Code on Wages, 2019",
  title: "No gender-based wage discrimination",
  severity: "compliant",
  observation: "Equal wage rates verified across 64 male and 48 female workers for the same class of work.",
  observationHi: "समान कार्य के लिए 64 पुरुष व 48 महिला श्रमिकों को समान मजदूरी सत्यापित।",
  penalty: "-",
  resolve: "Maintain the current parity register format.",
  resolveHi: "वर्तमान समता रजिस्टर प्रारूप बनाए रखें।",
  weight: 0,
};

const compliantOsh: ClauseFinding = {
  id: "ok-osh-6",
  code: "OSH",
  section: "Section 6, OSH & WC Code, 2020",
  title: "Annual health check-ups completed",
  severity: "compliant",
  observation: "All 112 workers underwent the mandated annual medical examination in Nov 2025.",
  observationHi: "सभी 112 श्रमिकों की नवंबर 2025 में अनिवार्य वार्षिक चिकित्सा जांच पूर्ण।",
  penalty: "-",
  resolve: "Schedule the next cycle before Nov 2026.",
  resolveHi: "अगला चक्र नवंबर 2026 से पहले निर्धारित करें।",
  weight: 0,
};

export const ESTABLISHMENTS: Establishment[] = [
  {
    lin: "LIN-1082-9923-4120",
    name: "Radha Krishna Garments Pvt Ltd",
    sector: "Textiles & Apparel",
    district: "Bengaluru Urban, Karnataka",
    cluster: "Peenya Industrial Area, Phase II",
    workers: 112,
    score: 38,
    band: "high",
    lastInspection: "14 Aug 2024",
    registers: 9,
    findings: [wageFinding, otFinding, ssFinding, compliantWage],
    benchmark: [
      { metric: "Wage rate (₹/day)", establishment: 380, sectorNorm: 452 },
      { metric: "OT multiplier (x100)", establishment: 125, sectorNorm: 200 },
      { metric: "EPF on-time %", establishment: 61, sectorNorm: 93 },
      { metric: "Safety training hrs", establishment: 4, sectorNorm: 12 },
      { metric: "Register digitisation %", establishment: 55, sectorNorm: 88 },
    ],
    trend: [
      { month: "Sep", score: 52 },
      { month: "Oct", score: 49 },
      { month: "Nov", score: 46 },
      { month: "Dec", score: 43 },
      { month: "Jan", score: 40 },
      { month: "Feb", score: 38 },
    ],
  },
  {
    lin: "LIN-2245-7781-0093",
    name: "Bharat Infra Ltd - Okhla Site",
    sector: "Construction & Infrastructure",
    district: "South Delhi, NCT of Delhi",
    cluster: "Okhla Industrial Area, Phase III",
    workers: 312,
    score: 61,
    band: "mid",
    lastInspection: "02 Mar 2025",
    registers: 14,
    findings: [oshFinding, irFinding, compliantOsh],
    benchmark: [
      { metric: "PPE issuance %", establishment: 74, sectorNorm: 96 },
      { metric: "Safety officer ratio", establishment: 1, sectorNorm: 2 },
      { metric: "Incident rate (per 1k)", establishment: 9, sectorNorm: 4 },
      { metric: "Welfare facility score", establishment: 68, sectorNorm: 82 },
      { metric: "Contractor licence %", establishment: 88, sectorNorm: 95 },
    ],
    trend: [
      { month: "Sep", score: 54 },
      { month: "Oct", score: 56 },
      { month: "Nov", score: 57 },
      { month: "Dec", score: 59 },
      { month: "Jan", score: 60 },
      { month: "Feb", score: 61 },
    ],
  },
  {
    lin: "LIN-3390-1124-8876",
    name: "Greenwood Logistics & Warehousing",
    sector: "Transport & Warehousing",
    district: "Thane, Maharashtra",
    cluster: "Bhiwandi Logistics Cluster",
    workers: 87,
    score: 84,
    band: "low",
    lastInspection: "19 Jan 2026",
    registers: 11,
    findings: [ssFinding, compliantWage, compliantOsh],
    benchmark: [
      { metric: "ESI coverage %", establishment: 97, sectorNorm: 91 },
      { metric: "EPF on-time %", establishment: 88, sectorNorm: 90 },
      { metric: "Wage rate (₹/day)", establishment: 498, sectorNorm: 470 },
      { metric: "Grievance closure %", establishment: 92, sectorNorm: 78 },
      { metric: "Register digitisation %", establishment: 96, sectorNorm: 85 },
    ],
    trend: [
      { month: "Sep", score: 72 },
      { month: "Oct", score: 75 },
      { month: "Nov", score: 78 },
      { month: "Dec", score: 80 },
      { month: "Jan", score: 82 },
      { month: "Feb", score: 84 },
    ],
  },
  {
    lin: "LIN-4471-5560-2214",
    name: "Sharma Kirana & General Stores",
    sector: "Retail (Micro Enterprise)",
    district: "Indore, Madhya Pradesh",
    cluster: "Sanwer Road Trade Belt",
    workers: 6,
    score: 72,
    band: "mid",
    lastInspection: "Never inspected",
    registers: 4,
    findings: [otFinding, compliantWage],
    benchmark: [
      { metric: "Wage slip issuance %", establishment: 66, sectorNorm: 80 },
      { metric: "Working hours compliance", establishment: 71, sectorNorm: 86 },
      { metric: "ESI enrolment %", establishment: 50, sectorNorm: 74 },
      { metric: "Register digitisation %", establishment: 40, sectorNorm: 62 },
      { metric: "Grievance closure %", establishment: 85, sectorNorm: 70 },
    ],
    trend: [
      { month: "Sep", score: 64 },
      { month: "Oct", score: 66 },
      { month: "Nov", score: 68 },
      { month: "Dec", score: 69 },
      { month: "Jan", score: 71 },
      { month: "Feb", score: 72 },
    ],
  },
];

export type SampleDoc = {
  id: string;
  title: string;
  kind: string;
  lin: string;
  pages: number;
  sizeKb: number;
  extracted: { field: string; value: string; status: "ok" | "flag" }[];
  findingIds: string[];
};

export const SAMPLE_DOCS: SampleDoc[] = [
  {
    id: "doc-wage",
    title: "Radha Krishna Garments - Wage Register 2026",
    kind: "Form XVII Wage Register (PDF, scanned)",
    lin: "LIN-1082-9923-4120",
    pages: 7,
    sizeKb: 1842,
    extracted: [
      { field: "Establishment name", value: "Radha Krishna Garments Pvt Ltd", status: "ok" },
      { field: "Wage period", value: "01 Feb 2026 – 29 Feb 2026", status: "ok" },
      { field: "Workers on roll", value: "112 (64 M / 48 F)", status: "ok" },
      { field: "Skilled daily wage", value: "₹380.00", status: "flag" },
      { field: "Notified Zone B minimum", value: "₹440.00", status: "flag" },
      { field: "Overtime hours", value: "428 hrs @ 1.25x", status: "flag" },
      { field: "Wage slips issued", value: "Yes - digital + printed", status: "ok" },
    ],
    findingIds: ["w-6-1", "w-13", "ok-w-3"],
  },
  {
    id: "doc-osh",
    title: "Bharat Infra Ltd - OSH Safety Audit",
    kind: "OSH Safety Checklist & Form 2 certificates (PDF)",
    lin: "LIN-2245-7781-0093",
    pages: 12,
    sizeKb: 3120,
    extracted: [
      { field: "Site", value: "Okhla Industrial Area, Phase III", status: "ok" },
      { field: "Workers on site", value: "312", status: "ok" },
      { field: "Pressure vessel certificate", value: "Expired 11 Jan 2026", status: "flag" },
      { field: "PPE issuance records", value: "25 of 34 hot-work workers", status: "flag" },
      { field: "Safety committee", value: "Constituted 18 Jul 2025", status: "ok" },
      { field: "Annual health check-ups", value: "Completed Nov 2025", status: "ok" },
      { field: "Standing orders", value: "Draft, not certified", status: "flag" },
    ],
    findingIds: ["osh-23", "ir-29", "ok-osh-6"],
  },
  {
    id: "doc-esi",
    title: "Greenwood Logistics - ESI / EPF Filing",
    kind: "ECR challan + ESI contribution statement (PDF)",
    lin: "LIN-3390-1124-8876",
    pages: 5,
    sizeKb: 964,
    extracted: [
      { field: "Employer code", value: "MHTHA0094218000", status: "ok" },
      { field: "Contribution month", value: "Jan 2026", status: "ok" },
      { field: "EPF remittance date", value: "24 Feb 2026 (due 15 Feb)", status: "flag" },
      { field: "ESI covered workers", value: "84 of 87", status: "ok" },
      { field: "Total EPF remitted", value: "₹4,18,220", status: "ok" },
      { field: "UAN seeding", value: "100% Aadhaar-verified", status: "ok" },
    ],
    findingIds: ["ss-17", "ok-w-3"],
  },
  {
    id: "doc-clra",
    title: "Nandi Contractors - CLRA Muster Roll",
    kind: "Contract Labour Form XVI muster roll (image scan)",
    lin: "LIN-2245-7781-0093",
    pages: 4,
    sizeKb: 1290,
    extracted: [
      { field: "Principal employer", value: "Bharat Infra Ltd", status: "ok" },
      { field: "Contract labour engaged", value: "96", status: "ok" },
      { field: "Contractor licence", value: "Valid till 30 Sep 2026", status: "ok" },
      { field: "Attendance gaps", value: "7 days unsigned by supervisor", status: "flag" },
      { field: "Wage disbursal mode", value: "Bank transfer (92%), cash (8%)", status: "flag" },
    ],
    findingIds: ["ir-29", "w-13"],
  },
];

export const ALL_FINDINGS: ClauseFinding[] = [
  wageFinding,
  otFinding,
  oshFinding,
  ssFinding,
  irFinding,
  compliantWage,
  compliantOsh,
];

export const PIPELINE_STAGES = [
  {
    key: "ingest",
    title: "Ingestion & Pre-processing",
    detail: "De-skew, denoise, split 7 pages, detect Devanagari + Latin scripts, compute SHA-256 document hash.",
  },
  {
    key: "ocr",
    title: "OCR Layout Parsing & Field Normalisation",
    detail: "Table-aware OCR maps columns to canonical labour-code fields: worker count, wage rate, OT hours, PPE, certificates.",
  },
  {
    key: "rag",
    title: "RAG LLM Compliance Interpretation",
    detail: "Retrieves clauses from the 4 Labour Codes + state notifications, reasons over extracted fields, drafts candidate flags with citations.",
  },
  {
    key: "rules",
    title: "Deterministic Statutory Rule Engine",
    detail: "Every LLM flag is re-validated against hard-coded statutory thresholds. Unverifiable flags are dropped - zero hallucinated notices.",
  },
  {
    key: "anomaly",
    title: "Sector Anomaly Detection",
    detail: "Compares establishment metrics against regional sector norms to surface outliers that deserve a facilitation visit.",
  },
] as const;

export const DGFASLI_COVERAGE = [
  { year: "2014", coverage: 47.56 },
  { year: "2016", coverage: 41.2 },
  { year: "2018", coverage: 34.8 },
  { year: "2020", coverage: 28.4 },
  { year: "2022", coverage: 23.6 },
  { year: "2024", coverage: 19.12 },
];

export const CLUSTER_RISK = [
  { cluster: "Peenya Industrial Area, Phase II", district: "Bengaluru Urban", establishments: 412, high: 96, score: 41 },
  { cluster: "Okhla Industrial Area, Phase III", district: "South Delhi", establishments: 388, high: 71, score: 58 },
  { cluster: "Bhiwandi Logistics Cluster", district: "Thane", establishments: 265, high: 28, score: 79 },
  { cluster: "Tiruppur Knitwear Cluster", district: "Tiruppur", establishments: 521, high: 118, score: 46 },
  { cluster: "Sanwer Road Trade Belt", district: "Indore", establishments: 197, high: 34, score: 68 },
  { cluster: "Surat Diamond & Textile Belt", district: "Surat", establishments: 604, high: 87, score: 63 },
];

export const AUDIT_LOG = [
  { time: "2026-02-28 09:14:22 IST", actor: "INSP/KA/BLR/0271", action: "Scorecard viewed", target: "LIN-1082-9923-4120", basis: "Statutory duty - Sec 34 OSH Code" },
  { time: "2026-02-28 09:16:04 IST", actor: "AI-ENGINE/rule-v4.2", action: "Rule-engine revalidation", target: "doc-wage (SHA-256 …a19f)", basis: "Automated processing log" },
  { time: "2026-02-27 17:02:51 IST", actor: "EMP/LIN-3390…8876", action: "Consent granted - wage data", target: "Self", basis: "DPDP Sec 6 - informed consent" },
  { time: "2026-02-27 12:41:09 IST", actor: "WORKER/UAN-1002…4417", action: "Erasure request raised", target: "Voice recording ID vr-8821", basis: "DPDP Sec 12(3) - right to erasure" },
  { time: "2026-02-26 08:33:47 IST", actor: "SYSTEM", action: "Key rotation (AES-256-GCM)", target: "documents-at-rest bucket", basis: "Security safeguard - Sec 8(5)" },
];

export const SMS_SCRIPTS: Record<string, { from: string; body: string }[]> = {
  en: [
    { from: "MoLE-SHRAM", body: "SHRAM SATHI: Wage register for LIN-1082…4120 checked. 3 issues found. Risk: HIGH (38/100). Reply 1 for details." },
    { from: "You", body: "1" },
    { from: "MoLE-SHRAM", body: "Issue 1: Daily wage Rs 380 is below the legal minimum Rs 440 (Sec 6, Code on Wages). Pay arrears Rs 2,01,600 in 15 days." },
    { from: "MoLE-SHRAM", body: "Issue 2: Overtime paid at 1.25x, law needs 2x. Issue 3: EPF filed late. Reply 2 for a free helpline call-back." },
    { from: "You", body: "2" },
    { from: "MoLE-SHRAM", body: "Call-back booked for today 4:30 PM in Hindi from Facilitator Office, Peenya. No penalty if fixed before 15 Mar 2026." },
  ],
  hi: [
    { from: "MoLE-SHRAM", body: "श्रम साथी: LIN-1082…4120 का वेतन रजिस्टर जांचा गया। 3 समस्याएँ मिलीं। जोखिम: उच्च (38/100)। विवरण हेतु 1 भेजें।" },
    { from: "आप", body: "1" },
    { from: "MoLE-SHRAM", body: "समस्या 1: दैनिक मजदूरी ₹380 है, वैध न्यूनतम ₹440 (धारा 6, वेतन संहिता)। 15 दिन में ₹2,01,600 बकाया दें।" },
    { from: "MoLE-SHRAM", body: "समस्या 2: ओवरटाइम 1.25 गुना, नियम 2 गुना। समस्या 3: ईपीएफ देर से। नि:शुल्क कॉल-बैक हेतु 2 भेजें।" },
    { from: "आप", body: "2" },
    { from: "MoLE-SHRAM", body: "आज शाम 4:30 बजे हिंदी में कॉल-बैक तय। 15 मार्च 2026 से पहले सुधार करने पर कोई जुर्माना नहीं।" },
  ],
};

export const IVR_TREE: Record<
  string,
  { prompt: string; promptHi: string; options: { key: string; label: string; labelHi: string; next: string }[] }
> = {
  root: {
    prompt:
      "Namaste. You have reached Shram Sathi, Ministry of Labour and Employment. For compliance status press 1. To report a wage issue press 2. To speak to a facilitator press 3.",
    promptHi:
      "नमस्ते। आप श्रम साथी, श्रम एवं रोजगार मंत्रालय पर पहुँचे हैं। अनुपालन स्थिति के लिए 1 दबाएँ। मजदूरी शिकायत के लिए 2 दबाएँ। सुविधाकर्ता से बात करने के लिए 3 दबाएँ।",
    options: [
      { key: "1", label: "Compliance status", labelHi: "अनुपालन स्थिति", next: "status" },
      { key: "2", label: "Report wage issue", labelHi: "मजदूरी शिकायत", next: "wage" },
      { key: "3", label: "Talk to facilitator", labelHi: "सुविधाकर्ता से बात", next: "facilitator" },
    ],
  },
  status: {
    prompt:
      "Your establishment LIN ending 4120 has a compliance score of 38 out of 100. Risk level high. Three issues are open. Press 1 to hear the first issue. Press 9 to return to the main menu.",
    promptHi:
      "आपके प्रतिष्ठान, एलआईएन 4120 का अनुपालन स्कोर 100 में से 38 है। जोखिम स्तर उच्च। तीन समस्याएँ लंबित हैं। पहली समस्या सुनने के लिए 1 दबाएँ। मुख्य मेनू के लिए 9 दबाएँ।",
    options: [
      { key: "1", label: "First issue", labelHi: "पहली समस्या", next: "issue" },
      { key: "9", label: "Main menu", labelHi: "मुख्य मेनू", next: "root" },
    ],
  },
  issue: {
    prompt:
      "Issue one. Daily wage of rupees 380 is below the notified minimum of rupees 440 under Section 6 of the Code on Wages. Pay arrears of rupees 2 lakh 1 thousand 600 within 15 days. Press 9 for the main menu.",
    promptHi:
      "समस्या एक। दैनिक मजदूरी ₹380 है जो वेतन संहिता की धारा 6 के तहत अधिसूचित न्यूनतम ₹440 से कम है। 15 दिनों में ₹2 लाख 1 हज़ार 600 बकाया दें। मुख्य मेनू के लिए 9 दबाएँ।",
    options: [{ key: "9", label: "Main menu", labelHi: "मुख्य मेनू", next: "root" }],
  },
  wage: {
    prompt:
      "Your wage complaint has been registered with token number S S 2 6 0 4 4 1. A facilitator from your district will call within 48 hours. Your identity stays confidential. Press 9 for the main menu.",
    promptHi:
      "आपकी मजदूरी शिकायत टोकन संख्या एस एस 2 6 0 4 4 1 से दर्ज हुई। आपके जिले का सुविधाकर्ता 48 घंटे में कॉल करेगा। आपकी पहचान गोपनीय रहेगी। मुख्य मेनू के लिए 9 दबाएँ।",
    options: [{ key: "9", label: "Main menu", labelHi: "मुख्य मेनू", next: "root" }],
  },
  facilitator: {
    prompt:
      "Connecting you to the Inspector cum Facilitator office, Peenya, Bengaluru. Average wait time is 40 seconds. This call is recorded for quality and is encrypted. Press 9 for the main menu.",
    promptHi:
      "आपको निरीक्षक-सह-सुविधाकर्ता कार्यालय, पीन्या, बेंगलुरु से जोड़ा जा रहा है। औसत प्रतीक्षा 40 सेकंड। यह कॉल गुणवत्ता हेतु रिकॉर्ड व एन्क्रिप्टेड है। मुख्य मेनू के लिए 9 दबाएँ।",
    options: [{ key: "9", label: "Main menu", labelHi: "मुख्य मेनू", next: "root" }],
  },
};

export function bandOf(score: number): RiskBand {
  if (score >= 75) return "low";
  if (score >= 50) return "mid";
  return "high";
}

export const BAND_META: Record<RiskBand, { label: string; labelHi: string; color: string; emoji: string }> = {
  low: { label: "Low Risk", labelHi: "कम जोखिम", color: "var(--risk-low)", emoji: "✅" },
  mid: { label: "Moderate Risk", labelHi: "मध्यम जोखिम", color: "var(--risk-mid)", emoji: "⚠️" },
  high: { label: "High Risk", labelHi: "उच्च जोखिम", color: "var(--risk-high)", emoji: "⛔" },
};
