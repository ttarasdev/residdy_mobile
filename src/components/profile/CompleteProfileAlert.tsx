import { useTranslation } from 'react-i18next'
import Popup from '../shared/feedback/Popup'
import MessageCard from '../shared/feedback/MessageCard'

export default function CompleteProfileAlert({
    visible,
    onClose,
    onFill,
}: {
    visible: boolean
    onClose: () => void
    onFill: () => void
}) {
    const { t } = useTranslation()
    return (
        <Popup visible={visible} onClose={onClose}>
            <MessageCard
                tone="warning"
                title={t('workspace.completeProfile')}
                message={t('workspace.completeProfileBody')}
                action={{ label: t('feedback.fillProfile'), onPress: onFill }}
                secondaryAction={{
                    label: t('workspace.cancel'),
                    onPress: onClose,
                }}
            />
        </Popup>
    )
}
