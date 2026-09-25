// import { GDocType } from '@/src/api/g-docs-api/g-doc-types/g-doc-types.types'
// import { Languages } from '../enums/languages.enum'
// import { ConsultationCategory } from '@/src/api/consultation-api/consultation-categories/consultation-categories.types'
// import { CaseType } from '@/src/api/cases-api/case-types/case-types.types'
// import { TypesListItem } from '@/src/components/features-components/types-list/TypesList'
// import { GDocTemplate } from '@/src/api/g-docs-api/g-doc-templates/g-doc-templates.types'
// import { Case } from '@/src/api/cases-api/cases/cases.types'
// 
// const getGDocTypeTitle = (item: GDocType, lan: Languages) => {
// 	switch (lan) {
// 		case Languages.UA:
// 			return item.titleUA
// 		case Languages.PL:
// 			return item.titlePL
// 		case Languages.EN:
// 			return item.titleEN
// 		case Languages.RU:
// 			return item.titleRU
// 		default:
// 			return item.titleEN
// 	}
// }
// 
// const getConsultationCategoryTitle = (
// 	item: ConsultationCategory,
// 	lan: Languages,
// ) => {
// 	switch (lan) {
// 		case Languages.UA:
// 			return item.titleUa
// 		case Languages.PL:
// 			return item.titlePl
// 		case Languages.EN:
// 			return item.titleEn
// 		case Languages.RU:
// 			return item.titleRu
// 		default:
// 			return item.titleEn
// 	}
// }
// 
// export const mapCaseTypesToTypesListItems = (
// 	items: CaseType[],
// ): TypesListItem[] => {
// 	return items.map((item) => ({
// 		id: item.id,
// 		title: item.title,
// 		icon: item.icon,
// 	}))
// }
// 
// export const mapGDocTypesToTypesListItems = (
// 	items: GDocType[],
// 	lan: Languages,
// ): TypesListItem[] => {
// 	return items.map((item) => ({
// 		id: item.id,
// 		title: getGDocTypeTitle(item, lan),
// 		icon: item.icon,
// 	}))
// }
// 
// export const mapConsultationCategoriesToTypesListItems = (
// 	items: ConsultationCategory[],
// 	lan: Languages,
// ): TypesListItem[] => {
// 	return items.map((item) => ({
// 		id: item.id,
// 		title: getConsultationCategoryTitle(item, lan),
// 		icon: item.asset,
// 	}))
// }
// 
// const getGDocTemplateTitle = (item: GDocTemplate, lan: Languages) => {
// 	switch (lan) {
// 		case Languages.UA:
// 			return item.titleUA
// 		case Languages.PL:
// 			return item.titlePL
// 		case Languages.EN:
// 			return item.titleEN
// 		case Languages.RU:
// 			return item.titleRU
// 		default:
// 			return item.titleEN
// 	}
// }
// 
// export const mapCasesToTypesListItems = (items: Case[]): TypesListItem[] => {
// 	return items.map((item) => ({
// 		id: item.id,
// 		title: item.title,
// 		icon: item.icon,
// 	}))
// }
// 
// export const mapGDocTemplatesToTypesListItems = (
// 	items: GDocTemplate[],
// 	lan: Languages,
// ): TypesListItem[] => {
// 	return items.map((item) => ({
// 		id: item.id,
// 		title: getGDocTemplateTitle(item, lan),
// 		icon: item.icon,
// 	}))
// }
