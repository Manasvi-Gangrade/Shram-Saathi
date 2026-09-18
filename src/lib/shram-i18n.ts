export type LangCode = "en" | "hi" | "ta" | "bn" | "mr" | "te" | "kn" | "gu";

export const LANGUAGES: { code: LangCode; label: string; english: string; speech: string }[] = [
  { code: "en", label: "English", english: "English", speech: "en-IN" },
  { code: "hi", label: "हिन्दी", english: "Hindi", speech: "hi-IN" },
  { code: "ta", label: "தமிழ்", english: "Tamil", speech: "ta-IN" },
  { code: "bn", label: "বাংলা", english: "Bengali", speech: "bn-IN" },
  { code: "mr", label: "मराठी", english: "Marathi", speech: "mr-IN" },
  { code: "te", label: "తెలుగు", english: "Telugu", speech: "te-IN" },
  { code: "kn", label: "ಕನ್ನಡ", english: "Kannada", speech: "kn-IN" },
  { code: "gu", label: "ગુજરાતી", english: "Gujarati", speech: "gu-IN" },
];

type Dict = Record<string, Partial<Record<LangCode, string>> & { en: string }>;

export const STRINGS: Dict = {
  portalName: {
    en: "SHRAM SATHI",
    hi: "श्रम साथी",
    ta: "ஷ்ரம் சாத்தி",
    bn: "শ্রম সাথী",
    mr: "श्रम साथी",
    te: "శ్రమ సాథి",
    kn: "ಶ್ರಮ ಸಾಥಿ",
    gu: "શ્રમ સાથી",
  },
  tagline: {
    en: "AI-Powered Inclusive Compliance Intelligence Portal",
    hi: "एआई आधारित समावेशी अनुपालन बुद्धिमत्ता पोर्टल",
    ta: "செயற்கை நுண்ணறிவு அடிப்படையிலான உள்ளடக்கிய இணக்க தளம்",
    bn: "এআই-চালিত অন্তর্ভুক্তিমূলক কমপ্লায়েন্স পোর্টাল",
    mr: "एआय आधारित समावेशक अनुपालन पोर्टल",
    te: "ఏఐ ఆధారిత సమ్మిళిత సమ్మతి పోర్టల్",
    kn: "ಎಐ ಆಧಾರಿತ ಒಳಗೊಳ್ಳುವ ಅನುಸರಣೆ ಪೋರ್ಟಲ್",
    gu: "એઆઈ આધારિત સમાવેશી અનુપાલન પોર્ટલ",
  },
  ministry: {
    en: "Ministry of Labour & Employment, Government of India",
    hi: "श्रम एवं रोजगार मंत्रालय, भारत सरकार",
    ta: "தொழிலாளர் மற்றும் வேலைவாய்ப்பு அமைச்சகம், இந்திய அரசு",
    bn: "শ্রম ও কর্মসংস্থান মন্ত্রক, ভারত সরকার",
    mr: "श्रम व रोजगार मंत्रालय, भारत सरकार",
    te: "కార్మిక మరియు ఉపాధి మంత్రిత్వ శాఖ, భారత ప్రభుత్వం",
    kn: "ಕಾರ್ಮಿಕ ಮತ್ತು ಉದ್ಯೋಗ ಸಚಿವಾಲಯ, ಭಾರತ ಸರ್ಕಾರ",
    gu: "શ્રમ અને રોજગાર મંત્રાલય, ભારત સરકાર",
  },
  navOverview: { en: "Executive Overview", hi: "कार्यकारी अवलोकन", ta: "நிர்வாக பார்வை", bn: "নির্বাহী সারসংক্ষেপ", mr: "कार्यकारी आढावा", te: "కార్యనిర్వాహక సమగ్రం", kn: "ಕಾರ್ಯನಿರ್ವಾಹಕ ಅವಲೋಕನ", gu: "કારોબારી ઝલક" },
  navDocs: { en: "Document AI Engine", hi: "दस्तावेज़ एआई इंजन", ta: "ஆவண AI இயந்திரம்", bn: "নথি এআই ইঞ্জিন", mr: "कागदपत्र एआय इंजिन", te: "పత్ర ఏఐ ఇంజిన్", kn: "ದಾಖಲೆ ಎಐ ಎಂಜಿನ್", gu: "દસ્તાવેજ એઆઈ એન્જિન" },
  navScorecard: { en: "Compliance Scorecard", hi: "अनुपालन स्कोरकार्ड", ta: "இணக்க மதிப்பெண்", bn: "কমপ্লায়েন্স স্কোরকার্ড", mr: "अनुपालन गुणपत्रिका", te: "సమ్మతి స్కోర్‌కార్డ్", kn: "ಅನುಸರಣೆ ಸ್ಕೋರ್‌ಕಾರ್ಡ್", gu: "અનુપાલન સ્કોરકાર્ડ" },
  navVoice: { en: "Inclusive Voice Suite", hi: "समावेशी वाणी सुविधा", ta: "உள்ளடக்கிய குரல் தொகுப்பு", bn: "অন্তর্ভুক্তিমূলক ভয়েস স্যুট", mr: "समावेशक आवाज संच", te: "సమ్మిళిత వాయిస్ సూట్", kn: "ಒಳಗೊಳ್ಳುವ ಧ್ವನಿ ಸೂಟ್", gu: "સમાવેશી વોઇસ સ્યુટ" },
  navEmployer: { en: "Employer Portal", hi: "नियोक्ता पोर्टल", ta: "முதலாளர் தளம்", bn: "নিয়োগকর্তা পোর্টাল", mr: "मालक पोर्टल", te: "యజమాని పోర్టల్", kn: "ಉದ್ಯೋಗದಾತ ಪೋರ್ಟಲ್", gu: "એમ્પ્લોયર પોર્ટલ" },
  navInspector: { en: "Inspector Dashboard", hi: "निरीक्षक डैशबोर्ड", ta: "ஆய்வாளர் டாஷ்போர்டு", bn: "পরিদর্শক ড্যাশবোর্ড", mr: "निरीक्षक डॅशबोर्ड", te: "ఇన్‌స్పెక్టర్ డాష్‌బోర్డ్", kn: "ಪರಿವೀಕ್ಷಕ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್", gu: "ઇન્સ્પેક્ટર ડેશબોર્ડ" },
  navDpdp: { en: "DPDP & Security", hi: "डीपीडीपी एवं सुरक्षा", ta: "DPDP & பாதுகாப்பு", bn: "ডিপিডিপি ও নিরাপত্তা", mr: "डीपीडीपी व सुरक्षा", te: "డీపీడీపీ & భద్రత", kn: "ಡಿಪಿಡಿಪಿ ಮತ್ತು ಸುರಕ್ಷತೆ", gu: "ડીપીડીપી અને સુરક્ષા" },
  navPitch: { en: "Pitch Deck", hi: "प्रस्तुति", ta: "விளக்கக்காட்சி", bn: "পিচ ডেক", mr: "सादरीकरण", te: "పిచ్ డెక్", kn: "ಪಿಚ್ ಡೆಕ್", gu: "પિચ ડેક" },
  riskLow: { en: "Low Risk", hi: "कम जोखिम", ta: "குறைந்த ஆபத்து", bn: "কম ঝুঁকি", mr: "कमी धोका", te: "తక్కువ ప్రమాదం", kn: "ಕಡಿಮೆ ಅಪಾಯ", gu: "ઓછું જોખમ" },
  riskMid: { en: "Moderate Risk", hi: "मध्यम जोखिम", ta: "நடுத்தர ஆபத்து", bn: "মধ্যম ঝুঁকি", mr: "मध्यम धोका", te: "మధ్యస్థ ప్రమాదం", kn: "ಮಧ್ಯಮ ಅಪಾಯ", gu: "મધ્યમ જોખમ" },
  riskHigh: { en: "High Risk", hi: "उच्च जोखिम", ta: "அதிக ஆபத்து", bn: "উচ্চ ঝুঁকি", mr: "उच्च धोका", te: "అధిక ప్రమాదం", kn: "ಹೆಚ್ಚಿನ ಅಪಾಯ", gu: "ઊંચું જોખમ" },
  listen: { en: "Listen", hi: "सुनें", ta: "கேள்", bn: "শুনুন", mr: "ऐका", te: "వినండి", kn: "ಕೇಳಿ", gu: "સાંભળો" },
  askSathi: { en: "Ask Shram Sathi", hi: "श्रम साथी से पूछें", ta: "ஷ்ரம் சாத்தியிடம் கேள்", bn: "শ্রম সাথীকে জিজ্ঞাসা করুন", mr: "श्रम साथीला विचारा", te: "శ్రమ సాథిని అడగండి", kn: "ಶ್ರಮ ಸಾಥಿಯನ್ನು ಕೇಳಿ", gu: "શ્રમ સાથીને પૂછો" },
};

export function t(key: keyof typeof STRINGS, lang: LangCode): string {
  const entry = STRINGS[key as string];
  if (!entry) return String(key);
  return (entry[lang] as string | undefined) ?? entry.en;
}

export function speechLocale(lang: LangCode) {
  return LANGUAGES.find((l) => l.code === lang)?.speech ?? "en-IN";
}
