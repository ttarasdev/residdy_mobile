// import { useEffect, useRef, useState } from 'react'
// import { Slot } from 'expo-router'
// import { Animated, Easing, Image, View } from 'react-native'
// import { useAuthRedirect } from '@/src/shared/hooks/use-auth-redirect'
// import { midnight } from '../styles/constants.styles'
// 
// const R_LOGO = require('../../../assets/logos/logo_r_white.png')
// const RESIDDY_LOGO = require('../../../assets/logos/logo_residdy_white.png')
// 
// const LOGO_W = 220
// const LOGO_H = 65
// const R_SIZE = 100
// 
// export default function BootGuard() {
// 	const { checking } = useAuthRedirect()
// 	const rOpacity = useRef(new Animated.Value(0)).current
// 	const scale = useRef(new Animated.Value(1)).current
// 	const x = useRef(new Animated.Value(0)).current
// 	const y = useRef(new Animated.Value(-5)).current
// 
// 	const resWidth = useRef(new Animated.Value(0)).current
// 	const resOpacity = useRef(new Animated.Value(0)).current
// 
// 	const overlayOpacity = useRef(new Animated.Value(1)).current
// 
// 	const [visible, setVisible] = useState(false)
// 	const [minDone, setMinDone] = useState(false)
// 	const [overlayGone, setOverlayGone] = useState(false)
// 
// 	const started = useRef(false)
// 
// 	useEffect(() => {
// 		Animated.timing(rOpacity, {
// 			toValue: 1,
// 			duration: 220,
// 			useNativeDriver: true,
// 		}).start(() => setVisible(true))
// 	}, [rOpacity])
// 
// 	useEffect(() => {
// 		if (!visible) return
// 		const t = setTimeout(() => setMinDone(true), 1500)
// 		return () => clearTimeout(t)
// 	}, [visible])
// 
// 	useEffect(() => {
// 		if (!visible) return
// 		if (!minDone) return
// 		if (checking) return
// 		if (started.current) return
// 
// 		started.current = true
// 
// 		Animated.sequence([
// 			Animated.timing(scale, {
// 				toValue: 0.48,
// 				duration: 700,
// 				easing: Easing.out(Easing.cubic),
// 				useNativeDriver: true,
// 			}),
// 			Animated.parallel([
// 				Animated.timing(x, {
// 					toValue: -95,
// 					duration: 600,
// 					easing: Easing.out(Easing.cubic),
// 					useNativeDriver: true,
// 				}),
// 				Animated.timing(resWidth, {
// 					toValue: LOGO_W,
// 					duration: 600,
// 					easing: Easing.out(Easing.cubic),
// 					useNativeDriver: false,
// 				}),
// 				Animated.timing(resOpacity, {
// 					toValue: 1,
// 					duration: 320,
// 					easing: Easing.out(Easing.cubic),
// 					useNativeDriver: true,
// 				}),
// 			]),
// 			Animated.parallel([
// 				Animated.timing(rOpacity, {
// 					toValue: 0,
// 					duration: 220,
// 					useNativeDriver: true,
// 				}),
// 				Animated.timing(overlayOpacity, {
// 					toValue: 0,
// 					duration: 260,
// 					easing: Easing.out(Easing.cubic),
// 					useNativeDriver: true,
// 				}),
// 			]),
// 		]).start(() => setOverlayGone(true))
// 	}, [
// 		visible,
// 		minDone,
// 		checking,
// 		scale,
// 		x,
// 		resWidth,
// 		resOpacity,
// 		rOpacity,
// 		overlayOpacity,
// 	])
// 
// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Slot />
// 
// 			{overlayGone ? null : (
// 				<Animated.View
// 					style={{
// 						position: 'absolute',
// 						top: 0,
// 						left: 0,
// 						right: 0,
// 						bottom: 0,
// 						backgroundColor: midnight,
// 						alignItems: 'center',
// 						justifyContent: 'center',
// 						opacity: overlayOpacity,
// 					}}
// 				>
// 					<View
// 						style={{
// 							position: 'relative',
// 							alignItems: 'center',
// 							justifyContent: 'center',
// 						}}
// 					>
// 						<View
// 							style={{
// 								position: 'absolute',
// 								left: 0,
// 								right: 0,
// 								alignItems: 'center',
// 							}}
// 						>
// 							<Animated.View
// 								style={{
// 									opacity: resOpacity,
// 									alignItems: 'center',
// 									justifyContent: 'center',
// 								}}
// 							>
// 								<Animated.View
// 									style={{
// 										width: resWidth,
// 										height: LOGO_H,
// 										overflow: 'hidden',
// 										alignItems: 'center',
// 										justifyContent: 'center',
// 									}}
// 								>
// 									<Image
// 										source={RESIDDY_LOGO}
// 										style={{
// 											width: LOGO_W,
// 											height: LOGO_H,
// 										}}
// 										resizeMode="contain"
// 									/>
// 								</Animated.View>
// 							</Animated.View>
// 						</View>
// 
// 						<Animated.View
// 							style={{
// 								opacity: rOpacity,
// 								transform: [
// 									{ translateX: x },
// 									{ translateY: y },
// 									{ scale },
// 								],
// 							}}
// 						>
// 							<View
// 								style={{
// 									width: R_SIZE,
// 									height: R_SIZE,
// 									backgroundColor: midnight,
// 									alignItems: 'center',
// 									justifyContent: 'center',
// 								}}
// 							>
// 								<Image
// 									source={R_LOGO}
// 									style={{ width: R_SIZE, height: R_SIZE }}
// 									resizeMode="contain"
// 								/>
// 							</View>
// 						</Animated.View>
// 					</View>
// 				</Animated.View>
// 			)}
// 		</View>
// 	)
// }
