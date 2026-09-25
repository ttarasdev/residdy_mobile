import {
    Image,
    Pressable,
    StyleSheet,
    View,
    type ImageSourcePropType,
} from 'react-native'
import Text from '../shared/typography/Text'
export default function ProfileRow({
    title,
    icon,
    badge,
    light,
    onPress,
}: {
    title: string
    icon: ImageSourcePropType
    badge?: string
    light?: boolean
    onPress: () => void
}) {
    const color = light ? '#253441' : '#DBE3EB'
    return (
        <Pressable
            accessibilityRole="button"
            onPress={onPress}
            style={({ pressed }) => [
                styles.row,
                { opacity: pressed ? 0.6 : 1 },
            ]}
        >
            <Image source={icon} style={[styles.icon, { tintColor: color }]} />
            <Text
                style={[
                    styles.label,
                    {
                        color,
                        fontFamily: light
                            ? 'Manrope_600SemiBold'
                            : 'Manrope_400Regular',
                    },
                ]}
            >
                {title}
            </Text>
            {badge ? (
                <View style={styles.badge}>
                    <Text numberOfLines={1} style={styles.badgeText}>
                        {badge}
                    </Text>
                </View>
            ) : (
                <Image
                    source={require('../../../assets/system_icons/nav_icons/chevron-right-white.png')}
                    style={[styles.arrow, { tintColor: color }]}
                />
            )}
        </Pressable>
    )
}
const styles = StyleSheet.create({
    row: {
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        gap: 20,
        paddingVertical: 12,
    },
    icon: { width: 23, height: 23, resizeMode: 'contain' },
    label: { fontSize: 14, flex: 1 },
    arrow: { width: 17, height: 17, opacity: 0.8 },
    badge: {
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 5,
        maxWidth: 112,
        backgroundColor: 'rgba(177,194,219,0.18)',
    },
    badgeText: {
        color: '#CEDBEC',
        fontSize: 10,
        fontFamily: 'Manrope_400Regular',
    },
})
