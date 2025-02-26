import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '../lang/en';
import ar from '../lang/ar';

// Get the device's locale information
const getLocale = () => {
    const locales = Localization.getLocales();
    return locales && locales.length > 0 ? locales[0].languageTag : 'en';
};

// Configure i18next
i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        fallbackLng: 'en',
        lng: getLocale(),
        resources: {
            en: { translation: en },
            ar: { translation: ar }
        },
    });

export default i18n;