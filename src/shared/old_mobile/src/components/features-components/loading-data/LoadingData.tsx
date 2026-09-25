// import { useEffect, useState } from 'react'
// import { StyleSheet, ViewStyle } from 'react-native'
// import { LinearGradient } from 'expo-linear-gradient'
// import Animated, {
// 	Easing,
// 	useAnimatedStyle,
// 	useSharedValue,
// 	withRepeat,
// 	withTiming,
// } from 'react-native-reanimated'
// import { midnight, slate } from '@/src/shared/styles/constants.styles'
// 
// type Props = {
// 	width?: number | string
// 	height?: number | string
// 	borderRadius?: number
// }
// 
// export default function PageBlockLoadingData({
// 	width = '100%',
// 	height = '100%',
// 	borderRadius = 20,
// }: Props) {
// 	const [boxWidth, setBoxWidth] = useState(0)
// 
// 	const shimmer = useSharedValue(0)
// 	const pulse = useSharedValue(0)
// 
// 	useEffect(() => {
// 		shimmer.value = withRepeat(
// 			withTiming(1, {
// 				duration: 1600,
// 				easing: Easing.inOut(Easing.ease),
// 			}),
// 			-1,
// 			false,
// 		)
// 
// 		pulse.value = withRepeat(
// 			withTiming(1, {
// 				duration: 900,
// 				easing: Easing.inOut(Easing.ease),
// 			}),
// 			-1,
// 			true,
// 		)
// 	}, [pulse, shimmer])
// 
// 	const skeletonAnim = useAnimatedStyle(() => ({
// 		opacity: 0.88 + pulse.value * 0.12,
// 		transform: [{ scale: 1 + pulse.value * 0.008 }],
// 	}))
// 
// 	const shimmerAnim = useAnimatedStyle(() => ({
// 		transform: [
// 			{
// 				translateX: boxWidth
// 					? -boxWidth * 0.6 + shimmer.value * boxWidth * 1.7
// 					: -120 + shimmer.value * 240,
// 			},
// 		],
// 	}))
// 
// 	return (
// 		<Animated.View
// 			onLayout={(e) => setBoxWidth(e.nativeEvent.layout.width)}
// 			style={[
// 				s.skeleton,
// 				skeletonAnim,
// 				{ width, height, borderRadius } as ViewStyle,
// 			]}
// 		>
// 			<Animated.View style={[s.shimmer, shimmerAnim]}>
// 				<LinearGradient
// 					colors={[
// 						'rgba(255,255,255,0)',
// 						'rgba(255,255,255,0.03)',
// 						'rgba(255,255,255,0.08)',
// 						'rgba(255,255,255,0.03)',
// 						'rgba(255,255,255,0)',
// 					]}
// 					start={{ x: 0, y: 0.5 }}
// 					end={{ x: 1, y: 0.5 }}
// 					style={s.shimmerGradient}
// 				/>
// 			</Animated.View>
// 		</Animated.View>
// 	)
// }
// 
// const s = StyleSheet.create({
// 	skeleton: {
// 		position: 'relative',
// 		overflow: 'hidden',
// 		backgroundColor: midnight,
// 		borderWidth: 1,
// 		borderColor: slate,
// 	},
// 	shimmer: {
// 		position: 'absolute',
// 		top: 0,
// 		bottom: 0,
// 		left: 0,
// 		width: '45%',
// 	},
// 	shimmerGradient: {
// 		flex: 1,
// 	},
// })
