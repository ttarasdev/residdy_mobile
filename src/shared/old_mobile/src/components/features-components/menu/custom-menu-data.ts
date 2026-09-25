// import { Href } from 'expo-router'
// import { ImageSourcePropType } from 'react-native'
// import { TABS_PATHS } from '@/src/shared/enums/page-paths'
// 
// export interface CustomMenuItem {
// 	key: string
// 	path: Href
// 	icon: ImageSourcePropType
// }
// 
// export interface CustomMenuGroupData {
// 	key: string
// 	icon: ImageSourcePropType
// 	items: CustomMenuItem[]
// }
// 
// export const menuIcons = {
// 	home: require('@/assets/menu/home.png'),
// 	blog: require('@/assets/menu/blog.png'),
// 	products: require('@/assets/menu/products.png'),
// 	cases: require('@/assets/menu/cases.png'),
// 	consultation: require('@/assets/menu/consultations.png'),
// 	docs: require('@/assets/menu/docs.png'),
// 	partners: require('@/assets/menu/partners.png'),
// 	questions: require('@/assets/menu/questions.png'),
// } as const
// 
// export const menuGroups: CustomMenuGroupData[] = [
// 	{
// 		key: 'home',
// 		icon: menuIcons.home,
// 		items: [
// 			{
// 				key: 'home',
// 				path: TABS_PATHS.HOME as Href,
// 				icon: menuIcons.home,
// 			},
// 			{
// 				key: 'blog',
// 				path: TABS_PATHS.BLOG as Href,
// 				icon: menuIcons.blog,
// 			},
// 			{
// 				key: 'questions',
// 				path: TABS_PATHS.QUESTIONS as Href,
// 				icon: menuIcons.questions,
// 			},
// 			{
// 				key: 'products',
// 				path: TABS_PATHS.PRODUCTS as Href,
// 				icon: menuIcons.products,
// 			},
// 		],
// 	},
// 	{
// 		key: 'legalization',
// 		icon: menuIcons.cases,
// 		items: [
// 			{
// 				key: 'consultation',
// 				path: TABS_PATHS.CONSULTATIONS as Href,
// 				icon: menuIcons.consultation,
// 			},
// 			{
// 				key: 'docs',
// 				path: TABS_PATHS.DOCS as Href,
// 				icon: menuIcons.docs,
// 			},
// 			{
// 				key: 'partners',
// 				path: TABS_PATHS.PARTNERS as Href,
// 				icon: menuIcons.partners,
// 			},
// 			{
// 				key: 'cases-types',
// 				path: TABS_PATHS.CASES_TYPES as Href,
// 				icon: menuIcons.cases,
// 			},
// 		],
// 	},
// ]
// 
// export function normalizeMenuPath(path: string) {
// 	return path.replace(/\/\([^/]+\)/g, '')
// }
// 
// export function getMenuStateFromPathname(pathname: string) {
// 	for (const group of menuGroups) {
// 		for (const item of group.items) {
// 			if (pathname.startsWith(normalizeMenuPath(String(item.path)))) {
// 				return {
// 					groupKey: group.key,
// 					pageKey: item.key,
// 				}
// 			}
// 		}
// 	}
// 
// 	return {
// 		groupKey: menuGroups[0].key,
// 		pageKey: menuGroups[0].items[0].key,
// 	}
// }
