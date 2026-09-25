// import { blogPostsApi } from '@/src/api/blog-api/blog-posts/blog-posts.api'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { StyleSheet, View, Image, Text } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import {
// 	CompanyPhotoVariant,
// 	CompanyVariantSize,
// } from '../../features-components/jwt-images/CompanyPhotoVariant'
// import { getPostDateLabel } from '@/src/shared/lib/formatDate'
// import { slate } from '@/src/shared/styles/constants.styles'
// import TipTapNativeRenderer from '../../features-components/tip-tap/TipTapNativeRenderer'
// import BlogPopularPosts from '../blog-popular-posts/BlogPopularPosts'
// 
// interface Props {
// 	id: number
// }
// 
// const BlogPost: React.FC<Props> = ({ id }) => {
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_KEYS.BLOG_POSTS, id],
// 		queryFn: () => blogPostsApi.getById(id),
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	return (
// 		<View style={styles.post}>
// 			<CompanyPhotoVariant
// 				variantId={data.variantId}
// 				size={CompanyVariantSize.MEDIUM}
// 				width={'100%'}
// 				height={300}
// 				contentFit="cover"
// 				borderRadius={10}
// 			/>
// 			<Text style={styles.date}>{getPostDateLabel(data.createdAt)}</Text>
// 			<View style={styles.company}>
// 				<View style={styles.companyIcon}>
// 					<Image
// 						source={require('../../../../assets/logos/logo_r_white.png')}
// 						style={styles.companyIconImage}
// 					/>
// 				</View>
// 				<Text style={styles.companyTitle}>Residdy</Text>
// 			</View>
// 			<Text style={styles.title}>{data.title}</Text>
// 			<TipTapNativeRenderer contentJson={data.contentJson} />
// 			<BlogPopularPosts />
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	post: {
// 		gap: 20,
// 	},
// 	date: {
// 		color: slate,
// 	},
// 	title: {
// 		fontSize: 20,
// 		fontWeight: '600',
// 	},
// 	company: {
// 		flexDirection: 'row',
// 		gap: 10,
// 		alignItems: 'center',
// 	},
// 	companyTitle: {
// 		fontWeight: 500,
// 		fontSize: 16,
// 	},
// 	companyIcon: {
// 		width: 35,
// 		height: 35,
// 		borderRadius: 20,
// 		backgroundColor: 'black',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	companyIconImage: {
// 		width: 20,
// 		height: 20,
// 	},
// })
// 
// export default BlogPost
