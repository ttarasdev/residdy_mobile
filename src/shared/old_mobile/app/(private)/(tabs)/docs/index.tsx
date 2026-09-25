// import AdvertisingPost from '@/src/components/advertising/advertising-post/AdvertisingPost'
// import AdvertisingSlider from '@/src/components/advertising/advertising-slider/AdvertisingSlider'
// import TabsPage from '@/src/components/features-components/page-containers/tabs-page/TabsPage'
// import PagesTop from '@/src/components/features-components/pages-top/PagesTop'
// import GdocsTypesList from '@/src/components/gdocs/gdocs-types-list/GdocsTypesList'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { useRouter } from 'expo-router'
// import { useTranslation } from '@/node_modules/react-i18next'
// 
// export default function DocsPage() {
// 	const { t } = useTranslation()
// 	const router = useRouter()
// 
// 	return (
// 		<TabsPage>
// 			<PagesTop
// 				title={t('gdocs.title')}
// 				buttonTitle={t('gdocs.myDocs')}
// 				onPress={() => router.push(STACK_PATHS.USER_GDOCS)}
// 			/>
// 			<AdvertisingSlider />
// 			<GdocsTypesList isPopular={true} />
// 			<AdvertisingPost />
// 			<GdocsTypesList isPopular={false} />
// 		</TabsPage>
// 	)
// }
