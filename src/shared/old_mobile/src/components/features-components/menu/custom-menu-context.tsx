// import {
// 	createContext,
// 	ReactNode,
// 	useContext,
// 	useEffect,
// 	useMemo,
// 	useState,
// } from 'react'
// import { usePathname, useRouter } from 'expo-router'
// import {
// 	getMenuStateFromPathname,
// 	menuGroups,
// 	normalizeMenuPath,
// } from './custom-menu-data'
// 
// type CustomMenuContextValue = {
// 	activeGroupKey: string
// 	activePageKey: string
// 	activateGroup: (groupKey: string) => void
// 	activatePage: (groupKey: string, pageKey: string) => void
// }
// 
// const CustomMenuContext = createContext<CustomMenuContextValue | null>(null)
// 
// type Props = {
// 	children: ReactNode
// }
// 
// export function CustomMenuProvider({ children }: Props) {
// 	const router = useRouter()
// 	const pathname = usePathname()
// 
// 	const initialState = getMenuStateFromPathname(pathname)
// 
// 	const [activeGroupKey, setActiveGroupKey] = useState(initialState.groupKey)
// 	const [activePageKey, setActivePageKey] = useState(initialState.pageKey)
// 
// 	useEffect(() => {
// 		const nextState = getMenuStateFromPathname(pathname)
// 		setActiveGroupKey(nextState.groupKey)
// 		setActivePageKey(nextState.pageKey)
// 	}, [pathname])
// 
// 	const value = useMemo<CustomMenuContextValue>(
// 		() => ({
// 			activeGroupKey,
// 			activePageKey,
// 			activateGroup: (groupKey) => {
// 				setActiveGroupKey(groupKey)
// 			},
// 			activatePage: (groupKey, pageKey) => {
// 				setActiveGroupKey(groupKey)
// 				setActivePageKey(pageKey)
// 
// 				const group = menuGroups.find((item) => item.key === groupKey)
// 				const page = group?.items.find((item) => item.key === pageKey)
// 
// 				if (!page) return
// 
// 				const nextPath = normalizeMenuPath(String(page.path))
// 
// 				if (pathname !== nextPath) {
// 					router.replace(page.path)
// 				}
// 			},
// 		}),
// 		[activeGroupKey, activePageKey, pathname, router],
// 	)
// 
// 	return (
// 		<CustomMenuContext.Provider value={value}>
// 			{children}
// 		</CustomMenuContext.Provider>
// 	)
// }
// 
// export function useCustomMenu() {
// 	const context = useContext(CustomMenuContext)
// 
// 	if (!context) {
// 		throw new Error('useCustomMenu must be used within CustomMenuProvider')
// 	}
// 
// 	return context
// }
