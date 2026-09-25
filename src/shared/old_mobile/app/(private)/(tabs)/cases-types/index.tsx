// import AdvertisingPost from '@/src/components/advertising/advertising-post/AdvertisingPost'
// import AdvertisingSlider from '@/src/components/advertising/advertising-slider/AdvertisingSlider'
// import CaseTypesBlock from '@/src/components/cases/case-categories/case-types-block/case-types-block'
// import TabsPage from '@/src/components/features-components/page-containers/tabs-page/TabsPage'
// import PagesTop from '@/src/components/features-components/pages-top/PagesTop'
// import { STACK_PATHS } from '@/src/shared/enums/page-paths'
// import { useRouter } from 'expo-router'
// import { useTranslation } from '@/node_modules/react-i18next'
// 
// export default function CasesPage() {
// 	const { t } = useTranslation()
// 	const router = useRouter()
// 
// 	return (
// 		<TabsPage>
// 			<PagesTop
// 				title={t('cases.main.title')}
// 				buttonTitle={t('cases.main.myCasesButton')}
// 				onPress={() => router.push(STACK_PATHS.USER_CASES)}
// 			/>
// 			<AdvertisingSlider />
// 			<CaseTypesBlock isPopular={true} />
// 			<AdvertisingPost />
// 			<CaseTypesBlock isPopular={false} />
// 		</TabsPage>
// 	)
// }
