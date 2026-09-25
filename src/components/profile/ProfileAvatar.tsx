import { useRef, useState } from 'react'
import { ApiError } from '../../api/http'
import { uploadFile } from '../../shared/utils/upload-file'
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    View,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import useApi from '../../shared/hooks/useApi'
import { accountsApi } from '../../api/accounts/accounts.api'
import PrivateImage from '../shared/media/PrivateImage'
import Popup from '../shared/feedback/Popup'
import MessageCard from '../shared/feedback/MessageCard'

export default function ProfileAvatar({
    variantId,
}: {
    variantId?: number | null
}) {
    const { t } = useTranslation()
    const { options, account } = useApi()
    const client = useQueryClient()
    const picking = useRef(false)
    const [failureStep, setFailureStep] = useState<
        'photoPickError' | 'photoPrepareError' | 'photoUploadError'
    >('photoPickError')
    const upload = useMutation({
        mutationFn: async () => {
            setFailureStep('photoPickError')
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.9,
            })
            if (result.canceled) return
            setFailureStep('photoPrepareError')
            const asset = result.assets[0]
            const image = ImageManipulator.manipulate(asset.uri)
            image.resize(
                asset.width >= asset.height
                    ? { width: 1024 }
                    : { height: 1024 },
            )
            const rendered = await image.renderAsync()
            const file = await rendered.saveAsync({
                format: SaveFormat.JPEG,
                compress: 0.85,
            })
            setFailureStep('photoUploadError')
            return accountsApi.uploadMyAvatar(
                await uploadFile(file.uri, 'avatar.jpg', 'image/jpeg'),
                {
                    ...options,
                    token: account!.token,
                },
            )
        },
        onError: (error) => {
            if (__DEV__)
                console.warn('Avatar update failed', {
                    name: error.name,
                    message: error.message,
                    ...(error instanceof ApiError
                        ? { status: error.status, code: error.code }
                        : {}),
                })
        },
        onSuccess: async (result) => {
            if (!result) return
            await client.invalidateQueries({
                queryKey: ['account-me', account?.account.id],
            })
        },
    })
    async function pick() {
        if (picking.current) return
        picking.current = true
        try {
            await upload.mutateAsync()
        } catch {
            /* Error is rendered in the popup below. */
        } finally {
            picking.current = false
        }
    }
    return (
        <>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={t('feedback.changePhoto')}
                accessibilityState={{
                    busy: upload.isPending,
                    disabled: upload.isPending,
                }}
                disabled={upload.isPending}
                onPress={() => {
                    void pick()
                }}
                style={styles.avatar}
            >
                <Image
                    source={require('../../../assets/system_icons/menu/profile-white.png')}
                    style={styles.person}
                />
                <PrivateImage
                    variantId={variantId}
                    style={StyleSheet.absoluteFill}
                />
                {upload.isPending && (
                    <View style={styles.loading}>
                        <ActivityIndicator color="#FFFFFF" />
                    </View>
                )}
            </Pressable>
            <Popup visible={upload.isError} onClose={() => upload.reset()}>
                <MessageCard
                    tone="warning"
                    title={t('feedback.photoError')}
                    message={
                        t(`feedback.${failureStep}`) +
                        (upload.error
                            ? ` (${upload.error instanceof ApiError ? `HTTP ${upload.error.status}` : upload.error.name})`
                            : '')
                    }
                    action={{
                        label: t('feedback.close'),
                        onPress: () => upload.reset(),
                    }}
                />
            </Popup>
        </>
    )
}
const styles = StyleSheet.create({
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#8295A5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
        overflow: 'hidden',
    },
    person: { width: 30, height: 30 },
    loading: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.35)',
    },
})
