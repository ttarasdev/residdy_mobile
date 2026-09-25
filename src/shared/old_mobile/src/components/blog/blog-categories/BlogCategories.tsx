// 'use client'
// 
// import { blogCategoriesApi } from '@/src/api/blog-api/blog-categories/blog-categories.api'
// import { BlogCategory } from '@/src/api/blog-api/blog-categories/blog-categories.types'
// import { getCurrentLanguage } from '@/src/i18n'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { Languages } from '@/src/shared/enums/languages.enum'
// import { midnight, slate } from '@/src/shared/styles/constants.styles'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// 
// interface Props {
// 	setCategoryId: (id: number) => void
// 	activeCategoryId: number | null
// }
// 
// const BlogCategories: React.FC<Props> = ({
// 	setCategoryId,
// 	activeCategoryId,
// }) => {
// 	const lan = getCurrentLanguage()
// 
// 	const getTitle = (cat: BlogCategory) => {
// 		if (lan === Languages.EN) return cat.name_en
// 		if (lan === Languages.PL) return cat.name_pl
// 		if (lan === Languages.RU) return cat.name_ru
// 
// 		return cat.name_ua
// 	}
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_KEYS.BLOG_CATEGORIES],
// 		queryFn: () => blogCategoriesApi.list({}),
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	return (
// 		<View style={styles.container}>
// 			<ScrollView
// 				horizontal
// 				showsHorizontalScrollIndicator={false}
// 				contentContainerStyle={styles.line}
// 			>
// 				{data.items.map((i) => (
// 					<Pressable
// 						key={i.id}
// 						onPress={() => setCategoryId(i.id)}
// 						style={[
// 							styles.item,
// 							{
// 								backgroundColor:
// 									activeCategoryId === i.id
// 										? slate
// 										: midnight,
// 							},
// 						]}
// 					>
// 						<Text style={styles.itemText}>{getTitle(i)}</Text>
// 					</Pressable>
// 				))}
// 			</ScrollView>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	container: {
// 		width: '100%',
// 	},
// 	line: {
// 		flexDirection: 'row',
// 		gap: 5,
// 		paddingRight: 10,
// 	},
// 	item: {
// 		borderRadius: 20,
// 		paddingVertical: 8,
// 		paddingHorizontal: 16,
// 	},
// 	itemText: {
// 		color: 'white',
// 	},
// })
// 
// export default BlogCategories
