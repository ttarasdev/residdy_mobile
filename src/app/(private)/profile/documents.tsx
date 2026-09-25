import { useTranslation } from 'react-i18next'
import DetailScreen from '../../../components/shared/layout/DetailScreen'
import MyDocuments from '../../../components/documents/MyDocuments'
export default function Documents() {
    const { t } = useTranslation()
    return (
        <DetailScreen title={t('workspace.myDocuments')}>
            <MyDocuments showTitle={false} />
        </DetailScreen>
    )
}
