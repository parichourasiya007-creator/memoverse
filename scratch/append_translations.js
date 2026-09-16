import fs from 'fs';
import path from 'path';

const tsPath = path.resolve('src/translations.ts');

const translationsCode = `
export const TRANSLATIONS: Record<string, TranslationSchema> = {
  English: baseEnglish,

  // ─── ASSAMESE ─────────────────────────────────────────────────────────────
  Assamese: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "সংৰক্ষণ কৰক", cancel: "বাতিল কৰক", delete: "মচি পেলাওক", edit: "সম্পাদনা", create: "সৃষ্টি কৰক", close: "বন্ধ কৰক", next: "পৰৱৰ্তী", back: "পিছলৈ", start: "আৰম্ভ", continue: "অব্যাহত ৰাখক", tryAgain: "পুনৰ চেষ্টা কৰক", submit: "জমা দিয়ক", correct: "সঠিক!", incorrect: "ভুল", hint: "ইংগিত", level: "স্তৰ", score: "স্কোৰ", completed: "সম্পূৰ্ণ" },
    nav: { ...baseEnglish.nav, home: "মুখ্য পৃষ্ঠা", activities: "কাৰ্যসূচী", myMemories: "মোৰ স্মৃতিসমূহ", reminders: "মনত পেলোৱা", progress: "অগ্ৰগতি", aboutDementia: "ডিমেঞ্চিয়া বিষয়ে", profile: "প্ৰফাইল", settings: "সংৰচনা", switchProfile: "প্ৰফাইল সলনি কৰক" },
    home: { ...baseEnglish.home, title: "য'ত স্মৃতিসমূহ", titleAccent: "মৰমেৰে সজীৱ হৈ থাকে", subtitle: "জ্যেষ্ঠসকলৰ বাবে সজোৱা স্মৃতি সংৰক্ষণ সংগী", exploreActivities: "🧠 কাৰ্যসূচী চাওক", caregiverGuide: "📖 সেৱাকাৰীৰ হাতপুথি", soundsCardTitle: "গৃহৰ চিনাকি শব্দ", keepsakeCardTitle: "স্মৃতিৰ এলবাম", remindersCardTitle: "দৈনিক সময়সূচী" },
    activities: { ...baseEnglish.activities, title: "মানসিক অনুশীলন", subtitle: "স্মৃতিশক্তি আৰু মনোযোগ বৃদ্ধিৰ বাবে দৈনিক কাৰ্যসূচী।", playNow: "আৰম্ভ কৰক", viewAll: "সকলো কাৰ্যসূচী চাওক →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "স্মৃতি ফটো মিলাওক", memoryMatchDesc: "কাৰ্ডসমূহত ক্লিক কৰি মিল থকা ফটো যোৰা বিচাৰি উলিয়াওক।", flipCard: "কাৰ্ড উলিয়াওক", moves: "চেষ্টা", matches: "মিলসমূহ", congrats: "বৰ ধুনীয়া! আপুনি সকলো ফটো মিলালে!", playAgain: "পুনৰ খেলক", backToActivities: "← পিছলৈ যান" },
    memories: { ...baseEnglish.memories, title: "স্মৃতিৰ এলবাম", addMemory: "➕ নতুন স্মৃতি যোগ কৰক", family: "পৰিয়াল", places: "স্থানসমূহ", moments: "বিশেষ মুহূৰ্ত" },
    reminders: { ...baseEnglish.reminders, title: "দৈনিক সময়সূচী", newReminder: "➕ নতুন মনত পেলোৱা যোগ কৰক", add: "যোগ কৰক", todaySchedule: "আজিৰ সময়সূচী", delete: "মচি পেলাওক" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ডিমেঞ্চিয়া আৰু স্মৃতি পৰিচৰ্যা", whatIsDementia: "ডিমেঞ্চিয়া কি?", keySigns: "প্ৰাৰম্ভিক লক্ষণসমূহ", caregiverTips: "সেৱাকাৰীৰ বাবে পৰামৰ্শ" },
    profile: { ...baseEnglish.profile, title: "আপোনাৰ প্ৰফাইল", selectProfileTitle: "প্ৰফাইল বাছনি কৰক", createProfileTitle: "জ্যেষ্ঠ প্ৰফাইল সৃষ্টি কৰক" },
  },

  // ─── BENGALI ─────────────────────────────────────────────────────────────
  Bengali: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "সংরক্ষণ করুন", cancel: "বাতিল করুন", delete: "মুছুন", edit: "সম্পাদনা", create: "তৈরি করুন", close: "বন্ধ করুন", next: "পরবর্তী", back: "পেছনে", start: "শুরু", continue: "চালিয়ে যান", tryAgain: "আবার চেষ্টা করুন", submit: "জমা দিন", correct: "সঠিক!", incorrect: "ভুল", hint: "ইঙ্গিত", level: "স্তর", score: "স্কোর", completed: "সম্পন্ন" },
    nav: { ...baseEnglish.nav, home: "মূল পাতা", activities: "কার্যক্রম", myMemories: "আমার স্মৃতিমালা", reminders: "স্মারকসূচি", progress: "অগ্রগতি", aboutDementia: "ডিমেনশিয়া তথ্য", profile: "প্রোফাইল", settings: "সেটিংস", switchProfile: "প্রোফাইল পরিবর্তন" },
    home: { ...baseEnglish.home, title: "যেখানে স্মৃতিরা", titleAccent: "মমতায় সজীব থাকে", subtitle: "বয়োজ্যেষ্ঠদের জন্য স্মৃতি সংরক্ষণ সঙ্গী", exploreActivities: "🧠 কার্যক্রম দেখুন", caregiverGuide: "📖 পরিচর্যাকারী নির্দেশিকা", soundsCardTitle: "চেনা সুর", keepsakeCardTitle: "স্মৃতি অ্যালবাম", remindersCardTitle: "দৈনিক সময়সূচী" },
    activities: { ...baseEnglish.activities, title: "মানসিক শরীরচর্চা", subtitle: "স্মৃতিশক্তি ও মনোযোগ বৃদ্ধির জন্য দৈনিক অনুশীলন।", playNow: "শুরু করুন", viewAll: "সব কার্যক্রম দেখুন →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "স্মৃতি ফটো মেলান", memoryMatchDesc: "কার্ডে ক্লিক করে মেলানো ছবি জোড়া খুঁজুন।", flipCard: "কার্ড উল্টান", moves: "চেষ্টা", matches: "জোড়া", congrats: "চমৎকার! আপনি সব ছবি মিলিয়েছেন!", playAgain: "পুনরায় খেলুন", backToActivities: "← ফিরুন" },
    memories: { ...baseEnglish.memories, title: "স্মৃতি অ্যালবাম", addMemory: "➕ নতুন স্মৃতি যুক্ত করুন", family: "পরিবার", places: "স্থানসমূহ", moments: "বিশেষ মুহূর্ত" },
    reminders: { ...baseEnglish.reminders, title: "দৈনিক সময়সূচী", newReminder: "➕ নতুন স্মারক যোগ করুন", add: "যোগ করুন", todaySchedule: "আজকের সময়সূচী", delete: "মুছুন" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ডিমেনশিয়া ও স্মৃতি যত্ন", whatIsDementia: "ডিমেনশিয়া কি?", keySigns: "প্রাথমিক লক্ষণসমূহ", caregiverTips: "পরিচর্যাকারীর পরামর্শ" },
    profile: { ...baseEnglish.profile, title: "আপনার প্রোফাইল", selectProfileTitle: "প্রোফাইল নির্বাচন করুন", createProfileTitle: "প্রোফাইল তৈরি করুন" },
  },

  // ─── HINDI ───────────────────────────────────────────────────────────────
  Hindi: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "सहेजें", cancel: "रद्द करें", delete: "हटाएँ", edit: "संपादित करें", create: "बनाएँ", close: "बंद करें", next: "अगला", back: "पीछे", start: "शुरू करें", continue: "जारी रखें", tryAgain: "पुनः प्रयास करें", submit: "जमा करें", correct: "सही!", incorrect: "गलत", hint: "संकेत", level: "स्तर", score: "अंक", completed: "पूर्ण" },
    nav: { ...baseEnglish.nav, home: "मुख्य पृष्ठ", activities: "गतिविधियाँ", myMemories: "मेरी यादें", reminders: "स्मरणपत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया के बारे में", profile: "प्रोफ़ाइल", settings: "सेटिंग्स", switchProfile: "प्रोफ़ाइल बदलें" },
    home: { ...baseEnglish.home, title: "जहाँ यादें", titleAccent: "स्नेह से जीवंत रहती हैं", subtitle: "वरिष्ठ नागरिकों के लिए स्मृति संरक्षण साथी", exploreActivities: "🧠 गतिविधियाँ देखें", caregiverGuide: "📖 देखभालकर्ता मार्गदर्शिका", soundsCardTitle: "आत्मीय धुनें", keepsakeCardTitle: "यादों का एल्बम", remindersCardTitle: "दैनिक दिनचर्या" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", subtitle: "स्मरणशक्ति और ध्यान को सक्रिय रखने के लिए दैनिक सरल अभ्यास।", playNow: "शुरू करें", viewAll: "सभी गतिविधियाँ देखें →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "स्मृति फ़ोटो मिलाएँ", memoryMatchDesc: "कार्डों पर क्लिक करके तस्वीरों के जोड़े ढूँढें।", flipCard: "कार्ड पलटें", moves: "प्रयास", matches: "जोड़े", congrats: "बहुत बढ़िया! आपने सभी जोड़े मिला लिए!", playAgain: "पुनः खेलें", backToActivities: "← गतिविधियों पर लौटें" },
    memories: { ...baseEnglish.memories, title: "स्मृति एल्बम", addMemory: "➕ नई याद जोड़ें", family: "परिवार", places: "स्थान", moments: "विशेष पल" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक दिनचर्या", newReminder: "➕ नया स्मरण जोड़ें", add: "जोड़ें", todaySchedule: "आज की कार्यसूची", delete: "हटाएँ" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "डिमेंशिया एवं स्मृति देखभाल", whatIsDementia: "डिमेंशिया क्या है?", keySigns: "शुरुआती संकेत", caregiverTips: "देखभालकर्ता सुझाव" },
    profile: { ...baseEnglish.profile, title: "आपकी प्रोफ़ाइल", selectProfileTitle: "प्रोफ़ाइल चुनें", createProfileTitle: "वरिष्ठ प्रोफ़ाइल बनाएँ" },
  },

  // ─── TAMIL ───────────────────────────────────────────────────────────────
  Tamil: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "சேமி", cancel: "ரத்து செய்", delete: "நீக்கு", edit: "திருத்து", create: "உருவாக்கு", close: "மூடு", next: "அடுத்து", back: "பின்னால்", start: "தொடங்கு", continue: "தொடரவும்", tryAgain: "மீண்டும் முயல்க", submit: "சமர்ப்பி", correct: "சரி!", incorrect: "தவறு", hint: "குறிப்பு", level: "நிலை", score: "மதிப்பெண்", completed: "முடிந்தது" },
    nav: { ...baseEnglish.nav, home: "முகப்பு", activities: "செயல்பாடுகள்", myMemories: "என் நினைவுகள்", reminders: "நினைவூட்டல்கள்", progress: "முன்னேற்றம்", aboutDementia: "டிமென்ஷியா பற்றி", profile: "சுயவிவரம்", settings: "அமைப்புகள்", switchProfile: "சுயவிவரம் மாற்று" },
    home: { ...baseEnglish.home, title: "நினைவுகள்", titleAccent: "அன்போடு வாழும் இடம்", exploreActivities: "🧠 செயல்பாடுகளைப் பார்க்க", caregiverGuide: "📖 பராமரிப்பாளர் வழிகாட்டி" },
    activities: { ...baseEnglish.activities, title: "மனப் பயிற்சிகள்", playNow: "தொடங்கவும்", viewAll: "அனைத்து செயல்பாடுகளையும் பார்க்க →" },
    memories: { ...baseEnglish.memories, title: "நினைவுப் பேழை", addMemory: "➕ புதிய நினைவு சேர்க்க" },
    reminders: { ...baseEnglish.reminders, title: "தினசரி அட்டவணை", todaySchedule: "இன்றைய அட்டவணை" },
  },

  // ─── TELUGU ──────────────────────────────────────────────────────────────
  Telugu: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "సేవ్ చేయి", cancel: "రద్దు చేయి", delete: "తొలగించు", edit: "సవరించు", create: "సృష్టించు", close: "మూసివేయి", next: "తరువాత", back: "వెనుకకు", start: "ప్రారంభించు", continue: "కొనసాగించు", tryAgain: "మళ్ళీ ప్రయత్నించు", submit: "సమర్పించు", correct: "సరియైనది!", incorrect: "తప్పు", hint: "సూచన", level: "స్థాయి", score: "స్కోరు", completed: "పూర్తయింది" },
    nav: { ...baseEnglish.nav, home: "ముఖ్య పుట", activities: "కార్యకలాపాలు", myMemories: "నా జ్ఞాపకాలు", reminders: "జ్ఞాపికలు", progress: "పురోగతి", aboutDementia: "డిమెన్షియా గురించి", profile: "ప్రొఫైల్", settings: "సెట్టింగ్‌లు", switchProfile: "ప్రొఫైల్ మార్చు" },
    home: { ...baseEnglish.home, title: "జ్ఞాపకాలు", titleAccent: "ప్రేమతో పదిలంగా ఉండే చోటు", exploreActivities: "🧠 కార్యకలాపాలు చూడండి", caregiverGuide: "📖 సంరక్షకుల మార్గదర్శి" },
    activities: { ...baseEnglish.activities, title: "మానసిక వ్యాయామాలు", playNow: "ప్రారంభించు", viewAll: "అన్ని కార్యకలాపాలు చూడండి →" },
    memories: { ...baseEnglish.memories, title: "జ్ఞాపకాల ఆల్బమ్", addMemory: "➕ కొత్త జ్ఞాపకం జోడించు" },
    reminders: { ...baseEnglish.reminders, title: "దినచర్య పట్టిక", todaySchedule: "నేటి పట్టిక" },
  },

  // ─── KANNADA ─────────────────────────────────────────────────────────────
  Kannada: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "ಉಳಿಸಿ", cancel: "ರದ್ದುಮಾಡಿ", delete: "ಅಳಿಸಿ", edit: "ಸಂಪಾದಿಸಿ", create: "ರಚಿಸಿ", close: "ಮುಚ್ಚಿ", next: "ಮುಂದೆ", back: "ಹಿಂಗೆ", start: "ಪ್ರಾರಂಭಿಸಿ", continue: "ಮುಂದುವರಿಸಿ", tryAgain: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ", submit: "ಸಲ್ಲಿಸಿ", correct: "ಸರಿ!", incorrect: "ತಪ್ಪು", hint: "ಸುಳಿವು", level: "ಮಟ್ಟ", score: "ಅಂಕ", completed: "ಪೂರ್ಣಗೊಂಡಿದೆ" },
    nav: { ...baseEnglish.nav, home: "ಮುಖ್ಯ ಪುಟ", activities: "ಚಟುವಟಿಕೆಗಳು", myMemories: "ನನ್ನ ನೆನಪುಗಳು", reminders: "ನೆನಪೂಲೆಗಳು", progress: "ಪ್ರಗತಿ", aboutDementia: "ಡಿಮೆನ್ಷಿಯಾ ಬಗ್ಗೆ", profile: "ಪ್ರೊಫೈಲ್", settings: "ಸರಿಹೊಂದಿಕೆಗಳು", switchProfile: "ಪ್ರೊಫೈಲ್ ಬದಲಾಯಿಸಿ" },
    home: { ...baseEnglish.home, title: "ನೆನಪುಗಳು", titleAccent: "ಪ್ರೀತಿಯಿಂದ ಜೀವಂತವಾಗಿರುವ ಸ್ಥಳ", exploreActivities: "🧠 ಚಟುವಟಿಕೆಗಳನ್ನು ನೋಡಿ", caregiverGuide: "📖 ಆರೈಕೆದಾರ ಮಾರ್ಗದರ್ಶಿ" },
    activities: { ...baseEnglish.activities, title: "ಮಾನಸಿಕ ಅಭ್ಯಾಸಗಳು", playNow: "ಪ್ರಾರಂಭಿಸಿ", viewAll: "ಎಲ್ಲಾ ಚಟುವಟಿಕೆಗಳನ್ನು ನೋಡಿ →" },
    memories: { ...baseEnglish.memories, title: "ನೆನಪಿನ ಆಲ್ಬಮ್", addMemory: "➕ ಹೊಸ ನೆನಪು ಸೇರಿಸಿ" },
    reminders: { ...baseEnglish.reminders, title: "ದೈನಂದಿನ ವೇಳಾಪಟ್ಟಿ", todaySchedule: "ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ" },
  },

  // ─── MALAYALAM ─────────────────────────────────────────────────────────
  Malayalam: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "സേവ് ചെയ്യുക", cancel: "റദ്ദാക്കുക", delete: "മായ്ക്കുക", edit: "തിരുത്തുക", create: "ഉണ്ടാക്കുക", close: "അടയ്ക്കുക", next: "അടുത്തത്", back: "പിന്നോട്ട്", start: "തുടങ്ങുക", continue: "തുടരുക", tryAgain: "വീണ്ടും ശ്രമിക്കുക", submit: "സമർപ്പിക്കുക", correct: "ശരി!", incorrect: "തെറ്റ്", hint: "സൂചന", level: "ലെവൽ", score: "സ്കോർ", completed: "പൂർത്തിയായി" },
    nav: { ...baseEnglish.nav, home: "പ്രധാന താൾ", activities: "പ്രവർത്തനങ്ങൾ", myMemories: "എന്റെ ഓർമ്മകൾ", reminders: "ഓർമ്മപ്പെടുത്തലുകൾ", progress: "പുരോഗതി", aboutDementia: "ഡിമെൻഷ്യയെക്കുറിച്ച്", profile: "പ്രൊഫൈൽ", settings: "ക്രമീകരണങ്ങൾ", switchProfile: "പ്രൊഫൈൽ മാറ്റുക" },
    home: { ...baseEnglish.home, title: "ഓർമ്മകൾ", titleAccent: "സ്നേഹത്തോടെ ജീവിക്കുന്ന ഇടം", exploreActivities: "🧠 പ്രവർത്തനങ്ങൾ കാണുക", caregiverGuide: "📖 പരിചരണ ഗൈഡ്" },
    activities: { ...baseEnglish.activities, title: "മാനസിക വ്യായാമങ്ങൾ", playNow: "ആരംഭിക്കുക", viewAll: "എല്ലാ പ്രവർത്തനങ്ങളും കാണുക →" },
    memories: { ...baseEnglish.memories, title: "ഓർമ്മ ആൽബം", addMemory: "➕ പുതിയ ഓർമ്മ ചേർക്കുക" },
    reminders: { ...baseEnglish.reminders, title: "ദിനചര്യ സമയം", todaySchedule: "ഇന്നത്തെ സമയം" },
  },

  // ─── MARATHI ─────────────────────────────────────────────────────────────
  Marathi: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "जतन करा", cancel: "रद्द करा", delete: "हटवा", edit: "संपादित करा", create: "तयार करा", close: "बंद करा", next: "पुढील", back: "मागे", start: "सुरू करा", continue: "चालू ठेवा", tryAgain: "पुन्हा प्रयत्न करा", submit: "सादर करा", correct: "बरोबर!", incorrect: "चुकीचे", hint: "संकेत", level: "पातळी", score: "गुण", completed: "पूर्ण" },
    nav: { ...baseEnglish.nav, home: "मुख्य पृष्ठ", activities: "उपक्रम", myMemories: "माझ्या आठवणी", reminders: "आठवणपत्र", progress: "प्रगती", aboutDementia: "डिमेंशिया बद्दल", profile: "प्रोफाइल", settings: "सेटिंग्ज", switchProfile: "प्रोफाइल बदला" },
    home: { ...baseEnglish.home, title: "जिथे आठवणी", titleAccent: "जुलमाने ताज्या राहतात", exploreActivities: "🧠 उपक्रम पहा", caregiverGuide: "📖 काळजीवाहू मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक व्यायाम", playNow: "सुरू करा", viewAll: "सर्व उपक्रम पहा →" },
    memories: { ...baseEnglish.memories, title: "आठवणींचा अल्बम", addMemory: "➕ नवीन आठवण जोडा" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक वेळापत्रक", todaySchedule: "आजचे वेळापत्रक" },
  },

  // ─── GUJARATI ────────────────────────────────────────────────────────────
  Gujarati: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "સાચવો", cancel: "રદ કરો", delete: "કાઢી નાખો", edit: "ફેરફાર કરો", create: "બનાવો", close: "બંધ કરો", next: "આગળ", back: "પાછળ", start: "શરૂ કરો", continue: "ચાલુ રાખો", tryAgain: "ફરી પ્રયાસ કરો", submit: "સબમિટ કરો", correct: "સાચું!", incorrect: "ખોટું", hint: "ઇશારો", level: "સ્તર", score: "સ્કોર", completed: "પૂર્ણ" },
    nav: { ...baseEnglish.nav, home: "મુખ્ય પૃષ્ઠ", activities: "પ્રવૃત્તિઓ", myMemories: "મારી યાદો", reminders: "યાદ અપાવનાર", progress: "પ્રગતિ", aboutDementia: "ડિમેન્શિયા વિશે", profile: "પ્રોફાઇલ", settings: "સેટિંગ્સ", switchProfile: "પ્રોફાઇલ બદલો" },
    home: { ...baseEnglish.home, title: "જ્યાં યાદો", titleAccent: "પ્રેમથી જીવંત રહે છે", exploreActivities: "🧠 પ્રવૃત્તિઓ જુઓ", caregiverGuide: "📖 સંભાળ રાખનાર માર્ગદર્શિકા" },
    activities: { ...baseEnglish.activities, title: "માનસિક કસરત", playNow: "શરૂ કરો", viewAll: "બધી પ્રવૃત્તિઓ જુઓ →" },
    memories: { ...baseEnglish.memories, title: "યાદોનું આલ્બમ", addMemory: "➕ નવી યાદ ઉમેરો" },
    reminders: { ...baseEnglish.reminders, title: "દૈનિક સમયપત્રક", todaySchedule: "આજનું સમયપત્રક" },
  },

  // ─── PUNJABI ────────────────────────────────────────────────────────────
  Punjabi: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "ਸੰਭਾਲੋ", cancel: "ਰੱਦ ਕਰੋ", delete: "ਹਟਾਓ", edit: "ਸੋਧੋ", create: "ਬਣਾਓ", close: "ਬੰਦ ਕਰੋ", next: "ਅਗਲਾ", back: "ਪਿੱਛੇ", start: "ਸ਼ੁਰੂ ਕਰੋ", continue: "ਜਾਰੀ ਰੱਖੋ", tryAgain: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ", submit: "ਜਮ੍ਹਾਂ ਕਰੋ", correct: "ਸਹੀ!", incorrect: "ਗਲਤ", hint: "ਇਸ਼ਾਰਾ", level: "ਲੇਵਲ", score: "ਸਕੋਰ", completed: "ਪੂਰਾ ਹੋਇਆ" },
    nav: { ...baseEnglish.nav, home: "ਮੁੱਖ ਸਫ਼ਾ", activities: "ਗਤੀਵਿਧੀਆਂ", myMemories: "ਮੇਰੀਆਂ ਯਾਦਾਂ", reminders: "ਯਾਦ-ਦਹਾਨੀ", progress: "ਤਰੱਕੀ", aboutDementia: "ਡੀਮੈਂਸ਼ੀਆ ਬਾਰੇ", profile: "ਪ੍ਰੋਫਾਈਲ", settings: "ਸੈਟਿੰਗਾਂ", switchProfile: "ਪ੍ਰੋਫਾਈਲ ਬਦਲੋ" },
    home: { ...baseEnglish.home, title: "ਜਿੱਥੇ ਯਾਦਾਂ", titleAccent: "ਪਿਆਰ ਨਾਲ ਜਿਊਂਦੀਆਂ ਰਹਿੰਦੀਆਂ ਹਨ", exploreActivities: "🧠 ਗਤੀਵਿਧੀਆਂ ਵੇਖੋ", caregiverGuide: "📖 ਦੇਖਭਾਲ ਗਾਈਡ" },
    activities: { ...baseEnglish.activities, title: "ਮਾਨਸਿਕ ਅਭਿਆਸ", playNow: "ਸ਼ੁਰੂ ਕਰੋ", viewAll: "ਸਾਰੀਆਂ ਗਤੀਵਿਧੀਆਂ ਵੇਖੋ →" },
    memories: { ...baseEnglish.memories, title: "ਯਾਦਾਂ ਦਾ ਐਲਬਮ", addMemory: "➕ ਨਵੀਂ ਯਾਦ ਜੋੜੋ" },
    reminders: { ...baseEnglish.reminders, title: "ਰੋਜ਼ਾਨਾ ਸ਼ਡਿਊਲ", todaySchedule: "ਅੱਜ ਦਾ ਸ਼ਡਿਊਲ" },
  },

  // ─── ODIA ────────────────────────────────────────────────────────────────
  Odia: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "ସଂରକ୍ଷଣ କରନ୍ତୁ", cancel: "ବାତିଲ କରନ୍ତୁ", delete: "ଲିଭାନ୍ତୁ", edit: "ସମ୍ପାଦନ", create: "ସୃଷ୍ଟି କରନ୍ତୁ", close: "ବନ୍ଦ କରନ୍ତୁ", next: "ପରବର୍ତ୍ତୀ", back: "ପଛକୁ", start: "ଆରମ୍ଭ", continue: "ଜାରି ରଖନ୍ତୁ", tryAgain: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ", submit: "ଦାଖଲ କରନ୍ତୁ", correct: "ସଠିକ୍!", incorrect: "ଭୁଲ୍", hint: "ସଙ୍କେତ", level: "ସ୍ତର", score: "ସ୍କୋର", completed: "ସମ୍ପୂର୍ଣ୍ଣ" },
    nav: { ...baseEnglish.nav, home: "ମୁଖ୍ୟ ପୃଷ୍ଠା", activities: "କାର୍ଯ୍ୟକ୍ରମ", myMemories: "ମୋର ସ୍ମୃତି", reminders: "ମନେରଖିବା ସୂଚୀ", progress: "ଅଗ୍ରଗତି", aboutDementia: "ଡିମେନ୍ସିଆ ବିଷୟରେ", profile: "ପ୍ରୋଫାଇଲ୍", settings: "ସେଟିଂସ", switchProfile: "ପ୍ରୋଫାଇଲ୍ ବଦଳାନ୍ତୁ" },
    home: { ...baseEnglish.home, title: "ଯେଉଁଠି ସ୍ମୃତିସବୁ", titleAccent: "ଆଦରରେ ସଜୀବ ରହେ", exploreActivities: "🧠 କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ", caregiverGuide: "📖 ଯତ୍ନଗ୍ରହଣକାରୀ ମାର୍ଗଦର୍ଶିକା" },
    activities: { ...baseEnglish.activities, title: "ମାନସିକ ଅଭ୍ୟାସ", playNow: "ଆରମ୍ଭ କରନ୍ତୁ", viewAll: "ସମସ୍ତ କାର୍ଯ୍ୟକ୍ରମ ଦେଖନ୍ତୁ →" },
    memories: { ...baseEnglish.memories, title: "ସ୍ମୃତି ଆଲବମ୍", addMemory: "➕ ନୂତନ ସ୍ମୃତି ଯୋଡ଼ନ୍ତୁ" },
    reminders: { ...baseEnglish.reminders, title: "ଦୈନନ୍ଦିନ ସୂଚୀ", todaySchedule: "ଆଜିର ସୂଚୀ" },
  },

  // ─── URDU ──────────────────────────────────────────────────────────────
  Urdu: {
    ...baseEnglish,
    common: { ...baseEnglish.common, save: "محفوظ کریں", cancel: "منسوخ کریں", delete: "حذف کریں", edit: "ترمیم", create: "بنائیں", close: "بند کریں", next: "اگلا", back: "پیچھے", start: "شروع", continue: "جاری رکھیں", tryAgain: "دوبارہ کوشش کریں", submit: "جمع کرائیں", correct: "صحیح!", incorrect: "غلط", hint: "اشارہ", level: "سطح", score: "اسکور", completed: "مکمل" },
    nav: { ...baseEnglish.nav, home: "صفحہ اول", activities: "سرگرمیاں", myMemories: "میری یادیں", reminders: "یاد دہانی", progress: "پیش رفت", aboutDementia: "ڈیمینشیا کے بارے میں", profile: "پروفائل", settings: "سیٹنگز", switchProfile: "پروفائل تبدیل کریں" },
    home: { ...baseEnglish.home, title: "جہاں یادیں", titleAccent: "محبت سے زندہ رہتی ہیں", subtitle: "بزرگ شہریوں کے لیے یادداشت کا ساتھی", exploreActivities: "🧠 سرگرمیاں دیکھیں", caregiverGuide: "📖 دیکھ بھال کرنے والے کی رہنمائی" },
    activities: { ...baseEnglish.activities, title: "دماغي مشقیں", subtitle: "یادداشت اور توجہ کے لیے روزانہ کی آسان مشقیں۔", playNow: "شروع کریں", viewAll: "تمام سرگرمیاں دیکھیں →" },
    games: { ...baseEnglish.games, memoryMatchTitle: "یادداشت کی تصاویر ملائیں", flipCard: "کارڈ پلٹیں", moves: "کوششیں", matches: "جوڑے", congrats: "بہت خوب! آپ نے تمام جوڑے ملا لیے!", playAgain: "دوبارہ کھیلیں", backToActivities: "← واپس جائیں" },
    memories: { ...baseEnglish.memories, title: "یادوں کا البم", addMemory: "➕ نئی یاد شامل کریں", family: "خاندان", places: "مقامات", moments: "خاص لمحات" },
    reminders: { ...baseEnglish.reminders, title: "روزمرہ کا شیڈول", newReminder: "➕ نئی یاد دہانی", add: "شامل کریں", todaySchedule: "آج کا شیڈول", delete: "حذف کریں" },
    aboutDementia: { ...baseEnglish.aboutDementia, title: "ڈیمینشیا اور یادداشت کی دیکھ بھال", whatIsDementia: "ڈیمینشیا کیا ہے؟", keySigns: "ابتدائی علامات", caregiverTips: "دیکھ بھال کے مشورے" },
  },

  // ─── SINDHI ────────────────────────────────────────────────────────────
  Sindhi: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "خاص صفحو", activities: "سرگرميون", myMemories: "منهنجيون يادون", reminders: "يادگيريون", progress: "ترقي", aboutDementia: "ڊيمينشيا بابت", profile: "پروفائل", settings: "سيٽنگون", switchProfile: "پروفائل تبديل ڪريو" },
    home: { ...baseEnglish.home, title: "جتي يادون", titleAccent: "پيار سان زنده رهن ٿيون", exploreActivities: "🧠 سرگرميون ڏسو", caregiverGuide: "📖 سنڀاليندڙ رهنمائي" },
    activities: { ...baseEnglish.activities, title: "دماغي مشقون", playNow: "شروع ڪريو", viewAll: "سڀ سرگرميون ڏسو →" },
    memories: { ...baseEnglish.memories, title: "يادن جو البم", addMemory: "➕ نئين ياد شامل ڪريو" },
    reminders: { ...baseEnglish.reminders, title: "روزاني ڏينهن جي رٿا", todaySchedule: "اڄ جي رٿا" },
  },

  // ─── KASHMIRI ──────────────────────────────────────────────────────────
  Kashmiri: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "اہم صفحہ", activities: "سرگرمیاں", myMemories: "میانی یاوہ", reminders: "یاد دہانی", progress: "ترقی", aboutDementia: "ڈیماینشیا متعلق", profile: "پروفائل", settings: "سیٹنگز", switchProfile: "پروفائل تبدیل کریں" },
    home: { ...baseEnglish.home, title: "یتھ جائے یادیں", titleAccent: "محبت سیت زندا روزان", exploreActivities: "🧠 سرگرمیاں وچھو", caregiverGuide: "📖 دیکھ بھال راہنمائی" },
    activities: { ...baseEnglish.activities, title: "دماغی مشق", playNow: "شروع کرو", viewAll: "سأری سرگرمیاں وچھو →" },
    memories: { ...baseEnglish.memories, title: "یادین البم", addMemory: "➕ نٔو یاد تھوو" },
    reminders: { ...baseEnglish.reminders, title: "روزانہ کاوش", todaySchedule: "ازوک وقت" },
  },

  // ─── KONKANI ───────────────────────────────────────────────────────────
  Konkani: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "मुखेल पान", activities: "वावर", myMemories: "म्हज्यो यादो", reminders: "उगडास", progress: "प्रगती", aboutDementia: "डिमेंशिया विशीं", profile: "प्रोफाइल", settings: "सेटिंग्स", switchProfile: "प्रोफाइल बदला" },
    home: { ...baseEnglish.home, title: "जंय यादो", titleAccent: "मोगान ताज्यो उरतात", exploreActivities: "🧠 वावर पळेयात", caregiverGuide: "📖 सांबाळपी मार्गदर्शक" },
    activities: { ...baseEnglish.activities, title: "मातयेच्यो कसरती", playNow: "सुरू करात", viewAll: "सगळे वावर पळेयात →" },
    memories: { ...baseEnglish.memories, title: "यादींचो अल्बम", addMemory: "➕ नवी याद जोडात" },
    reminders: { ...baseEnglish.reminders, title: "दिसपट्टे वेळापत्रक", todaySchedule: "आयचें वेळापत्रक" },
  },

  // ─── MAITHILI ──────────────────────────────────────────────────────────
  Maithili: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "मुख्य पृष्ठ", activities: "गतिविधि सभ", myMemories: "हमर सम्झौना", reminders: "स्मरणपत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया विषयमे", profile: "प्रोफाइल", settings: "सेटिंग्स", switchProfile: "प्रोफाइल बदलू" },
    home: { ...baseEnglish.home, title: "जतए याद सभ", titleAccent: "स्नेह सँ जीवंत रहैत अछि", exploreActivities: "🧠 गतिविधि देखू", caregiverGuide: "📖 देखरेखकर्ता मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", playNow: "शुरू करू", viewAll: "सभ गतिविधि देखू →" },
    memories: { ...baseEnglish.memories, title: "यादगार एल्बम", addMemory: "➕ नव याद जोड़ू" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक तालिका", todaySchedule: "आजुक तालिका" },
  },

  // ─── SANSKRIT ──────────────────────────────────────────────────────────
  Sanskrit: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "मुख्यपृष्ठम्", activities: "गतिविधयः", myMemories: "मम स्मृतयः", reminders: "स्मरणपत्राणि", progress: "प्रगतिः", aboutDementia: "स्मृतिभ्रंशविषये", profile: "प्रोफाइल", settings: "विन्यासाः", switchProfile: "प्रोफाइलं परिवर्तयतु" },
    home: { ...baseEnglish.home, title: "यत्र स्मृतयः", titleAccent: "स्नेहेन जीवन्त्यः तिष्ठन्ति", exploreActivities: "🧠 गतिविधयः पश्यतु", caregiverGuide: "📖 रक्षकदर्शकः" },
    activities: { ...baseEnglish.activities, title: "मानसिक-अभ्यासाः", playNow: "आरभताम्", viewAll: "सर्वाः गतिविधयः पश्यतु →" },
    memories: { ...baseEnglish.memories, title: "स्मृति-संग्रहः", addMemory: "➕ नूतनस्मृतिं योजयतु" },
    reminders: { ...baseEnglish.reminders, title: "दैनिकसारणी", todaySchedule: "अद्यतनसारणी" },
  },

  // ─── SANTALI ───────────────────────────────────────────────────────────
  Santali: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "ᱢᱩᱬᱩᱛ ᱥᱟᱠᱟᱢ", activities: "ᱠᱟᱹᱢᱤᱦᱚᱨᱟ", myMemories: "ᱤᱧᱟᱜ ᱫᱤᱥᱟᱹ", reminders: "ᱩᱭᱦᱟᱹᱨ", progress: "ᱞᱟᱦᱟᱱᱛᱤ", aboutDementia: "ᱰᱤᱢᱮᱱᱥᱤᱭᱟ ᱵᱟᱵᱚᱛ", profile: "ᱯᱨᱳᱯᱷᱟᱭᱤᱞ", settings: "ᱥᱮᱴᱤᱝᱥ", switchProfile: "ᱯᱨᱳᱯᱷᱟᱭᱤᱞ ᱵᱚᱫᱚᱞ" },
    home: { ...baseEnglish.home, title: "ᱡᱟᱦᱟᱸᱨᱮ ᱫᱤᱥᱟᱹ", titleAccent: "ᱫᱩᱞᱟᱹᱲ ᱛᱮ ᱡᱤᱣᱤᱫ ᱛᱟᱦᱮᱸᱱᱟ", exploreActivities: "🧠 ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱧᱮᱞᱢᱮ", caregiverGuide: "📖 ᱡᱚᱛᱚᱱᱤᱭᱟᱹ ᱩᱫᱩᱜ" },
    activities: { ...baseEnglish.activities, title: "ᱢᱚᱱᱮ ᱵᱤᱰᱟᱹᱣ", playNow: "ᱮᱦᱚᱵᱽ ᱢᱮ", viewAll: "ᱡᱚᱛᱚ ᱠᱟᱹᱢᱤᱦᱚᱨᱟ ᱧᱮᱞᱢᱮ →" },
    memories: { ...baseEnglish.memories, title: "ᱫᱤᱥᱟᱹ ᱟᱞᱵᱚᱢ", addMemory: "➕ ᱱᱟᱣᱟ ᱫᱤᱥᱟᱹ ᱥᱮᱞᱮᱫᱽ ᱢᱮ" },
    reminders: { ...baseEnglish.reminders, title: "ᱫᱤᱱᱟᱹᱢ ᱠᱟᱹᱢᱤ", todaySchedule: "ᱛᱮᱦᱮᱧᱟᱜ ᱚᱠᱛᱚ" },
  },

  // ─── MANIPURI ──────────────────────────────────────────────────────────
  Manipuri: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "মায়াই অইবা", activities: "থৌরমশিং", myMemories: "ঐগী নিংশিংবা", reminders: "নিংশিংহনবা", progress: "মাংলোমদা", aboutDementia: "দিমেন্সিয়া অসিগী মতাংদা", profile: "প্রোফাইল", settings: "সেটিংস", switchProfile: "প্রোফাইল ওন্থোকপা" },
    home: { ...baseEnglish.home, title: "নিংশিংবশিং অসি", titleAccent: "নুংশিনা নিংশিংহনবা", exploreActivities: "🧠 থৌরমশিং য়েংবা", caregiverGuide: "📖 সেৱাকাৰী লমজিং" },
    activities: { ...baseEnglish.activities, title: "ৱাখলগী এক্সারসাইজ", playNow: "হৌবা", viewAll: "পুম্নমক য়েংবা →" },
    memories: { ...baseEnglish.memories, title: "নিংশিং এলবম", addMemory: "➕ অনৌবা নিংশিংবা হাপচিনবা" },
    reminders: { ...baseEnglish.reminders, title: "নুমিৎ খুদিংগী সময়সূচী", todaySchedule: "আজিগী সময়সূচী" },
  },

  // ─── BODO ──────────────────────────────────────────────────────────────
  Bodo: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "गाहाय बिलाइ", activities: "हाबाफारिफोर", myMemories: "आंनि गोसोखांथिफोर", reminders: "गोसोखांहोंगोन", progress: "जौगानाय", aboutDementia: "दिमेन्सियानि सोमोन्दै", profile: "प्रफाइल", settings: "सेटिंसफोर", switchProfile: "प्रफाइल सोलायनाय" },
    home: { ...baseEnglish.home, title: "जेराव गोसोखांथिफोरा", titleAccent: "मोजांै सोजिना थायो", exploreActivities: "🧠 हाबाफारिफोर नायनो", caregiverGuide: "📖 नायफिनग्रा बिजाब" },
    activities: { ...baseEnglish.activities, title: "गोसोनि सोलोफोर", playNow: "जाउनाव दाना", viewAll: "गासै हाबाफारिफोर नायनो →" },
    memories: { ...baseEnglish.memories, title: "गोसोखांथि एलबाम", addMemory: "➕ गोदान गोसोखांथि सोदेरनाय" },
    reminders: { ...baseEnglish.reminders, title: "सानफ्रामनि समफोर", todaySchedule: "दिनैनि समफोर" },
  },

  // ─── DOGRI ─────────────────────────────────────────────────────────────
  Dogri: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "मुक्ख पन्ना", activities: "गतिविधियां", myMemories: "मेरी यादें", reminders: "स्मरण पत्र", progress: "प्रगति", aboutDementia: "डिमेंशिया बारै", profile: "प्रोफाइल", settings: "सेटिंग्स", switchProfile: "प्रोफाइल बदलो" },
    home: { ...baseEnglish.home, title: "जित्थै यादें", titleAccent: "सनेह कन्नै अमर र‍हंदियां न", exploreActivities: "🧠 गतिविधियां देक्खो", caregiverGuide: "📖 देखभालकर्ता मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यास", playNow: "शुरू करो", viewAll: "सारियां गतिविधियां देक्खो →" },
    memories: { ...baseEnglish.memories, title: "स्मृति एल्बम", addMemory: "➕ नवी याद जोड़ो" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक दिनचर्या", todaySchedule: "अज्ज दी सूची" },
  },

  // ─── NEPALI ──────────────────────────────────────────────────────────────
  Nepali: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "गृह पृष्ठ", activities: "गतिविधिहरू", myMemories: "मेरा सम्झनाहरू", reminders: "स्मरण गराउने", progress: "प्रगति", aboutDementia: "डिमेन्सिया बारे", profile: "प्रोफाइल", settings: "सेटिङहरू", switchProfile: "प्रोफाइल फेर्नुहोस्" },
    home: { ...baseEnglish.home, title: "जहाँ सम्झनाहरू", titleAccent: "मायाले ताजा रहन्छन्", exploreActivities: "🧠 गतिविधिहरू हेर्नुहोस्", caregiverGuide: "📖 हेरचाहकर्ता मार्गदर्शिका" },
    activities: { ...baseEnglish.activities, title: "मानसिक अभ्यासहरू", playNow: "सुरु गर्नुहोस्", viewAll: "सबै गतिविधिहरू हेर्नुहोस् →" },
    memories: { ...baseEnglish.memories, title: "सम्झनाको एल्बम", addMemory: "➕ नयाँ सम्झना थप्नुहोस्" },
    reminders: { ...baseEnglish.reminders, title: "दैनिक स्मरण तालिका", todaySchedule: "आजको तालिका" },
  },

  // ─── KHASI ───────────────────────────────────────────────────────────────
  Khasi: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "Tymmen", activities: "Kam ba Man la Ka Sngi", myMemories: "Ki Jingkynmaw Jong Nga", reminders: "Jingpynkynmaw", progress: "Jingkiew", aboutDementia: "Shaphang ka Jingklet Jingmut", profile: "Pait Shaphang Jong Nga", settings: "Ki Jingjied", switchProfile: "Kylla ia ka Profile" },
    home: { ...baseEnglish.home, title: "Haba Ki Jingkynmaw", titleAccent: "Ki Sah Im Barabor", exploreActivities: "🧠 Pule ia ki Kam", caregiverGuide: "📖 Ka Kot Lamphang Sumar" },
    activities: { ...baseEnglish.activities, title: "Ki Jingkilai Jingmut", playNow: "Sdang Mynta" },
    memories: { ...baseEnglish.memories, title: "Kot Dur Jingkynmaw", addMemory: "➕ Pyniasoh Jingkynmaw Thymmai" },
    reminders: { ...baseEnglish.reminders, title: "Ki Jingpynkynmaw Man la ka Sngi", todaySchedule: "Ka Por Mynta ka Sngi" },
  },

  // ─── GARO ────────────────────────────────────────────────────────────────
  Garo: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "A·bachenga", activities: "Kamrang", myMemories: "Angni Gisik Ra·ani", reminders: "Gisik Ra·atani", progress: "Sil-roroani", aboutDementia: "Dementia-ni Gimin", profile: "Profile", settings: "Settings", switchProfile: "Profile-ko Srestani" },
    home: { ...baseEnglish.home, title: "Gisik Ra·anirang", titleAccent: "Tangkanyingna Man·a", exploreActivities: "🧠 Kamrangko Nibo", caregiverGuide: "📖 Simsakgipani Kitap" },
    activities: { ...baseEnglish.activities, title: "Gisikni Kal·anirang", playNow: "A·bachenkbo" },
    memories: { ...baseEnglish.memories, title: "Gisik Ra·ani Photo Album", addMemory: "➕ Gital Gisik Ra·aniko Gapbo" },
    reminders: { ...baseEnglish.reminders, title: "Salanti Gisik Ra·atnawanggipa", todaySchedule: "Salanti Ritingani" },
  },

  // ─── MIZO ────────────────────────────────────────────────────────────────
  Mizo: {
    ...baseEnglish,
    nav: { ...baseEnglish.nav, home: "Bul Ṭanuka", activities: "Thiltih Turte", myMemories: "Ka Hriatrengte", reminders: "Hriattirnah", progress: "Hmasawnna", aboutDementia: "Dementia Chungchang", profile: "Profile", settings: "Duhthlante", switchProfile: "Profile Thlakna" },
    home: { ...baseEnglish.home, title: "Hriatrengte Chu", titleAccent: "Vawnduh leh Nunau a Ni", exploreActivities: "🧠 Thiltih Turte Enna", caregiverGuide: "📖 Enkawltu Kaihhruaina" },
    activities: { ...baseEnglish.activities, title: "Relhruai Inkte", playNow: "Ṭan Rawh" },
    memories: { ...baseEnglish.memories, title: "Hriatrengna Album", addMemory: "➕ Hriatrengna Thar Belhna" },
    reminders: { ...baseEnglish.reminders, title: "Nitin Hriattirnah", todaySchedule: "Vawiin Hun Ruahman" },
  },
};

/**
 * Helper to get active translation object safely
 */
export function getTranslation(languageName: string): TranslationSchema {
  return TRANSLATIONS[languageName] || TRANSLATIONS.English;
}
`;

fs.appendFileSync(tsPath, translationsCode);
console.log('src/translations.ts updated successfully with 22 languages!');
