import OutlineButton from '../shared/buttons/OutlineButton'
import TabScrollView from '../shared/layout/TabScrollView'
import ProfileAvatar from './ProfileAvatar'
import { useBottomTabBarHeight } from 'expo-router/tabs'
import { Pressable, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import useProfile from '../../shared/hooks/useProfile'
import useSubscription from '../../shared/hooks/useSubscription'
import { accountsApi } from '../../api/accounts/accounts.api'
import { useSession } from '../../shared/providers/SessionProvider'
import { languages } from '../../i18n'
import Screen from '../shared/layout/Screen'
import PaperCard from '../shared/cards/PaperCard'
import NavyCard from '../shared/cards/NavyCard'
import Card from '../shared/cards/Card'
import TabHeader from '../navigation/TabHeader'
import QueryState from '../shared/content/QueryState'
import Text from '../shared/typography/Text'
import ProfileRow from './ProfileRow'

export default function Profile() {
    const bottomSpace = useBottomTabBarHeight()
    const { account, options } = useApi()
    const { t, i18n } = useTranslation()
    const profile = useProfile()
    const subscription = useSubscription()
    const router = useRouter()
    const { signOut } = useSession()
    const logout = useMutation({ mutationFn: signOut })
    const me = useQuery({
        queryKey: ['account-me', account?.account.id],
        queryFn: ({ signal }) => accountsApi.getMe({ ...options, signal }),
    })
    const name =
        [profile.data?.name, profile.data?.surname].filter(Boolean).join(' ') ||
        t('workspace.yourProfile')
    return (
        <Screen
            edges={['top', 'left', 'right']}
            paddingHorizontal={0}
            paddingTop={0}
            paddingBottom={0}
            gap={0}
        >
            <TabHeader title={t('navigation.profile')} />
            <TabScrollView
                queryRoots={['user-me', 'account-me', 'subscription']}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: bottomSpace + 24 },
                ]}
            >
                <View style={styles.identity}>
                    <ProfileAvatar variantId={me.data?.avatarId} />
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.email}>
                        {me.data?.email ?? account?.account.email}
                    </Text>
                </View>
                <QueryState
                    error={profile.error}
                    retry={() => {
                        void profile.refetch()
                    }}
                />
                <PaperCard padding={0} radius={22}>
                    <ProfileRow
                        light
                        title={t('workspace.editProfile')}
                        icon={require('../../../assets/system_icons/menu/profile-white.png')}
                        onPress={() => router.push('/profile/edit')}
                    />
                </PaperCard>
                <NavyCard
                    padding={0}
                    radius={24}
                    backgroundColor="rgba(11,25,36,0.48)"
                >
                    <ProfileRow
                        title={t('workspace.subscription')}
                        icon={require('../../../assets/system_icons/multi/onboarding-check-white.png')}
                        badge={
                            subscription.data
                                ? subscription.data.active
                                    ? subscription.data.plan.name
                                    : t('workspace.expired')
                                : '…'
                        }
                        onPress={() => router.push('/profile/subscription')}
                    />
                    <ProfileRow
                        title={t('workspace.myDocuments')}
                        icon={require('../../../assets/system_icons/multi/onboarding-document-white.png')}
                        onPress={() => router.push('/profile/documents')}
                    />
                    <ProfileRow
                        title={t('consultationsUi.mine')}
                        icon={require('../../../assets/system_icons/multi/onboarding-consultant-white.png')}
                        onPress={() => router.push('/consultations/mine')}
                    />
                    <ProfileRow
                        title={t('workspace.myCases')}
                        icon={require('../../../assets/system_icons/multi/onboarding-business-white.png')}
                        onPress={() =>
                            router.push('/legalization?section=cases')
                        }
                    />
                </NavyCard>
                <Card
                    padding={0}
                    radius={24}
                    backgroundColor="rgba(255,255,255,0.055)"
                >
                    <ProfileRow
                        title={t('search.notifications')}
                        icon={require('../../../assets/system_icons/multi/onboarding-bell-white.png')}
                        onPress={() => router.push('/profile/notifications')}
                    />
                    <ProfileRow
                        title={t('workspace.language')}
                        icon={require('../../../assets/system_icons/multi/onboarding-globe-white.png')}
                        badge={
                            languages.find(
                                (language) => language.code === i18n.language,
                            )?.label
                        }
                        onPress={() => router.push('/profile/language')}
                    />
                    <ProfileRow
                        title={t('workspace.security')}
                        icon={require('../../../assets/system_icons/auth/key-white.png')}
                        onPress={() => router.push('/profile/security')}
                    />
                </Card>
                <PaperCard padding={0} radius={22}>
                    <ProfileRow
                        light
                        title={t('workspace.legal')}
                        icon={require('../../../assets/system_icons/multi/onboarding-document-white.png')}
                        onPress={() => router.push('/profile/legal')}
                    />
                </PaperCard>
                <OutlineButton
                    loading={logout.isPending}
                    onPress={() => logout.mutate()}
                >
                    {t('auth.signOut')}
                </OutlineButton>
                <QueryState error={logout.error} />
            </TabScrollView>
        </Screen>
    )
}
const styles = StyleSheet.create({
    content: { paddingHorizontal: 20, paddingBottom: 24, gap: 18 },
    identity: {
        alignItems: 'center',
        paddingTop: 18,
        paddingBottom: 12,
        gap: 6,
    },
    name: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 22,
        textAlign: 'center',
    },
    email: {
        color: '#9AABB9',
        fontFamily: 'Manrope_400Regular',
        fontSize: 12,
        textAlign: 'center',
    },
    footer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    footerButton: {
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    footerText: {
        color: '#A9B7C3',
        fontFamily: 'Manrope_400Regular',
        fontSize: 12,
    },
})
