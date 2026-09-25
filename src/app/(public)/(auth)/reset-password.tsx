import { useTranslation } from 'react-i18next'
import AuthPage from '../../../components/auth/AuthPage'
import ResetPasswordForm from '../../../components/auth/ResetPasswordForm'

export default function ResetPasswordFormScreen() {
    const { t } = useTranslation()
    return <AuthPage title={t('auth.resetTitle')} description={t('auth.resetDescription')}><ResetPasswordForm /></AuthPage>
}
