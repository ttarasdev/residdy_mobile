// import { useEffect } from 'react'
// import { Image, Pressable, StyleSheet } from 'react-native'
// import Animated, {
// 	Easing,
// 	interpolate,
// 	useAnimatedStyle,
// 	useSharedValue,
// 	withTiming,
// } from 'react-native-reanimated'
// import { midnight, slate } from '@/src/shared/styles/constants.styles'
// import { CustomMenuGroupData } from './custom-menu-data'
// import { useCustomMenu } from './custom-menu-context'
// 
// type Props = {
// 	group: CustomMenuGroupData
// }
// 
// export default function CustomMenuGroup({ group }: Props) {
// 	const { activeGroupKey, activePageKey, activateGroup, activatePage } =
// 		useCustomMenu()
// 
// 	const isActiveGroup = activeGroupKey === group.key
// 
// 	const width = useSharedValue(
// 		isActiveGroup ? group.items.length * 60 + 10 : 70,
// 	)
// 	const progress = useSharedValue(isActiveGroup ? 1 : 0)
// 
// 	useEffect(() => {
// 		width.value = withTiming(
// 			isActiveGroup ? group.items.length * 60 + 10 : 70,
// 			{
// 				duration: 220,
// 				easing: Easing.out(Easing.cubic),
// 			},
// 		)
// 		progress.value = withTiming(isActiveGroup ? 1 : 0, {
// 			duration: 180,
// 			easing: Easing.out(Easing.cubic),
// 		})
// 	}, [isActiveGroup, group.items.length, width, progress])
// 
// 	const containerAnim = useAnimatedStyle(() => ({
// 		width: width.value,
// 	}))
// 
// 	const buttonAnim = useAnimatedStyle(() => ({
// 		opacity: 1 - progress.value,
// 		transform: [
// 			{
// 				scale: interpolate(progress.value, [0, 1], [1, 0.9]),
// 			},
// 		],
// 	}))
// 
// 	const itemsAnim = useAnimatedStyle(() => ({
// 		opacity: progress.value,
// 		transform: [
// 			{
// 				translateX: interpolate(progress.value, [0, 1], [10, 0]),
// 			},
// 		],
// 	}))
// 
// 	return (
// 		<Animated.View style={[s.container, containerAnim]}>
// 			<Animated.View style={[s.groupButtonWrap, buttonAnim]}>
// 				<Pressable
// 					style={s.groupButton}
// 					onPress={() => activateGroup(group.key)}
// 				>
// 					<Image source={group.icon} style={s.icon} />
// 				</Pressable>
// 			</Animated.View>
// 			<Animated.View style={[s.group, itemsAnim]}>
// 				{group.items.map((item) => {
// 					const isActiveItem = activePageKey === item.key
// 
// 					return (
// 						<Pressable
// 							key={item.key}
// 							style={[
// 								s.itemButton,
// 								isActiveItem && s.itemButtonActive,
// 							]}
// 							onPress={() => activatePage(group.key, item.key)}
// 						>
// 							<Image source={item.icon} style={s.icon} />
// 						</Pressable>
// 					)
// 				})}
// 			</Animated.View>
// 		</Animated.View>
// 	)
// }
// 
// const s = StyleSheet.create({
// 	container: {
// 		height: 70,
// 		borderRadius: 35,
// 		overflow: 'hidden',
// 		boxShadow: `0 0 0 1px ${slate}`,
// 	},
// 	groupButtonWrap: {
// 		position: 'absolute',
// 		left: 0,
// 		top: 0,
// 		width: 70,
// 		height: 70,
// 	},
// 	groupButton: {
// 		width: 70,
// 		height: 70,
// 		borderRadius: 35,
// 		backgroundColor: midnight,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	group: {
// 		position: 'absolute',
// 		left: 0,
// 		top: 0,
// 		height: 70,
// 		borderRadius: 35,
// 		backgroundColor: midnight,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		padding: 5,
// 	},
// 	itemButton: {
// 		width: 60,
// 		height: 60,
// 		borderRadius: 30,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 	},
// 	itemButtonActive: {
// 		backgroundColor: slate,
// 	},
// 	icon: {
// 		width: 25,
// 		height: 25,
// 		resizeMode: 'contain',
// 	},
// })
