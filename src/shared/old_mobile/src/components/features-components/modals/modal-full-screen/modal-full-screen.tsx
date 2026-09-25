// import { Modal, View } from 'react-native'
// import { StyleSheet } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// 
// interface Props {
// 	visible: boolean
// 	onClose: () => void
// 	children: React.ReactNode
// 	backColor?: string
// 	padding?: number
// }
// 
// const ModalFullScreen: React.FC<Props> = ({
// 	backColor,
// 	visible,
// 	onClose,
// 	children,
// 	padding,
// }) => {
// 	const insets = useSafeAreaInsets()
// 	return (
// 		<Modal
// 			style={[
// 				styles.screen,
// 				{ backgroundColor: backColor ? backColor : 'white' },
// 			]}
// 			visible={visible}
// 			animationType="fade"
// 			transparent={false}
// 			onRequestClose={onClose}
// 		>
// 			<View
// 				style={[
// 					styles.content,
// 					{
// 						padding: padding ?? 10,
// 						backgroundColor: backColor ? backColor : 'white',
// 						paddingTop: insets.top,
// 					},
// 				]}
// 			>
// 				{children}
// 			</View>
// 		</Modal>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	screen: {
// 		flex: 1,
// 	},
// 	content: {
// 		flex: 1,
// 		gap: 10,
// 	},
// })
// 
// export default ModalFullScreen
