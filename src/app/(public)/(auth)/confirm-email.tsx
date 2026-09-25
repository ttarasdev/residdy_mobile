import { useTranslation } from 'react-i18next'
import AuthPage from '../../../components/auth/AuthPage'
import ConfirmEmailForm from '../../../components/auth/ConfirmEmailForm'

export default function ConfirmEmailFormScreen() {
    const { t } = useTranslation()
    return <AuthPage title={t('auth.confirmTitle')} description={t('auth.confirmDescription')}><ConfirmEmailForm /></AuthPage>
}
