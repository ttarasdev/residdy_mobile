// import { getCurrentLanguage } from '@/src/i18n'
// import { Languages } from '../enums/languages.enum'
// 
// type DateInput = string | Date
// 
// const localeByLanguage: Record<Languages, string> = {
// 	[Languages.UA]: 'uk-UA',
// 	[Languages.PL]: 'pl-PL',
// 	[Languages.EN]: 'en-US',
// 	[Languages.RU]: 'ru-RU',
// }
// 
// const justNowByLanguage: Record<Languages, string> = {
// 	[Languages.UA]: 'щойно',
// 	[Languages.PL]: 'przed chwilą',
// 	[Languages.EN]: 'just now',
// 	[Languages.RU]: 'только что',
// }
// 
// const minuteAgoByLanguage: Record<Languages, string> = {
// 	[Languages.UA]: 'хв тому',
// 	[Languages.PL]: 'min temu',
// 	[Languages.EN]: 'min ago',
// 	[Languages.RU]: 'мин назад',
// }
// 
// const hourAgoByLanguage: Record<Languages, string> = {
// 	[Languages.UA]: 'год тому',
// 	[Languages.PL]: 'godz. temu',
// 	[Languages.EN]: 'h ago',
// 	[Languages.RU]: 'ч назад',
// }
// 
// const getFallbackRelativeDate = (
// 	value: number,
// 	unit: 'minute' | 'hour',
// 	lan: Languages,
// ) => {
// 	const absValue = Math.abs(value)
// 
// 	if (unit === 'minute') {
// 		return `${absValue} ${minuteAgoByLanguage[lan]}`
// 	}
// 
// 	return `${absValue} ${hourAgoByLanguage[lan]}`
// }
// 
// export const getPostDateLabel = (date: DateInput): string => {
// 	const lan = getCurrentLanguage()
// 	const createdAt = new Date(date)
// 	const now = new Date()
// 
// 	const isToday =
// 		createdAt.getDate() === now.getDate() &&
// 		createdAt.getMonth() === now.getMonth() &&
// 		createdAt.getFullYear() === now.getFullYear()
// 
// 	if (!isToday) {
// 		return new Intl.DateTimeFormat(localeByLanguage[lan], {
// 			day: 'numeric',
// 			month: 'long',
// 			year: 'numeric',
// 		}).format(createdAt)
// 	}
// 
// 	const diffInSeconds = Math.floor(
// 		(now.getTime() - createdAt.getTime()) / 1000,
// 	)
// 
// 	if (diffInSeconds < 60) {
// 		return justNowByLanguage[lan]
// 	}
// 
// 	const RelativeTimeFormat =
// 		typeof Intl !== 'undefined' ? Intl.RelativeTimeFormat : undefined
// 
// 	if (diffInSeconds < 3600) {
// 		const minutes = Math.floor(diffInSeconds / 60)
// 
// 		if (!RelativeTimeFormat) {
// 			return getFallbackRelativeDate(-minutes, 'minute', lan)
// 		}
// 
// 		const formatter = new RelativeTimeFormat(localeByLanguage[lan], {
// 			numeric: 'always',
// 		})
// 
// 		return formatter.format(-minutes, 'minute')
// 	}
// 
// 	const hours = Math.floor(diffInSeconds / 3600)
// 
// 	if (!RelativeTimeFormat) {
// 		return getFallbackRelativeDate(-hours, 'hour', lan)
// 	}
// 
// 	const formatter = new RelativeTimeFormat(localeByLanguage[lan], {
// 		numeric: 'always',
// 	})
// 
// 	return formatter.format(-hours, 'hour')
// }
