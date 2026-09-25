import { useTranslation } from 'react-i18next'
import DetailScreen from '../../../components/shared/layout/DetailScreen'
import MyConsultations from '../../../components/consultations/MyConsultations'
export default function Mine() {
    const { t } = useTranslation()
    return (
        <DetailScreen title={t('consultationsUi.mine')}>
            <MyConsultations full />
        </DetailScreen>
    )
}
