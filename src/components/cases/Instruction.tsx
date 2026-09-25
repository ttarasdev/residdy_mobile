import { StyleSheet, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { caseInstructionsApi } from '../../api/case-instructions/case-instructions.api'
import DetailScreen from '../shared/layout/DetailScreen'
import PrivateImage from '../shared/media/PrivateImage'
import PaperCard from '../shared/cards/PaperCard'
import RichText from '../shared/content/RichText'
import QueryState from '../shared/content/QueryState'
import LightButton from '../shared/buttons/LightButton'
import Text from '../shared/typography/Text'
export default function Instruction() {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { account, options } = useApi()
    const { t } = useTranslation()
    const router = useRouter()
    const query = useQuery({
        queryKey: ['instruction', account?.account.id, id],
        queryFn: ({ signal }) =>
            caseInstructionsApi.findOne(Number(id), { ...options, signal }),
        enabled: !!account && Number(id) > 0,
    })
    return (
        <DetailScreen title={t('workspace.instruction')}>
            <QueryState
                loading={query.isPending}
                error={query.error}
                retry={() => {
                    void query.refetch()
                }}
            />
            {query.data && (
                <>
                    <View style={{ gap: 12 }}>
                        <Text style={styles.title}>{query.data.title}</Text>
                        <Text style={styles.description}>
                            {query.data.description}
                        </Text>
                    </View>
                    {!!query.data.headerVariantId && (
                        <View style={styles.header}>
                            <PrivateImage
                                variantId={query.data.headerVariantId}
                                size="large"
                                style={StyleSheet.absoluteFill}
                                resizeMode="cover"
                            />
                        </View>
                    )}
                    {query.data.blocks?.map((block) =>
                        block.type === 'photo' ? (
                            <PrivateImage
                                key={block.id}
                                variantId={block.variantId}
                                size="large"
                                style={styles.photo}
                                resizeMode="cover"
                            />
                        ) : block.contentJson ? (
                            <PaperCard key={block.id} padding={20} radius={24}>
                                <RichText light content={block.contentJson} />
                            </PaperCard>
                        ) : null,
                    )}
                    <Text style={styles.description}>
                        {t('casesUi.instructionReturn')}
                    </Text>
                    <LightButton
                        height={48}
                        onPress={() =>
                            router.canGoBack()
                                ? router.back()
                                : router.replace('/legalization')
                        }
                    >
                        {t('casesUi.backToCase')}
                    </LightButton>
                </>
            )}
        </DetailScreen>
    )
}
const styles = StyleSheet.create({
    title: {
        color: '#FFFFFF',
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 27,
        lineHeight: 37,
    },
    description: {
        color: '#AABCCB',
        fontFamily: 'Manrope_400Regular',
        fontSize: 12,
        lineHeight: 20,
    },
    header: { aspectRatio: 3, borderRadius: 20, overflow: 'hidden' },
    photo: { width: '100%', aspectRatio: 1.5, borderRadius: 22 },
})
