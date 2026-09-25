// import { useEffect, useMemo, useState } from 'react'
// import { Href, useRouter, useSegments } from 'expo-router'
// import { useQueryClient } from '@tanstack/react-query'
// import { clearAccessToken, getAccessToken } from '../../api/access-token'
// import { userApi } from '../../api/user-api/user/user.api'
// import { userAuthApi } from '../../api/user-api/user-auth/user-auth.api'
// import { ONBOARDING_PATHS, AUTH_PATHS, TABS_PATHS } from '../enums/page-paths'
// import { QUERY_KEYS, QUERY_KEYS_USER } from '../enums/query-keys.enum'
// 
// export function useAuthRedirect() {
// 	const router = useRouter()
// 	const queryClient = useQueryClient()
// 
// 	const segments = useSegments() as unknown as string[]
// 	const group = segments[0]
// 
// 	const [checking, setChecking] = useState(true)
// 
// 	const inOnboarding = useMemo(() => {
// 		return group === '(private)' && segments[1] === 'onboarding'
// 	}, [group, segments])
// 
// 	useEffect(() => {
// 		let active = true
// 		const controller = new AbortController()
// 
// 		const go = (href: string) => {
// 			router.replace(href as unknown as Href)
// 		}
// 
// 		const run = async () => {
// 			const token = await getAccessToken()
// 			if (!active) return
// 
// 			if (!token) {
// 				setChecking(false)
// 				if (group !== '(public)') go(AUTH_PATHS.LOGIN)
// 				return
// 			}
// 
// 			try {
// 				await queryClient.fetchQuery({
// 					queryKey: [QUERY_KEYS.AUTH, QUERY_KEYS.CHECK],
// 					queryFn: () =>
// 						userAuthApi.check({ signal: controller.signal }),
// 					staleTime: 30_000,
// 				})
// 
// 				if (!active) return
// 
// 				const me = await queryClient.fetchQuery({
// 					queryKey: [QUERY_KEYS_USER.ME],
// 					queryFn: () => userApi.me({ signal: controller.signal }),
// 					staleTime: 10_000,
// 				})
// 
// 				if (!active) return
// 
// 				const needsOnboarding = !me.profileCompletedAt
// 
// 				setChecking(false)
// 
// 				if (needsOnboarding) {
// 					if (!inOnboarding) go(ONBOARDING_PATHS.ONBOARDING)
// 					return
// 				}
// 
// 				if (inOnboarding) {
// 					go(TABS_PATHS.HOME)
// 					return
// 				}
// 
// 				if (group !== '(private)') go(TABS_PATHS.HOME)
// 			} catch {
// 				if (controller.signal.aborted) return
// 				await clearAccessToken()
// 				if (!active) return
// 				setChecking(false)
// 				if (group !== '(public)') go(AUTH_PATHS.LOGIN)
// 			}
// 		}
// 
// 		run()
// 
// 		return () => {
// 			active = false
// 			controller.abort()
// 		}
// 	}, [group, inOnboarding, queryClient, router])
// 
// 	return { checking }
// }
