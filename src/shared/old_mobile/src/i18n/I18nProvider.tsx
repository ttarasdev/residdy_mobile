// import React, { useEffect, useState } from 'react'
// import { I18nextProvider } from '@/node_modules/react-i18next'
// import { useQuery } from '@tanstack/react-query'
// import i18n, { bootstrapI18n, setAppLanguage } from './index'
// import { Languages as Language } from '@/src/shared/enums/languages.enum'
// import { getAccessToken } from '../api/access-token'
// import { QUERY_KEYS_USER } from '../shared/enums/query-keys.enum'
// import { userApi } from '../api/user-api/user/user.api'
// 
// type Props = {
// 	children: React.ReactNode
// }
// 
// const ME_TIMEOUT_MS = 5000
// 
// const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> => {
// 	return new Promise((resolve, reject) => {
// 		const timer = setTimeout(() => {
// 			reject(new Error('GET_ME_TIMEOUT'))
// 		}, ms)
// 
// 		promise
// 			.then((result) => {
// 				clearTimeout(timer)
// 				resolve(result)
// 			})
// 			.catch((error) => {
// 				clearTimeout(timer)
// 				reject(error)
// 			})
// 	})
// }
// 
// export default function I18nProvider({ children }: Props) {
// 	const [bootstrapped, setBootstrapped] = useState(false)
// 	const [ready, setReady] = useState(false)
// 
// 	useEffect(() => {
// 		const init = async () => {
// 			try {
// 				await bootstrapI18n()
// 			} finally {
// 				setBootstrapped(true)
// 			}
// 		}
// 
// 		init()
// 	}, [])
// 
// 	const { data, isFetching, isError } = useQuery({
// 		queryKey: [QUERY_KEYS_USER.CHANGE_MY_LANGUAGE],
// 		queryFn: async () => {
// 			const token = await getAccessToken()
// 
// 			if (!token) return null
// 
// 			return withTimeout(userApi.me({}), ME_TIMEOUT_MS)
// 		},
// 		enabled: bootstrapped,
// 		staleTime: 0,
// 		retry: false,
// 	})
// 
// 	useEffect(() => {
// 		const applyLanguage = async () => {
// 			if (!bootstrapped) return
// 			if (isFetching) return
// 
// 			if (!isError && data?.lan) {
// 				await setAppLanguage(data.lan as Language)
// 			}
// 
// 			setReady(true)
// 		}
// 
// 		applyLanguage()
// 	}, [bootstrapped, isFetching, isError, data?.lan])
// 
// 	if (!bootstrapped || !ready) return null
// 
// 	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
// }
