import { useSession } from '../providers/SessionProvider'
import { getApiUrl } from '../config/api'
import { useTranslation } from 'react-i18next'
export default function useApi() {
    const { session } = useSession()
    const { i18n } = useTranslation()
    const account = session.status === 'authenticated' ? session : null
    const lan = (
        i18n.language === 'uk' ? 'UA' : i18n.language.toUpperCase()
    ) as 'PL' | 'UA' | 'EN' | 'RU'
    return {
        account,
        lan,
        options: { baseUrl: getApiUrl(), token: account?.token ?? '' },
    }
}
