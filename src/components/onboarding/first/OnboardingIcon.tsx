import { Image } from 'react-native'

const icons = {
    globe: require('../../../../assets/system_icons/multi/onboarding-globe-white.png'),
    id: require('../../../../assets/system_icons/multi/onboarding-id-card-white.png'),
    document: require('../../../../assets/system_icons/multi/onboarding-document-white.png'),
    download: require('../../../../assets/system_icons/multi/onboarding-download-white.png'),
    bell: require('../../../../assets/system_icons/multi/onboarding-bell-white.png'),
    consultant: require('../../../../assets/system_icons/multi/onboarding-consultant-white.png'),
    video: require('../../../../assets/system_icons/multi/onboarding-video-white.png'),
    calendar: require('../../../../assets/system_icons/multi/onboarding-calendar-white.png'),
    business: require('../../../../assets/system_icons/multi/onboarding-business-white.png'),
    home: require('../../../../assets/system_icons/multi/onboarding-home-white.png'),
    partners: require('../../../../assets/system_icons/multi/onboarding-partners-white.png'),
    arrow: require('../../../../assets/system_icons/multi/onboarding-arrow-right-white.png'),
    check: require('../../../../assets/system_icons/multi/onboarding-check-white.png'),
    chevron: require('../../../../assets/system_icons/multi/onboarding-chevron-right-white.png'),
    plus: require('../../../../assets/system_icons/multi/onboarding-plus-white.png'),
}
export type OnboardingIconName = keyof typeof icons
export default function OnboardingIcon({ name, size = 32, color = '#FFFFFF' }: { name: OnboardingIconName; size?: number; color?: string }) {
    return <Image accessible={false} source={icons[name]} resizeMode="contain" style={{ width: size, height: size, tintColor: color }} />
}
