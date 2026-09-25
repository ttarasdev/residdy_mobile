import { useLocalSearchParams } from 'expo-router'
import { useTranslation } from 'react-i18next'
import DetailScreen from '../shared/layout/DetailScreen'
import WeekSlots from './WeekSlots'
import QueryState from '../shared/content/QueryState'
export default function ConsultationOffers() {
    const { category } = useLocalSearchParams<{ category: string }>()
    const { t } = useTranslation()
    const id = Number(category)
    return (
        <DetailScreen title={t('consultationFlow.chooseTime')}>
            {Number.isSafeInteger(id) && id > 0 ? (
                <WeekSlots categoryId={id} />
            ) : (
                <QueryState empty={t('consultationFlow.unavailable')} />
            )}
        </DetailScreen>
    )
}
