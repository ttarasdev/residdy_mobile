// import React from 'react'
// import { Text, StyleSheet, Pressable } from 'react-native'
// import ModalFullScreen from '../features-components/modals/modal-full-screen/modal-full-screen'
// import { clearAccessToken } from '@/src/api/access-token'
// import { useRouter } from 'expo-router'
// import { AUTH_PATHS } from '@/src/shared/enums/page-paths'
// import CloseButton from '../features-components/buttons/close-button'
// 
// type Props = {
// 	visible: boolean
// 	onClose: () => void
// }
// 
// export default function ProfileModal({ visible, onClose }: Props) {
// 	const router = useRouter()
// 	return (
// 		<ModalFullScreen onClose={onClose} visible={visible}>
// 			<CloseButton onClose={onClose}></CloseButton>
// 			<Text>Profile</Text>
// 			<Pressable
// 				onPress={() => {
// 					clearAccessToken()
// 					router.replace(AUTH_PATHS.LOGIN)
// 				}}
// 			>
// 				<Text>logout</Text>
// 			</Pressable>
// 		</ModalFullScreen>
// 	)
// }
// 
// const s = StyleSheet.create({})
