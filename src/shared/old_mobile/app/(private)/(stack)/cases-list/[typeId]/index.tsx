// import CasesList from '@/src/components/cases/cases/cases-list/CasesList'
// import StackPage from '@/src/components/features-components/page-containers/stack-page/StackPage'
// import PagesTop from '@/src/components/features-components/pages-top/PagesTop'
// import { useLocalSearchParams } from 'expo-router'
// import { useTranslation } from '@/node_modules/react-i18next'
// 
// const CasesListPage = () => {
// 	const { typeId } = useLocalSearchParams<{ typeId: string }>()
// 	const { t } = useTranslation()
// 
// 	return (
// 		<StackPage>
// 			<PagesTop
// 				title={t('cases.casesList.title')}
// 				subtitle={t('cases.casesList.subtitle')}
// 			/>
// 			<CasesList typeId={Number(typeId)} />
// 		</StackPage>
// 	)
// }
// 
// export default CasesListPage
