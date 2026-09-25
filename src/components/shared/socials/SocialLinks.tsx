import Text from '../typography/Text'
import { Image, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { authStyles } from '../../../shared/styles/auth.styles'

// Visual placeholders until the official profile URLs are supplied.
const socials = [
    { name: 'Instagram', backgroundColor: 'transparent', icon: require('../../../../assets/socials/instagram.png') },
    { name: 'Facebook', backgroundColor: 'transparent', icon: require('../../../../assets/socials/facebook.png') },
    { name: 'TikTok', backgroundColor: '#080808', icon: require('../../../../assets/socials/tiktok-white.png') },
    { name: 'LinkedIn', backgroundColor: '#0A66C2', icon: require('../../../../assets/socials/linkedin-white.png') },
]

export default function SocialLinks() {
    const { t } = useTranslation()
    return <View style={{ alignItems: 'center', gap: 12 }}>
        <Text style={authStyles.description}>{t('social.followUs')}</Text>
        <View style={{ flexDirection: 'row', gap: 20 }}>
            {socials.map(({ name, icon, backgroundColor }) => <View key={name} style={{ width: 44, height: 44, borderRadius: 22, backgroundColor }}>
                <Image source={icon} accessibilityLabel={name} accessible style={{ width: 44, height: 44, tintColor: backgroundColor === 'transparent' ? undefined : '#FFFFFF' }} resizeMode="contain" />
            </View>)}
        </View>
    </View>
}
