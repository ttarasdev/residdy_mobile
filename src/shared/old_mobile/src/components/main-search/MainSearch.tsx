// import ModalFullScreen from '../features-components/modals/modal-full-screen/modal-full-screen'
// import { Animated, StyleSheet, TextInput, View } from 'react-native'
// import CloseButton from '../features-components/buttons/close-button'
// import { Image } from 'expo-image'
// import { useEffect, useRef, useState } from 'react'
// import { midnight } from '@/src/shared/styles/constants.styles'
// import { useTranslation } from '@/node_modules/react-i18next'
// 
// interface Props {
// 	visible: boolean
// 	onClose: () => void
// }
// 
// const AnimatedView = Animated.createAnimatedComponent(View)
// 
// const MainSearch: React.FC<Props> = ({ visible, onClose }) => {
// 	const [value, setValue] = useState('')
// 	const { t } = useTranslation()
// 	const paddingLeftAnim = useRef(new Animated.Value(60)).current
// 
// 	useEffect(() => {
// 		if (visible) {
// 			paddingLeftAnim.setValue(60)
// 
// 			Animated.timing(paddingLeftAnim, {
// 				toValue: 0,
// 				duration: 300,
// 				delay: 150,
// 				useNativeDriver: false,
// 			}).start()
// 		}
// 	}, [visible, paddingLeftAnim])
// 
// 	return (
// 		<ModalFullScreen onClose={onClose} visible={visible}>
// 			<AnimatedView
// 				style={[styles.header, { paddingLeft: paddingLeftAnim }]}
// 			>
// 				<View style={styles.search}>
// 					<Image
// 						style={styles.searchImg}
// 						source={require('../../../assets/header_icons/search.png')}
// 					/>
// 					<TextInput
// 						style={styles.searchInput}
// 						value={value}
// 						onChangeText={setValue}
// 						placeholderTextColor="#626262"
// 						placeholder={t('header.search')}
// 					/>
// 				</View>
// 				<CloseButton size={50} onClose={onClose} />
// 			</AnimatedView>
// 		</ModalFullScreen>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	header: {
// 		flexDirection: 'row',
// 		gap: 10,
// 		paddingLeft: 60,
// 	},
// 	search: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		height: 50,
// 		borderRadius: 25,
// 		paddingLeft: 5,
// 		gap: 10,
// 		backgroundColor: midnight,
// 	},
// 	searchImg: {
// 		width: 35,
// 		height: 35,
// 	},
// 	searchInput: {
// 		color: 'white',
// 		fontSize: 16,
// 	},
// })
// 
// export default MainSearch
