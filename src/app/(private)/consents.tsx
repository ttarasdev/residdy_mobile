import { useTranslation } from 'react-i18next'
import AuthPage from '../../components/auth/AuthPage'
import ConsentsForm from '../../components/auth/ConsentsForm'

export default function ConsentsScreen() {
    const { t } = useTranslation()
    return (
        <AuthPage
            title={t('auth.consentsTitle')}
            description={t('auth.consentsDescription')}
            back={false}
        >
            <ConsentsForm />
        </AuthPage>
    )
}
