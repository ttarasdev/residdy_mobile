// import { caseInstructionsApi } from '@/src/api/cases-api/case-instructions/case-instructions.api'
// import CloseButton from '@/src/components/features-components/buttons/close-button'
// import {
// 	CompanyPhotoVariant,
// 	CompanyVariantSize,
// } from '@/src/components/features-components/jwt-images/CompanyPhotoVariant'
// import PageBlockLoadingData from '@/src/components/features-components/loading-data/LoadingData'
// import ModalFullScreen from '@/src/components/features-components/modals/modal-full-screen/modal-full-screen'
// import TipTapNativeRenderer from '@/src/components/features-components/tip-tap/TipTapNativeRenderer'
// import { QUERY_CASES_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { keepPreviousData, useQuery } from '@tanstack/react-query'
// import { ScrollView, StyleSheet, Text, View } from 'react-native'
// import { BlurView } from 'expo-blur'
// 
// interface Props {
// 	visible: boolean
// 	onClose: () => void
// 	instructionId: number
// }
// 
// const Instruction: React.FC<Props> = ({ visible, onClose, instructionId }) => {
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [QUERY_CASES_KEYS.INSTRUCTIONS, instructionId],
// 		queryFn: () => caseInstructionsApi.getById(instructionId),
// 		placeholderData: keepPreviousData,
// 	})
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 	if (error || !data) return <PageBlockLoadingData height={100} />
// 
// 	return (
// 		<ModalFullScreen padding={0} onClose={onClose} visible={visible}>
// 			<ScrollView
// 				showsVerticalScrollIndicator={false}
// 				style={styles.scrollContainer}
// 				contentContainerStyle={[styles.page]}
// 			>
// 				<View style={styles.top}>
// 					<CompanyPhotoVariant
// 						variantId={data.headerIconId}
// 						size={CompanyVariantSize.MEDIUM}
// 						width={'100%'}
// 						height={250}
// 						contentFit="cover"
// 					/>
// 					<View style={styles.close}>
// 						<CloseButton onClose={onClose}></CloseButton>
// 					</View>
// 					<BlurView intensity={40} tint="light" style={styles.title}>
// 						<Text style={styles.titleText}>{data.title}</Text>
// 					</BlurView>
// 				</View>
// 				<View style={styles.items}>
// 					{data.blocks.map((i) => (
// 						<View key={i.id}>
// 							{i.contentJson && (
// 								<TipTapNativeRenderer
// 									contentJson={i.contentJson}
// 								/>
// 							)}
// 							{i.variantId && (
// 								<CompanyPhotoVariant
// 									variantId={i.variantId}
// 									size={CompanyVariantSize.MEDIUM}
// 									width={'100%'}
// 									height={250}
// 									borderRadius={15}
// 									contentFit="cover"
// 								/>
// 							)}
// 						</View>
// 					))}
// 				</View>
// 			</ScrollView>
// 		</ModalFullScreen>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	page: {},
// 	scrollContainer: {
// 		flex: 1,
// 		backgroundColor: 'white',
// 		marginTop: 10,
// 	},
// 	top: {
// 		position: 'relative',
// 	},
// 	close: {
// 		width: 40,
// 		height: 40,
// 		position: 'absolute',
// 		left: 10,
// 		top: 10,
// 	},
// 	title: {
// 		overflow: 'hidden',
// 		width: '100%',
// 		height: 80,
// 		paddingHorizontal: 16,
// 		backgroundColor: 'rgba(255,255,255,0.05)',
// 		flexDirection: 'row',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		position: 'absolute',
// 		top: 85,
// 	},
// 	titleText: {
// 		maxWidth: 250,
// 		textAlign: 'center',
// 		fontSize: 26,
// 		lineHeight: 30,
// 		fontWeight: '400',
// 		color: '#fff',
// 	},
// 	items: {
// 		gap: 10,
// 		padding: 10,
// 	},
// })
// 
// export default Instruction
