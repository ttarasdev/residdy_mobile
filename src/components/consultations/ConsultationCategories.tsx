import DetailScreen from '../shared/layout/DetailScreen'
import { useTranslation } from 'react-i18next'
import ConsultationTopics from './ConsultationTopics'
export default function ConsultationCategories() {
    const { t } = useTranslation()
    return (
        <DetailScreen title={t('consultationsUi.chooseCategory')}>
            <ConsultationTopics />
        </DetailScreen>
    )
}
