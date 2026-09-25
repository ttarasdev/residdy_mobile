import { useTranslation } from 'react-i18next'
import AuthPage from '../../../components/auth/AuthPage'
import ForgotPasswordForm from '../../../components/auth/ForgotPasswordForm'

export default function ForgotPasswordFormScreen() {
    const { t } = useTranslation()
    return <AuthPage title={t('auth.forgotTitle')} description={t('auth.forgotDescription')}><ForgotPasswordForm /></AuthPage>
}
