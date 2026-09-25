// import { caseTypesApi } from '@/src/api/cases-api/case-types/case-types.api'
// import PageBlockLoadingData from '@/src/components/features-components/loading-data/LoadingData'
// import TypesList from '@/src/components/features-components/types-list/TypesList'
// import { getCurrentLanguage } from '@/src/i18n'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { QUERY_CASES_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { mapCaseTypesToTypesListItems } from '@/src/shared/lib/mapToItemsList'
// import { useQuery } from '@tanstack/react-query'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { View } from 'react-native'
// 
// interface Props {
// 	isPopular: boolean
// }
// 
// const CaseTypesBlock: React.FC<Props> = ({ isPopular }) => {
// 	const { t } = useTranslation()
// 	const lan = getCurrentLanguage()
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_CASES_KEYS.CASE_TYPES, isPopular],
// 		queryFn: () => {
// 			const params: Record<string, any> = { lan }
// 			if (isPopular === true) params.isPopular = isPopular
// 			return caseTypesApi.list(params)
// 		},
// 	})
// 
// 	if (isLoading)
// 		return (
// 			<View pointerEvents="box-none">
// 				<PageBlockLoadingData />
// 			</View>
// 		)
// 	if (error || !data)
// 		return (
// 			<View pointerEvents="box-none">
// 				<PageBlockLoadingData />
// 			</View>
// 		)
// 
// 	const items = mapCaseTypesToTypesListItems(data.rows)
// 
// 	return (
// 		<TypesList
// 			items={items}
// 			path={STACK_PATHS.CASES_LIST}
// 			title={
// 				isPopular
// 					? t('cases.main.popularCases')
// 					: t('cases.main.allCases')
// 			}
// 		/>
// 	)
// }
// 
// export default CaseTypesBlock
