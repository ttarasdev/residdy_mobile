// import { userCasesApi } from '@/src/api/user-cases-api/user-cases/user-cases.api'
// import UserCase from '@/src/components/cases/user-cases/user-case/UserCase'
// import PageBlockLoadingData from '@/src/components/features-components/loading-data/LoadingData'
// import StackPage from '@/src/components/features-components/page-containers/stack-page/StackPage'
// import PagesTop from '@/src/components/features-components/pages-top/PagesTop'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { useLocalSearchParams } from 'expo-router'
// 
// const UserCasePage = () => {
// 	const { id } = useLocalSearchParams<{ id: string }>()
// 	const userCaseId = Number(id)
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [STACK_PATHS.USER_CASES, userCaseId],
// 		queryFn: () => userCasesApi.getFullById(userCaseId),
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	return (
// 		<StackPage>
// 			<PagesTop
// 				title={data.template.title}
// 				buttonTitle={'Залиш відгук'}
// 				onPress={() => {}}
// 			/>
// 			<UserCase caseData={data} />
// 		</StackPage>
// 	)
// }
// 
// export default UserCasePage
