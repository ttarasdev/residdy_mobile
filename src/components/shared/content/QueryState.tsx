import { useState } from 'react'
import { useIsFocused } from 'expo-router'
import Popup from '../feedback/Popup'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'expo-router'
import { ApiError } from '../../../api/http'
import Text from '../typography/Text'
import MessageCard from '../feedback/MessageCard'
import { ActivityIndicator } from 'react-native'
import EmptyState from './EmptyState'
import { contentStyles as s } from './content.styles'
export default function QueryState({
    loading,
    error,
    empty,
    retry,
}: {
    loading?: boolean
    error?: unknown
    empty?: string
    retry?: () => void
}) {
    const { t } = useTranslation()
    const focused = useIsFocused()
    const [dismissed, setDismissed] = useState<unknown>(null)
    if (loading)
        return (
            <ActivityIndicator
                color="#C5D6E4"
                style={{ paddingVertical: 12 }}
            />
        )
    if (error instanceof ApiError && error.code === 'SUBSCRIPTION_REQUIRED')
        return <Redirect href="/profile" />
    if (error instanceof ApiError && error.code === 'OPEN_CASE_LIMIT_REACHED')
        return <Text style={s.body}>{t('casesUi.openCaseLimit')}</Text>
    if (error)
        return (
            <Popup
                visible={focused && dismissed !== error}
                onClose={() => setDismissed(error)}
            >
                <MessageCard
                    tone="warning"
                    title={t('feedback.loadError')}
                    message={t('workspace.error')}
                    secondaryAction={{
                        label: t('feedback.close'),
                        onPress: () => setDismissed(error),
                    }}
                    action={
                        retry
                            ? {
                                  label: t('workspace.retry'),
                                  onPress: () => {
                                      setDismissed(error)
                                      retry()
                                  },
                              }
                            : undefined
                    }
                />
            </Popup>
        )
    return empty ? <EmptyState title={empty} /> : null
}
