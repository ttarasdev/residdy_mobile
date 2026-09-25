// import { partnersApi } from '@/src/api/partners-api/partners/partners.api'
// import { QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { StyleSheet, Text, View } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import { PublicPhotoAsset } from '../../features-components/jwt-images/PublicPhotoAsset'
// 
// interface Props {
// 	partnerId: number
// }
// 
// const PartnerHeader: React.FC<Props> = ({ partnerId }) => {
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_KEYS.PARTNERS, partnerId],
// 		queryFn: () => partnersApi.getById(partnerId),
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	return (
// 		<View style={styles.header}>
// 			<PublicPhotoAsset
// 				url={data.logo.url}
// 				width={30}
// 				height={30}
// 				alt={'?'}
// 				contentFit="cover"
// 			/>
// 
// 			<Text style={styles.title}>{data.companyName}</Text>
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	header: {
// 		flexDirection: 'row',
// 		gap: 10,
// 		alignItems: 'center',
// 	},
// 
// 	title: {
// 		color: 'white',
// 	},
// })
// 
// export default PartnerHeader
