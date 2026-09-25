import Text from '../shared/typography/Text'
import { useTranslation } from 'react-i18next'
import { authErrorKey } from '../../shared/auth/auth-error'
import { authStyles } from '../../shared/styles/auth.styles'

export default function AuthError({ error, context }: { error: unknown; context?: 'login' | 'register' | 'code' }) {
    const { t } = useTranslation()
    return error ? <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={authStyles.error}>{t(authErrorKey(error, context))}</Text> : null
}
