import { useSafeAreaInsets } from 'react-native-safe-area-context'
import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { useRouter } from 'expo-router'
import Screen from './Screen'
import BackButton from '../buttons/BackButton'
import Text from '../typography/Text'
import { contentStyles as s } from '../content/content.styles'
export default function DetailScreen({
    title,
    children,
    onBack,
}: {
    title: string
    children: ReactNode
    onBack?: () => void
}) {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    return (
        <Screen
            edges={['top', 'left', 'right']}
            paddingHorizontal={0}
            paddingTop={8}
            paddingBottom={0}
            gap={8}
        >
            <View style={[s.row, { paddingHorizontal: 20 }]}>
                <BackButton
                    accessibilityLabel={title}
                    onPress={
                        onBack ??
                        (() =>
                            router.canGoBack()
                                ? router.back()
                                : router.replace('/legalization'))
                    }
                />
                <Text
                    style={[
                        s.heading,
                        { flex: 1, fontSize: 16, lineHeight: 23 },
                    ]}
                >
                    {title}
                </Text>
            </View>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{
                        padding: 20,
                        gap: 20,
                        paddingBottom: insets.bottom + 32,
                    }}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </Screen>
    )
}
