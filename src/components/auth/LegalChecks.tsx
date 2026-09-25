import Text from '../shared/typography/Text'
import { useState } from 'react'
import { Linking, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import Checkbox from '../shared/inputs/Checkbox'
import Button from '../shared/buttons/Button'
import { getApiUrl } from '../../shared/config/api'
import { authStyles as s } from '../../shared/styles/auth.styles'
import type { LegalDocumentsListResponse } from '../../api/legal-documents/legal-documents.types'

export default function LegalChecks({ documents, selected, onChange, disabled }: { documents: LegalDocumentsListResponse['rows']; selected: number[]; onChange: (ids: number[]) => void; disabled?: boolean }) {
    const { t } = useTranslation()
    const [linkError, setLinkError] = useState(false)
    async function open(url: string) {
        try {
            const target = new URL(url, getApiUrl())
            if (!['http:', 'https:'].includes(target.protocol)) throw Error('Unsupported URL')
            await Linking.openURL(target.toString())
            setLinkError(false)
        } catch { setLinkError(true) }
    }
    return <View style={{ gap: 8 }}>
        {documents.map((doc) => <Checkbox key={doc.versionId} label={t('auth.acceptDocument', { title: t(`legalDocuments.${doc.code}`, { defaultValue: doc.title }) })} checked={selected.includes(doc.versionId)} disabled={disabled}
            onChange={(checked) => onChange(checked ? [...selected, doc.versionId] : selected.filter((id) => id !== doc.versionId))}>
            <Text style={s.legal}>{t('auth.accept')}</Text>
            <Button height={32} padding={0} style={{ alignItems: 'flex-start', paddingVertical: 4 }} textStyle={[s.link, { textAlign: 'left' }]} accessibilityRole="link" onPress={() => open(doc.url)}>{t(`legalDocuments.${doc.code}`, { defaultValue: doc.title })}</Button>
        </Checkbox>)}
        {linkError && <Text style={s.error}>{t('auth.errors.openDocument')}</Text>}
    </View>
}
