import type { ReactNode } from 'react'
import { useRouter } from 'expo-router'
import { useTranslation } from 'react-i18next'
import CompleteProfileAlert from '../../components/profile/CompleteProfileAlert'
import DetailScreen from '../../components/shared/layout/DetailScreen'
import useProfile from '../hooks/useProfile'
import { isProfileComplete } from '../utils/profile'
import Screen from '../../components/shared/layout/Screen'
import QueryState from '../../components/shared/content/QueryState'
export default function ProfileGuard({ children }: { children: ReactNode }) {
    const query = useProfile()
    const router = useRouter()
    const { t } = useTranslation()
    if (query.isPending || query.error)
        return (
            <Screen>
                <QueryState
                    loading={query.isPending}
                    error={query.error}
                    retry={() => {
                        void query.refetch()
                    }}
                />
            </Screen>
        )
    if (!isProfileComplete(query.data))
        return (
            <DetailScreen title={t('workspace.newDocument')}>
                <CompleteProfileAlert
                    visible
                    onClose={() =>
                        router.canGoBack()
                            ? router.back()
                            : router.replace('/legalization?section=documents')
                    }
                    onFill={() => router.replace('/profile/edit')}
                />
            </DetailScreen>
        )
    return children
}
