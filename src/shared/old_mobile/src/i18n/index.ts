// import i18n from 'i18next'
// import { initReactI18next } from '@/node_modules/react-i18next'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as Localization from 'expo-localization'
// import { Languages as Language } from '@/src/shared/enums/languages.enum'
// 
// import en from '../messages/en.json'
// import pl from '../messages/pl.json'
// import ua from '../messages/ua.json'
// import ru from '../messages/ru.json'
// 
// const STORAGE_KEY = 'app.locale'
// 
// const normalizeLanguage = (raw?: string | null): Language => {
// 	const value = (raw ?? '').trim().toUpperCase()
// 
// 	if (value.startsWith(Language.PL)) return Language.PL
// 	if (value.startsWith(Language.UA)) return Language.UA
// 	if (value.startsWith(Language.RU)) return Language.RU
// 	return Language.EN
// }
// 
// export const getDeviceLanguage = (): Language => {
// 	const locales = Localization.getLocales()
// 	const raw =
// 		locales?.[0]?.languageTag ||
// 		locales?.[0]?.languageCode ||
// 		Intl.DateTimeFormat().resolvedOptions().locale ||
// 		null
// 
// 	return normalizeLanguage(raw)
// }
// 
// export const bootstrapI18n = async (): Promise<Language> => {
// 	if (i18n.isInitialized) {
// 		return normalizeLanguage(i18n.language)
// 	}
// 
// 	const saved = await AsyncStorage.getItem(STORAGE_KEY)
// 	const initialLanguage = saved
// 		? normalizeLanguage(saved)
// 		: getDeviceLanguage()
// 
// 	await i18n.use(initReactI18next).init({
// 		resources: {
// 			EN: { translation: en },
// 			PL: { translation: pl },
// 			UA: { translation: ua },
// 			RU: { translation: ru },
// 		},
// 		lng: initialLanguage,
// 		fallbackLng: Language.EN,
// 		supportedLngs: [Language.EN, Language.PL, Language.UA, Language.RU],
// 		interpolation: { escapeValue: false },
// 		returnNull: false,
// 	})
// 
// 	return initialLanguage
// }
// 
// export const setAppLanguage = async (language: Language) => {
// 	const normalizedLanguage = normalizeLanguage(language)
// 	await i18n.changeLanguage(normalizedLanguage)
// 	await AsyncStorage.setItem(STORAGE_KEY, normalizedLanguage)
// }
// 
// export const getCurrentLanguage = (): Language => {
// 	return normalizeLanguage(i18n.language)
// }
// 
// export default i18n
