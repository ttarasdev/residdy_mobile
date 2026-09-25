// import { gUserDocsApi } from '@/src/api/g-docs-api/g-user-docs/g-user-docs.api'
// import { GDOCS_QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { StyleSheet, View } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import GdocsUserItem from '../gdocs-user-item/GdocsUserItem'
// 
// const GdocsUserList = () => {
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [GDOCS_QUERY_KEYS.GDOCS_USER_LIST],
// 		queryFn: gUserDocsApi.list,
// 		placeholderData: keepPreviousData,
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
// 	return (
// 		<View style={style.items}>
// 			{data.map((i) => (
// 				<GdocsUserItem item={i} key={i.id} />
// 			))}
// 		</View>
// 	)
// }
// 
// const style = StyleSheet.create({
// 	items: {
// 		gap: 5,
// 	},
// })
// 
// export default GdocsUserList
