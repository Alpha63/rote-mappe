import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { de } from './locales/de';
import { en } from './locales/en';

const resources = {
  de,
  en
};


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

if (i18n.language) {
  document.documentElement.lang = i18n.language;
}

export default i18n;
