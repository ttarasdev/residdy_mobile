// import { gDocTypesApi } from '@/src/api/g-docs-api/g-doc-types/g-doc-types.api'
// import { GDOCS_QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { useQuery } from '@tanstack/react-query'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { View } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import { getCurrentLanguage } from '@/src/i18n'
// import TypesList from '../../features-components/types-list/TypesList'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { mapGDocTypesToTypesListItems } from '@/src/shared/lib/mapToItemsList'
// 
// interface Props {
// 	isPopular: boolean
// }
// 
// const GdocsTypesList: React.FC<Props> = ({ isPopular }) => {
// 	const { t } = useTranslation()
// 	const lan = getCurrentLanguage()
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [GDOCS_QUERY_KEYS.GDOCS_TYPES, isPopular],
// 		queryFn: () => {
// 			const params: Record<string, any> = {}
// 			if (isPopular === true) params.isPopular = isPopular
// 			return gDocTypesApi.list(params)
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
// 	const items = mapGDocTypesToTypesListItems(data.items, lan)
// 
// 	return (
// 		<TypesList
// 			items={items}
// 			path={STACK_PATHS.GDOCS_LIST}
// 			title={
// 				isPopular
// 					? t('cases.main.popularCases')
// 					: t('cases.main.allCases')
// 			}
// 		/>
// 	)
// }
// 
// export default GdocsTypesList
