export type SupportedLanguage = "en" | "rw" | "fr" | "sw" | "ch" | "hi" | "br";

export const languageOptions: { code: SupportedLanguage; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "gb" },
  { code: "rw", label: "Kinyarwanda", flag: "rw" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "sw", label: "Kiswahili", flag: "tz" },
  { code: "ch", label: "中文", flag: "cn" },
  { code: "hi", label: "हिन्दी", flag: "in" },
  { code: "br", label: "Bamanankan", flag: "ml" },
];

type HeaderCopy = {
  languageName: string;
  selectLanguage: string;
  joinCommunity: string;
  navigation: Record<string, string>;
};

export const manualHeaderCopy: Record<SupportedLanguage, HeaderCopy> = {
  en: {
    languageName: "English",
    selectLanguage: "Select language",
    joinCommunity: "JOIN THE COMMUNITY",
    navigation: {
      HOME: "HOME", "OUR LEGACY": "OUR LEGACY", "EXPLORE SOLUTIONS": "EXPLORE SOLUTIONS",
      "DRIVING CHANGE": "DRIVING CHANGE", "E-VISITORS": "E-VISITORS", "SAN HUB": "SAN HUB",
      "TECH PULSE": "TECH PULSE", "CONNECT WITH US": "CONNECT WITH US",
    },
  },
  rw: {
    languageName: "Kinyarwanda",
    selectLanguage: "Hitamo ururimi",
    joinCommunity: "INJIRA MU MURYANGO",
    navigation: {
      HOME: "AHABANZA", "OUR LEGACY": "AMATEKA YACU", "EXPLORE SOLUTIONS": "SHAKISHA IBISUBIZO",
      "DRIVING CHANGE": "GUTEZA IMBERE IMPINDUKA", "E-VISITORS": "E-VISITORS", "SAN HUB": "SAN HUB",
      "TECH PULSE": "TECH PULSE", "CONNECT WITH US": "TWANDIKIRE",
    },
  },
  fr: {
    languageName: "Français",
    selectLanguage: "Choisir la langue",
    joinCommunity: "REJOINDRE LA COMMUNAUTÉ",
    navigation: {
      HOME: "ACCUEIL", "OUR LEGACY": "NOTRE HISTOIRE", "EXPLORE SOLUTIONS": "EXPLORER LES SOLUTIONS",
      "DRIVING CHANGE": "CONDUIRE LE CHANGEMENT", "E-VISITORS": "E-VISITORS", "SAN HUB": "SAN HUB",
      "TECH PULSE": "TECH PULSE", "CONNECT WITH US": "NOUS CONTACTER",
    },
  },
  sw: {
    languageName: "Kiswahili",
    selectLanguage: "Chagua lugha",
    joinCommunity: "JIUNGE NA JUMUIYA",
    navigation: {
      HOME: "NYUMBANI", "OUR LEGACY": "URITHI WETU", "EXPLORE SOLUTIONS": "GUNDUA SULUHISHO",
      "DRIVING CHANGE": "KUONGOZA MABADILIKO", "E-VISITORS": "E-VISITORS", "SAN HUB": "SAN HUB",
      "TECH PULSE": "TECH PULSE", "CONNECT WITH US": "WASILIANA NASI",
    },
  },
  ch: {
    languageName: "中文",
    selectLanguage: "选择语言",
    joinCommunity: "加入社区",
    navigation: {
      HOME: "首页", "OUR LEGACY": "我们的传承", "EXPLORE SOLUTIONS": "探索解决方案",
      "DRIVING CHANGE": "推动变革", "E-VISITORS": "电子访客", "SAN HUB": "SAN HUB",
      "TECH PULSE": "科技动态", "CONNECT WITH US": "联系我们",
    },
  },
  hi: {
    languageName: "हिन्दी",
    selectLanguage: "भाषा चुनें",
    joinCommunity: "समुदाय से जुड़ें",
    navigation: {
      HOME: "होम", "OUR LEGACY": "हमारी विरासत", "EXPLORE SOLUTIONS": "समाधान देखें",
      "DRIVING CHANGE": "बदलाव लाना", "E-VISITORS": "ई-विज़िटर्स", "SAN HUB": "SAN HUB",
      "TECH PULSE": "टेक पल्स", "CONNECT WITH US": "हमसे संपर्क करें",
    },
  },
  br: {
    languageName: "Bamanankan",
    selectLanguage: "Kan sugandi",
    joinCommunity: "DON MƆGƆW KƆNƆ",
    navigation: {
      HOME: "SO", "OUR LEGACY": "AN KA ƝININKALI", "EXPLORE SOLUTIONS": "FƆ AƝƐSƐNW YE",
      "DRIVING CHANGE": "MABƆN NIƝƐ", "E-VISITORS": "E-VISITORS", "SAN HUB": "SAN HUB",
      "TECH PULSE": "TECH PULSE", "CONNECT WITH US": "AN KƐNƐ",
    },
  },
};
