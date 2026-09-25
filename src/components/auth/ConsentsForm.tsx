import { useState } from 'react'
import { View } from 'react-native'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Redirect } from 'expo-router'
import LegalChecks from './LegalChecks'
import AuthError from './AuthError'
import LightButton from '../shared/buttons/LightButton'
import Button from '../shared/buttons/Button'
import { useSession } from '../../shared/providers/SessionProvider'
import { withApi } from '../../shared/config/api'
import { legalDocumentAcceptancesApi } from '../../api/legal-document-acceptances/legal-document-acceptances.api'
import { authStyles as s } from '../../shared/styles/auth.styles'

export default function ConsentsForm() {
    const { t } = useTranslation()
    const { session, legal, refreshLegal, signOut } = useSession()
    const [selected, setSelected] = useState<number[]>([])
    const docs = legal?.documents ?? []
    const accept = useMutation({ mutationFn: async () => {
        if (session.status !== 'authenticated') throw Error('Session required')
        await withApi((options) => legalDocumentAcceptancesApi.accept({ legalVersionIds: docs.filter((doc) => selected.includes(doc.versionId)).map((doc) => doc.versionId) }, { ...options, token: session.token }))
        await refreshLegal()
    }, onError: () => { void refreshLegal().catch(() => {}) } })
    const logout = useMutation({ mutationFn: signOut })
    if (legal && !legal.acceptanceRequired) return <Redirect href="/home" />
    return <View style={s.form}>
        <LegalChecks documents={docs} selected={selected} onChange={setSelected} disabled={accept.isPending || logout.isPending} />
        <AuthError error={accept.error || logout.error} />
        <LightButton loading={accept.isPending} disabled={logout.isPending || !docs.length || !docs.every((doc) => selected.includes(doc.versionId))} onPress={() => accept.mutate()}>{t('auth.acceptContinue')}</LightButton>
        <Button textStyle={s.link} loading={logout.isPending} disabled={accept.isPending} onPress={() => logout.mutate()}>{t('auth.signOut')}</Button>
    </View>
}
