import { usePopupBlocker } from './PopupActivity'
import { useContext, type ReactNode } from 'react'
import { BlurView } from 'expo-blur'
import { PopupBlurTarget } from './PopupBackground'
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useAccessibilityPreferences from '../../../shared/hooks/useAccessibilityPreferences'

export default function Popup({
    visible,
    blocksPromotions = true,
    onClose,
    children,
}: {
    visible: boolean
    blocksPromotions?: boolean
    onClose: () => void
    children: ReactNode
}) {
    usePopupBlocker(visible && blocksPromotions)
    const target = useContext(PopupBlurTarget)
    const { reduceMotion, reduceTransparency } = useAccessibilityPreferences()
    const insets = useSafeAreaInsets()
    return (
        <Modal
            visible={visible}
            transparent
            animationType={reduceMotion ? 'none' : 'fade'}
            onRequestClose={onClose}
            statusBarTranslucent
            navigationBarTranslucent
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.backdrop}
            >
                {!reduceTransparency && (
                    <BlurView
                        pointerEvents="none"
                        style={StyleSheet.absoluteFill}
                        intensity={45}
                        tint="dark"
                        blurTarget={target}
                        blurMethod={
                            target ? 'dimezisBlurViewSdk31Plus' : 'none'
                        }
                    />
                )}
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[
                        styles.content,
                        {
                            paddingTop: insets.top + 24,
                            paddingBottom: insets.bottom + 24,
                        },
                    ]}
                >
                    <View
                        accessibilityViewIsModal
                        onAccessibilityEscape={onClose}
                        style={styles.dialog}
                    >
                        {children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    )
}
const styles = StyleSheet.create({
    backdrop: { flex: 1, backgroundColor: 'rgba(10,20,29,0.35)' },
    content: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 },
    dialog: { width: '100%', maxWidth: 420, alignSelf: 'center' },
})
