// import { Image } from 'expo-image'
// import { Modal, Pressable, StyleSheet } from 'react-native'
// import { View } from 'react-native-reanimated/lib/typescript/Animated'
// 
// interface Props {
// 	children: React.ReactNode
// 	onClose: () => void
// 	visible: boolean
// 	formTitle: string
// }
// 
// const FormPopup: React.FC<Props> = ({ children, onClose, visible }) => {
// 	return (
// 		<Modal
// 			style={styles.screen}
// 			visible={visible}
// 			animationType="fade"
// 			transparent={false}
// 			onRequestClose={onClose}
// 		>
// 			<View style={styles.card}>
// 				<View style={styles.header}>
// 					<Pressable onPress={onClose}>
// 						<Image
// 							source={require('@/assets/system_icons/close.png')}
// 							style={styles.closeImg}
// 						/>
// 					</Pressable>
// 				</View>
// 				{children}
// 			</View>
// 		</Modal>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	screen: {},
// 	card: {},
// 	header: {},
// 	close: {},
// 	closeImg: {},
// 	title: {},
// 	subtitle: {},
// })
// 
// export default FormPopup
