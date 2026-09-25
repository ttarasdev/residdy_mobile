// import { gDocTemplatesApi } from '@/src/api/g-docs-api/g-doc-templates/g-doc-templates.api'
// import { GDocTemplateStatus } from '@/src/api/g-docs-api/g-doc-templates/g-doc-templates.types'
// import { GDOCS_QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { useQuery } from '@tanstack/react-query'
// import { StyleSheet, View } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import { mapGDocTemplatesToTypesListItems } from '@/src/shared/lib/mapToItemsList'
// import { getCurrentLanguage } from '@/src/i18n'
// import ListByType from '../../features-components/list-by-type/ListByType'
// import { useState } from 'react'
// import GdocsVarsForm from '../gdocs-vars-form/GdocsVarsForm'
// 
// interface Props {
// 	typeId: number
// }
// 
// const GdocsListByType: React.FC<Props> = ({ typeId }) => {
// 	const lan = getCurrentLanguage()
// 	const [isModalVisible, setIsModalVisible] = useState(false)
// 	const [activeDocId, setActiveDocId] = useState<number | null>(null)
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [
// 			GDOCS_QUERY_KEYS.GDOCS_LIST,
// 			typeId,
// 			GDocTemplateStatus.ACTIVE,
// 		],
// 		queryFn: () => {
// 			const params: Record<string, any> = {
// 				gDocTypeId: typeId,
// 				status: GDocTemplateStatus.ACTIVE,
// 			}
// 			return gDocTemplatesApi.list(params)
// 		},
// 	})
// 
// 	const onItemPress = (id: number) => {
// 		setActiveDocId(id)
// 		setIsModalVisible(true)
// 	}
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	const items = mapGDocTemplatesToTypesListItems(data.items, lan)
// 	const active = data.items.find((i) => i.id === activeDocId)
// 
// 	return (
// 		<>
// 			<ListByType items={items} onItemPress={onItemPress} />
// 			{isModalVisible && active && (
// 				<GdocsVarsForm
// 					template={active}
// 					onClose={() => setIsModalVisible(false)}
// 				/>
// 			)}
// 		</>
// 	)
// }
// 
// const styles = StyleSheet.create({})
// 
// export default GdocsListByType
