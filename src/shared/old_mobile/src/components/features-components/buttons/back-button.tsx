// import { useRouter } from 'expo-router'
// import IconButton from './icon-button'
// import { TABS_PATHS } from '@/src/shared/enums/page-paths'
// 
// interface Props {
// 	size?: number
// }
// 
// const BackButton: React.FC<Props> = ({ size = 40 }) => {
// 	const router = useRouter()
// 
// 	return (
// 		<IconButton
// 			icon={require('../../../../assets/system_icons/back.png')}
// 			size={size}
// 			onPress={() => {
// 				if (router.canGoBack()) {
// 					router.back()
// 				} else {
// 					router.replace(TABS_PATHS.HOME)
// 				}
// 			}}
// 		/>
// 	)
// }
// 
// export default BackButton
