// import { casesApi } from '@/src/api/cases-api/cases/cases.api'
// import { CaseStatus } from '@/src/api/cases-api/cases/cases.types'
// import PageBlockLoadingData from '@/src/components/features-components/loading-data/LoadingData'
// import { getCurrentLanguage } from '@/src/i18n'
// import { QUERY_CASES_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { useMutation, useQuery } from '@tanstack/react-query'
// import ListByType from '@/src/components/features-components/list-by-type/ListByType'
// import { mapCasesToTypesListItems } from '@/src/shared/lib/mapToItemsList'
// import { useState } from 'react'
// import { useRouter } from 'expo-router'
// import { userCasesApi } from '@/src/api/user-cases-api/user-cases/user-cases.api'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import ModalLoading from '@/src/components/features-components/modals/modal-loading/ModalLoading'
// 
// interface Props {
// 	typeId: number
// }
// 
// const CasesList: React.FC<Props> = ({ typeId }) => {
// 	const lan = getCurrentLanguage()
// 	const [isModalVisible, setIsModalVisible] = useState(false)
// 	const router = useRouter()
// 
// 	const createUserCaseMutation = useMutation({
// 		mutationFn: (id: number) =>
// 			userCasesApi.create({
// 				templateCaseId: id,
// 			}),
// 		onSettled: () => {
// 			setIsModalVisible(false)
// 		},
// 		onSuccess: () => {
// 			router.push(STACK_PATHS.USER_CASES)
// 		},
// 	})
// 
// 	const handlePress = (id: number) => {
// 		if (createUserCaseMutation.isPending) return
// 
// 		setIsModalVisible(true)
// 		createUserCaseMutation.mutate(id)
// 	}
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_CASES_KEYS.CASES_LIST, lan, typeId, CaseStatus.ACTIVE],
// 		queryFn: () => {
// 			const params: Record<string, any> = {
// 				lan,
// 				typeId,
// 				status: CaseStatus.ACTIVE,
// 			}
// 			return casesApi.list(params)
// 		},
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	const items = mapCasesToTypesListItems(data.rows)
// 
// 	return (
// 		<>
// 			<ListByType
// 				items={items}
// 				onItemPress={(id: number) => handlePress(id)}
// 			/>
// 			<ModalLoading visible={isModalVisible} />
// 		</>
// 	)
// }
// 
// export default CasesList
