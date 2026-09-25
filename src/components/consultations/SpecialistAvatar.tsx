import { Image, View, StyleSheet } from 'react-native'
import PrivateImage from '../shared/media/PrivateImage'
export default function SpecialistAvatar({
    variantId,
    size = 64,
}: {
    variantId?: number | null
    size?: number
}) {
    return (
        <View
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.14)',
                borderWidth: 2,
                borderColor: 'rgba(255,255,255,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {!variantId && (
                <Image
                    source={require('../../../assets/system_icons/multi/onboarding-consultant-white.png')}
                    style={{ width: size / 2, height: size / 2 }}
                />
            )}
            <PrivateImage
                variantId={variantId}
                size="medium"
                resizeMode="cover"
                style={StyleSheet.absoluteFill}
            />
        </View>
    )
}
