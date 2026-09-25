// import { userCasesApi } from '@/src/api/user-cases-api/user-cases/user-cases.api'
// import PageBlockLoadingData from '@/src/components/features-components/loading-data/LoadingData'
// import { QUERY_CASES_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { useRouter } from 'expo-router'
// import { StyleSheet, Text, View } from 'react-native'
// import UserCaseCard from '../user-case-card/UserCaseCard'
// 
// const UserCasesList = () => {
// 	const router = useRouter()
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_CASES_KEYS.USER_CASES],
// 		queryFn: () => userCasesApi.list({}),
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	return (
// 		<View style={styles.items}>
// 			{data.rows.map((i) => (
// 				<UserCaseCard key={i.id} item={i} />
// 			))}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	items: {
// 		flex: 1,
// 		gap: 10,
// 	},
// })
// 
// export default UserCasesList
