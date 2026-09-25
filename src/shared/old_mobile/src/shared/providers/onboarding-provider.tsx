// import { createContext, useContext, useMemo, useState } from 'react'
// import { Languages } from '@/src/shared/enums/languages.enum'
// 
// type OnboardingData = {
// 	lan: Languages | null
// 	name: string | null
// 	surname: string | null
// 	location: string | null
// 	phone: string | null
// }
// 
// type OnboardingContextValue = {
// 	data: OnboardingData
// 	setLan: (v: Languages | null) => void
// 	setName: (v: string | null) => void
// 	setSurname: (v: string | null) => void
// 	setLocation: (v: string | null) => void
// 	setPhone: (v: string | null) => void
// 	reset: () => void
// }
// 
// const OnboardingContext = createContext<OnboardingContextValue | null>(null)
// 
// const initialState: OnboardingData = {
// 	lan: null,
// 	name: null,
// 	surname: null,
// 	location: null,
// 	phone: null,
// }
// 
// export function OnboardingProvider({
// 	children,
// }: {
// 	children: React.ReactNode
// }) {
// 	const [data, setData] = useState<OnboardingData>(initialState)
// 
// 	const value = useMemo<OnboardingContextValue>(
// 		() => ({
// 			data,
// 			setLan: (v) => setData((s) => ({ ...s, lan: v })),
// 			setName: (v) => setData((s) => ({ ...s, name: v })),
// 			setSurname: (v) => setData((s) => ({ ...s, surname: v })),
// 			setLocation: (v) => setData((s) => ({ ...s, location: v })),
// 			setPhone: (v) => setData((s) => ({ ...s, phone: v })),
// 			reset: () => setData(initialState),
// 		}),
// 		[data],
// 	)
// 
// 	return (
// 		<OnboardingContext.Provider value={value}>
// 			{children}
// 		</OnboardingContext.Provider>
// 	)
// }
// 
// export function useOnboarding() {
// 	const ctx = useContext(OnboardingContext)
// 	if (!ctx)
// 		throw new Error('useOnboarding must be used within OnboardingProvider')
// 	return ctx
// }
