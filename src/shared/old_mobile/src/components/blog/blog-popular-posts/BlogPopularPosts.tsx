// import { blogPostsApi } from '@/src/api/blog-api/blog-posts/blog-posts.api'
// import { BlogPostStatus } from '@/src/api/blog-api/blog-posts/blog-posts.types'
// import { getCurrentLanguage } from '@/src/i18n'
// import { STACK_PATHS, TABS_PATHS } from '@/src/shared/enums/page-paths'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { BlurView } from 'expo-blur'
// import { useRouter } from 'expo-router'
// import { useState } from 'react'
// import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// import {
// 	CompanyPhotoVariant,
// 	CompanyVariantSize,
// } from '../../features-components/jwt-images/CompanyPhotoVariant'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import { useTranslation } from '@/node_modules/react-i18next'
// 
// const BlogPopularPosts = () => {
// 	const lan = getCurrentLanguage()
// 	const limit = 10
// 	const router = useRouter()
// 	const { t } = useTranslation()
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_KEYS.BLOG_POSTS, 1, lan],
// 		queryFn: () => {
// 			const params: Record<string, any> = {
// 				lan,
// 				page: 1,
// 				isPopular: true,
// 				limit,
// 				status: BlogPostStatus.PUBLISHED,
// 			}
// 			return blogPostsApi.list(params)
// 		},
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 	if (data.total === 0) return null
// 
// 	return (
// 		<View style={styles.posts}>
// 			<Text style={styles.title}>{t('blog.popularPosts')}</Text>
// 			{data.items.map((i) => (
// 				<Pressable
// 					onPress={() =>
// 						router.push({
// 							pathname: STACK_PATHS.BLOG_DETAILS,
// 							params: {
// 								id: String(i.id),
// 							},
// 						})
// 					}
// 					key={i.id}
// 					style={styles.item}
// 				>
// 					<CompanyPhotoVariant
// 						variantId={i.variantId}
// 						size={CompanyVariantSize.MEDIUM}
// 						width={'100%'}
// 						height={'100%'}
// 						contentFit="cover"
// 					/>
// 					<BlurView
// 						intensity={40}
// 						tint="light"
// 						style={styles.itemInfo}
// 					>
// 						<Text style={styles.itemTitle}>{i.title}</Text>
// 						<View style={styles.company}>
// 							<View style={styles.companyIcon}>
// 								<Image
// 									source={require('../../../../assets/logos/logo_r_white.png')}
// 									style={styles.companyIconImage}
// 								/>
// 							</View>
// 							<Text style={styles.companyTitle}>Residdy</Text>
// 						</View>
// 					</BlurView>
// 				</Pressable>
// 			))}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	posts: {
// 		gap: 5,
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: '600',
// 	},
// 	item: {
// 		width: '100%',
// 		height: 400,
// 		borderRadius: 25,
// 		overflow: 'hidden',
// 		position: 'relative',
// 	},
// 	itemInfo: {
// 		position: 'absolute',
// 		bottom: 0,
// 		justifyContent: 'space-between',
// 		height: 130,
// 		width: '100%',
// 		padding: 10,
// 		backgroundColor: 'rgba(0,0,0,0.06)',
// 	},
// 	itemTitle: {
// 		color: 'white',
// 		fontSize: 18,
// 		fontWeight: '600',
// 		maxWidth: '80%',
// 	},
// 	company: {
// 		gap: 10,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 	},
// 	companyIcon: {
// 		width: 30,
// 		height: 30,
// 		backgroundColor: 'black',
// 		borderRadius: 15,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	companyIconImage: {
// 		width: 16,
// 		height: 18,
// 	},
// 	companyTitle: {
// 		color: 'white',
// 	},
// })
// 
// export default BlogPopularPosts
