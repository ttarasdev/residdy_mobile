// import { partnersBannersApi } from '@/src/api/partners-api/partners-banners/partners-banners.api'
// import { PartnerBannerType } from '@/src/api/partners-api/partners-banners/partners-banners.types'
// import { ADVERTISING_QUERY_KEYS } from '@/src/shared/enums/query-keys.enum'
// import { midnight, slate } from '@/src/shared/styles/constants.styles'
// import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query'
// import { useEffect, useRef, useState } from 'react'
// import { Animated, Pressable, StyleSheet, View } from 'react-native'
// import PageBlockLoadingData from '../../features-components/loading-data/LoadingData'
// import AdvertisingSliderItem from './AdvertisingSliderItem'
// 
// const AdvertisingSlider = () => {
// 	const [activeSlideNo, setActiveSlideNo] = useState(0)
// 	const [sliderWidth, setSliderWidth] = useState(0)
// 
// 	const translateX = useRef(new Animated.Value(0)).current
// 	const viewedSlidesRef = useRef<Set<number>>(new Set())
// 
// 	const { mutate: addClick } = useMutation({
// 		mutationFn: partnersBannersApi.addClick,
// 	})
// 
// 	const { mutate: addImpressions } = useMutation({
// 		mutationFn: partnersBannersApi.addImpressions,
// 	})
// 
// 	const { data, isLoading, error } = useQuery({
// 		queryKey: [ADVERTISING_QUERY_KEYS.SLIDER],
// 		queryFn: partnersBannersApi.getRandomSmall,
// 		placeholderData: keepPreviousData,
// 		staleTime: 0,
// 		refetchOnMount: 'always',
// 	})
// 
// 	const slides = data ?? []
// 	const slidesCount = slides.length
// 	const activeSlide = slides[activeSlideNo]
// 	const slidesKey = slides.map((slide) => slide.id).join(',')
// 
// 	useEffect(() => {
// 		viewedSlidesRef.current = new Set()
// 	}, [slidesKey])
// 
// 	useEffect(() => {
// 		if (!activeSlide) return
// 		if (viewedSlidesRef.current.has(activeSlide.id)) return
// 
// 		viewedSlidesRef.current.add(activeSlide.id)
// 		addImpressions({ ids: [activeSlide.id] })
// 	}, [activeSlide, addImpressions])
// 
// 	useEffect(() => {
// 		if (!sliderWidth || slidesCount === 0) return
// 
// 		Animated.timing(translateX, {
// 			toValue: -activeSlideNo * sliderWidth,
// 			duration: 450,
// 			useNativeDriver: true,
// 		}).start()
// 	}, [activeSlideNo, sliderWidth, slidesCount, translateX])
// 
// 	useEffect(() => {
// 		if (slidesCount <= 1) return
// 
// 		const interval = setInterval(() => {
// 			setActiveSlideNo((prev) => (prev + 1) % slidesCount)
// 		}, 4000)
// 
// 		return () => clearInterval(interval)
// 	}, [slidesCount])
// 
// 	useEffect(() => {
// 		if (activeSlideNo >= slidesCount) {
// 			setActiveSlideNo(0)
// 		}
// 	}, [activeSlideNo, slidesCount])
// 
// 	if (isLoading) return <PageBlockLoadingData height={100} />
// 
// 	if (error || !data || slidesCount === 0) {
// 		return <PageBlockLoadingData height={100} />
// 	}
// 
// 	return (
// 		<View style={styles.container}>
// 			<View
// 				style={styles.viewport}
// 				onLayout={(event) =>
// 					setSliderWidth(event.nativeEvent.layout.width)
// 				}
// 			>
// 				<Animated.View
// 					style={[
// 						styles.line,
// 						{
// 							width: sliderWidth * slidesCount,
// 							transform: [{ translateX }],
// 						},
// 					]}
// 				>
// 					{slides.map((slide) => (
// 						<AdvertisingSliderItem
// 							key={slide.id}
// 							slide={slide}
// 							width={sliderWidth}
// 							onClick={addClick}
// 						/>
// 					))}
// 				</Animated.View>
// 			</View>
// 
// 			{slidesCount > 1 && (
// 				<View style={styles.dots}>
// 					{slides.map((slide, index) => (
// 						<Pressable
// 							key={slide.id}
// 							onPress={() => setActiveSlideNo(index)}
// 							style={[
// 								styles.dot,
// 								{
// 									backgroundColor:
// 										index === activeSlideNo
// 											? midnight
// 											: slate,
// 								},
// 							]}
// 						/>
// 					))}
// 				</View>
// 			)}
// 		</View>
// 	)
// }
// 
// const styles = StyleSheet.create({
// 	container: {
// 		width: '100%',
// 		borderRadius: 25,
// 		alignItems: 'center',
// 		gap: 10,
// 	},
// 	viewport: {
// 		width: '100%',
// 		height: 120,
// 		borderRadius: 25,
// 		overflow: 'hidden',
// 		backgroundColor: midnight,
// 	},
// 	line: {
// 		height: 120,
// 		flexDirection: 'row',
// 	},
// 	dots: {
// 		flexDirection: 'row',
// 		gap: 5,
// 	},
// 	dot: {
// 		width: 10,
// 		height: 10,
// 		borderRadius: 5,
// 	},
// })
// 
// export default AdvertisingSlider
