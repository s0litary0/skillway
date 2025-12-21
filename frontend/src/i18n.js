import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ru from "./locales/ru.json";
// import kk from "./locales/kk.json";

i18n
  .use(LanguageDetector) // Detect language automatically
  .use(initReactI18next) // Hook into React
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      // kk: { translation: kk },
    },
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false, // React escapes by default
    },
  });

export default i18n;
