// import { midnight } from '@/src/shared/styles/constants.styles'
// import { Image } from 'expo-image'
// import { useState } from 'react'
// import { useTranslation } from '@/node_modules/react-i18next'
// import { Pressable, StyleSheet, Text } from 'react-native'
// import MainSearch from '../../main-search/MainSearch'
// 
// const CustomHeaderSearch = () => {
// 	const [isPopupVisible, setIsPopupVisible] = useState(false)
// 	const { t } = useTranslation()
// 
// 	return (
// 		<Pressable
// 			onPress={() => setIsPopupVisible(true)}
// 			style={styles.search}
// 		>
// 			<Image
// 				source={require('../../../../assets/header_icons/search.png')}
// 				style={styles.loop}
// 			/>
// 			<Text style={styles.text}>{t('header.search')}</Text>
// 			<MainSearch
// 				visible={isPopupVisible}
// 				onClose={() => setIsPopupVisible(false)}
// 			/>
// 		</Pressable>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	search: {
// 		height: 50,
// 		borderRadius: 25,
// 		backgroundColor: midnight,
// 		flex: 1,
// 		flexDirection: 'row',
// 		paddingLeft: 5,
// 		gap: 10,
// 		alignItems: 'center',
// 	},
// 	loop: {
// 		width: 35,
// 		height: 35,
// 	},
// 	text: {
// 		color: '#626262',
// 		fontSize: 16,
// 	},
// })
// 
// export default CustomHeaderSearch
