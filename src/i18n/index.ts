import AsyncStorage from '@react-native-async-storage/async-storage';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './messages/en.json';
import pl from './messages/pl.json';
import ru from './messages/ru.json';
import uk from './messages/uk.json';

export const languages = [
  { code: 'pl', label: 'Polski' },
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
] as const;

export type Language = (typeof languages)[number]['code'];

export const DEFAULT_LANGUAGE: Language = 'pl';

const STORAGE_KEY = 'residdy.language';
const i18n = createInstance();
let initialization: Promise<void> | undefined;
let pendingSave = Promise.resolve();

function isLanguage(value: unknown): value is Language {
  return languages.some(({ code }) => code === value);
}

async function initialize() {
  let language: Language = DEFAULT_LANGUAGE;

  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) language = saved;
  } catch (error) {
    console.warn('Could not restore language preference.', error);
  }

  await i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      uk: { translation: uk },
      pl: { translation: pl },
      ru: { translation: ru },
    },
    lng: language,
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: languages.map(({ code }) => code),
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export function initializeLanguage() {
  initialization ??= initialize();
  return initialization;
}

export async function setLanguage(language: Language) {
  await i18n.changeLanguage(language);
  // Serialize writes so quick taps persist the last selected language.
  pendingSave = pendingSave
    .then(() => AsyncStorage.setItem(STORAGE_KEY, language))
    .catch((error: unknown) => {
      // Translation still works if storage is unavailable.
      console.warn('Could not save language preference.', error);
    });
  await pendingSave;
}

export default i18n;
