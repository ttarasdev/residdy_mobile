// import { GUserDoc } from '@/src/api/g-docs-api/g-user-docs/g-user-docs.types'
// import {
// 	StyleSheet,
// 	View,
// 	Text,
// 	Pressable,
// 	Linking,
// 	Alert,
// 	ActivityIndicator,
// } from 'react-native'
// import MidnightCard from '../../features-components/cards/midnight-card'
// import { slate } from '@/src/shared/styles/constants.styles'
// import { getGDocTemplateTitle } from '@/src/shared/lib/getTitleByLan'
// import { getCurrentLanguage } from '@/src/i18n'
// import { getPostDateLabel } from '@/src/shared/lib/formatDate'
// import { Image } from 'expo-image'
// import { useState } from 'react'
// import { gUserDocsApi } from '@/src/api/g-docs-api/g-user-docs/g-user-docs.api'
// import { API_URL } from '@/src/shared/config/env'
// 
// interface Props {
// 	item: GUserDoc
// }
// 
// const GdocsUserItem: React.FC<Props> = ({ item }) => {
// 	const lan = getCurrentLanguage()
// 	const [isOpening, setIsOpening] = useState(false)
// 
// 	const handleOpenFile = async () => {
// 		if (isOpening) return
// 
// 		try {
// 			setIsOpening(true)
// 
// 			const data = await gUserDocsApi.getFileUrl(item.id)
// 
// 			if (!data?.url) {
// 				Alert.alert('Помилка', 'Не вдалося отримати файл')
// 				return
// 			}
// 
// 			await Linking.openURL(`${API_URL}${data.url}`)
// 		} catch {
// 			Alert.alert('Помилка', 'Не вдалося відкрити документ')
// 		} finally {
// 			setIsOpening(false)
// 		}
// 	}
// 
// 	return (
// 		<MidnightCard style={styles.item}>
// 			<Text style={styles.itemTitle}>
// 				{getGDocTemplateTitle(item.template, lan)}
// 			</Text>
// 
// 			<View style={styles.footer}>
// 				<Text style={styles.itemDate}>
// 					{getPostDateLabel(item.createdAt)}
// 				</Text>
// 
// 				<Pressable
// 					style={[styles.button, isOpening && styles.buttonDisabled]}
// 					onPress={handleOpenFile}
// 					disabled={isOpening}
// 				>
// 					{isOpening ? (
// 						<ActivityIndicator size="small" color="white" />
// 					) : (
// 						<Image
// 							style={styles.buttonImage}
// 							source={require('@/assets/system_icons/download_white.png')}
// 						/>
// 					)}
// 				</Pressable>
// 			</View>
// 		</MidnightCard>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	item: {
// 		width: '100%',
// 		gap: 10,
// 		padding: 20,
// 	},
// 	itemTitle: {
// 		fontSize: 16,
// 		color: 'white',
// 		fontWeight: 700,
// 	},
// 	footer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 	},
// 	itemDate: {
// 		fontSize: 14,
// 		color: slate,
// 	},
// 	button: {
// 		width: 40,
// 		height: 40,
// 		padding: 5,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// 	buttonDisabled: {
// 		opacity: 0.6,
// 	},
// 	buttonImage: {
// 		width: 30,
// 		height: 30,
// 	},
// })
// 
// export default GdocsUserItem
